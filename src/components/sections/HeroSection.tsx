"use client";

import { motion } from "framer-motion";
import { MoveDown } from "lucide-react";

export default function HeroSection() {
  const title = "ELSOORYAN";
  const subtitle = "Creative Developer";

  // Stagger variants for letter-by-letter entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 2.5,
      filter: "blur(15px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden select-none">
      {/* Cinematic HUD overlay elements */}
      <div className="absolute top-8 left-8 flex items-center gap-3 text-xs tracking-[0.3em] text-zinc-500 font-orbitron">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
        <span>SYS.STATUS: ONLINE</span>
      </div>
      
      <div className="absolute top-8 right-8 text-xs tracking-[0.3em] text-zinc-500 font-orbitron">
        <span>DIMENSION: EL-09</span>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Main Title - ELSOORYAN */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-syne tracking-wider text-white select-text relative cursor-default filter drop-shadow-[0_0_30px_rgba(189,0,255,0.3)]"
        >
          {title.split("").map((letter, idx) => (
            <motion.span
              key={idx}
              variants={letterVariants}
              className="inline-block hover:text-brand-cyan hover:drop-shadow-[0_0_35px_#00f3ff] transition-all duration-300"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle - Creative Developer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-6 flex flex-col items-center"
        >
          <p className="text-sm sm:text-base md:text-lg font-orbitron tracking-[0.6em] text-brand-cyan uppercase animate-energy-pulse">
            {subtitle}
          </p>

          {/* Glowing dividing line */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent my-6 relative shadow-[0_0_10px_#00f3ff]" />
          
          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-sans tracking-wide leading-relaxed">
            Architecting reality bending interactive WebGL worlds, bending physics, and transcending dimensions.
          </p>
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{
          delay: 2.5,
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer font-orbitron text-[10px] tracking-[0.3em] text-zinc-500 hover:text-brand-cyan transition-colors"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span>ENTER THE BATTLEFIELD</span>
        <MoveDown className="w-4 h-4 text-brand-cyan mt-1" />
      </motion.div>
    </section>
  );
}
