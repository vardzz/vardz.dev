"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [commits, setCommits] = useState<string>("...");

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch('/api/github?t=' + Date.now());
        const json = await res.json();
        if (json.data && (json.data.user || json.data.viewer)) {
          const userObj = json.data.user || json.data.viewer;
          const total = userObj.contributionsCollection.contributionCalendar.totalContributions;
          let formattedCommits = total.toString();
          if (total >= 1000) {
            formattedCommits = (total / 1000).toFixed(1) + "K+";
          }
          setCommits(formattedCommits);
        }
      } catch (e) {
        console.error("Failed to fetch commits", e);
        setCommits("1.2K+");
      }
    }
    fetchCommits();
  }, []);

  return (
    <section className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0 pt-6 pb-[80px]">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 aspect-square relative bg-[#1c1c21]">
            <Image src="/assets/vardz-image.png" alt="Jericho Varde" layout="fill" objectFit="cover" className="grayscale" />
        </div>
        
        {/* Right: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center mt-2 md:mt-0">
          <h1 className="text-[38px] md:text-[44px] font-mono font-medium tracking-tight text-text mb-[24px]">Jericho Varde</h1>
          
          <div className="text-soft text-[15px] leading-[1.8] max-w-[480px] space-y-[20px]">
            <p>I'm a full-stack developer and cloud enthusiast. I design and build scalable web applications, modern cloud infrastructure, and intelligent systems. Focused on taking ideas from architectural concept to production-ready software.</p>
          </div>
          
          <div className="flex gap-[20px] mt-[36px] text-muted font-mono text-[12px]">
            <a href="https://github.com/vardzz" target="_blank" className="group hover:text-accent transition-colors">
              github <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/vardz/" target="_blank" className="group hover:text-accent transition-colors">
              linkedin <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
            </a>
            <a href="mailto:vardejericho@gmail.com" className="group hover:text-accent transition-colors">
              email <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-[80px] grid grid-cols-2 md:grid-cols-4 border-t border-[rgba(244,237,228,0.15)]">
        <div className="py-[30px] md:py-[40px] pr-[16px] md:pr-[20px]">
          <div className="text-[20px] md:text-[24px] font-medium text-text mb-[8px] flex items-center gap-[6px]">{commits} <span className="text-muted text-[13px] font-mono">↗</span></div>
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
  );
}
