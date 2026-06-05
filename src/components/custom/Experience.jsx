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
      title: 'print ("HELLO WORLD")',
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
      year: "2026/02",
      title: "HORIZON AI",
      role: "THESIS PROJECT",
      desc: "Developing a specialized Java refactoring studio designed for automated code optimization and architectural analysis.",
    },
    {
      year: "2026/05",
      title: "FIRST HACKATHON",
      role: "Lunas | Your medical passport, always with you",
      desc: "Out of over 70 competing teams nationwide, we secured our ticket to the final round and broke into the Top 8 at SIKAPTALA 2026 with Lunas—a secure, web-based emergency medical passport that grants immediate, QR-code access to critical health data.",
    },
    {
      year: "2026/05",
      title: "INTERNATIONAL HACKATHON",
      role: "GhostNet AI | Autonomous Brand Protection & Phishing Detector",
      desc: "Built at LABLAB.AI's global hackathon among 2,500 developers, GhostNet AI automates phishing and brand threat detection within two minutes. As Technical Lead, I orchestrated the architecture and led a 5-member team. I also engineered the web intelligence pipeline, using Gemini API to analyze scraped DOM payloads.",
    },
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative overflow-hidden px-6 py-32 md:py-48"
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

      <div className="relative z-10 mx-auto max-w-[1400px] px-0 md:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.2, 1, 0.3, 1] }}
         
          className="mb-24 flex flex-col items-center text-center"
        >
          <span
            className="text-[10px] tracking-[0.3em] font-bold uppercase mb-4 inline-block"
            style={{ color: "rgba(17,17,17,0.5)" }}
          >
            Career Journey
          </span>
          <h2
            className="font-heading font-display text-[clamp(2.75rem,7vw,5.5rem)] font-black uppercase tracking-tighter break-words hyphens-auto"
            style={{ color: "#111111" }}
          >
            The Chronicle
          </h2>
        </motion.div>

        {/* Timeline Items Container */}
        <div className="relative space-y-24 md:space-y-48">

          {/* Static background line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-[1px] -translate-x-1/2 md:left-1/2"
            style={{ backgroundColor: "rgba(17,17,17,0.12)" }}
          />

          {/* Growing progress line */}
          <motion.div
            className="absolute left-4 top-0 z-20 w-[1px] origin-top -translate-x-1/2 md:left-1/2"
            style={{ scaleY, height: "100%", backgroundColor: "#111111" }}
          />

          {/* Following glow dot */}
          <motion.div
            className="absolute left-4 z-30 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
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

  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

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
      className="relative flex w-full flex-col items-start md:flex-row md:items-center"
    >
      {/* Watermark year */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[20vw] font-playful font-black uppercase tracking-normal opacity-10 sm:text-[16vw] md:text-[18vw]"
        style={{ y, color: "#111111" }}
      >
        {exp.year}
      </motion.div>

      {/* Content side */}
      <div
        className={`relative z-10 flex w-full md:w-1/2 ${
          isEven ? "md:justify-end md:pr-20" : "md:order-2 md:justify-start md:pl-20"
        }`}
      >
        <div
          className={`relative w-full max-w-lg pl-10 md:pl-0 ${
            isEven ? "text-left md:text-right" : "text-left"
          }`}
        >
          {/* Animated bullet on the line */}
          <motion.div
            className={`absolute left-4 top-[10px] z-30 h-2 w-2 -translate-x-1/2 rounded-full md:top-1/2 md:-translate-y-1/2 ${
              isEven
                ? "md:right-[-84px] md:left-auto"
                : "md:left-[-84px]"
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
            className="mb-2 break-words font-heading font-display text-3xl font-black uppercase tracking-tighter md:text-4xl"
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
            className="text-sm leading-relaxed md:text-base"
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