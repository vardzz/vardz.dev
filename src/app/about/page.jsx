"use client";

import React from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/custom/sidebar";
import About from "@/components/custom/about";
import TechStack from "@/components/custom/techStack";
import TechGrid from "@/components/custom/TechGrid";

// Lauren Waller easing — used for the page-level entrance
const LW_EASE = [0.2, 1, 0.3, 1];

export default function AboutPage() {
  return (
    // Page-level fade-in: the whole page slides up on first load
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: LW_EASE }}
      className="relative min-h-screen w-full bg-base text-accent font-sans"
    >
      <Sidebar />

      <main className="bg-base pb-16 sm:pb-0 sm:pl-20 md:pl-24">
        {/* Icons marquee — entrance stagger handled inside TechStack */}
        <TechStack variant="icons" />

        {/* About section — text stagger + 3D image card */}
        <About />

        {/* Names marquee — ghost-text hover applied in TechStack */}
        <TechStack variant="names" />

        {/* Filtered tech grid — blur+stagger card entrance */}
        <TechGrid />
      </main>
    </motion.div>
  );
}