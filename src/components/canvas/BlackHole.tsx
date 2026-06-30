"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader for the accretion disk (glowing plasma ring)
const AccretionDiskShader = {
  uniforms: {
    uTime: { value: 0 },
    uScroll: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uScroll;
    varying vec2 vUv;
    varying vec3 vPosition;

    // 2D Noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      // Convert UV to polar coordinates
      vec2 uv = vUv - 0.5;
      float dist = length(uv);
      float angle = atan(uv.y, uv.x);

      // Event horizon cutout (inner radius)
      if (dist < 0.15) {
        discard;
      }
      
      // Accretion disk boundary (outer radius)
      if (dist > 0.49) {
        discard;
      }

      // Swirling coordinate mapping
      float speed = 2.0 / (dist + 0.1); // Swirl faster near the singularity
      vec2 swirlUv = vec2(
        dist * 12.0 - uTime * 1.5,
        angle * 3.0 + uTime * 0.8 * speed
      );

      // Noise layers for plasma texture
      float n1 = noise(swirlUv);
      float n2 = noise(swirlUv * 2.0 - vec2(uTime * 0.5, 0.0));
      float plasma = (n1 * 0.6 + n2 * 0.4);

      // Intensity falloff: very hot near inner edge, fading at outer edge
      float intensity = smoothstep(0.15, 0.22, dist) * smoothstep(0.49, 0.35, dist);
      
      // Color scheme: White hot inner -> neon cyan -> deep purple outer
      vec3 innerColor = vec3(1.0, 1.0, 1.0);
      vec3 midColor = vec3(0.0, 0.9, 1.0); // Cyan glow
      vec3 outerColor = vec3(0.7, 0.0, 1.0); // Purple glow
      
      vec3 finalColor = mix(innerColor, midColor, smoothstep(0.15, 0.28, dist));
      finalColor = mix(finalColor, outerColor, smoothstep(0.28, 0.49, dist));
      
      // Add plasma flame turbulence
      finalColor += vec3(plasma * 0.4);
      
      // Dynamic emission multiplier
      float pulse = sin(uTime * 3.0) * 0.1 + 0.9;
      float alpha = intensity * (plasma * 0.8 + 0.2) * pulse;

      // React to scroll: increase chaos/brightness in Projects section
      if (uScroll > 2.0 && uScroll < 3.0) {
        float factor = (uScroll - 2.0);
        finalColor += vec3(0.2, -0.1, 0.3) * factor; // Shift to pinker/magentas
        alpha *= (1.0 + factor * 0.3);
      }

      gl_FragColor = vec4(finalColor * intensity * 2.5, alpha);
    }
  `,
};

// Custom shader for gravitational lensing (space distortion halo)
const LensingShader = {
  uniforms: {
    uTime: { value: 0 },
    uScroll: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uScroll;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv - 0.5;
      float dist = length(uv);

      // Event horizon boundary
      if (dist < 0.12) {
        discard;
      }

      // Einstein ring lensing halo boundary
      if (dist > 0.48) {
        discard;
      }

      // Light bending intensity peaks near event horizon and drops off
      float lensing = smoothstep(0.12, 0.16, dist) * smoothstep(0.48, 0.2, dist);
      
      // Swirling gravitational distortion lines
      float angle = atan(uv.y, uv.x);
      float wave = sin(dist * 60.0 - uTime * 8.0 - angle * 4.0) * 0.5 + 0.5;
      
      // Cosmic cyan/purple light bent around horizon
      vec3 lensColor = mix(
        vec3(0.0, 0.8, 1.0), // Cyan lensing
        vec3(0.6, 0.0, 1.0), // Purple lensing
        vUv.x + sin(uTime * 0.5) * 0.3
      );

      // Einstein ring bright glowing strands
      float glow = pow(lensing, 2.5) * (wave * 0.6 + 0.4);
      
      // Animate expansion on click or scroll
      float pulse = 1.0 + sin(uTime * 5.0) * 0.05 * min(1.0, uScroll);
      glow *= pulse;

      gl_FragColor = vec4(lensColor * glow * 3.0, glow * 0.8);
    }
  `,
};

export default function BlackHole() {
  const eventHorizonRef = useRef<THREE.Mesh>(null);
  const accretionDiskRef = useRef<THREE.Mesh>(null);
  const lensingRef = useRef<THREE.Mesh>(null);

  // Compile materials
  const diskMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(AccretionDiskShader.uniforms),
      vertexShader: AccretionDiskShader.vertexShader,
      fragmentShader: AccretionDiskShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
  }, []);

  const lensingMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(LensingShader.uniforms),
      vertexShader: LensingShader.vertexShader,
      fragmentShader: LensingShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentScroll = typeof window !== "undefined" ? window.scrollY / (window.innerHeight || 1) : 0;
    const lerpedScroll = THREE.MathUtils.lerp(
      diskMaterial.uniforms.uScroll.value,
      currentScroll,
      0.05
    );

    // Update time and scroll uniforms
    if (diskMaterial) {
      diskMaterial.uniforms.uTime.value = time;
      diskMaterial.uniforms.uScroll.value = lerpedScroll;
    }
    if (lensingMaterial) {
      lensingMaterial.uniforms.uTime.value = time;
      lensingMaterial.uniforms.uScroll.value = lerpedScroll;
    }

    // Slowly rotate accretion disk
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z = time * 0.08;
    }

    // Singularity breathing/pulsing animation
    if (eventHorizonRef.current) {
      const scale = 1.0 + Math.sin(time * 2.0) * 0.03;
      eventHorizonRef.current.scale.set(scale, scale, scale);
    }

    // Subtle billboard action for the lensing ring to face camera slightly
    if (lensingRef.current) {
      lensingRef.current.rotation.z = -time * 0.05;
      // Add slight tilt on mouse movement
      const mouse = state.pointer;
      lensingRef.current.rotation.x = THREE.MathUtils.lerp(lensingRef.current.rotation.x, mouse.y * 0.15, 0.05);
      lensingRef.current.rotation.y = THREE.MathUtils.lerp(lensingRef.current.rotation.y, mouse.x * 0.15, 0.05);
    }
  });

  return (
    <group position={[0, 0.5, 0]}>
      {/* 1. Singularity Event Horizon (Black Sphere) */}
      <mesh ref={eventHorizonRef} castShadow={false} receiveShadow={false}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 2. Accretion Disk (Tilted Ring) */}
      {/* We tilt it around x-axis (e.g. 70 deg) to create the 3D disk profile */}
      <mesh
        ref={accretionDiskRef}
        rotation={[Math.PI / 2.6, 0.2, 0]}
        scale={[11, 11, 11]}
      >
        <planeGeometry args={[1, 1]} />
        <primitive object={diskMaterial} attach="material" />
      </mesh>

      {/* 3. Einstein Ring Gravitational Lensing (Camera-Facing Halo) */}
      <mesh
        ref={lensingRef}
        scale={[8, 8, 8]}
        position={[0, 0, 0.1]} // Sit slightly in front of event horizon
      >
        <planeGeometry args={[1, 1]} />
        <primitive object={lensingMaterial} attach="material" />
      </mesh>
    </group>
  );
}
