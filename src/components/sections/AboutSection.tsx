"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const panelVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: 10,
      scale: 0.95,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 80,
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 select-none">
      <div className="max-w-5xl w-full flex flex-col gap-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <span className="text-xs font-orbitron tracking-[0.4em] text-brand-purple mb-2">
            SEC.01 // ACCESSING PROFILE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-wide">
            THE SINGULARITY
          </h2>
          <div className="w-16 h-[2px] bg-brand-purple mt-4 shadow-[0_0_8px_#bd00ff]" />
        </motion.div>

        {/* Floating Holographic Panels */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full perspective-[1000px]"
        >
          {/* Panel 1: Origin */}
          <motion.div
            variants={panelVariants}
            className="glass-panel p-6 flex flex-col gap-4 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-40" />
            <div className="flex justify-between items-center font-orbitron text-xs text-zinc-500">
              <span>CORE_DATA</span>
              <span className="text-brand-cyan">01 / ORIGIN</span>
            </div>
            <h3 className="text-lg font-bold font-syne text-white tracking-wide mt-2">
              Bending Reality
            </h3>
            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              I am ELSOORYAN, a Creative Developer weaving computational force with raw art. I do not just write code; I construct experiences that defy gravity, break dimensions, and capture the ultimate battlefield entry of a digital deity.
            </p>
          </motion.div>

          {/* Panel 2: Philosophy */}
          <motion.div
            variants={panelVariants}
            className="glass-panel p-6 flex flex-col gap-4 relative overflow-hidden md:-translate-y-4"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-40" />
            <div className="flex justify-between items-center font-orbitron text-xs text-zinc-500">
              <span>MANIFESTO</span>
              <span className="text-brand-purple">02 / CODE</span>
            </div>
            <h3 className="text-lg font-bold font-syne text-white tracking-wide mt-2">
              Impossible Physics
            </h3>
            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              My canvas is the browser, powered by WebGL, custom GLSL shaders, and cinematic postprocessing. I believe animations shouldn't just run; they should react, breathe, distort, and bend the viewer's visual expectations.
            </p>
          </motion.div>

          {/* Panel 3: Stats HUD */}
          <motion.div
            variants={panelVariants}
            className="glass-panel p-6 flex flex-col gap-4 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-40" />
            <div className="flex justify-between items-center font-orbitron text-xs text-zinc-500">
              <span>HUD_METRICS</span>
              <span className="text-brand-cyan">03 / LEVEL</span>
            </div>
            <h3 className="text-lg font-bold font-syne text-white tracking-wide mt-2">
              Power Level
            </h3>
            <div className="flex flex-col gap-3 mt-1 font-orbitron text-xs">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>CREATIVE CODING</span>
                  <span className="text-brand-cyan">99%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "99%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-brand-cyan shadow-[0_0_10px_#00f3ff]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>SHADER DEVELOPMENT</span>
                  <span className="text-brand-purple">95%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.0 }}
                    className="h-full bg-brand-purple shadow-[0_0_10px_#bd00ff]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>SYSTEM ARCHITECTURE</span>
                  <span className="text-brand-cyan">90%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="h-full bg-brand-cyan shadow-[0_0_10px_#00f3ff]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
