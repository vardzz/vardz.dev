// src/components/custom/Experience.jsx
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function Experience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const experiences = [
    {
      year: "2022/06",
      title: 'SYSTEM.OUT.PRINTLN("HELLO WORLD")',
      role: "LEARNING",
      desc: "Wrote my first line of code, and the rest is history.",
    },
    {
      year: "2023/08",
      title: "B.S. IN COMPUTER SCIENCE",
      role: "ACADEMIA",
      desc: "Commenced formal academic training with a rigorous focus on algorithmic logic, data structures, and software architecture.",
    },
    {
      year: "2024/11",
      title: "E-COMMERCE PROTOTYPE",
      role: "WEB DEV",
      desc: "Engineered a digital storefront utilizing semantic HTML and structural CSS to solidify core web principles.",
    },
    {
      year: "2025/10",
      title: "FIRST-GENERATION DIGITAL PORTFOLIO",
      role: "V1.0",
      desc: "Developed a personal portfolio utilizing React.js to showcase emerging frontend capabilities.",
    },
    {
      year: "2026/02",
      title: "DEVELOPING OUR THESIS SYSTEM | HORIZON AI",
      role: "THESIS PROJECT",
      desc: "Developing a specialized Java refactoring studio designed for automated code optimization and architectural analysis.",
    },
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-32 md:py-48 pl-20 md:pl-24 overflow-hidden"
      style={{ backgroundColor: "#F4EDE4", color: "#111111" }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Dotted grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.2, 1, 0.3, 1] }}
          className="mb-24"
        >
          <span
            className="text-[10px] tracking-[0.3em] font-bold uppercase mb-4 block"
            style={{ color: "rgba(17,17,17,0.5)" }}
          >
            Career Journey
          </span>
          <h2
            className="font-heading font-display text-4xl md:text-7xl font-black uppercase tracking-tighter"
            style={{ color: "#111111" }}
          >
            The Chronicle
          </h2>
        </motion.div>

        {/* Timeline Items Container */}
        <div className="space-y-32 md:space-y-48 relative">

          {/* Static background line */}
          <div
            className="absolute top-0 bottom-0 left-[15px] md:left-1/2 w-[1px] -translate-x-1/2"
            style={{ backgroundColor: "rgba(17,17,17,0.12)" }}
          />

          {/* Growing progress line */}
          <motion.div
            className="absolute top-0 left-[15px] md:left-1/2 w-[1px] origin-top z-20 -translate-x-1/2"
            style={{ scaleY, height: "100%", backgroundColor: "#111111" }}
          />

          {/* Following glow dot */}
          <motion.div
            className="absolute left-[15px] md:left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
            style={{
              top: useTransform(scaleY, (v) => `${v * 100}%`),
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#111111",
              boxShadow: "0 0 0 3px #F4EDE4, 0 0 0 5px #111111, 0 0 24px 6px rgba(17,17,17,0.35)",
            }}
          />

          {experiences.map((exp, idx) => (
            <ExperienceItem key={idx} exp={exp} isEven={idx % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ exp, isEven }) {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0.07, 0.07, 0]);
  const y       = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Bullet pulse at midpoint
  const bulletScale = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [1, 1.8, 1]);
  const bulletGlow  = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    [
      "0 0 0px rgba(17,17,17,0)",
      "0 0 16px 4px rgba(17,17,17,0.5)",
      "0 0 0px rgba(17,17,17,0)",
    ]
  );

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease: [0.2, 1, 0.3, 1] }}
      className="relative flex flex-col md:flex-row items-center w-full"
    >
      {/* Watermark year */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[18vw] font-black uppercase tracking-tighter whitespace-nowrap pointer-events-none select-none z-0"
        style={{ opacity, y, color: "#111111" }}
      >
        {exp.year}
      </motion.div>

      {/* Content side */}
      <div
        className={`w-full md:w-1/2 relative z-10 flex ${
          isEven ? "md:justify-end md:pr-20" : "md:order-2 md:justify-start md:pl-20"
        }`}
      >
        <div
          className={`relative w-full max-w-lg pl-12 md:pl-0 ${
            isEven ? "text-left md:text-right" : "text-left"
          }`}
        >
          {/* Animated bullet on the line */}
          <motion.div
            className={`absolute top-[10px] md:top-1/2 md:-translate-y-1/2 w-2 h-2 rounded-full z-30 ${
              isEven
                ? "left-[-4px] md:right-[-84px] md:left-auto"
                : "left-[-4px] md:left-[-84px]"
            }`}
            style={{
              backgroundColor: "#111111",
              scale: bulletScale,
              boxShadow: bulletGlow,
            }}
          />

          {/* Year tag */}
          <motion.span
            initial={{ opacity: 0, x: isEven ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.2, 1, 0.3, 1], delay: 0.1 }}
            className="text-[10px] tracking-[0.25em] font-bold uppercase mb-3 block"
            style={{ color: "rgba(17,17,17,0.4)" }}
          >
            {exp.year}
          </motion.span>

          <h3
            className="font-heading font-display text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2"
            style={{ color: "#111111" }}
          >
            {exp.title}
          </h3>

          <div
            className="text-[10px] tracking-[0.2em] uppercase font-bold mb-5 block"
            style={{ color: "rgba(17,17,17,0.5)" }}
          >
            {exp.role}
          </div>

          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "rgba(17,17,17,0.65)" }}
          >
            {exp.desc}
          </p>
        </div>
      </div>

      {/* Buffer side */}
      <div className={`hidden md:block w-1/2 ${isEven ? "" : "order-1"}`} />
    </motion.div>
  );
}