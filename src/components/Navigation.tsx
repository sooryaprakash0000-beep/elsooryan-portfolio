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
    <nav className="fixed bottom-8 left-1/2 z-[999] flex -translate-x-1/2 items-center rounded-full border border-brand-purple/15 bg-zinc-950/40 p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl pointer-events-auto transition-all duration-500 scale-100 animate-fade-in hover:border-brand-violet/30 sm:max-w-none">
      <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-visible sm:whitespace-normal [&::-webkit-scrollbar]:hidden">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative rounded-full px-2 py-2 font-orbitron text-[9px] font-bold tracking-[0.12em] transition-all duration-300 pointer-events-auto cursor-pointer sm:px-4 sm:text-[10px] sm:tracking-[0.2em] ${
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
