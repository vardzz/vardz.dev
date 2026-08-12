"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/root/Hero";
import Projects from "../components/root/Projects";
import Experience from "../components/root/Experience";
import Certifications from "../components/root/Certifications";
import Github from "../components/root/Github";
import Stack from "../components/root/Stack";
import Chatbox from "../components/layout/Chatbox";

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
        
        {/* Chatbox component */}
        <Chatbox isVisible={hasReachedBottom} />
        
        {/* Invisible element to trigger the observer */}
        <div ref={bottomRef} className="h-[10px] w-full mt-[-10px]"></div>

      </main>
    </div>
  );
}
