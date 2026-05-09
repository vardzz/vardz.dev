// src/app/work/page.jsx
"use client";

import React, { useState } from "react";
import PageTransition from "@/components/custom/PageTransition";
import { motion } from "framer-motion";

export default function WorkPage() {
  const projects = [
    { name: "DENTARA", role: "- HEALTH TECH PWA" },
    { name: "HORIZON AI", role: "- AI RESEARCH SYSTEM" },
    { name: "ELDERKEY", role: "- ELDERLY FOCUSED APPLICATION" },
    { name: "COURT CATCHER", role: "- BOOKING APPLICATION" },
    { name: "QR ATTENDANCE", role: "- SUPABASE INTEGRATION" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-[#F4EDE4] selection:bg-[#111111] selection:text-[#F4EDE4]">
      <PageTransition>
        {/* 1. MASTER WRAPPER: 
           Locks the actual browser window to prevent double scrollbars. 
        */}
        <div className="relative h-screen w-full text-[#111111] overflow-hidden pl-20 md:pl-24 flex">
          
          {/* 2. BACKGROUND LAYER (LEFT PANEL): 
             This is fixed in place. 'z-0' keeps it behind the scrollable area.
          */}
          <div className="hidden md:flex md:w-[40%] h-full flex-col justify-center px-12 lg:px-20 xl:px-24 z-0">
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

          {/* 3. SCROLLABLE LAYER (THE CONTROLLER):
             This covers 100% of the screen. Scrolling anywhere here moves the projects.
             'no-scrollbar' is removed so you can see the progress.
          */}
          <div className="absolute inset-0 h-full overflow-y-auto overscroll-contain pl-20 md:pl-24 flex justify-end z-10">
            
            {/* Project Container: 60% Width 
                'pointer-events-none' on this spacer allows you to click the bio 
                on the left, while 'pointer-events-auto' on the list keeps it interactive.
            */}
            <div className="w-full md:w-[60%] flex flex-col pt-32 md:pt-[45vh] pointer-events-none">
              <div className="flex flex-col gap-10 md:gap-14 px-6 md:px-12 pb-[45vh] pointer-events-auto">
                {projects.map((project, idx) => {
                  const isHovered = idx === hoveredIndex;
                  const isOtherItemHovered = hoveredIndex !== null && !isHovered;

                  return (
                    <motion.div 
                      key={idx} 
                      className="group cursor-pointer select-none origin-left"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        opacity: isOtherItemHovered ? 0.3 : 1,
                        filter: isOtherItemHovered ? "blur(4px)" : "blur(0px)",
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <h1 className="font-heading font-display text-5xl md:text-6xl lg:text-[7.5vw] font-black uppercase tracking-tighter leading-[0.8] transition-all duration-700">
                        {project.name}
                      </h1>
                      
                      <div className="mt-4">
                        <span className="text-[10px] tracking-[0.25em] font-bold uppercase opacity-40">
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
    </div>
  );
}