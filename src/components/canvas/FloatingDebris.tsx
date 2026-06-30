"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Single Rock component with hover and displacement
function FloatingRock({ position, scale, speedMultiplier, orbitRadius, phase }: {
  position: [number, number, number];
  scale: [number, number, number];
  speedMultiplier: number;
  orbitRadius: number;
  phase: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Custom displaced geometry to make it look like a broken rock
  const rockGeometry = useMemo(() => {
    const geo = new THREE.DodecahedronGeometry(1, 1);
    
    // Displace vertices to make it look organic and fractured
    const posAttr = geo.attributes.position;
    const vertex = new THREE.Vector3();
    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      // Apply noise deformation based on vertex coordinates
      const noise = (
        Math.sin(vertex.x * 3) * 0.15 +
        Math.cos(vertex.y * 3) * 0.15 +
        Math.sin(vertex.z * 3) * 0.15
      );
      vertex.addScaledVector(vertex.clone().normalize(), noise);
      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // 1. Slow orbit around the central Black Hole (Y axis)
      const orbitSpeed = 0.05 * speedMultiplier;
      const angle = time * orbitSpeed + phase;
      
      const targetX = Math.cos(angle) * orbitRadius;
      const targetZ = Math.sin(angle) * orbitRadius;
      
      // 2. Levitation breathing (Y axis)
      const floatAmplitude = hovered ? 0.8 : 0.3;
      const floatSpeed = 1.0 * speedMultiplier;
      const floatY = position[1] + Math.sin(time * floatSpeed + phase) * floatAmplitude;
      
      // Smoothly interpolate position
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, floatY, 0.05);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);
      
      // 3. Rotation
      const rotSpeed = hovered ? 0.8 : 0.2;
      meshRef.current.rotation.x += 0.005 * speedMultiplier * rotSpeed;
      meshRef.current.rotation.y += 0.01 * speedMultiplier * rotSpeed;
      
      // Hover scaling
      const targetScale = hovered ? 1.25 : 1.0;
      meshRef.current.scale.set(
        THREE.MathUtils.lerp(meshRef.current.scale.x, scale[0] * targetScale, 0.1),
        THREE.MathUtils.lerp(meshRef.current.scale.y, scale[1] * targetScale, 0.1),
        THREE.MathUtils.lerp(meshRef.current.scale.z, scale[2] * targetScale, 0.1)
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[
        Math.cos(phase) * orbitRadius,
        position[1],
        Math.sin(phase) * orbitRadius
      ]}
      geometry={rockGeometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Dark stone texture with glowing grid overlay */}
      <meshStandardMaterial
        color="#151520"
        roughness={0.85}
        metalness={0.1}
        bumpScale={0.1}
      />
      {/* Anime neon blue edges */}
      <mesh ref={useRef<THREE.Mesh>(null)} geometry={rockGeometry}>
        <meshBasicMaterial
          color={hovered ? "#00f3ff" : "#bd00ff"}
          wireframe
          transparent
          opacity={hovered ? 0.6 : 0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </mesh>
  );
}

// Glowing energy crystal component
function FloatingCrystal({ position, speedMultiplier, phase }: {
  position: [number, number, number];
  speedMultiplier: number;
  phase: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Levitating float
      meshRef.current.position.y = position[1] + Math.sin(time * speedMultiplier + phase) * 0.4;
      
      // Rotate crystal
      meshRef.current.rotation.y = time * 0.4 * speedMultiplier + phase;
      meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.15;
      
      // Pulse scale
      const pulse = 1.0 + Math.sin(time * 2.0 + phase) * 0.05;
      const targetScale = hovered ? 1.35 : 1.0;
      meshRef.current.scale.set(0.6 * targetScale * pulse, 1.3 * targetScale, 0.6 * targetScale * pulse);
    }
  });

  return (
    <group position={position}>
      {/* Glowing Energy Crystal Core */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[1, 0]} />
        {/* High-end crystalline glass refraction */}
        <meshPhysicalMaterial
          color={hovered ? "#00f3ff" : "#bd00ff"}
          emissive={hovered ? "#00f3ff" : "#3a0055"}
          emissiveIntensity={hovered ? 3.0 : 1.0}
          transmission={0.9}
          thickness={1.5}
          roughness={0.1}
          clearcoat={1.0}
          ior={1.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Light glow aura around the crystal */}
      <mesh scale={[0.9, 1.7, 0.9]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color={hovered ? "#00f3ff" : "#bd00ff"}
          transparent
          opacity={hovered ? 0.3 : 0.1}
          blending={THREE.AdditiveBlending}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Glass Shard component that drifts in space
function GlassShard({ position, rotSpeed, direction }: {
  position: [number, number, number];
  rotSpeed: [number, number, number];
  direction: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Drift slowly in space
      meshRef.current.position.x = position[0] + direction[0] * time * 0.5;
      meshRef.current.position.y = position[1] + direction[1] * time * 0.5 + Math.sin(time * 0.3) * 0.1;
      meshRef.current.position.z = position[2] + direction[2] * time * 0.5;
      
      // Rotate shard
      meshRef.current.rotation.x = time * rotSpeed[0];
      meshRef.current.rotation.y = time * rotSpeed[1];
      meshRef.current.rotation.z = time * rotSpeed[2];
      
      // Wrap position around space if drift gets too far
      const maxDist = 20;
      if (Math.abs(meshRef.current.position.x) > maxDist) meshRef.current.position.x = -direction[0] * maxDist;
      if (Math.abs(meshRef.current.position.y) > maxDist) meshRef.current.position.y = -direction[1] * maxDist;
      if (Math.abs(meshRef.current.position.z) > maxDist) meshRef.current.position.z = -direction[2] * maxDist;
    }
  });

  return (
    <mesh ref={meshRef} scale={[0.15, 0.4, 0.03]}>
      <coneGeometry args={[1, 2, 3]} /> {/* Triangular shard */}
      <meshPhysicalMaterial
        color="#00f3ff"
        transmission={0.95}
        roughness={0.05}
        ior={1.5}
        thickness={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// A segment of chain links falling in anti-gravity
function BrokenChain({ position, rotation, count }: {
  position: [number, number, number];
  rotation: [number, number, number];
  count: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Subtle float
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.2;
      groupRef.current.rotation.y = rotation[1] + time * 0.05;
      groupRef.current.rotation.z = rotation[2] + Math.cos(time * 0.4) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {Array.from({ length: count }).map((_, idx) => {
        // Linked segments offset by Y/Z
        const offset = idx * 0.35;
        const linkRot: [number, number, number] = idx % 2 === 0 ? [0, 0, 0] : [0, Math.PI / 2, 0];
        
        return (
          <mesh key={idx} position={[0, -offset, 0]} rotation={linkRot}>
            <torusGeometry args={[0.18, 0.05, 8, 16]} />
            <meshStandardMaterial
              color="#2a2a35"
              roughness={0.7}
              metalness={0.9}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function FloatingDebris() {
  // Generate random stats for glass shards
  const shards = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 30
      ] as [number, number, number],
      rotSpeed: [
        Math.random() * 0.4,
        Math.random() * 0.4,
        Math.random() * 0.4
      ] as [number, number, number],
      direction: [
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1 + 0.05, // Drifts slightly upwards
        (Math.random() - 0.5) * 0.1
      ] as [number, number, number],
    }));
  }, []);

  return (
    <group>
      {/* Large Floating Rocks / Platforms orbiting the Black Hole */}
      {/* Rock 1: Bottom left, slow */}
      <FloatingRock
        position={[-6, -4, -3]}
        scale={[1.8, 1.4, 1.8]}
        speedMultiplier={0.7}
        orbitRadius={9}
        phase={0.2}
      />
      {/* Rock 2: Mid-right, slightly higher */}
      <FloatingRock
        position={[7, 1, -2]}
        scale={[1.5, 1.2, 1.5]}
        speedMultiplier={0.9}
        orbitRadius={10}
        phase={2.5}
      />
      {/* Rock 3: High, far back */}
      <FloatingRock
        position={[-2, 6, -8]}
        scale={[2.2, 1.6, 2.2]}
        speedMultiplier={0.5}
        orbitRadius={14}
        phase={4.1}
      />
      {/* Rock 4: Front, smaller */}
      <FloatingRock
        position={[2, -2, 5]}
        scale={[1.0, 0.8, 1.0]}
        speedMultiplier={1.2}
        orbitRadius={8}
        phase={1.2}
      />

      {/* Floating Crystals */}
      <FloatingCrystal position={[-4, 2, 3]} speedMultiplier={0.8} phase={0.5} />
      <FloatingCrystal position={[5, -3, 2]} speedMultiplier={1.1} phase={2.1} />
      <FloatingCrystal position={[-6, -2, -5]} speedMultiplier={0.7} phase={3.7} />
      <FloatingCrystal position={[6, 4, -4]} speedMultiplier={1.0} phase={5.3} />

      {/* Glass Shards Drifting */}
      {shards.map((shard, idx) => (
        <GlassShard
          key={idx}
          position={shard.position}
          rotSpeed={shard.rotSpeed}
          direction={shard.direction}
        />
      ))}

      {/* Broken Chains */}
      <BrokenChain position={[-5, 4, -1]} rotation={[0.2, 0.5, 0.8]} count={4} />
      <BrokenChain position={[6, -2, 4]} rotation={[-0.4, 0.1, -0.6]} count={5} />
      <BrokenChain position={[3, 5, -6]} rotation={[0.8, -0.3, 0.3]} count={3} />
      
      {/* Upside Down Floating Building (Obelisk/Ruins) */}
      <group position={[0, -9, -15]} rotation={[Math.PI - 0.2, 0, 0.3]}>
        {/* Base pillar */}
        <mesh>
          <cylinderGeometry args={[0.8, 1.4, 6, 6]} />
          <meshStandardMaterial color="#1a1a24" roughness={0.9} />
        </mesh>
        {/* Glowing cracked ring surrounding it */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.5, 0]}>
          <torusGeometry args={[2.0, 0.15, 8, 16]} />
          <meshBasicMaterial color="#00f3ff" wireframe />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.5, 0.5]} position={[0, -1.0, 0]} scale={[1.1, 1.1, 1.1]}>
          <torusGeometry args={[2.3, 0.1, 8, 16]} />
          <meshBasicMaterial color="#bd00ff" wireframe />
        </mesh>
      </group>
    </group>
  );
}
