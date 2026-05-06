"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const navItems = [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
  ];

  const [activeItem, setActiveItem] = React.useState(null);

  const isDimmed = (label) => activeItem && activeItem !== label;

  return (
    <section className="relative z-10 ml-0 min-h-screen w-full overflow-hidden bg-white px-12 py-12 text-black transition-colors duration-700 ease-in-out dark:bg-[#050505] dark:text-white sm:ml-20 md:ml-24 lg:px-12">
      <div className="relative grid min-h-screen grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex max-w-xl flex-col justify-end self-end pb-24 lg:pb-24"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-black dark:text-white">
            JERICHO VARDE
          </p>
          <p className="max-w-sm text-base leading-relaxed text-zinc-400 sm:text-lg">
            Architecting cloud-native ecosystems and pioneering Multi-Agent SLM orchestration. Lead Full-Stack Engineer behind Dentara and Horizon AI.
          </p>
        </motion.div>

        <div className="flex w-full flex-col justify-center gap-1 pb-20 lg:pb-0">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onHoverStart={() => setActiveItem(item.label)}
              onHoverEnd={() => setActiveItem(null)}
              onFocus={() => setActiveItem(item.label)}
              onBlur={() => setActiveItem(null)}
              initial={{ opacity: 0, x: -14 }}
              animate={{
                opacity: isDimmed(item.label) ? 0.2 : activeItem ? 1 : 0.4,
                x: activeItem === item.label ? 40 : 0,
                color: activeItem === item.label ? "#ffffff" : "#d4d4d8",
              }}
              whileHover={{ x: 40, color: "#ffffff" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="origin-left w-fit uppercase leading-[0.85] tracking-tight text-zinc-300"
              style={{ fontFamily: "'Stardom', 'Playfair Display', 'Times New Roman', serif" }}
            >
              <motion.div className="text-6xl font-normal sm:text-7xl lg:text-[8vw]">
                {item.label}
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
