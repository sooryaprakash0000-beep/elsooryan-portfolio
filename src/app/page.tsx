"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

// Dynamically import the WebGL Canvas with SSR disabled to prevent Server-Side Rendering issues with WebGL/Three.js
const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black w-full overflow-x-hidden">
      {/* 3D WebGL Background Canvas Layer */}
      <SceneCanvas />

      {/* DOM Content Overlay */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
}
