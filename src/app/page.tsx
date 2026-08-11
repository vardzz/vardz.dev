"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Certifications from "../components/Certifications";
import Github from "../components/Github";

export default function Portfolio() {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic github heatmap setup
    const heatmap = document.getElementById('heatmap');
    if (heatmap) {
      heatmap.innerHTML = Array.from({ length: 130 }, (_, i) => {
        // Randomize the color distribution to match the reference look
        let bgClass = "bg-[#1c1c21]";
        if (i % 5 === 1 || i % 7 === 3) bgClass = "bg-[#4c5c26]";
        else if (i % 11 === 2) bgClass = "bg-[#849d3d]";
        else if (i % 17 === 4) bgClass = "bg-accent";
        return `<span class="aspect-square ${bgClass}"></span>`;
      }).join('');
    }

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
            <section className="py-[54px] md:py-[70px]" id="stack">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Tech stack</h2>
                <a href="#" className="text-muted hover:text-accent transition-colors text-[14px] font-mono group">view all <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">→</span></a>
              </div>
              <div className="flex flex-wrap gap-[9px]">
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">TypeScript</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">React</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Next.js</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Node.js</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Python</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Laravel</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">PostgreSQL</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">AWS</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Docker</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Kubernetes</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">PyTorch</span>
                <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Claude Code</span>
                <span className="border border-line border-dashed text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">+ more</span>
              </div>
            </section>

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
