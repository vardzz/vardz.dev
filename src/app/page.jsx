"use client";

import Sidebar from "@/components/custom/sidebar";
import Hero from "@/components/custom/hero";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-base text-accent font-sans pb-24 md:pb-0">
      <Sidebar />
      <main className="min-h-screen overflow-hidden">
        <Hero />
      </main>
    </div>
  );
}
