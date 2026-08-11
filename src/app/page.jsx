"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Portfolio() {
  
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
  }, []);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[224px_minmax(0,1fr)]">
      
      {/* Left Rail */}
      <aside className="relative md:sticky top-0 h-auto md:h-screen border-b md:border-b-0 md:border-r border-line bg-[rgba(16,16,19,.92)] px-[20px] py-[22px] md:px-[27px] md:py-[29px] flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start z-10">
        <Link href="#top" className="font-serif text-[17px] tracking-[-.03em] text-text">
          Vardz <em className="text-accent not-italic">Code</em>
        </Link>
        <div className="hidden md:block mt-[86px] text-muted font-mono text-[11px] leading-[1.8]">
          BUILDING DIGITAL<br/><span className="text-accent">THINGS WITH INTENT</span><br/><br/>
          MANILA / UTC+8
        </div>
        <div className="hidden md:block mt-auto">
          <div className="flex items-center gap-[9px] text-soft text-[11px]">
            <i className="w-[7px] h-[7px] rounded-full bg-accent shadow-[0_0_0_5px_var(--color-accent-dim)]"></i>
            available for select work
          </div>
          <a className="block mt-[18px] text-soft font-mono text-[11px] hover:text-accent transition-colors" href="mailto:hello@vardz.dev">
            ↳ hello@vardz.dev
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main id="top" className="min-w-0">
        <div className="block">
          
          {/* Hero Section */}
          <section className="max-w-[1040px] mx-auto px-[22px] md:px-[9vw] pt-[74px] md:pt-[108px] pb-[80px] md:min-h-[93vh] block md:grid content-center md:grid-cols-[minmax(220px,330px)_1fr] gap-y-[45px] md:gap-[clamp(42px,8vw,110px)]">
            <div className="aspect-square bg-gradient-to-br from-[#35363b] to-[#17171a] to-62% relative overflow-hidden grid place-items-center w-[min(70vw,300px)] md:w-full mx-auto md:mx-0">
              <div className="absolute w-[60%] aspect-square rounded-[48%_48%_43%_43%] bg-[#bdbdc1] top-[17%] contrast-75"></div>
              <div className="absolute font-medium text-[clamp(45px,7vw,83px)] leading-none font-mono tracking-[-.14em] text-[#101013] top-[40%] left-[25%] opacity-80">VC</div>
              <span className="absolute left-[18px] bottom-[15px] z-[1] text-[#f3f3f3] font-mono text-[10px] tracking-[.08em]">PORTRAIT / 2026</span>
            </div>
            <div>
              <div className="text-accent font-mono text-[11px] tracking-[.1em] uppercase">Software Engineer · Cloud Enthusiast</div>
              <h1 className="my-[17px] md:mb-[21px] text-[clamp(46px,7vw,94px)] leading-[.92] tracking-[-.075em] font-medium text-text">Jericho<br/>Varde</h1>
              <p className="max-w-[510px] text-soft text-[clamp(16px,1.6vw,19px)] leading-[1.6]">I build robust, scalable digital solutions for the web. Currently exploring the space where modern cloud architecture meets seamless user experience.</p>
              <div className="flex gap-[24px] mt-[30px] text-muted font-mono text-[11px]">
                <a href="https://github.com" target="_blank" className="hover:text-accent transition-colors">github ↗</a>
                <a href="https://www.linkedin.com" target="_blank" className="hover:text-accent transition-colors">linkedin ↗</a>
                <a href="mailto:hello@vardz.dev" className="hover:text-accent transition-colors">email ↗</a>
              </div>
            </div>
          </section>

          {/* Sections Wrap */}
          <div className="max-w-[1040px] mx-auto px-[22px] md:px-[9vw]">
            
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
        <form className="sticky bottom-[18px] z-30 w-[min(680px,calc(100%-36px))] mx-auto mt-[-65px] md:mt-[-94px] mb-[18px] bg-[rgba(20,20,25,.96)] border border-[#45454d] shadow-[0_12px_40px_rgba(0,0,0,.35)] p-[9px] flex gap-[10px] transition-[border-color,box-shadow] duration-250 focus-within:border-accent focus-within:shadow-[0_0_0_4px_var(--color-accent-dim),0_12px_40px_rgba(0,0,0,.4)]">
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

      </main>
    </div>
  );
}

