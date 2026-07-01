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
    <section className="relative flex min-h-screen w-full max-w-full flex-col items-center justify-center overflow-hidden px-2 py-8 select-none sm:px-4">
      {/* Cinematic HUD elements */}
      <div className="absolute left-3 top-4 flex items-center gap-2 text-[8px] tracking-[0.2em] text-zinc-500 font-orbitron sm:left-8 sm:top-8 sm:gap-3 sm:text-[10px] sm:tracking-[0.3em]">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-purple shadow-[0_0_8px_#7B2EFF] animate-ping" />
        <span>SYSTEM.CORE: INITIALIZED</span>
      </div>

      <div className="absolute right-3 top-4 flex items-center gap-1 text-[8px] tracking-[0.2em] text-zinc-500 font-orbitron sm:right-8 sm:top-8 sm:text-[10px] sm:tracking-[0.3em]">
        <Terminal className="h-3.5 w-3.5 text-zinc-500" />
        <span>SEC_LEVEL.GOJO_99</span>
      </div>

      <div className="z-10 flex w-full max-w-[100vw] flex-col items-center justify-center overflow-x-hidden px-1 text-center sm:px-6">
        {/* Main Title - ELSOORYAN */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[95vw] overflow-hidden whitespace-nowrap text-center font-syne font-black leading-none tracking-[0.002em] text-white drop-shadow-[0_0_35px_rgba(123,46,255,0.4)] text-[clamp(1.4rem,8.5vw,9rem)] sm:tracking-[0.03em] sm:text-[clamp(2.5rem,8vw,9rem)]"
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
          className="mt-4 flex w-full max-w-[100vw] flex-col items-center gap-2 px-1 sm:mt-6 sm:px-4"
        >
          <p className="text-[10px] font-orbitron uppercase tracking-[0.35em] text-brand-purple animate-energy-pulse sm:text-xs sm:tracking-[0.6em] md:text-base">
            {subtitle}
          </p>

          {/* Glowing purple dividing line */}
          <div className="relative my-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-purple to-transparent shadow-[0_0_12px_#7B2EFF] sm:my-6 sm:w-32" />

          <p className="max-w-[min(90vw,36rem)] px-1 text-[10px] font-light leading-relaxed tracking-wide text-zinc-400 sm:px-4 sm:text-sm">
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
        className="pointer-events-auto absolute bottom-6 flex flex-col items-center gap-2 px-4 text-center font-orbitron text-[9px] tracking-[0.2em] text-zinc-500 transition-colors hover:text-brand-purple sm:bottom-10 sm:text-[10px] sm:tracking-[0.3em]"
      >
        <span>ACCESS CORE MODULES</span>
        <MoveDown className="w-4 h-4 text-brand-purple mt-1 animate-bounce" />
      </motion.div>
    </section>
  );
}
