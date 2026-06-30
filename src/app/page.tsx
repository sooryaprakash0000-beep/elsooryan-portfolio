"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import IntroSequence from "@/components/IntroSequence";
import Navigation from "@/components/Navigation";
import AudioController from "@/components/AudioController";

// Dynamically import the WebGL Canvas with SSR disabled to prevent Server-Side Rendering issues with WebGL/Three.js
const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

export default function Home() {
  const [introActive, setIntroActive] = useState(true);

  return (
    <main className="relative min-h-screen bg-[#050505] w-full overflow-x-hidden">
      {/* Cinematic Audio Controller (active globally) */}
      <AudioController />

      <AnimatePresence mode="wait">
        {introActive ? (
          <motion.div key="intro" exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 1.2, ease: "easeInOut" }}>
            <IntroSequence onFinish={() => setIntroActive(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full"
          >
            {/* 3D WebGL Background Canvas Layer - Mounts only after intro completes to preserve video FPS */}
            <SceneCanvas />

            {/* DOM Content Overlay */}
            <div className="relative z-10 w-full flex flex-col items-center">
              <div id="home">
                <HeroSection />
              </div>
              <div id="about">
                <AboutSection />
              </div>
              <div id="skills">
                <SkillsSection />
              </div>
              <div id="projects">
                <ProjectsSection />
              </div>
              <div id="contact">
                <ContactSection />
              </div>

              {/* Minimal Footer */}
              <footer className="w-full py-8 text-center text-[10px] font-orbitron tracking-[0.2em] text-zinc-600 border-t border-white/5 bg-black/60 backdrop-blur-md select-none mt-24">
                <p className="hover:text-brand-purple transition-colors duration-300">© 2026 ELSOORYAN</p>
                <p className="text-zinc-700 mt-1">CRAFTED WITH CREATIVITY AND CODE</p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating navigation overlay */}
      <Navigation visible={!introActive} />
    </main>
  );
}
