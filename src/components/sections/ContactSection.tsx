"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, Zap, Terminal } from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    
    // Simulate dimensional portal collapse transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2500);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 select-none">
      {/* Background flowing energy currents pattern overlay */}
      <div className="absolute inset-0 bg-[#020202]/95 pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-radial-gradient from-brand-purple/5 to-transparent pointer-events-none -z-10" />

      {/* Volumetric ambient moving fog mock overlay */}
      <div className="absolute -left-1/4 bottom-0 w-3/4 h-1/2 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none -z-10 animate-[pulse_8s_infinite]" />

      <div className="max-w-5xl w-full flex flex-col gap-12 z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-xs font-orbitron tracking-[0.4em] text-brand-purple mb-2">
            SEC.04 // TRANSMISSION MODULE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-wide">
            PORTAL COLLAPSE
          </h2>
          <div className="w-16 h-[2px] bg-brand-purple mt-4 shadow-[0_0_10px_#7B2EFF]" />
        </motion.div>

        {/* Side by Side Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full mt-6">
          
          {/* Left Panel: Holographic Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring" as const, damping: 18, stiffness: 80 }}
            className="lg:col-span-7 glass-panel p-8 relative overflow-hidden flex flex-col justify-between"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-40" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="font-orbitron text-[9px] text-zinc-500 tracking-[0.2em]">
                      SENDER_IDENTITY
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Enter your name..."
                      className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/5 text-sm font-sans tracking-wide text-white placeholder-zinc-700 focus:outline-none focus:border-brand-purple/60 focus:shadow-[0_0_12px_rgba(123,46,255,0.15)] transition-all duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-orbitron text-[9px] text-zinc-500 tracking-[0.2em]">
                      COMMS_FREQUENCY
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="Enter your email..."
                      className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/5 text-sm font-sans tracking-wide text-white placeholder-zinc-700 focus:outline-none focus:border-brand-purple/60 focus:shadow-[0_0_12px_rgba(123,46,255,0.15)] transition-all duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-orbitron text-[9px] text-zinc-500 tracking-[0.2em]">
                      ENCODED_MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your project, bot automations, or ideas..."
                      className="w-full px-4 py-3 rounded-lg bg-zinc-950/80 border border-white/5 text-sm font-sans tracking-wide text-white placeholder-zinc-700 focus:outline-none focus:border-brand-purple/60 focus:shadow-[0_0_12px_rgba(123,46,255,0.15)] transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 relative py-3 rounded-lg overflow-hidden border border-brand-purple/30 bg-zinc-950 text-brand-purple font-orbitron text-xs font-bold tracking-[0.3em] hover:text-white hover:border-brand-purple hover:shadow-[0_0_20px_#7B2EFF] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Zap className="w-4 h-4 animate-spin text-brand-purple" />
                        <span>COLLAPSING PORTAL CORE...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>LAUNCH TRANSMISSION</span>
                      </>
                    )}
                    <div className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[30deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-brand-purple shadow-[0_0_20px_#7B2EFF] animate-ping opacity-60" />
                    <div className="absolute inset-2 rounded-full border border-brand-violet shadow-[0_0_20px_#d946ef] animate-[pulse_2s_infinite] opacity-80" />
                    <div className="w-14 h-14 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-[inset_0_0_15px_#7B2EFF]">
                      <Zap className="w-5 h-5 text-brand-purple animate-bounce" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-syne text-white tracking-wide">
                    TRANSMISSION BLOWN
                  </h3>
                  <p className="text-[9px] font-orbitron text-brand-purple tracking-widest mt-1">
                    STATUS: CORE_RIFT_REACHED
                  </p>
                  <p className="max-w-xs text-xs text-zinc-400 font-sans leading-relaxed mt-4">
                    Your signal has bypassed standard physics constraints and is swirling into the core of ELSOORYAN. Expect a reaction soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Panel: Social Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring" as const, damping: 18, stiffness: 80 }}
            className="lg:col-span-5 glass-panel p-8 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-40" />

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center font-orbitron text-[10px] text-zinc-500">
                <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" />COORDS.SYS</span>
                <span className="text-brand-cyan">OUTER_RIDGE</span>
              </div>
              <h3 className="text-xl font-bold font-syne text-white tracking-wide mt-2">
                Holographic Nodes
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Connect directly through encrypted channels. Choose a node below to launch communication.
              </p>
            </div>

            {/* Social Buttons Stack */}
            <div className="flex flex-col gap-4 mt-6">
              {/* Instagram Card */}
              <a
                href="https://www.instagram.com/elsooryann?igsh=dTVlbjdnbHB3MDRn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-brand-violet/50 hover:shadow-[0_0_15px_rgba(217,70,239,0.2)] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 group-hover:text-brand-violet transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-syne font-bold text-xs text-white">INSTAGRAM</span>
                    <span className="font-orbitron text-[8px] text-zinc-500">@elsooryann</span>
                  </div>
                </div>
                <span className="font-orbitron text-[9px] text-zinc-500 group-hover:text-brand-violet group-hover:translate-x-1 transition-all">CONNECT_NODE &gt;</span>
              </a>

              {/* Discord Card */}
              <a
                href="https://discordapp.com/users/1288134799097204826"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-brand-purple/50 hover:shadow-[0_0_15px_rgba(123,46,255,0.2)] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 group-hover:text-brand-purple transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 127.14 96.36" fill="currentColor">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5A48.55,48.55,0,0,0,31,78,75.92,75.92,0,0,0,96.14,78a48.55,48.55,0,0,0,2.87,2.51,68.43,68.43,0,0,1-10.5,5A77.7,77.7,0,0,0,95.14,85.51a105.73,105.73,0,0,0,31.06-18.83C129,54.65,123.5,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.88,46,53.88,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.12,46,96.12,53,91,65.69,84.69,65.69Z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-syne font-bold text-xs text-white">DISCORD</span>
                    <span className="font-orbitron text-[8px] text-zinc-500">User ID: 1288134799097204826</span>
                  </div>
                </div>
                <span className="font-orbitron text-[9px] text-zinc-500 group-hover:text-brand-purple group-hover:translate-x-1 transition-all">CONNECT_NODE &gt;</span>
              </a>
            </div>

            <div className="mt-8 font-orbitron text-[8px] text-zinc-600 flex justify-between">
              <span>STATUS: LISTENING_TO_PING</span>
              <span>DELAY: 3.5ms</span>
            </div>
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
