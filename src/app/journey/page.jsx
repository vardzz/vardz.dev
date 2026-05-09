import React from "react";
import Experience from "@/components/custom/Experience";
import PageTransition from "@/components/custom/PageTransition";

export const metadata = {
  title: "Journey | Vardz",
  description: "My professional journey and experience.",
};

export default function JourneyPage() {
  return (
    <PageTransition>
      <div className="min-h-screen w-full bg-accent text-base pt-32 pb-16 px-6 md:px-12 selection:bg-base selection:text-accent">
        <div className="max-w-[1600px] mx-auto">
          {/* Main Experience Component */}
          <Experience />
        </div>
      </div>
    </PageTransition>
  );
}
