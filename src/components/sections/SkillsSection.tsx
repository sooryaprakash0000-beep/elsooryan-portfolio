"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu, Database } from "lucide-react";
import React, { useRef } from "react";

const skillCategories = [
  {
    title: "Interface Engineering",
    icon: Layers,
    color: "text-brand-cyan",
    borderColor: "hover:border-brand-cyan/40",
    shadowColor: "rgba(96, 165, 250, 0.25)",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Logic & Automation",
    icon: Cpu,
    color: "text-brand-purple",
    borderColor: "hover:border-brand-purple/40",
    shadowColor: "rgba(123, 46, 255, 0.25)",
    skills: ["Node.js", "Express", "Discord.js", "REST APIs"],
  },
  {
    title: "Storage & Devops",
    icon: Database,
    color: "text-brand-cyan",
    borderColor: "hover:border-brand-cyan/40",
    shadowColor: "rgba(96, 165, 250, 0.25)",
    skills: ["MongoDB", "Firebase", "Git"],
  },
  {
    title: "Creative Physics",
    icon: Sparkles,
    color: "text-brand-purple",
    borderColor: "hover:border-brand-purple/40",
    shadowColor: "rgba(123, 46, 255, 0.25)",
    skills: ["UI/UX", "Animations", "Responsive Design"],
  },
];

function SkillCard({ cat }: { cat: typeof skillCategories[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = cat.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    
    // Relative coordinates
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // 3D rotations based on cursor
    const rotateX = -(y / (box.height / 2)) * 8;
    const rotateY = (x / (box.width / 2)) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 15px 40px 0 ${cat.shadowColor}`;
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
      className={`glass-panel p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-350 border border-white/5 ${cat.borderColor} cursor-default`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
      }}
    >
      <div className="flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
        <div className={`p-2 rounded-lg bg-zinc-950/80 border border-white/5 ${cat.color} shadow-[0_0_15px_rgba(255,255,255,0.02)]`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-bold font-syne text-lg text-white tracking-wide">
          {cat.title}
        </h3>
      </div>

      <div className="w-full h-[1px] bg-white/5 my-2" style={{ transform: "translateZ(10px)" }} />

      <div className="flex flex-wrap gap-2.5 mt-1" style={{ transform: "translateZ(20px)" }}>
        {cat.skills.map((skill, sIdx) => (
          <span
            key={sIdx}
            className="px-3.5 py-1 text-xs font-orbitron rounded-full bg-zinc-950/85 border border-white/5 text-zinc-400 hover:text-white hover:border-brand-purple/40 hover:shadow-[0_0_12px_rgba(123,46,255,0.25)] transition-all duration-300 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Futuristic holographic grid background pattern */}
      <div className="absolute inset-0 energy-grid opacity-[0.08] pointer-events-none -z-10" />
    </div>
  );
}

export default function SkillsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 16,
        stiffness: 85,
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
            SEC.02 // KNOWLEDGE GRID
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-wide">
            SKILL CRYSTALS
          </h2>
          <div className="w-16 h-[2px] bg-brand-purple mt-4 shadow-[0_0_10px_#7B2EFF]" />
        </motion.div>

        {/* Skill Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <SkillCard cat={cat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
