"use client";

import { motion } from "framer-motion";
import { MoveDown, Terminal } from "lucide-react";

export default function HeroSection() {
  const title = "ELSOORYAN";
  const subtitle = "DEVELOPER";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 2,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 90,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden select-none">
      {/* Cinematic HUD elements */}
      <div className="absolute top-8 left-8 flex items-center gap-3 text-[10px] tracking-[0.3em] text-zinc-500 font-orbitron">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping shadow-[0_0_8px_#7B2EFF]" />
        <span>SYSTEM.CORE: INITIALIZED</span>
      </div>
      
      <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] text-zinc-500 font-orbitron flex items-center gap-1">
        <Terminal className="w-3.5 h-3.5 text-zinc-500" />
        <span>SEC_LEVEL.GOJO_99</span>
      </div>

      <div className="flex flex-col items-center justify-center text-center w-full px-6 z-10">
        {/* Main Title - ELSOORYAN */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-black font-syne text-white text-center whitespace-nowrap leading-none tracking-[0.03em] drop-shadow-[0_0_35px_rgba(123,46,255,0.4)] text-[clamp(2.5rem,8vw,9rem)]"
        >
          {title.split("").map((letter, idx) => (
            <motion.span
              key={idx}
              variants={letterVariants}
              className="inline-block hover:text-brand-violet hover:drop-shadow-[0_0_40px_#d946ef] transition-all duration-300 transform hover:-translate-y-2"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle - Discord Bot Developer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-6 flex flex-col items-center"
        >
          <p className="text-xs sm:text-sm md:text-base font-orbitron tracking-[0.6em] text-brand-purple uppercase animate-energy-pulse">
            {subtitle}
          </p>

          {/* Glowing purple dividing line */}
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-brand-purple to-transparent my-6 relative shadow-[0_0_12px_#7B2EFF]" />
          
          <p className="max-w-xl text-xs sm:text-sm text-zinc-400 font-sans tracking-wide leading-relaxed font-light px-4">
            Forging highly scalable bot systems, interactive interfaces, and automation nodes that reside in the digital shadows.
          </p>
        </motion.div>
      </div>

      {/* Floating down scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{
          delay: 2.0,
          duration: 0.9,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer font-orbitron text-[10px] tracking-[0.3em] text-zinc-500 hover:text-brand-purple transition-colors pointer-events-auto"
      >
        <span>ACCESS CORE MODULES</span>
        <MoveDown className="w-4 h-4 text-brand-purple mt-1 animate-bounce" />
      </motion.div>
    </section>
  );
}
