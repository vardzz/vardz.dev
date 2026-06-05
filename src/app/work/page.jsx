// src/app/work/page.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  { name: "DENTARA",       role: "- HEALTH TECH PWA",             href: "/work/dentara"       },
   { name: "LUNAS",       role: "- MEDICAL PASSPORT",             href: "/work/lunas"       },
  { name: "HORIZON AI",    role: "- AI RESEARCH SYSTEM",          href: "/work/horizon"    },
  { name: "GHOSTNET AI",    role: "- AI RESEARCH SYSTEM",          href: "/work/ghostnet"    },
];

export default function WorkPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div className="h-screen w-full overflow-hidden bg-[#F4EDE4] text-[#111111] pb-24 md:pb-0 selection:bg-[#111111] selection:text-[#F4EDE4]">
        <div className="flex h-full flex-col md:flex-row md:pl-24">

          <div className="px-6 pt-24 md:hidden">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
              Selected Works
            </p>
            <div className="max-w-prose space-y-4 text-sm leading-relaxed">
              <p className="opacity-90">
                This is a showcase of my best work in a variety of fields including
                Full-Stack Web Development, Artificial Intelligence, and Cloud Engineering.
              </p>
              <p className="font-medium opacity-70">
                The world of digital architecture is constantly evolving and so has my
                role throughout my academic and professional career.
              </p>
            </div>
          </div>

          {/* ── LEFT PANEL ─────────────────────────────────────────────── */}
          <div className="hidden h-full w-[40%] flex-shrink-0 flex-col justify-center px-12 md:flex lg:px-20 xl:px-24">
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
          <div className="flex-1 min-h-0 overscroll-contain overflow-y-auto md:pt-0">
            <div className="flex min-h-full flex-col justify-start px-6 py-10 md:justify-center md:px-12 md:py-24">
              <div className="flex flex-col gap-8 md:gap-14 md:py-[15vh]">
                {projects.map((project, idx) => {
                  const isHovered      = idx === hoveredIndex;
                  const isOtherHovered = hoveredIndex !== null && !isHovered;

                  return (
                    <Link key={idx} href={project.href}>
                    <motion.div
                      className="group pointer-events-none origin-left select-none transform-gpu will-change-transform"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      animate={{
                        scale:   isHovered      ? 1.05        : 1,
                        opacity: isOtherHovered ? 0.3         : 1,
                        filter:  isOtherHovered ? "blur(4px)" : "blur(0px)",
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h1 className="pointer-events-auto break-words hyphens-auto font-heading font-display text-5xl font-black uppercase leading-[0.8] tracking-tighter sm:text-6xl md:text-6xl lg:text-[7.5vw]">
                        {project.name}
                      </h1>
                      <div className="pointer-events-auto mt-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-40">
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