// src/app/work/page.jsx
"use client"; // REQUIRED when using hooks like useState

import React, { useState } from "react";
import PageTransition from "@/components/custom/PageTransition";
import { motion, AnimatePresence } from "framer-motion"; // Use motion for the blur effect
import Footer from "@/components/custom/footer";

export default function WorkPage() {
  const projects = [
    { name: "DENTARA", role: "- HEALTH TECH PWA" },
    { name: "HORIZON AI", role: "- AI RESEARCH SYSTEM" },
    { name: "ELDERKEY", role: "- ELDERLY FOCUSED APPLICATION" },
    { name: "COURT CATCHER", role: "- BOOKING APPLICATION" },
    { name: "QR ATTENDANCE", role: "- SUPABASE INTEGRATION" },
  ];

  // State to track which project index is being hovered
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <PageTransition>
      {/* MAIN WRAPPER */}
      <div className="relative h-screen w-full bg-[#F4EDE4] text-[#111111] overflow-hidden pl-20 md:pl-24 flex selection:bg-[#111111] selection:text-[#F4EDE4]">
        
        {/* 40:60 Flex Container */}
        <div className="flex w-full h-full">
          
          {/* LEFT PANEL: Fixed 40% (Vertically Centered) */}
          <div className="hidden md:flex md:w-5/12 h-full flex-col justify-center px-12 lg:px-20 xl:px-24">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-10 opacity-60">
              Selected Works
            </p>
            <div className="space-y-8 text-sm md:text-base leading-relaxed max-w-sm">
              <p className="opacity-90">
                This is a showcase of my best work in a variety of fields including 
                Full-Stack Web Development, Artificial Intelligence, and Cloud Engineering.
              </p>
              <p className="opacity-70 font-medium">
                The world of digital architecture is constantly evolving and so has my 
                role throughout my academic and professional career.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: The Scrollable 60% */}
          <div className="w-full md:w-7/12 h-full overflow-y-auto no-scrollbar pt-32 md:pt-48 flex flex-col justify-between">
            
            {/* Project List Container: Reduced bottom padding to align the end */}
            <div className="flex flex-col gap-10 md:gap-14 px-6 md:px-12 mb-32 pb-[11vh]">
              {projects.map((project, idx) => {
                const isHovered = idx === hoveredIndex;
                const isOtherItemHovered = hoveredIndex !== null && !isHovered;

                return (
                  <motion.div 
                    key={idx} 
                    className="group cursor-pointer select-none origin-left" // Added origin-left for clean scale
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    // Dynamic Framer Motion styles:
                    animate={{
                      // 1. Highlight: Scale the hovered text slightly (1.05 = 5% increase)
                      scale: isHovered ? 1.05 : 1,
                      // 2. Dim/Blur: Fade and blur other items when one is hovered
                      opacity: isOtherItemHovered ? 0.3 : 1,
                      filter: isOtherItemHovered ? "blur(3px)" : "blur(0px)",
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1], // Custom sophisticated ease-out
                    }}
                  >
                    <h1 className="font-heading font-display text-5xl md:text-6xl lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.8] transition-all duration-700">
                      {project.name}
                    </h1>
                    
                    <div className="mt-4">
                      <span className="text-[9px] md:text-[10px] tracking-[0.25em] font-bold uppercase opacity-40">
                        {project.role}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}