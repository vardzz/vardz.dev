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
    <div className="relative isolate min-h-screen w-full overflow-x-hidden bg-[#F4EDE4] text-base pb-24 selection:bg-base selection:text-accent md:pb-0 md:pl-24 md:pr-16">
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-[#F4EDE4]" />
      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <Experience />
        <Certificates />
      </div>
    </div>
  );
}
