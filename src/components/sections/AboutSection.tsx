"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, Layers, Cpu, Code2 } from "lucide-react";

export default function AboutSection() {
  const sentences = [
    "I am ELSOORYAN, a developer constructing autonomous systems and web applications.",
    "My focus is building deep Discord bot systems and high-fidelity interfaces.",
    "I design clean, high-performance backends and interactive frontend grids.",
    "Every module is engineered with structural integrity, scalability, and clean code."
  ];

  const floatingSnippets = [
    {
      code: `const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});
await client.login(process.env.TOKEN);`,
      top: "12%",
      left: "8%",
      delay: 0
    },
    {
      code: `interface BotConfig {
  shards: "auto";
  prefix: "!";
  features: string[];
}`,
      bottom: "15%",
      right: "5%",
      delay: 2
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const sentenceVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 select-none overflow-hidden">
      {/* SVG Connecting Glowing Lines Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B2EFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d946ef" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Animated glowing connecting laser lines */}
        <motion.path
          d="M 150 200 L 450 350 L 700 350 L 950 500"
          fill="none"
          stroke="url(#glowGrad)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0.2 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 850 150 L 600 300 L 300 480"
          fill="none"
          stroke="url(#glowGrad)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0.1 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating Code Snippets Parallax */}
      {floatingSnippets.map((snippet, idx) => (
        <motion.div
          key={idx}
          style={{
            position: "absolute",
            top: snippet.top,
            left: snippet.left,
            bottom: snippet.bottom,
            right: snippet.right,
          }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 0.25, y: 0, scale: 1 }}
          viewport={{ once: true }}
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: snippet.delay
            },
            opacity: { duration: 1 },
            scale: { duration: 1 }
          }}
          className="hidden lg:block glass-panel p-4 font-mono text-[9px] text-zinc-500 max-w-[240px] pointer-events-none select-none border border-white/5 shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
        >
          <pre>{snippet.code}</pre>
        </motion.div>
      ))}

      <div className="max-w-5xl w-full flex flex-col gap-14 z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <span className="text-xs font-orbitron tracking-[0.4em] text-brand-purple mb-2">
            SEC.01 // CORE ARCHITECT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-wide">
            THE SINGULARITY
          </h2>
          <div className="w-16 h-[2px] bg-brand-purple mt-4 shadow-[0_0_10px_#7B2EFF]" />
        </motion.div>

        {/* Layout split: Animated Sentences & Identity HUD Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Sentences Stagger Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {sentences.map((sentence, index) => (
              <motion.p
                key={index}
                variants={sentenceVariants}
                className="text-base sm:text-lg md:text-xl font-light text-zinc-300 leading-relaxed font-sans border-l-2 border-brand-purple/20 pl-4 hover:border-brand-violet transition-colors duration-300"
              >
                {sentence}
              </motion.p>
            ))}
          </motion.div>

          {/* Right Column: Identity Holographic HUD Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 15, stiffness: 80 }}
            className="lg:col-span-5 glass-panel p-6 flex flex-col gap-6 relative overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-50" />
            
            <div className="flex justify-between items-center font-orbitron text-[10px] text-zinc-500">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" />ACCESS_GRANTED</span>
              <span className="text-brand-violet">LEVEL_DATA</span>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {/* Profile Row: Name */}
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-orbitron text-xs text-zinc-500 tracking-wider">IDENTITY:</span>
                <span className="font-syne font-bold text-sm text-white">ELSOORYAN</span>
              </div>

              {/* Profile Row: Profession */}
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-orbitron text-xs text-zinc-500 tracking-wider">ROLE:</span>
                <span className="font-orbitron font-semibold text-xs text-brand-purple">DEVELOPER</span>
              </div>

              {/* Profile Row: Specialization */}
              <div className="flex flex-col gap-2 border-b border-white/5 pb-2">
                <span className="font-orbitron text-xs text-zinc-500 tracking-wider">MODULE SPECIALIZATION:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {["Discord Bots", "Modern Websites", "Automation", "Backend", "Frontend"].map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-zinc-950/80 border border-brand-purple/20 font-orbitron text-[9px] text-zinc-400 hover:text-white hover:border-brand-violet transition-colors duration-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* HUD Performance Progress Bars */}
              <div className="flex flex-col gap-3 mt-1">
                <span className="font-orbitron text-[10px] text-zinc-500 tracking-wider">CORE METRICS:</span>
                
                {/* Metric 1 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[9px] font-orbitron text-zinc-400">
                    <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> BOT AUTOMATION</span>
                    <span className="text-brand-purple">98%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "98%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                      className="h-full bg-brand-purple shadow-[0_0_8px_#7B2EFF]"
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[9px] font-orbitron text-zinc-400">
                    <span className="flex items-center gap-1"><Code2 className="w-3 h-3" /> WEB DEV</span>
                    <span className="text-brand-violet">92%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.6 }}
                      className="h-full bg-brand-violet shadow-[0_0_8px_#d946ef]"
                    />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[9px] font-orbitron text-zinc-400">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SECURITY & scaling</span>
                    <span className="text-brand-cyan">90%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "90%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                      className="h-full bg-brand-cyan shadow-[0_0_8px_#60a5fa]"
                    />
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
