// src/components/custom/about.jsx
"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function About() {
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const [mounted, setMounted] = React.useState(false);

  // ── useInView instead of whileInView for reliable trigger ──────────
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  React.useEffect(() => { setMounted(true); }, []);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-15, 15]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - left) / width);
    y.set((e.clientY - top) / height);
  };
  const handleMouseLeave = () => { x.set(0.5); y.set(0.5); };

  return (
    <div className="relative w-full bg-base text-accent">
      <section
        id="about"
        className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-12 px-6 py-16 md:items-start md:gap-20 md:px-12 md:py-32 lg:grid-cols-12"
      >
        {/* ── Left Column — Waterfall Stagger ─────────────────────────── */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-20 col-span-1 flex max-w-prose flex-col justify-center md:pt-6 lg:col-span-7 lg:pt-10 xl:col-span-8"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-4 font-heading font-display text-[clamp(3.5rem,10vw,7rem)] font-bold leading-none tracking-tighter"
          >
            About
          </motion.h2>

          <motion.h3
            variants={itemVariants}
            className="mb-12 font-heading font-display text-2xl font-bold leading-tight tracking-tight text-accent md:text-3xl lg:text-4xl"
          >
            I'm Vardz. A developer, systems thinker, and aspiring Cloud Engineer.
          </motion.h3>

          <motion.p variants={itemVariants} className="mb-6 text-lg leading-relaxed text-accent/80">
            The architecture of the web has always fascinated me. I've never been afraid to
            dismantle and rebuild, whether it's configuring basic layouts, exploring modern
            React frameworks, or orchestrating multi-agent AI systems. I've been fascinated
            by digital infrastructure since I wrote my first lines of code.
          </motion.p>

          <motion.p variants={itemVariants} className="mb-8 text-lg leading-relaxed text-accent/80">
            Fast forward to today, and my focus has shifted from just building pages to
            architecting solutions. What excites me most about engineering is the ability
            to create systems that have purpose and solve real problems within communities.
            It goes beyond writing clean code; it's about designing resilient infrastructure
            and intelligent experiences. Leaning into the actual needs of users, finding the
            right logic to apply, and iterating on that value over time is the key to great software.
          </motion.p>

          <motion.p variants={itemVariants} className="mb-4 text-lg leading-relaxed text-accent/80">
            This is one of my favorite quotes (by Albert Einstein):
          </motion.p>

          <motion.blockquote
            variants={itemVariants}
            className="my-6 border-l-2 border-accent/30 py-2 pl-6 font-heading text-2xl font-light italic md:text-3xl"
            style={{ fontFamily: "var(--font-melodrama), Melodrama, serif" }}
          >
            "I have no special talent. I am only passionately curious." 
          </motion.blockquote>

          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-accent/80">
            This resonates deeply with me because I have no desire to over-engineer for the
            sake of complexity. I only want to design, build, and deploy systems that are
            efficient, that matter, and that leave a lasting impact.
          </motion.p>
        </motion.div>

        {/* ── Right Column — 3D tilt image (untouched) ─────────────────── */}
        <div className="col-span-1 w-full perspective-[1000px] lg:col-span-5 lg:ml-auto lg:max-w-md xl:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl bg-base cursor-pointer md:aspect-square md:rounded-[2.5rem] lg:mt-0 lg:aspect-[3/4]"
          >
            <motion.div
              style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
              className="relative w-full h-full"
            >
              <Image
                src={
                  mounted
                    ? activeTheme === "dark"
                      ? "/assets/Vardz-dark.png"
                      : "/assets/Vardz-light.png"
                    : "/assets/Vardz-dark.png"
                }
                alt="VARDZ"
                fill
                className="object-cover grayscale brightness-75 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}