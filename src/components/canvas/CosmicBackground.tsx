"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader for the cosmic nebula background
const NebulaShader = {
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

    // Pseudo-random generator
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    // 2D Noise
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

    // Fractal Brownian Motion
    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      // Rotate to reduce axial bias
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 5; ++i) {
        v += a * noise(p);
        p = rot * p * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv - 0.5;
      
      // Infinite spiral effect
      float angle = atan(uv.y, uv.x);
      float dist = length(uv);
      
      // Calculate swirling coordinates
      vec2 swirlyUv = vec2(
        dist * 3.0 - uTime * 0.03 - uScroll * 0.2, 
        angle / 6.2831 + sin(dist * 2.0 - uTime * 0.05) * 0.1
      );

      // Multi-layered nebula noise
      float n1 = fbm(swirlyUv * 4.0);
      float n2 = fbm(swirlyUv * 8.0 + vec2(uTime * 0.02, -uTime * 0.01));
      
      // Morph colors based on scroll
      // Scroll range 0.0 -> 4.0 corresponding to sections
      vec3 colHero = vec3(0.02, 0.01, 0.05);       // Deep space violet
      vec3 colAbout = vec3(0.08, 0.02, 0.15);      // Violet nebula
      vec3 colSkills = vec3(0.01, 0.04, 0.12);     // Deep blue
      vec3 colProjects = vec3(0.05, 0.0, 0.1);      // Energy storm magenta
      vec3 colContact = vec3(0.08, 0.03, 0.05);     // Dimensional rift gold/crimson
      
      vec3 baseColor = colHero;
      if (uScroll < 1.0) {
        baseColor = mix(colHero, colAbout, uScroll);
      } else if (uScroll < 2.0) {
        baseColor = mix(colAbout, colSkills, uScroll - 1.0);
      } else if (uScroll < 3.0) {
        baseColor = mix(colSkills, colProjects, uScroll - 2.0);
      } else {
        baseColor = mix(colProjects, colContact, min(1.0, uScroll - 3.0));
      }

      // Add colorful highlights to the nebula
      vec3 cyanGlow = vec3(0.0, 0.4, 0.6) * n1 * n1;
      vec3 magentaGlow = vec3(0.4, 0.0, 0.5) * n2 * n2;
      vec3 orangeGlow = vec3(0.6, 0.2, 0.0) * pow(n1 * n2, 2.0) * max(0.0, uScroll - 2.8);
      
      vec3 nebula = baseColor + cyanGlow + magentaGlow + orangeGlow;
      
      // Dynamic stars in the background
      vec2 starUv = vUv * 12.0;
      float starVal = hash(floor(starUv));
      float starGlow = 0.0;
      
      if (starVal > 0.985) {
        vec2 localUv = fract(starUv) - 0.5;
        // Twinkling effect
        float twinkle = sin(uTime * 2.0 + starVal * 10.0) * 0.5 + 0.5;
        starGlow = smoothstep(0.08, 0.0, length(localUv)) * twinkle * 0.8;
      }
      
      // Combine nebula background and stars
      vec3 finalColor = nebula + vec3(starGlow);
      
      // Darken edges slightly
      finalColor *= smoothstep(1.5, 0.4, dist);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

export default function CosmicBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  // Custom shader materials
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(NebulaShader.uniforms),
      vertexShader: NebulaShader.vertexShader,
      fragmentShader: NebulaShader.fragmentShader,
      side: THREE.BackSide,
      depthWrite: false,
    });
  }, []);

  // Initialize 800 random volumetric dust particles floating in space
  const particleData = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere around the camera
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 10 + Math.random() * 30; // Between 10 and 40 units away
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      speeds[i] = 0.2 + Math.random() * 0.8; // Drifting speed
      sizes[i] = 1.0 + Math.random() * 2.5; // Custom scaling
    }
    
    return { positions, speeds, sizes };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animate background nebula shader uniforms
    if (material) {
      material.uniforms.uTime.value = time;
      
      // Sync with global scroll if scroll event is dispatched
      const currentScroll = typeof window !== "undefined" ? window.scrollY / (window.innerHeight || 1) : 0;
      // Smooth interpolation for scroll value
      material.uniforms.uScroll.value = THREE.MathUtils.lerp(
        material.uniforms.uScroll.value,
        currentScroll,
        0.05
      );
    }

    // Animate volumetric dust particles (rising/floating anti-gravity drift)
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const count = positions.length / 3;
      
      for (let i = 0; i < count; i++) {
        // Move y-position upwards slowly
        positions[i * 3 + 1] += 0.005 * particleData.speeds[i];
        
        // Slightly wobble x and z
        positions[i * 3] += Math.sin(time * 0.2 + i) * 0.002;
        
        // Wrap-around if particles go too high
        if (positions[i * 3 + 1] > 25) {
          positions[i * 3 + 1] = -25;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.015;
    }
  });

  return (
    <group>
      {/* Skydome representing the infinite nebula */}
      <mesh ref={meshRef} scale={[45, 45, 45]}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Volumetric dust particles floating through the space */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00f3ff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
