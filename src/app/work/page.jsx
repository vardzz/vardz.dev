// src/app/work/page.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  { name: "DENTARA",       role: "- HEALTH TECH PWA",             href: "/work/dentara"       },
  { name: "HORIZON AI",    role: "- AI RESEARCH SYSTEM",          href: "/work/horizon-ai"    },
  { name: "ELDERKEY",      role: "- ELDERLY FOCUSED APPLICATION", href: "/work/elderkey"      },
  { name: "COURT CATCHER", role: "- BOOKING APPLICATION",         href: "/work/court-catcher" },
  { name: "QR ATTENDANCE", role: "- SUPABASE INTEGRATION",        href: "/work/qr-attendance" },
];

export default function WorkPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div className="h-screen w-full overflow-y-auto bg-[#F4EDE4] text-[#111111] selection:bg-[#111111] selection:text-[#F4EDE4]">
        <div className="flex pl-20 md:pl-24">

          {/* ── LEFT PANEL ─────────────────────────────────────────────── */}
          <div className="hidden md:flex md:w-[40%] flex-shrink-0 flex-col justify-center sticky top-0 h-screen px-12 lg:px-20 xl:px-24">
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

          {/* ── RIGHT PANEL ────────────────────────────────────────────── */}
          <div className="flex-1 overscroll-contain">
            <div className="flex flex-col min-h-screen px-6 md:px-12 py-24 justify-center">
              <div className="flex flex-col gap-10 md:gap-14 py-[15vh]">
                {projects.map((project, idx) => {
                  const isHovered      = idx === hoveredIndex;
                  const isOtherHovered = hoveredIndex !== null && !isHovered;

                  return (
                    <Link key={idx} href={project.href}>
                    <motion.div
                      className="group cursor-pointer select-none origin-left"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      animate={{
                        scale:   isHovered      ? 1.05        : 1,
                        opacity: isOtherHovered ? 0.3         : 1,
                        filter:  isOtherHovered ? "blur(4px)" : "blur(0px)",
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h1 className="font-heading font-display text-5xl md:text-6xl lg:text-[7.5vw] font-black uppercase tracking-tighter leading-[0.8]">
                        {project.name}
                      </h1>
                      <div className="mt-4">
                        <span className="text-[10px] tracking-[0.25em] font-bold uppercase opacity-40">
                          {project.role}
                        </span>
                      </div>
                    </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}