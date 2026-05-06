"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [activeItem, setActiveItem] = React.useState(null);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const backgroundGlow = useMotionTemplate`radial-gradient(900px circle at ${smoothX}px ${smoothY}px, rgba(0,0,0,0.035), transparent 65%)`;

  const navItems = [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CERTIFICATES", href: "#certificates" },
    { label: "CONTACT", href: "#contact" },
  ];

  const getOpacity = (label) => {
    if (!activeItem) {
      return 0.4;
    }

    return activeItem === label ? 1 : 0.1;
  };

  return (
    <section className="relative z-10 ml-0 min-h-screen w-full overflow-hidden bg-white px-8 py-20 text-black transition-colors duration-700 ease-in-out dark:bg-[#050505] dark:text-white sm:ml-20 md:ml-24 md:px-16">
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: backgroundGlow }} />

      <div className="relative grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-20 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-xl flex-col justify-end self-end pb-8 lg:pb-12"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-black dark:text-white">
            JERICHO VARDE
          </p>
          <p className="max-w-sm text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
            Architecting cloud-native ecosystems and pioneering Multi-Agent SLM orchestration. Lead Full-Stack Engineer behind Dentara and Horizon AI.
          </p>
        </motion.div>

        <div className="flex w-full flex-col justify-center gap-2 pb-24 lg:pb-12">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onHoverStart={() => setActiveItem(item.label)}
              onHoverEnd={() => setActiveItem(null)}
              onFocus={() => setActiveItem(item.label)}
              onBlur={() => setActiveItem(null)}
              initial={{ opacity: 0, x: -18 }}
              animate={{
                opacity: getOpacity(item.label),
                x: activeItem === item.label ? 30 : 0,
                skewX: activeItem === item.label ? -5 : 0,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="origin-left w-fit uppercase leading-[0.85] tracking-tighter text-black dark:text-white"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <motion.div className="text-5xl font-black sm:text-6xl md:text-[7vw] lg:text-[8vw] xl:text-[7.5vw]">
                {item.label}
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
