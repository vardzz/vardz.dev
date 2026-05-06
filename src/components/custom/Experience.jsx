"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function Experience() {
  const containerRef = useRef(null);
  
  // Track scroll progress within the container for the progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth out the scroll progress for natural movement
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences = [
    { 
      year: "2022/06", 
      title: "SYSTEM.OUT.PRINTLN(\"HELLO WORLD\")", 
      role: "LEARNING", 
      desc: "Wrote my first line of code, and the rest is history." 
    },
    { 
      year: "2023/08", 
      title: "B.S. IN COMPUTER SCIENCE", 
      role: "ACADEMIA", 
      desc: "Commenced formal academic training with a rigorous focus on algorithmic logic, data structures, and software architecture." 
    },
    { 
      year: "2024/11", 
      title: "E-COMMERCE PROTOTYPE", 
      role: "WEB DEV", 
      desc: "Engineered a digital storefront utilizing semantic HTML and structural CSS to solidify core web principles." 
    },
    { 
      year: "2025/10", 
      title: "FIRST-GENERATION DIGITAL PORTFOLIO", 
      role: "V1.0", 
      desc: "Developed a personal portfolio utilizing React.js to showcase emerging frontend capabilities." 
    },
    { 
      year: "2026/02", 
      title: "DEVELOPING OUR THESIS SYSTEM | HORIZON AI", 
      role: "THESIS PROJECT", 
      desc: "Developing a specialized Java refactoring studio designed for automated code optimization and architectural analysis." 
    }
  ];

  return (
    <section id="experience" ref={containerRef} className="relative bg-base text-accent py-32 md:py-48 overflow-hidden">
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-24">
          <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-muted-foreground mb-4 block opacity-60">Career Journey</span>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">The Chronicle</h2>
        </div>

        {/* Timeline Items Container */}
        <div className="space-y-32 md:space-y-48 relative">
          
          {/* Progress Connecting Line */}
          <div className="absolute top-0 bottom-0 left-[15px] md:left-1/2 w-[1px] bg-foreground/10" />
          
          <motion.div 
            className="absolute top-0 left-[15px] md:left-1/2 w-[1px] bg-foreground origin-top z-20"
            style={{ scaleY, height: "100%" }}
          />

          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <ExperienceItem 
                key={idx} 
                exp={exp} 
                isEven={isEven} 
                idx={idx}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

function ExperienceItem({ exp, isEven, idx }) {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  // Animate the background date's opacity and parallax as it crosses the viewport
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.1, 0.03]);
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <motion.div 
      ref={itemRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.98, filter: "blur(4px)" },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: "blur(0px)",
          transition: { duration: 1, ease: [0.215, 0.61, 0.355, 1] }
        }
      }}
      className="relative flex flex-col md:flex-row items-center w-full"
    >
      {/* Background Date Watermark */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[18vw] font-black uppercase tracking-tighter whitespace-nowrap pointer-events-none select-none z-0"
        style={{ opacity, y, color: "var(--foreground)" }}
      >
        {exp.year}
      </motion.div>

      {/* Content Side */}
      <div className={`w-full md:w-1/2 relative z-10 flex ${isEven ? 'md:justify-end md:pr-20' : 'md:order-2 md:justify-start md:pl-20'}`}>
        
        <div className={`relative w-full max-w-lg pl-12 md:pl-0 ${isEven ? 'text-left md:text-right' : 'text-left'}`}>
          {/* Animated Square Bullet */}
          <motion.div 
            className={`absolute top-[10px] md:top-1/2 md:-translate-y-1/2 w-2 h-2 bg-foreground rounded-full z-30 ${isEven ? 'left-[-4px] md:right-[-84px] md:left-auto' : 'left-[-4px] md:left-[-84px]'}`}
            style={{ 
              scale: useTransform(scrollYProgress, [0.45, 0.5, 0.55], [1, 2, 1]),
              boxShadow: useTransform(scrollYProgress, [0.45, 0.5, 0.55], ["0px 0px 0px var(--foreground)", "0px 0px 20px var(--foreground)", "0px 0px 0px var(--foreground)"])
            }}
          />

          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">
            {exp.title}
          </h3>
          <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-muted-foreground mb-6 block">
            {exp.role}
          </div>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {exp.desc}
          </p>
        </div>

      </div>

      {/* Buffer Side */}
      <div className={`hidden md:block w-1/2 ${isEven ? '' : 'order-1'}`} />

    </motion.div>
  );
}
