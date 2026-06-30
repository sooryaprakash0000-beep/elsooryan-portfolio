"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, Zap, ShieldAlert } from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    
    // Simulate dimensional transmission (particle blast trigger)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      // Reset after animation
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2500);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 select-none">
      <div className="max-w-xl w-full flex flex-col gap-10 z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-xs font-orbitron tracking-[0.4em] text-brand-cyan mb-2">
            SEC.04 // SIGNAL TRANSMISSION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-wide">
            PORTAL SINGULARITY
          </h2>
          <div className="w-16 h-[2px] bg-brand-cyan mt-4 shadow-[0_0_8px_#00f3ff]" />
        </motion.div>

        {/* Floating Holographic Form Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ type: "spring", damping: 20, stiffness: 80 }}
          className="glass-panel p-8 relative overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Inner Glow Portal Mockup in background */}
          <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-gradient-to-tr from-brand-purple to-brand-cyan opacity-[0.06] blur-xl pointer-events-none -z-10" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-orbitron text-[10px] text-zinc-500 tracking-[0.2em]">
                    SENDER_IDENTITY
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/5 text-sm font-sans tracking-wide text-white placeholder-zinc-600 focus:outline-none focus:border-brand-cyan/60 focus:shadow-[0_0_12px_rgba(0,243,255,0.15)] transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-orbitron text-[10px] text-zinc-500 tracking-[0.2em]">
                    COMMS_FREQUENCY
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email..."
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/5 text-sm font-sans tracking-wide text-white placeholder-zinc-600 focus:outline-none focus:border-brand-cyan/60 focus:shadow-[0_0_12px_rgba(0,243,255,0.15)] transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-orbitron text-[10px] text-zinc-500 tracking-[0.2em]">
                    ENCODED_MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your project, idea, or transmission..."
                    className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/5 text-sm font-sans tracking-wide text-white placeholder-zinc-600 focus:outline-none focus:border-brand-cyan/60 focus:shadow-[0_0_12px_rgba(0,243,255,0.15)] transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 relative py-3.5 rounded-lg overflow-hidden border border-brand-cyan/30 bg-zinc-950 text-brand-cyan font-orbitron text-xs font-bold tracking-[0.3em] hover:text-white hover:border-brand-cyan hover:shadow-[0_0_20px_#00f3ff] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin text-brand-cyan" />
                      <span>BLASTING PORTAL COLLAPSE...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>INITIALIZE TRANSMISSION</span>
                    </>
                  )}
                  {/* Energy scanner wave */}
                  <div className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
                </button>
              </motion.form>
            ) : (
              // Submitted Particle Blast Success State
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                {/* CSS portal ring explosion */}
                <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-brand-cyan shadow-[0_0_20px_#00f3ff] animate-ping opacity-60" />
                  <div className="absolute inset-2 rounded-full border border-brand-purple shadow-[0_0_20px_#bd00ff] animate-[pulse_2s_infinite] opacity-80" />
                  <div className="w-16 h-16 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-[inset_0_0_15px_#00f3ff]">
                    <Zap className="w-6 h-6 text-brand-cyan animate-bounce" />
                  </div>
                </div>

                <h3 className="text-xl font-bold font-syne text-white tracking-wide">
                  TRANSMISSION BLOWN
                </h3>
                <p className="text-xs font-orbitron text-brand-cyan tracking-widest mt-2">
                  STATUS: SINGULARITY_REACHED
                </p>
                <p className="max-w-xs text-xs text-zinc-400 font-sans leading-relaxed mt-4">
                  Your signal has bypassed standard physics constraints and is swirling into the core of ELSOORYAN. Expect a reaction soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
