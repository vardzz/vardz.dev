"use client";

import React from "react";
import { motion } from "framer-motion";
import KineticGrid from "@/components/custom/KineticGrid";

export default function Hero() {
  const navItems = [
    { label: "WORK", href: "/work" },
    { label: "ABOUT", href: "/about" },
    { label: "Journey", href: "/journey" },
    { label: "CONTACT", href: "/contact" },
  ];

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const isDimmed = (index) => hoveredIndex !== null && hoveredIndex !== index;

  return (
    <section className="relative z-10 min-h-screen w-full overflow-hidden bg-base text-accent">
      <KineticGrid 
        backgroundColor="transparent"
        gridColor="rgba(255, 255, 255, 0.09)"
        dotColor="rgba(255, 255, 255, 0.12)"
        hoverColor="rgba(255, 255, 255, 0.6)"
        gridSize={60}
        dotSize={1}
        baseOpacity={0.08}
        repulsionStrength={-0.65}
        radius={250}
        cursorTrail={true}
        cursorTrailProps={{
          trailMode: "hover",
          trailLength: 0.2,
          trailColor: "#FFFFFF",
        }}
      />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center box-border px-6 pb-24 pt-24 md:px-12 md:pt-0">
        <div className="flex w-full max-w-6xl flex-col items-start gap-14 md:flex-row md:items-end md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex w-full flex-col pb-2 font-sans md:w-1/3 md:pb-10 md:pr-16"
          >
            <p 
              className="mb-6 text-xs font-bold uppercase tracking-[0.15em] text-accent"
            >
              JERICHO VARDE
            </p>
            <p 
              className="max-w-prose text-sm leading-[1.8] text-accent/80 lg:text-base"
            >
              Architecting cloud-native ecosystems and pioneering Multi-Agent SLM orchestration. Lead Full-Stack Engineer behind Dentara and Horizon AI.
            </p>
          </motion.div>

          <div className="flex w-full flex-col overflow-hidden pb-10 md:w-2/3 md:pr-8 md:pl-16">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                initial={{ opacity: 0, x: -12 }}
                animate={{
                  opacity: isDimmed(index) ? 0.15 : 1,
                  x: hoveredIndex === index ? 24 : 0,
                }}
                whileHover={{ x: 24, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                className="w-full origin-left cursor-pointer select-none text-left md:w-fit"
              >
                <motion.a
                  href={item.href}
                  animate={{
                    color: hoveredIndex === index ? "#F4EDE4" : "rgba(244, 237, 228, 0.22)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  className="block w-full max-w-full break-words hyphens-auto font-heading font-display font-bold text-5xl leading-[0.8] tracking-[-0.02em] uppercase sm:text-7xl md:text-8xl lg:text-[9vw] md:w-fit"
                  style={{ fontFamily: "var(--font-melodrama), Melodrama, serif" }}
                >
                  {item.label}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
