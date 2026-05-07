"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function About() {
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const [mounted, setMounted] = React.useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width;
    const yPct = mouseY / height;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  return (
    <div className="relative w-full bg-base text-accent">
      <section id="about" className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 md:items-start overflow-hidden min-h-screen">
        
        {/* Left Column (Waller Protocol Text) */}
        <motion.div 
           variants={containerVariants}
           initial="hidden"
           animate="visible"
          className="flex flex-col justify-center md:pt-6 lg:pt-10 max-w-3xl relative z-20"
        >
          <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            About
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-accent/80 leading-relaxed mb-6 text-lg">
            I'm Jericho. A developer, systems thinker, and aspiring Cloud Engineer. The architecture of the web has always fascinated me. I've never been afraid to dismantle and rebuild, whether it's configuring basic layouts, exploring modern React frameworks, or orchestrating multi-agent AI systems. I've been fascinated by digital infrastructure since I wrote my first lines of code.
          </motion.p>
          
          <motion.p variants={itemVariants} className="text-accent/80 leading-relaxed mb-8 text-lg">
            Fast forward to today, and my focus has shifted from just building pages to architecting solutions. What excites me most about engineering is the ability to create systems that have purpose and solve real problems within communities. It goes beyond writing clean code; it's about designing resilient infrastructure and intelligent experiences. Leaning into the actual needs of users, finding the right logic to apply, and iterating on that value over time is the key to great software.
          </motion.p>

          <motion.p variants={itemVariants} className="text-accent/80 leading-relaxed mb-4 text-lg">
            This is one of my favorite quotes (by Antoine de Saint-Exupéry):
          </motion.p>
          
          <motion.blockquote variants={itemVariants} className="text-2xl md:text-3xl italic border-l-2 border-accent/30 pl-6 py-2 my-6 font-light">
            “Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.”
          </motion.blockquote>

          <motion.p variants={itemVariants} className="text-accent/80 leading-relaxed text-lg">
            This resonates deeply with me because I have no desire to over-engineer for the sake of complexity. I only want to design, build, and deploy systems that are efficient, that matter, and that leave a lasting impact.
          </motion.p>
        </motion.div>

        {/* Right Column (Untouched Image Logic) */}
        <div className="perspective-[1000px]">
          <motion.div 
             initial={{ opacity: 0, x: 50, scale: 0.95 }}
             whileInView={{ opacity: 1, x: 0, scale: 1 }}
             viewport={{ once: true, amount: 0.2 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             style={{
               rotateX,
               rotateY,
               transformStyle: "preserve-3d",
             }}
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
             className="relative aspect-[3/4] md:aspect-square lg:aspect-[3/4] bg-muted overflow-hidden group cursor-pointer rounded-3xl md:rounded-[2.5rem]"
          >
            <motion.div 
              style={{
                transform: "translateZ(75px)",
                transformStyle: "preserve-3d",
              }}
              className="relative w-full h-full"
            >
              <Image 
                src={mounted ? (activeTheme === "dark" ? "/assets/Vardz-dark.png" : "/assets/Vardz-light.png") : "/assets/Vardz-dark.png"}
                alt="VARDZ"
                fill
                className="object-cover grayscale brightness-75 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110"
              />
            </motion.div>
            
            {/* Micro-badge */}
            <div 
              style={{
                transform: "translateZ(100px)",
              }}
              className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 w-24 h-24 bg-base border border-accent/20 flex items-center justify-center p-4 z-20"
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-accent leading-tight text-center font-bold">
                Cloud<br/>Engineer<br/>2026
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}