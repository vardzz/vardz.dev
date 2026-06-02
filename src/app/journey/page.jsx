// src/app/journey/page.jsx
import React from "react";
import Experience from "@/components/custom/Experience";
import Certificates from "@/components/custom/Certificates";

export const metadata = {
  title: "Journey | Vardz",
  description: "My professional journey and experience.",
};

export default function JourneyPage() {
  return (
    // 'absolute inset-0' ensures the beige covers the black root layout completely
    <div className="relative min-h-screen w-full overflow-x-hidden bg-accent text-base pb-24 md:pb-0 selection:bg-base selection:text-accent">
      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <Experience />
        <Certificates />
      </div>
    </div>
  );
}
