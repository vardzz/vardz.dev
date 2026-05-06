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
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative w-full bg-base text-accent">
      {/* ABOUT ME ("MEET VARDZ") */}
      <section id="about" className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-32 md:py-48 grid grid-cols-1 md:grid-cols-2 gap-20 items-center overflow-hidden">
        {/* Left Column */}
        <motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.2 }}
           className="flex flex-col flex-start"
        >
          <motion.span variants={itemVariants} className="text-[10px] tracking-[0.2em] uppercase font-bold text-muted-foreground mb-8 block">Identity</motion.span>
          <motion.h2 variants={itemVariants} className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12">Meet Vardz</motion.h2>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-16 max-w-2xl">
            I'm Jericho Varde, a passionate <strong className="font-bold text-accent">Software Engineer & Cloud Enthusiast</strong> based in the Philippines. I specialize in crafting <strong className="font-bold text-accent">robust web applications</strong> and <strong className="font-bold text-accent">scalable cloud architectures</strong>, blending strict technical precision with creative problem-solving to elevate digital experiences.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
            <button className="bg-foreground text-background py-5 px-10 font-bold uppercase tracking-widest text-[11px] hover:opacity-80 transition-all cursor-pointer">
              Download CV
            </button>
            <button className="bg-transparent text-accent border border-accent py-5 px-10 font-bold uppercase tracking-widest text-[11px] hover:opacity-70 transition-all cursor-pointer">
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column */}
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
                src={mounted && activeTheme === "dark" ? "/assets/Vardz-dark.png" : "/assets/Vardz-light.png"}
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
