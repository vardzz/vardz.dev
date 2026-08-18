"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [commits, setCommits] = useState<string>("...");
  const [showResumeHint, setShowResumeHint] = useState(false);
  const [showTypingTestHint, setShowTypingTestHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResumeHint(true);
    }, 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTypingTestHint(true);
    }, 60000); // 60 seconds
    return () => clearTimeout(timer);
  }, []);

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
    <section className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0 pb-[80px]">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
        {/* Left: Image */}
        <Link href="https://www.overleaf.com/read/pzbvhvhjqnfx#c6fa02" target="_blank" className="w-full md:w-1/2 aspect-square relative bg-bg rounded-2xl overflow-hidden group block">
            <Image
              src="/assets/vardz-image.png"
              alt="Jericho Varde"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover mix-blend-luminosity opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
            />
            
            {/* View Resume Hint */}
            <div 
              className={`absolute bottom-[24px] right-[24px] bg-surface/90 backdrop-blur-sm border border-line px-[16px] py-[10px] rounded-full text-text font-mono text-[11px] uppercase tracking-[.1em] transition-all duration-1000 ease-out flex items-center gap-[8px]
              ${showResumeHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px] pointer-events-none'}`}
            >
              View resume 
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
            </div>
        </Link>
        
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
            <Link href="/email" className="group hover:text-accent transition-colors">
              email <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-[80px] relative">
        {/* Floating Typing Test Hint */}
        <div className={`absolute -top-[30px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 text-[11px] font-mono text-muted pointer-events-none whitespace-nowrap transition-all duration-1000 ${showTypingTestHint ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-text opacity-40"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-text opacity-70"></span>
          </span>
          <span>Try <span className="px-1.5 py-0.5 rounded bg-surface border border-line">Alt</span> + <span className="px-1.5 py-0.5 rounded bg-surface border border-line">K</span> for typing test</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-line">
          <div className="py-[30px] md:py-[40px] pr-[16px] md:pr-[20px]">
            <div className="text-[20px] md:text-[24px] font-medium text-text mb-[8px]">{commits}</div>
            <div className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em]">Commits</div>
          </div>
          <div className="py-[30px] md:py-[40px] pl-[16px] md:pl-[20px] border-l border-line">
            <div className="text-[20px] md:text-[24px] font-medium text-text mb-[8px]">2+ yrs</div>
            <div className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em]">Experience</div>
          </div>
          <div className="py-[30px] md:py-[40px] pr-[16px] md:pr-0 md:pl-[20px] border-t md:border-t-0 border-l-0 md:border-l border-line">
            <div className="text-[20px] md:text-[24px] font-medium text-text mb-[8px]">5x</div>
            <div className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em]">Hackathons</div>
          </div>
          <div className="py-[30px] md:py-[40px] pl-[16px] md:pl-[20px] border-t md:border-t-0 border-l border-line">
            <div className="text-[20px] md:text-[24px] font-medium text-text mb-[8px]">24/7</div>
            <div className="text-muted font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em]">Coffee Powered</div>
          </div>
        </div>
      </div>
    </section>
  );
}
