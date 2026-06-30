"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];

export default function Navigation({ visible }: { visible: boolean }) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!visible) return;

    const sections = navItems.map((item) => document.getElementById(item.id));
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] flex items-center p-1.5 rounded-full bg-zinc-950/40 backdrop-blur-xl border border-brand-purple/15 shadow-[0_10px_35px_rgba(0,0,0,0.8)] pointer-events-auto transition-all duration-500 scale-100 animate-fade-in hover:border-brand-violet/30">
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-2 rounded-full font-orbitron text-[10px] font-bold tracking-[0.2em] transition-all duration-300 pointer-events-auto cursor-pointer ${
                isActive
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-purple to-brand-violet -z-10 shadow-[0_0_15px_rgba(123,46,255,0.4)]"
                  style={{ transformStyle: "preserve-3d" }}
                />
              )}
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
