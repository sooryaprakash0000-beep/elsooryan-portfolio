"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu, Compass } from "lucide-react";

const skillCategories = [
  {
    title: "Dimensional Frontend",
    icon: Layers,
    color: "text-brand-cyan",
    borderColor: "hover:border-brand-cyan/40",
    shadowColor: "rgba(0, 243, 255, 0.2)",
    skills: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "HTML5/CSS3"],
  },
  {
    title: "Creative Physics",
    icon: Sparkles,
    color: "text-brand-purple",
    borderColor: "hover:border-brand-purple/40",
    shadowColor: "rgba(189, 0, 255, 0.2)",
    skills: ["Three.js", "React Three Fiber", "Drei / Postprocessing", "GLSL Custom Shaders", "Raymarching", "WebGL APIs", "GSAP ScrollTrigger"],
  },
  {
    title: "Singularity Backend",
    icon: Cpu,
    color: "text-brand-cyan",
    borderColor: "hover:border-brand-cyan/40",
    shadowColor: "rgba(0, 243, 255, 0.2)",
    skills: ["Node.js / Express", "GraphQL / REST", "WebSockets / Socket.io", "Python", "PostgreSQL / MongoDB", "Redis Caching", "Serverless APIs"],
  },
  {
    title: "Aura Architecture",
    icon: Compass,
    color: "text-brand-purple",
    borderColor: "hover:border-brand-purple/40",
    shadowColor: "rgba(189, 0, 255, 0.2)",
    skills: ["Docker Containers", "Git / GitHub Actions", "CI/CD Pipelines", "Vercel / AWS", "Vite / Webpack", "Lighthouse Perf Opt", "Web Security"],
  },
];

export default function SkillsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
        damping: 15,
        stiffness: 90,
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
          <span className="text-xs font-orbitron tracking-[0.4em] text-brand-cyan mb-2">
            SEC.02 // POWER GRID
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-wide">
            SKILL CRYSTALS
          </h2>
          <div className="w-16 h-[2px] bg-brand-cyan mt-4 shadow-[0_0_8px_#00f3ff]" />
        </motion.div>

        {/* Skill Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`glass-panel p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-500 border border-white/5 ${cat.borderColor}`}
                style={{
                  transformStyle: "preserve-3d",
                }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 12px 40px 0 ${cat.shadowColor}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-zinc-950/80 border border-white/5 ${cat.color} shadow-[0_0_15px_rgba(255,255,255,0.02)]`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold font-syne text-lg text-white tracking-wide">
                    {cat.title}
                  </h3>
                </div>

                <div className="w-full h-[1px] bg-white/5 my-2" />

                <div className="flex flex-wrap gap-2 mt-1">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 text-xs font-orbitron rounded-full bg-zinc-950/80 border border-white/5 text-zinc-400 hover:text-white hover:border-brand-cyan/30 hover:shadow-[0_0_10px_rgba(0,243,255,0.15)] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Subtly animated holographic grid overlay background */}
                <div className="absolute inset-0 energy-grid opacity-[0.08] pointer-events-none -z-10" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
