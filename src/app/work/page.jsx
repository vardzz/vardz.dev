// src/app/work/page.jsx
import React from "react";
import PageTransition from "@/components/custom/PageTransition";
import Footer from "@/components/custom/footer";

export default function WorkPage() {
  const projects = [
    { name: "DENTARA", role: "- HEALTH TECH PWA" },
    { name: "HORIZON AI", role: "- AI RESEARCH SYSTEM" },
    { name: "ELDERKEY", role: "- ELDERLY FOCUSED APPLICATION" },
    { name: "COURT CATCHER", role: "- BOOKING APPLICATION" },
    { name: "QR ATTENDANCE", role: "- SUPABASE INTEGRATION" },
  ];

  return (
    <PageTransition>
      {/* MAIN WRAPPER: 
        'h-screen overflow-hidden' traps the scroll inside the right panel.
        'pl-20 md:pl-24' respects the fixed sidebar.
      */}
      <div className="relative h-screen w-full bg-accent text-base overflow-hidden pl-20 md:pl-24 flex">
        
        {/* 50:50 Flex Container */}
        <div className="flex w-full h-full">
          
          {/* LEFT PANEL: Fixed 50% 
              We use 'justify-center' to keep your description vertically centered.
          */}
          <div className="hidden md:flex w-5/12 h-full flex-col justify-center px-12 lg:px-24">
            <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase mb-10 opacity-60">
              Selected Work
            </h2>
            <div className="space-y-8 text-sm md:text-base leading-relaxed max-w-sm">
              <p className="opacity-90">
                This is a showcase of my best work in a variety of fields including 
                Full-Stack Web Development, Artificial Intelligence, and Cloud Engineering.
              </p>
              <p className="opacity-70 font-medium">
                The world of digital architecture is constantly evolving and so has my 
                role throughout my academic and professional career.
              </p>
            </div>
          </div>

        {/* RIGHT PANEL: The Scrollable 50% */}
        <div className="w-full md:w-7/12 h-full overflow-y-auto no-scrollbar pt-32 md:pt-48 pb-[30vh]">
    
        {/* Project List Container - Reduced gap for tighter vertical rhythm */}
        <div className="flex flex-col gap-10 md:gap-14 px-6 md:px-12">
        {projects.map((project, idx) => (
        <div 
            key={idx} 
            className="group cursor-pointer select-none"
        >
            {/* Project Title: Removed italic, focused on raw scale and letter spacing */}
            <h1 className="font-heading font-display text-5xl md:text-6xl lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.8] transition-opacity duration-500 hover:opacity-40">
            {project.name}
            </h1>
            
            {/* The Role Label: Moved closer to the title */}
            <div className="mt-3">
            <span className="text-[9px] md:text-[10px] tracking-[0.25em] font-bold uppercase opacity-40">
                {project.role}
            </span>
                 </div>
            </div>
        ))}
        </div>

        </div>
     </div>
    </div>
    </PageTransition>
  );
}