"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader for the rising energy flames
const FlameShader = {
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      // Slightly bulge the cylinder in the middle
      vec3 pos = position;
      float bulge = sin(uv.y * 3.14159) * 0.15;
      pos.xz += pos.xz * bulge;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;

    // Simplex noise approximation
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
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
      // Flow flame upwards
      vec2 flowUv = vec2(vUv.x * 3.0, vUv.y * 2.0 - uTime * 2.5);
      
      float n1 = noise(flowUv);
      float n2 = noise(flowUv * 2.0 + vec2(0.0, uTime * 1.0));
      float fireNoise = n1 * 0.6 + n2 * 0.4;

      // Bottom to top fade
      float fade = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.4, vUv.y);
      
      // Calculate flame shape
      float flamePattern = fireNoise * fade;

      // Deep cyan/blue flame with violet borders
      vec3 flameColor = mix(
        vec3(0.0, 0.1, 0.8), // Deep Blue base
        vec3(0.0, 0.9, 1.0), // Neon Cyan core
        flamePattern
      );
      
      // Violet outer glow
      vec3 violetColor = vec3(0.6, 0.0, 1.0) * (1.0 - flamePattern) * 0.4;
      
      vec3 finalColor = flameColor + violetColor;
      float alpha = smoothstep(0.12, 0.7, flamePattern * fade);

      gl_FragColor = vec4(finalColor * 2.5, alpha * 0.8);
    }
  `,
};

export default function EnergyAura() {
  const { viewport } = useThree();
  const flameRef = useRef<THREE.Mesh>(null);
  const sparkPointsRef = useRef<THREE.Points>(null);
  const shockwavesRef = useRef<THREE.Group>(null);
  const lightningRef = useRef<THREE.LineSegments>(null);

  // Shockwave tracking state
  const [activeWaves, setActiveWaves] = useState<Array<{ id: number; scale: number; opacity: number; position: [number, number, number] }>>([]);

  // Compile flame material
  const flameMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(FlameShader.uniforms),
      vertexShader: FlameShader.vertexShader,
      fragmentShader: FlameShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
  }, []);

  // Set up 150 orbiting light fragments/sparks
  const sparkData = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    const angles = new Float32Array(count);
    const speeds = new Float32Array(count);
    const heights = new Float32Array(count);
    const radii = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      angles[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.5 + Math.random() * 1.5;
      heights[i] = (Math.random() - 0.5) * 6; // Spread on Y axis
      radii[i] = 2.0 + Math.random() * 5.0; // Radius from center

      positions[i * 3] = Math.cos(angles[i]) * radii[i];
      positions[i * 3 + 1] = heights[i];
      positions[i * 3 + 2] = Math.sin(angles[i]) * radii[i];
    }

    return { positions, angles, speeds, heights, radii };
  }, []);

  // Snapping lightning procedural geometry
  const lightningSegments = useMemo(() => {
    // Generate segment coordinates for 3 lightning arcs
    const count = 3;
    const segments = count * 15; // 15 points per arc
    const positions = new Float32Array(segments * 3 * 2); // 2 points per segment
    return positions;
  }, []);

  // Listen to mouse click events on the window to spawn shockwaves
  useEffect(() => {
    let waveCounter = 0;
    const handleMouseClick = (e: MouseEvent) => {
      // Map screen click to approximate 3D coordinates
      const clickX = ((e.clientX / window.innerWidth) * 2 - 1) * (viewport.width / 2);
      const clickY = (-(e.clientY / window.innerHeight) * 2 + 1) * (viewport.height / 2);
      
      const newWave = {
        id: ++waveCounter,
        scale: 0.1,
        opacity: 0.9,
        position: [clickX, clickY, 0] as [number, number, number],
      };
      
      setActiveWaves((prev) => [...prev.slice(-4), newWave]); // Cap active waves at 5 to save memory
    };

    window.addEventListener("click", handleMouseClick);
    return () => window.removeEventListener("click", handleMouseClick);
  }, [viewport]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouse = state.pointer;

    // 1. Animate rising energy flames
    if (flameMaterial) {
      flameMaterial.uniforms.uTime.value = time;
    }
    if (flameRef.current) {
      // Gently tilt flame cylinder towards mouse
      flameRef.current.rotation.y = time * 0.2;
      flameRef.current.rotation.x = THREE.MathUtils.lerp(flameRef.current.rotation.x, mouse.y * 0.3, 0.05);
      flameRef.current.rotation.z = THREE.MathUtils.lerp(flameRef.current.rotation.z, -mouse.x * 0.3, 0.05);
    }

    // 2. Orbit sparks in spirals with magnetic mouse reaction
    if (sparkPointsRef.current) {
      const positions = sparkPointsRef.current.geometry.attributes.position.array as Float32Array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        // Orbit math
        sparkData.angles[i] += 0.01 * sparkData.speeds[i];
        
        // Add a slight pull toward the cursor in screen space
        const targetRadius = sparkData.radii[i] + (hoveredTargetRadius(positions[i * 3], positions[i * 3 + 1], mouse, viewport));
        
        positions[i * 3] = Math.cos(sparkData.angles[i]) * targetRadius;
        positions[i * 3 + 1] = sparkData.heights[i] + Math.sin(time + i) * 0.15; // Levitating breathing
        positions[i * 3 + 2] = Math.sin(sparkData.angles[i]) * targetRadius;
      }
      sparkPointsRef.current.geometry.attributes.position.needsUpdate = true;
      sparkPointsRef.current.rotation.y = time * 0.1;
    }

    // Helper helper to calculate mouse pull/repel
    function hoveredTargetRadius(x: number, y: number, mouse: THREE.Vector2, vp: any) {
      const mX = mouse.x * (vp.width / 2);
      const mY = mouse.y * (vp.height / 2);
      const dx = x - mX;
      const dy = y - mY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.0) {
        return (3.0 - dist) * 0.8; // Attract/repel slightly
      }
      return 0;
    }

    // 3. Animate procedural snapping lightning arcs
    if (lightningRef.current) {
      const positions = lightningRef.current.geometry.attributes.position.array as Float32Array;
      const count = 3; // 3 lightning arcs
      
      // Only snap lightning every few frames
      if (Math.random() > 0.6) {
        let pointer = 0;
        for (let i = 0; i < count; i++) {
          // Arc targets (e.g. from outer space towards the Black Hole center)
          const angle = (i * Math.PI * 2) / count + time * 0.2;
          const startRadius = 6.0;
          const endRadius = 1.3; // Singularity event horizon
          
          let curX = Math.cos(angle) * startRadius;
          let curY = (Math.random() - 0.5) * 4.0;
          let curZ = Math.sin(angle) * startRadius;

          const steps = 14;
          for (let step = 0; step < steps; step++) {
            const t = (step + 1) / steps;
            const targetX = Math.cos(angle) * THREE.MathUtils.lerp(startRadius, endRadius, t);
            const targetY = THREE.MathUtils.lerp(curY, 0, t);
            const targetZ = Math.sin(angle) * THREE.MathUtils.lerp(startRadius, endRadius, t);
            
            // Add crackle offset
            const offset = (1.0 - t) * 0.45; // More stable near center
            const nextX = targetX + (Math.random() - 0.5) * offset;
            const nextY = targetY + (Math.random() - 0.5) * offset;
            const nextZ = targetZ + (Math.random() - 0.5) * offset;

            // Segment start
            positions[pointer++] = curX;
            positions[pointer++] = curY;
            positions[pointer++] = curZ;
            // Segment end
            positions[pointer++] = nextX;
            positions[pointer++] = nextY;
            positions[pointer++] = nextZ;

            curX = nextX;
            curY = nextY;
            curZ = nextZ;
          }
        }
        lightningRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }

    // 4. Update shockwaves
    if (activeWaves.length > 0) {
      setActiveWaves((prev) =>
        prev
          .map((wave) => ({
            ...wave,
            scale: wave.scale + 0.15,
            opacity: wave.opacity - 0.02,
          }))
          .filter((wave) => wave.opacity > 0)
      );
    }
  });

  return (
    <group>
      {/* 1. Rising Energy Flames */}
      <mesh ref={flameRef} position={[0, 0.5, 0]} scale={[1.8, 5, 1.8]}>
        <cylinderGeometry args={[1, 1, 2, 16, 8, true]} />
        <primitive object={flameMaterial} attach="material" />
      </mesh>

      {/* 2. Snapping Purple/White Lightning */}
      <lineSegments ref={lightningRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lightningSegments, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#bd00ff"
          linewidth={2}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 3. Orbiting Sparks */}
      <points ref={sparkPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 4. Click Shockwaves */}
      <group ref={shockwavesRef}>
        {activeWaves.map((wave) => (
          <mesh
            key={wave.id}
            position={wave.position}
            scale={[wave.scale * 3, wave.scale * 3, 1]}
          >
            <ringGeometry args={[0.9, 1.0, 32]} />
            <meshBasicMaterial
              color="#00f3ff"
              transparent
              opacity={wave.opacity}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
