"use client";

import Sidebar from "@/components/custom/sidebar";
import Hero from "@/components/custom/hero";

export default function Portfolio() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-base text-accent font-sans">
      <Sidebar />
      <main className="h-screen overflow-hidden">
        <Hero />
      </main>
      </div>
  );
}
