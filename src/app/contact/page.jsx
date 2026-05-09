// src/app/contact/page.jsx
import React from "react";
import PageTransition from "@/components/custom/PageTransition";
import Footer from "@/components/custom/footer";

export const metadata = {
  title: "Contact | Vardz",
  description: "Get in touch for collaborations and inquiries.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      {/* 1. The Absolute Foundation (Full width & full height) */}
      <div className="relative min-h-screen w-full bg-base text-accent overflow-x-hidden selection:bg-accent selection:text-base pl-20 md:pl-24 flex flex-col">
        
        {/* 2. Main Content Canvas (Max width 1400px) */}
        <div className="flex-grow max-w-[1400px] w-full mx-auto px-6 md:px-12 py-32 md:py-48 flex flex-col justify-center">
          
          {/* Header Typography */}
          <div className="mb-20">
            <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-accent/50 mb-4 block">
              Let's Connect
            </span>
            <h1 className="font-heading font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              Hello.
            </h1>
          </div>

          {/* Contact Details Wrapper (Max width 576px - THIS is what trapped your footer!) */}
          <div className="max-w-xl">
            <p className="text-lg md:text-xl text-accent/70 leading-relaxed mb-12">
              I am currently open for new opportunities and collaborations. Whether you have a project in mind or just want to say hi, I'll try my best to get back to you.
            </p>
          </div> 

        </div> 
        <Footer />

      </div>
    </PageTransition>
  );
}