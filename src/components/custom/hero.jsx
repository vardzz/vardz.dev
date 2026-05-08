"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const navItems = [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "/about" },
    { label: "Journey", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
  ];

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const isDimmed = (index) => hoveredIndex !== null && hoveredIndex !== index;

  return (
    <section className="relative z-10 min-h-screen w-full overflow-x-hidden bg-base text-accent pl-20 box-border md:pl-24">
      <div className="flex min-h-screen w-full items-center box-border">
        <div className="flex w-full items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex w-1/3 flex-col pb-10 pr-8 pl-8 font-sans lg:pl-16"
          >
            <p 
              className="mb-6 text-xs font-bold uppercase tracking-[0.15em] text-accent"
            >
              JERICHO VARDE
            </p>
            <p 
              className="max-w-[320px] text-sm leading-[1.8] text-accent/80 lg:text-base"
            >
              Architecting cloud-native ecosystems and pioneering Multi-Agent SLM orchestration. Lead Full-Stack Engineer behind Dentara and Horizon AI.
            </p>
          </motion.div>

          <div className="flex w-2/3 flex-col overflow-hidden pb-10 pr-8 pl-4 lg:pr-12 lg:pl-8">
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
                className="w-fit origin-left cursor-pointer select-none text-left"
              >
                <motion.a
                  href={item.href}
                  animate={{
                    color: hoveredIndex === index ? "#F4EDE4" : "rgba(244, 237, 228, 0.22)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  className="block w-fit font-heading font-display font-bold text-[12vw] leading-[0.9] tracking-[-0.02em] uppercase lg:text-[10vw]"
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
