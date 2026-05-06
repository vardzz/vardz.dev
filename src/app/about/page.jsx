"use client";

import React from "react";
import About from "@/components/custom/about";
import TechStack from "@/components/custom/techStack";
import TechGrid from "@/components/custom/TechGrid";

export default function AboutPage() {
  return (
    <main className="bg-base min-h-screen">
      {/* Tech Stack - Icons Only Variant */}
      <TechStack variant="icons" />
      
      {/* About Section */}
      <About />
      
      {/* Tech Stack - Names Only Variant */}
      <TechStack variant="names" />
      
      {/* Detailed Tech Grid */}
      <TechGrid />
    </main>
  );
}
