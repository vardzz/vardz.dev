"use client";

import React from "react";
import Sidebar from "@/components/custom/sidebar";
import About from "@/components/custom/about";
import TechStack from "@/components/custom/techStack";
import TechGrid from "@/components/custom/TechGrid";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full bg-base text-accent font-sans">
      <Sidebar />
      <main className="bg-base">
        {/* Tech Stack - Icons Only Variant */}
        <TechStack variant="icons" />
        
        {/* About Section */}
        <About />
        
        {/* Tech Stack - Names Only Variant */}
        <TechStack variant="names" />
        
        {/* Detailed Tech Grid */}
        <TechGrid />
      </main>
    </div>
  );
}

