"use client";

import React from "react";
import { motion } from "framer-motion";
import About from "@/components/custom/about";
import TechStack from "@/components/custom/techStack";
import TechGrid from "@/components/custom/TechGrid";
 

// Lauren Waller easing — used for the page-level entrance
const LW_EASE = [0.2, 1, 0.3, 1];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-base font-sans text-accent pb-24 md:pb-0">
      <main className="relative z-10 flex min-h-screen w-full flex-col bg-base pb-16 pl-0 md:pl-24">
        {/* Icons marquee — entrance stagger handled inside TechStack */}
        <TechStack variant="icons" />

        {/* About section — text stagger + 3D image card */}
        <About />

        {/* Names marquee — ghost-text hover applied in TechStack */}
        <TechStack variant="names" />

        {/* Filtered tech grid — blur+stagger card entrance */}
        <TechGrid />
      </main>
    </div>
  );
}