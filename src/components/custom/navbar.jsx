"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-6 flex justify-between items-center backdrop-blur-md mix-blend-difference">
        <Link 
          href="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-black text-accent text-xl uppercase tracking-tight cursor-pointer"
        >
          VARDZ
        </Link>
        <div className="w-14 h-7" /> {/* Placeholder for toggle */}
      </nav>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-6 flex justify-between items-center backdrop-blur-md transition-colors duration-700 ease-in-out"
    >
      <Link 
        href="/" 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-black text-accent text-xl uppercase tracking-tight cursor-pointer"
      >
        VARDZ
      </Link>
      
      <div className="hidden md:flex gap-16">
        {["About", "Experience", "Work"].map((link, idx) => (
          <a 
            key={idx} 
            href={`#${link.toLowerCase()}`}
            className="text-[10px] tracking-[0.2em] uppercase text-accent hover:text-accent/70 transition-colors duration-300 font-medium cursor-pointer"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center">
        <button 
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`relative w-14 h-7 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-500 ${
            isDark ? "bg-base" : "bg-base"
          } border border-accent/10`}
          aria-label="Toggle Theme"
        >
          {/* Icons Container */}
          <div className="absolute inset-0 flex justify-between items-center px-1.5 pointer-events-none">
            <Sun className={`w-3.5 h-3.5 ${isDark ? "text-accent" : "text-accent"}`} />
            <Moon className={`w-3.5 h-3.5 ${isDark ? "text-accent" : "text-accent"}`} />
          </div>

          {/* Slider Circle */}
          <motion.div 
            className={`z-10 w-5 h-5 rounded-full ${isDark ? "bg-base" : "bg-base"}`}
            initial={false}
            animate={{ 
              x: isDark ? 28 : 0 
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>
    </motion.nav>
  );
}
