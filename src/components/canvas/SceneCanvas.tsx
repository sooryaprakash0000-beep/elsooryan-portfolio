"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import CosmicBackground from "./CosmicBackground";
import BlackHole from "./BlackHole";
import FloatingDebris from "./FloatingDebris";
import EnergyAura from "./EnergyAura";
import ScrollController from "./ScrollController";

export default function SceneCanvas() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 bg-black overflow-hidden pointer-events-none">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        camera={{
          fov: 65,
          near: 0.1,
          far: 50,
          position: [0, 0, 10],
        }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#bd00ff" />
        
        {/* Coordinate scroll trigger animations with camera */}
        <ScrollController />
        
        <Suspense fallback={null}>
          {/* Custom cosmic background shader */}
          <CosmicBackground />
          
          {/* Gravitational bending entity */}
          <BlackHole />
          
          {/* Levitating broken stones, crystals & debris */}
          <FloatingDebris />
          
          {/* Sparkles, shockwaves, interactive lightning aura */}
          <EnergyAura />
        </Suspense>

        {/* Post-processing effect stack */}
        <Suspense fallback={null}>
          <EffectComposer>
            <DepthOfField
              focusDistance={0.08}
              focalLength={0.12}
              bokehScale={1.5}
            />
            <Bloom
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              intensity={2.0}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.4} darkness={1.2} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
