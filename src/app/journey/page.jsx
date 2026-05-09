// src/app/journey/page.jsx
import React from "react";
import Experience from "@/components/custom/Experience";

export const metadata = {
  title: "Journey | Vardz",
  description: "My professional journey and experience.",
};

export default function JourneyPage() {
  return (
    // 'absolute inset-0' ensures the beige covers the black root layout completely
    <div className="relative min-h-screen w-full bg-accent text-base overflow-x-hidden selection:bg-base selection:text-accent">
      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <Experience />
      </div>
    </div>
  );
}
