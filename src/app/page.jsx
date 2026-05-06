"use client";

import Sidebar from "@/components/custom/sidebar";
import Hero from "@/components/custom/hero";

export default function Portfolio() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-foreground selection:bg-foreground selection:text-background font-sans transition-colors duration-700 ease-in-out">
      <Sidebar />
      <main className="h-screen overflow-hidden">
        <Hero />
      </main>
      </div>
  );
}
