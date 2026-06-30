"use client";

import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";
import React, { useRef } from "react";

const projects = [
  {
    id: "PRJ.001",
    title: "AURA_ENGINE",
    description: "An advanced WebGL GPU fluid dynamics simulation that renders interactive energy fields, reacting in real-time to pointer movements and canvas physics.",
    tags: ["Three.js", "GLSL Shaders", "WebGL", "TypeScript"],
    color: "from-brand-cyan via-brand-blue to-transparent",
    glow: "rgba(0, 243, 255, 0.4)",
    borderColor: "hover:border-brand-cyan/40",
  },
  {
    id: "PRJ.002",
    title: "KINETIC_PORTAL",
    description: "A reality-bending, dimensional scrolling framework utilizing GSAP ScrollTrigger, Lenis, and custom vertex distortion shaders to morph layouts on scroll.",
    tags: ["Next.js", "GSAP", "Three.js", "Postprocessing"],
    color: "from-brand-purple via-brand-blue to-transparent",
    glow: "rgba(189, 0, 255, 0.4)",
    borderColor: "hover:border-brand-purple/40",
  },
  {
    id: "PRJ.003",
    title: "SINGULARITY_UI",
    description: "A premium, futuristic component library featuring glassmorphic designs, CSS custom properties, and spring physics micro-animations for high-fidelity overlays.",
    tags: ["React 19", "Tailwind CSS", "Framer Motion"],
    color: "from-brand-cyan via-brand-purple to-transparent",
    glow: "rgba(0, 243, 255, 0.3)",
    borderColor: "hover:border-brand-cyan/40",
  },
  {
    id: "PRJ.004",
    title: "CHRONOS_PIPELINE",
    description: "A low-latency, real-time WebSocket communication pipeline designed for syncing multiplayer dimensional coordinates and coordinate state matrices.",
    tags: ["Node.js", "WebSockets", "Redis", "Docker"],
    color: "from-brand-purple via-brand-cyan to-transparent",
    glow: "rgba(189, 0, 255, 0.3)",
    borderColor: "hover:border-brand-purple/40",
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    
    // Coordinates relative to card center
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Tilt limit (approx 10 degrees max)
    const rotateX = -(y / (box.height / 2)) * 10;
    const rotateY = (x / (box.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 15px 45px 0 ${project.glow}`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.5)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 border border-white/5 cursor-pointer ${project.borderColor}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
      }}
    >
      {/* Holographic Header */}
      <div className="flex justify-between items-center font-orbitron text-xs text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-zinc-500" />
          <span>{project.id}</span>
        </div>
        <span className="text-zinc-500">SYSTEM.ACTIVE</span>
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
            className="px-2.5 py-0.5 text-[10px] font-orbitron rounded bg-zinc-950/80 border border-white/5 text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Holographic Scanner Mesh / Energy Grid */}
      <div className="relative w-full h-32 mt-4 rounded-lg bg-zinc-950/90 overflow-hidden border border-white/5 group">
        <div className="absolute inset-0 energy-grid opacity-[0.15]" />
        
        {/* Animated Scanner laser line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent shadow-[0_0_8px_#00f3ff] animate-[scanner_2.5s_infinite_linear]" />
        
        {/* Swirling energy aura mockup */}
        <div className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-t ${project.color} opacity-[0.04] group-hover:opacity-[0.12] transition-opacity duration-500`} />
        
        <div className="absolute inset-0 flex items-center justify-center font-orbitron text-[10px] text-zinc-600 tracking-[0.2em] group-hover:text-zinc-400 transition-colors">
          RENDER_MATRIX_OK
        </div>
      </div>

      {/* Link Action buttons */}
      <div className="flex gap-4 mt-4 font-orbitron text-xs text-zinc-400">
        <button className="flex items-center gap-1.5 hover:text-brand-cyan transition-colors">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>SOURCE</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-brand-cyan transition-colors">
          <ExternalLink className="w-4 h-4" />
          <span>EXECUTE</span>
        </button>
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
            ANTI-GRAVITY PROJECTS
          </h2>
          <div className="w-16 h-[2px] bg-brand-purple mt-4 shadow-[0_0_8px_#bd00ff]" />
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
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
