"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Terminal, X, Code, Play } from "lucide-react";
import React, { useRef, useState } from "react";

const projects = [
  {
    id: "PRJ.001",
    title: "NEXUS_DISCORD_BOT",
    description: "An advanced modular Discord bot core utilizing discord.js v14, offering full shard synchronization, caching metrics, and custom dashboard API endpoints.",
    tags: ["Discord.js", "Node.js", "Redis", "TypeScript"],
    color: "from-brand-purple via-brand-violet to-transparent",
    glow: "rgba(123, 46, 255, 0.45)",
    borderColor: "hover:border-brand-purple/40",
    previewText: "ACTIVE CORE DISPATCHER OK",
    details: "This modular Discord bot is designed for high-performance servers, handling millions of requests with low-latency shard manager clusters. It connects with Redis for distributed caching, PostgreSQL for persistent states, and provides clean REST API gateways for frontend stats synchronization."
  },
  {
    id: "PRJ.002",
    title: "AURA_VISUAL_CORE",
    description: "A highly interactive WebGL space simulation that renders complex GPU fluid simulation and volumetric dust fields reacting directly to mouse/touch points.",
    tags: ["Next.js", "Three.js", "GLSL Shaders", "GSAP"],
    color: "from-brand-cyan via-brand-purple to-transparent",
    glow: "rgba(96, 165, 250, 0.4)",
    borderColor: "hover:border-brand-cyan/40",
    previewText: "RENDER MATRIX COMPILED",
    details: "An interactive, GPU-accelerated volumetric simulator that morphs layouts dynamically using custom vertex distortion shaders. The particle system runs at 60fps utilizing raw WebGL shaders and instanced geometry coordinates."
  },
  {
    id: "PRJ.003",
    title: "SINGULARITY_CONTROL",
    description: "A futuristic admin console for managing microservices, WebSocket channels, and bot performance graphs with real-time updating indicators.",
    tags: ["React", "Express", "WebSockets", "MongoDB"],
    color: "from-brand-violet via-brand-cyan to-transparent",
    glow: "rgba(217, 70, 239, 0.45)",
    borderColor: "hover:border-brand-violet/40",
    previewText: "WS_LINK STREAM: ESTABLISHED",
    details: "Singularity Control provides server-side metrics visualizers, shards console logs streaming, and user permission access keys monitoring in a high-fidelity glassmorphic cockpit layout."
  },
  {
    id: "PRJ.004",
    title: "CHRONOS_PIPELINE",
    description: "A low-latency message broker and task runner designed for automations, webhooks handling, and cron integrations across multiple channels.",
    tags: ["TypeScript", "Node.js", "REST APIs", "Git"],
    color: "from-brand-purple via-brand-cyan to-transparent",
    glow: "rgba(123, 46, 255, 0.4)",
    borderColor: "hover:border-brand-purple/40",
    previewText: "PIPELINE THREADING ACTIVE",
    details: "Chronos executes background events and syncs webhooks triggers to Discord integrations in real-time, executing tasks under 5ms using queue threading architectures."
  },
];

