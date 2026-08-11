"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Portfolio() {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [theme, setTheme] = useState('dark');
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

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
      <nav className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0 pt-10 pb-4 flex justify-between items-center w-full">
        <div className="font-mono font-medium text-text text-[16px]">Vardz</div>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-muted hover:text-text transition-colors font-mono text-[12px] uppercase cursor-pointer"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      {/* Main Content */}
      <main id="top" className="min-w-0">
        <div className="block">
          
          {/* Hero Section */}
          <section className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0 pt-6 pb-[80px]">
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
              {/* Left: Image */}
              <div className="w-full max-w-[200px] md:max-w-[220px] aspect-square relative bg-[#1c1c21]">
                 <Image src="/assets/Vardz-dark.png" alt="Jericho Varde" layout="fill" objectFit="cover" className="grayscale" />
              </div>
              
              {/* Right: Content */}
              <div className="flex-1 mt-2 md:mt-0">
                <h1 className="text-[38px] md:text-[44px] font-mono font-medium tracking-tight text-text mb-[24px]">Jericho Varde</h1>
                
                <div className="text-soft text-[15px] leading-[1.8] max-w-[480px] space-y-[20px]">
                  <p>I'm a full-stack engineer and cloud enthusiast. I build robust, scalable digital solutions for the web, and these days I'm focused on cloud architecture.</p>
                  <p>Right now I'm building cool new stuff every day. I love turning rough ideas into things people actually use.</p>
                </div>
                
                <div className="flex gap-[20px] mt-[36px] text-muted font-mono text-[12px]">
                  <a href="https://github.com" target="_blank" className="hover:text-accent transition-colors">github ↗</a>
                  <a href="https://www.linkedin.com" target="_blank" className="hover:text-accent transition-colors">linkedin ↗</a>
                  <a href="mailto:hello@vardz.dev" className="hover:text-accent transition-colors">email ↗</a>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-[70px] md:mt-[90px] grid grid-cols-2 md:grid-cols-4 border-t border-[rgba(244,237,228,0.15)]">
              <div className="py-[30px] md:py-[40px] pr-[16px] md:pr-[20px]">
                <div className="text-[20px] md:text-[24px] font-medium text-text mb-[8px] flex items-center gap-[6px]">1.2K+ <span className="text-muted text-[13px] font-mono">↗</span></div>
                <div className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em]">Commits</div>
              </div>
              <div className="py-[30px] md:py-[40px] pl-[16px] md:pl-[20px] border-l border-[rgba(244,237,228,0.15)]">
                <div className="text-[20px] md:text-[24px] font-medium text-text mb-[8px] flex items-center gap-[6px]">2+ yrs <span className="text-muted text-[13px] font-mono">↗</span></div>
                <div className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em]">Experience</div>
              </div>
              <div className="py-[30px] md:py-[40px] pr-[16px] md:pr-0 md:pl-[20px] border-t md:border-t-0 border-l-0 md:border-l border-[rgba(244,237,228,0.15)]">
                <div className="text-[20px] md:text-[24px] font-medium text-text mb-[8px] flex items-center gap-[6px]">5x <span className="text-muted text-[13px] font-mono">↗</span></div>
                <div className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em]">Hackathons</div>
              </div>
              <div className="py-[30px] md:py-[40px] pl-[16px] md:pl-[20px] border-t md:border-t-0 border-l border-[rgba(244,237,228,0.15)]">
                <div className="text-[20px] md:text-[24px] font-medium text-text mb-[8px] flex items-center gap-[6px]">24/7 <span className="text-muted text-[13px] font-mono">↗</span></div>
                <div className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em]">Coffee Powered</div>
              </div>
            </div>
          </section>

          {/* Sections Wrap */}
          <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0">
            
            {/* 01 Projects */}
            <section className="py-[54px] md:py-[70px] border-t border-line" id="projects">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Selected projects</h2>
                <span className="text-muted font-mono text-[11px]">01 / 06</span>
              </div>
              <p className="max-w-[590px] text-soft leading-[1.75] m-0 mb-[36px]">A selection of applications, systems, and experiments I’ve helped bring from rough idea to production.</p>
              <div className="border-t border-line">
                <a className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line group" href="#">
                  <div>
                    <div className="text-[17px] tracking-[-.03em] transition-colors group-hover:text-accent text-text">Secret App — Secure messaging</div>
                    <div className="text-muted text-[13px] leading-[1.6] mt-[8px] max-w-[560px]">A full-stack secure platform designed around privacy and rapid real-time communication.</div>
                  </div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap">2026 · FULL-STACK</div>
                </a>
                <a className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line group" href="#">
                  <div>
                    <div className="text-[17px] tracking-[-.03em] transition-colors group-hover:text-accent text-text">Cloud Automator — Infrastructure made simple</div>
                    <div className="text-muted text-[13px] leading-[1.6] mt-[8px] max-w-[560px]">An orchestrator for provisioning and deploying AWS resources with minimal configuration.</div>
                  </div>
                  <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap">2025 · CLOUD / BACKEND</div>
                </a>
              </div>
            </section>

            {/* 02 Experience */}
            <section className="py-[54px] md:py-[70px] border-t border-line" id="experience">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Experience</h2>
                <span className="text-muted font-mono text-[11px]">02 / 06</span>
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
            <section className="py-[54px] md:py-[70px] border-t border-line" id="stack">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Tech stack</h2>
                <span className="text-muted font-mono text-[11px]">03 / 06</span>
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
            <section className="py-[54px] md:py-[70px] border-t border-line" id="certifications">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Certifications</h2>
                <span className="text-muted font-mono text-[11px]">04 / 06</span>
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
            <section className="py-[54px] md:py-[70px] border-t border-line" id="github">
              <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
                <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Github activity</h2>
                <span className="text-muted font-mono text-[11px]">05 / 06</span>
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
                <div className="text-muted font-mono text-[11px] tracking-[.1em] uppercase">06 / 06 · your move</div>
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
