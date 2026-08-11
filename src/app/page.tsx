"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";

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
            <section className="py-[54px] md:py-[70px]" id="experience">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Experience</h2>
              </div>
              <div className="border-t border-line">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line">
                  <div>
                    <div className="text-[17px] tracking-[-.03em] text-text">Frontend AI Engineer · Flyrank</div>
                    <div className="text-muted text-[13px] leading-[1.6] mt-[8px] max-w-[560px]">Architecting and shipping responsive frontend components using React, TypeScript, and Tailwind CSS for Fly-Rank's organic growth and SEO automation platform, using AI-assisted pair-programming workflows to accelerate scaffolding, refactoring, and deployment of production-ready UI.</div>
                  </div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap uppercase">June 2026 — Present</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line">
                  <div>
                    <div className="text-[17px] tracking-[-.03em] text-text">Membership Data Analyst · DEVCON Laguna</div>
                    <div className="text-muted text-[13px] leading-[1.6] mt-[8px] max-w-[560px]">Track membership analytics, demographic trends, and registration data for 500+ members across 3 major event cycles to support community growth and execution planning.</div>
                  </div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap uppercase">July 2026 — Present</div>
                </div>
              </div>
            </section>

            {/* 03 Stack */}
            <section className="py-[54px] md:py-[70px]" id="stack">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Tech stack</h2>
              </div>
              <p className="max-w-[590px] text-soft leading-[1.75] m-0 mb-[36px]">Tools are just tools. These are the ones I reach for when they make the work better.</p>
              <div className="flex flex-wrap gap-[9px]">
                <span className="border border-[rgba(213,255,97,.45)] text-accent bg-accent-dim px-[12px] py-[9px] font-mono text-[11px]">TypeScript</span>
                <span className="border border-line text-soft px-[12px] py-[9px] font-mono text-[11px]">React</span>
                <span className="border border-line text-soft px-[12px] py-[9px] font-mono text-[11px]">Next.js</span>
                <span className="border border-line text-soft px-[12px] py-[9px] font-mono text-[11px]">Node.js</span>
                <span className="border border-[rgba(213,255,97,.45)] text-accent bg-accent-dim px-[12px] py-[9px] font-mono text-[11px]">AWS</span>
                <span className="border border-line text-soft px-[12px] py-[9px] font-mono text-[11px]">PostgreSQL</span>
                <span className="border border-line text-soft px-[12px] py-[9px] font-mono text-[11px]">Tailwind</span>
                <span className="border border-line text-soft px-[12px] py-[9px] font-mono text-[11px]">Docker</span>
              </div>
            </section>

            {/* 04 Certifications */}
            <section className="py-[54px] md:py-[70px]" id="certifications">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Certifications</h2>
              </div>
              <div className="border-t border-line">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line group cursor-pointer">
                  <div className="text-[17px] tracking-[-.03em] transition-colors group-hover:text-accent text-text">AWS Certified Developer — Associate</div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap">AWS · 2025</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line group cursor-pointer">
                  <div className="text-[17px] tracking-[-.03em] transition-colors group-hover:text-accent text-text">AWS Certified Solutions Architect</div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap">AWS · 2024</div>
                </div>
              </div>
            </section>

            {/* 05 Github */}
            <section className="py-[54px] md:py-[70px]" id="github">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Github activity</h2>
              </div>
              <div className="block md:grid md:grid-cols-[1.2fr_.8fr] gap-[50px]">
                <div className="grid grid-cols-[repeat(20,1fr)] md:grid-cols-[repeat(26,1fr)] gap-[4px] content-start" id="heatmap" aria-label="A visual summary of recent Github activity">
                  {/* Heatmap rendered via JS */}
                </div>
                <div className="mt-[28px] md:mt-0 text-soft text-[13px] leading-[1.7]">
                  <strong className="block text-text text-[36px] font-medium tracking-[-.07em] mb-[3px]">1,204</strong>
                  contributions in the last year.<br/><br/>
                  Consistent commits across personal projects, cloud tools, and open source.<br/><br/>
                  <a className="text-muted font-mono text-[11px] hover:text-accent transition-colors" href="https://github.com" target="_blank">view github ↗</a>
                </div>
              </div>
            </section>

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