function ProjectCard({ project, onClick }: { project: typeof projects[0]; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    
    // Relative coordinates to card center
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // 3D tilt calculation
    const rotateX = -(y / (box.height / 2)) * 10;
    const rotateY = (x / (box.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 18px 45px 0 ${project.glow}`;

    // Sheen reflection calculation
    if (sheenRef.current) {
      const rx = e.clientX - box.left;
      const ry = e.clientY - box.top;
      sheenRef.current.style.background = `radial-gradient(circle 120px at ${rx}px ${ry}px, rgba(255,255,255,0.06), transparent 80%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.6)`;
    if (sheenRef.current) {
      sheenRef.current.style.background = "transparent";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`glass-panel p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-350 border border-white/5 cursor-pointer ${project.borderColor}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
      }}
    >
      {/* Dynamic Sheen reflection overlay */}
      <div ref={sheenRef} className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300" />

      {/* Holographic Header */}
      <div className="flex justify-between items-center font-orbitron text-[10px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-zinc-500" />
          <span>{project.id}</span>
        </div>
        <span className="text-zinc-500">NODE.READY</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold font-syne text-white tracking-wide mt-2" style={{ transform: "translateZ(30px)" }}>
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-zinc-400 font-sans leading-relaxed mt-1" style={{ transform: "translateZ(15px)" }}>
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3" style={{ transform: "translateZ(20px)" }}>
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-0.5 text-[9px] font-orbitron rounded bg-zinc-950/85 border border-white/5 text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Preview box / mesh design */}
      <div className="relative w-full h-32 mt-4 rounded-lg bg-zinc-950/90 overflow-hidden border border-white/5 group">
        <div className="absolute inset-0 energy-grid opacity-[0.15]" />
        
        {/* Glowing floating light waves */}
        <div className="absolute inset-0 bg-radial-gradient from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated Scanner laser line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple to-transparent shadow-[0_0_8px_#7B2EFF] animate-[scanner_2.5s_infinite_linear]" />
        
        {/* Swirling energy background preview */}
        <div className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-t ${project.color} opacity-[0.04] group-hover:opacity-[0.14] transition-opacity duration-500`} />
        
        <div className="absolute inset-0 flex items-center justify-center font-orbitron text-[9px] text-zinc-600 tracking-[0.2em] group-hover:text-brand-purple transition-colors">
          {project.previewText}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mt-4 font-orbitron text-[10px] text-zinc-500">
        <span className="hover:text-brand-purple transition-colors">CLICK TO EXPAND DETAILS</span>
      </div>

      <style jsx global>{`
        @keyframes scanner {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  );
}

export default function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<typeof projects[0] | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const projectVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 18,
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
            SEC.03 // ARTIFACT ARCHIVE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-wide">
            PROJECT CORE
          </h2>
          <div className="w-16 h-[2px] bg-brand-purple mt-4 shadow-[0_0_10px_#7B2EFF]" />
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full perspective-[1200px]"
        >
          {projects.map((project, idx) => (
            <motion.div key={idx} variants={projectVariants}>
              <ProjectCard project={project} onClick={() => setExpandedProject(project)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Expandable Project Details Modal Overlay */}
      <AnimatePresence>
        {expandedProject && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
            />

            {/* Modal Glass Panel Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="glass-panel p-8 max-w-2xl w-full relative z-10 overflow-hidden border border-brand-purple/35 flex flex-col gap-6 shadow-[0_15px_50px_rgba(123,46,255,0.25)] pointer-events-auto"
            >
              {/* Top border glowing light line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-purple to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setExpandedProject(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* HUD tag */}
              <span className="font-orbitron text-[9px] text-brand-purple tracking-[0.3em] uppercase">
                {expandedProject.id} // DEEP_ANALYSIS
              </span>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold font-syne text-white tracking-wide">
                {expandedProject.title}
              </h3>

              {/* Long details */}
              <p className="text-zinc-300 text-sm font-sans leading-relaxed">
                {expandedProject.details}
              </p>

              {/* Specs */}
              <div className="flex flex-col gap-2 mt-2">
                <span className="font-orbitron text-[10px] text-zinc-500 tracking-wider">COMPILATION SPECS:</span>
                <div className="flex flex-wrap gap-2">
                  {expandedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded bg-zinc-950 border border-brand-purple/20 text-xs font-orbitron text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-purple/30 bg-zinc-950 text-brand-violet hover:text-white hover:border-brand-violet hover:shadow-[0_0_15px_rgba(123,46,255,0.3)] transition-all duration-300 font-orbitron text-xs font-bold tracking-[0.2em] cursor-pointer">
                  <Code className="w-4 h-4" />
                  <span>SOURCE CODE</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-cyan/30 bg-zinc-950 text-brand-cyan hover:text-white hover:border-brand-cyan hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] transition-all duration-300 font-orbitron text-xs font-bold tracking-[0.2em] cursor-pointer">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>EXECUTE NODE</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
