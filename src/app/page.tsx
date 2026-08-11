"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

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
            <section className="py-[54px] md:py-[70px]" id="projects">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                {/* Project 1 (Large) */}
                <a href="https://horizonai-zeta.vercel.app/" target="_blank" className="group relative block md:col-span-2 aspect-[4/3] md:aspect-[21/9] rounded-[16px] overflow-hidden border border-line bg-transparent hover:border-accent/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c21]/30 to-transparent z-10"></div>
                  
                  {/* Horizon Logo Background */}
                  <div className="absolute inset-y-0 right-0 w-3/4 md:w-1/2 z-0 opacity-10 group-hover:opacity-100 transition-all duration-500 flex items-center justify-end p-[24px] md:p-[40px] pointer-events-none">
                    <img src="/projects/horizon-logo.png" alt="" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>

                  <div className="absolute inset-0 p-[24px] md:p-[32px] flex flex-col justify-end z-20">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-accent font-mono text-[11px] mb-[12px]">AI / SYSTEM</div>
                        <h3 className="text-[22px] md:text-[28px] font-medium tracking-[-.03em] text-text mb-[8px] group-hover:text-accent transition-colors">Horizon AI</h3>
                        <p className="text-muted text-[14px] leading-[1.6] max-w-[480px]">A role-driven multi-agent system designed to optimize the reasoning and workflow automation of Small Language Models (SLMs).</p>
                      </div>
                      <span className="hidden md:flex items-center justify-center w-[40px] h-[40px] rounded-full bg-line text-text group-hover:bg-accent group-hover:text-[#111] transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-[10px] group-hover:translate-y-0">
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
                      </span>
                    </div>
                  </div>
                </a>

                {/* Project 2 (Small) */}
                <a href="https://gridworks.vercel.app/" target="_blank" className="group relative block aspect-square md:aspect-[4/3] rounded-[16px] overflow-hidden border border-line bg-transparent hover:border-accent/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1c1c21]/30 to-transparent z-10"></div>
                  <div className="absolute inset-y-0 right-0 w-3/4 md:w-1/2 z-0 opacity-10 group-hover:opacity-100 transition-all duration-500 flex items-center justify-end p-[24px] md:p-[40px] pointer-events-none">
                    <img src="/projects/gridworks-logo.png" alt="" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="absolute inset-0 p-[24px] flex flex-col justify-end z-20">
                    <div className="flex justify-between items-start mb-[auto]">
                      <div className="text-muted font-mono text-[10px]">WEB APP / UTILITY</div>
                      <span className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-line text-text group-hover:bg-accent group-hover:text-[#111] transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-[10px] group-hover:translate-y-0">
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">↗</span>
                      </span>
                    </div>
                    <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-.03em] text-text mb-[8px] group-hover:text-accent transition-colors">Gridworks</h3>
                    <p className="text-muted text-[13px] leading-[1.5]">Transform university schedule PDFs into clean, print-ready calendar grids in seconds.</p>
                  </div>
                </a>

                {/* Project 3 (Small) */}
                <a href="https://lunas.software/" target="_blank" className="group relative block aspect-square md:aspect-[4/3] rounded-[16px] overflow-hidden border border-line bg-transparent hover:border-accent/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#1c1c21]/30 to-transparent z-10"></div>
                  <div className="absolute inset-y-0 right-0 w-3/4 md:w-1/2 z-0 opacity-10 group-hover:opacity-100 transition-all duration-500 flex items-center justify-end p-[24px] md:p-[40px] pointer-events-none">
                    <img src="/projects/lunas-logo.png" alt="" className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="absolute inset-0 p-[24px] flex flex-col justify-end z-20">
                    <div className="flex justify-between items-start mb-[auto]">
                      <div className="text-muted font-mono text-[10px]">HEALTH-TECH / WEB</div>
                      <span className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-line text-text group-hover:bg-accent group-hover:text-[#111] transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-[10px] group-hover:translate-y-0">
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">↗</span>
                      </span>
                    </div>
                    <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-.03em] text-text mb-[8px] group-hover:text-accent transition-colors">Lunas</h3>
                    <p className="text-muted text-[13px] leading-[1.5]">A secure, web-based emergency medical passport for instant access to critical health data via QR code.</p>
                  </div>
                </a>
              </div>
            </section>

            {/* 02 Experience */}
            <section className="py-[54px] md:py-[70px]" id="experience">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Experience</h2>
              </div>
              <div className="border-t border-line">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line">
                  <div>
                    <div className="text-[17px] tracking-[-.03em] text-text">Software Engineer · Tech Corp</div>
                    <div className="text-muted text-[13px] leading-[1.6] mt-[8px] max-w-[560px]">Led development of core features. Built robust APIs and scaled cloud infrastructure.</div>
                  </div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap">2023 — NOW</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line">
                  <div>
                    <div className="text-[17px] tracking-[-.03em] text-text">Freelance Developer · Selected Clients</div>
                    <div className="text-muted text-[13px] leading-[1.6] mt-[8px] max-w-[560px]">Full-stack implementation and cloud strategy for various startups.</div>
                  </div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap">2021 — 2023</div>
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
