"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Certifications from "../components/Certifications";
import Github from "../components/Github";
import Stack from "../components/Stack";

export default function Portfolio() {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {


    // Observer for bottom of page
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasReachedBottom(true);
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main id="top" className="min-w-0">
        <div className="block">
          
          {/* Hero Section */}
          <Hero />

          {/* Sections Wrap */}
          <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0">
            
            {/* 01 Projects */}
            <Projects />

            {/* 02 Experience */}
            <Experience />

            {/* 03 Stack */}
            <Stack />

            <Certifications />

            <Github />

            {/* 06 Chat Zone */}
            <section className="pt-[80px] pb-[150px] md:pt-[110px] md:pb-[150px] min-h-[430px] grid place-items-center text-center" id="chat">
              <div>
                <div className="text-muted font-mono text-[11px] tracking-[.1em] uppercase">your move</div>
                <div className="text-[clamp(28px,4vw,49px)] tracking-[-.06em] font-serif text-text my-[14px] md:my-[15px]">Ask me where to go.</div>
                <div className="text-muted text-[13px]">Try “show me the projects” or ask anything else.</div>
              </div>
            </section>

          </div>
        </div>
        
        {/* Chatbox form */}
        <form className={`fixed bottom-[18px] left-1/2 -translate-x-1/2 z-30 w-[min(680px,calc(100%-36px))] bg-[rgba(20,20,25,.96)] border border-[#45454d] shadow-[0_12px_40px_rgba(0,0,0,.35)] p-[9px] flex gap-[10px] transition-all duration-700 ease-out focus-within:border-accent focus-within:shadow-[0_0_0_4px_var(--color-accent-dim),0_12px_40px_rgba(0,0,0,.4)] ${hasReachedBottom ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-[120%] opacity-0 pointer-events-none'}`}>
          <input 
            type="text" 
            autoComplete="off" 
            aria-label="Ask the portfolio a question" 
            placeholder="Ask about projects, experience, stack…" 
            className="min-w-0 flex-1 bg-transparent border-0 outline-0 text-text px-[11px] py-[13px] text-[13px] placeholder-[#6e6e77]"
          />
          <button type="submit" className="border-0 bg-accent text-[#111] px-[18px] cursor-pointer font-mono font-semibold text-[11px] hover:brightness-110">
            SEND ↗
          </button>
        </form>
        
        {/* Invisible element to trigger the observer */}
        <div ref={bottomRef} className="h-[10px] w-full mt-[-10px]"></div>

      </main>
    </div>
  );
}
