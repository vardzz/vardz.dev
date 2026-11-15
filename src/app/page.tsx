"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Hero from "../components/root/Hero";
import Projects from "../components/root/Projects";
import Experience from "../components/root/Experience";
import Certifications from "../components/root/Certifications";
import Github from "../components/root/Github";
import Stack from "../components/root/Stack";
import Recommendations from "../components/root/Recommendations";
import ChatPrompts from "../components/root/ChatPrompts";
import ScrollReveal from "../components/layout/ScrollReveal";

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
          <ScrollReveal distance={20} duration={750}>
            <Hero />
          </ScrollReveal>

          {/* Sections Wrap */}
          <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0">
            
            {/* 01 Projects */}
            <ScrollReveal distance={24} duration={750}>
              <Projects />
            </ScrollReveal>

            {/* 02 Experience */}
            <ScrollReveal distance={24} duration={750}>
              <Experience />
            </ScrollReveal>

            {/* 03 Stack */}
            <ScrollReveal distance={24} duration={750}>
              <Stack />
            </ScrollReveal>

            {/* 04 Certifications */}
            <ScrollReveal distance={24} duration={750}>
              <Certifications />
            </ScrollReveal>

            {/* 05 Recommendations */}
            <ScrollReveal distance={24} duration={750}>
              <Recommendations />
            </ScrollReveal>

            {/* 06 Github */}
            <ScrollReveal distance={24} duration={750}>
              <Github />
            </ScrollReveal>

            {/* 07 Chat Prompts */}
            <ScrollReveal distance={24} duration={750}>
              <ChatPrompts />
            </ScrollReveal>

          </div>
        </div>
        
        {/* Invisible element to trigger the observer */}
        <div ref={bottomRef} className="h-[10px] w-full mt-[-10px]"></div>

      </main>
    </div>
  );
}
