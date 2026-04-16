"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function normalizeProjectImageSrc(src) {
  if (!src) return src;
  let normalized = src.trim();

  // Support common variants users may type in project data.
  normalized = normalized.replace(/^\/public\//, "/");
  normalized = normalized.replace(/^\/pprojects\//, "/projects/");
  normalized = normalized.replace(/^\/projects\/cour-catcher/, "/projects/court-catcher");

  return normalized;
}

// Laptop Mockup Component
function LaptopMockup({ image, onImageClick }) {
  const imageSrc = normalizeProjectImageSrc(image);

  return (
    <div className="relative w-full max-w-[760px] mx-auto">
      <div className="relative">
        {/* Display Lid */}
        <div className="relative w-full aspect-[16/10] rounded-t-[1.8rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 p-[10px] border border-zinc-500/50 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.95)]">
          {/* Screen Bezel + Screen */}
          <div className="relative h-full w-full rounded-t-[1.2rem] bg-black border border-zinc-800 overflow-hidden">
            <Image
              src={imageSrc}
              alt="Project Screenshot"
              fill
              unoptimized
              priority
              className="object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
              onClick={onImageClick}
            />

            {/* Glass / anti-glare */}
            <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_30%,transparent_56%,transparent_100%)] mix-blend-screen pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_34px_rgba(0,0,0,0.28)] pointer-events-none" />
          </div>

          {/* Webcam notch */}
          <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[120px] h-[9px] rounded-b-lg bg-black border-x border-b border-zinc-700/80" />
        </div>

        {/* Hinge Bar */}
        <div className="mx-auto -mt-[1px] h-[5px] w-[86%] rounded-full bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 border border-zinc-700/70" />

        {/* Keyboard Deck */}
        <div className="relative w-[112%] -ml-[6%] h-8 rounded-b-[1.4rem] bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-900 border border-zinc-600/70 shadow-xl">
          <div className="absolute left-1/2 top-[7px] -translate-x-1/2 h-[10px] w-[180px] rounded-full bg-zinc-400/35 border border-zinc-600/50" />
          <div className="absolute inset-x-10 top-[3px] h-[1px] bg-zinc-300/15" />
        </div>

        {/* Desk Contact Shadow */}
        <div className="mx-auto mt-[6px] h-[8px] w-[78%] rounded-full bg-black/45 blur-[3px]" />
      </div>
    </div>
  );
}

// Phone Mockup Component
function PhoneMockup({ image, onImageClick, rotate = 0 }) {
  const imageSrc = normalizeProjectImageSrc(image);

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate }}
      className="relative w-full"
    >
      {/* Phone Body */}
      <div className="relative aspect-[9/19] w-full max-w-xs mx-auto">
        {/* Outer chassis */}
        <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-b from-zinc-700 via-zinc-900 to-black shadow-[0_26px_55px_-18px_rgba(0,0,0,0.85)]" />

        {/* Metal edge */}
        <div className="absolute inset-[1.5px] rounded-[2.7rem] border border-zinc-600/70 pointer-events-none" />

        {/* Side buttons */}
        <div className="absolute -left-[1.5px] top-[22%] h-8 w-[3px] rounded-r bg-zinc-500/70 pointer-events-none" />
        <div className="absolute -left-[1.5px] top-[31%] h-12 w-[3px] rounded-r bg-zinc-500/60 pointer-events-none" />
        <div className="absolute -left-[1.5px] top-[40%] h-12 w-[3px] rounded-r bg-zinc-500/60 pointer-events-none" />
        <div className="absolute -right-[1.5px] top-[33%] h-16 w-[3px] rounded-l bg-zinc-500/70 pointer-events-none" />

        {/* Screen Container */}
        <div className="absolute inset-[10px] z-10 rounded-[2.25rem] overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] border border-zinc-800/70 transition-all duration-500 hover:shadow-2xl bg-black">
          <Image
            src={imageSrc}
            alt="Mobile Screenshot"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            priority
            className="object-cover cursor-pointer"
            onClick={onImageClick}
          />

          {/* Screen glass highlight */}
          <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_26%,transparent_48%,transparent_100%)] mix-blend-screen pointer-events-none" />

          {/* Vignette for depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_44px_rgba(0,0,0,0.2)] pointer-events-none" />
        </div>

        {/* Inner bezel */}
        <div className="absolute inset-[7px] z-20 rounded-[2.45rem] border border-zinc-700/60 pointer-events-none" />

        {/* Dynamic island style notch */}
        <div className="absolute top-[16px] left-1/2 -translate-x-1/2 w-[122px] h-[30px] bg-black rounded-full z-30 border border-zinc-800/90 pointer-events-none" />

        {/* Front camera/sensors */}
        <div className="absolute top-[26px] left-[calc(50%+34px)] w-[8px] h-[8px] rounded-full bg-zinc-800 border border-zinc-700 z-40 pointer-events-none" />
        <div className="absolute top-[28px] left-[calc(50%-17px)] w-[26px] h-[4px] rounded-full bg-zinc-800 z-40 pointer-events-none" />

        {/* Bottom speaker slit */}
        <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 w-16 h-[2px] bg-zinc-500/60 rounded-full z-30 pointer-events-none" />
      </div>
    </motion.div>
  );
}

// Hand Holding Phone Effect
function HandHoldPhones({ firstImage, secondImage, onImageClick }) {
  return (
    <div className="relative w-full flex items-center justify-center gap-4 md:gap-8 py-12">
      {/* Light Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 dark:from-background/5 via-border/5 to-foreground/5 dark:to-background/5 blur-3xl -z-10 rounded-full" />

      {/* First Phone - Left Tilt */}
      <div className="flex-1 max-w-xs -rotate-6">
        <PhoneMockup
          image={firstImage}
          onImageClick={() => onImageClick({ url: normalizeProjectImageSrc(firstImage), isMobile: true })}
          rotate={-6}
        />
      </div>

      {/* Second Phone - Right Tilt, Overlapping */}
      <div className="flex-1 max-w-xs rotate-6 -ml-4 md:-ml-8 md:mt-8">
        <PhoneMockup
          image={secondImage}
          onImageClick={() => onImageClick({ url: normalizeProjectImageSrc(secondImage), isMobile: true })}
          rotate={6}
        />
      </div>
    </div>
  );
}

function ProjectCard({ proj, idx, onOpen }) {
  const isEven = idx % 2 === 0;

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center px-2 md:px-4">
        {/* Image Section */}
        <motion.div
          className={`order-1 md:${isEven ? "order-1" : "order-2"} w-full flex justify-center`}
        >
          {proj.isMobile ? (
            <HandHoldPhones
              firstImage={proj.img}
              secondImage={proj.imgSecondary}
              onImageClick={onOpen}
            />
          ) : (
            <motion.div
              className="w-full"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onOpen({ url: normalizeProjectImageSrc(proj.img), isMobile: false })}
            >
              <LaptopMockup
                image={proj.img}
                onImageClick={() => onOpen({ url: normalizeProjectImageSrc(proj.img), isMobile: false })}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`order-2 md:${isEven ? "order-2" : "order-1"} flex flex-col justify-center space-y-6`}
        >
            {/* ID Badge */}
            <div className="inline-flex items-center gap-2 w-fit">
              <div className="w-8 h-px bg-border" />
              <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                {proj.id}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              {proj.title}
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light max-w-sm">
              {proj.desc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              {/* View Project Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (proj.link) {
                    window.open(proj.link, "_blank", "noopener,noreferrer");
                  } else {
                    onOpen({ url: normalizeProjectImageSrc(proj.img), isMobile: proj.isMobile });
                  }
                }}
                className="px-6 py-2.5 bg-foreground text-primary-foreground rounded-full font-semibold text-sm tracking-wide hover:bg-foreground/90 dark:bg-foreground dark:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md"
              >
                View Project
              </motion.button>

              {/* GitHub Button */}
              {proj.github && (
                <motion.a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 border border-border text-foreground rounded-full font-semibold text-sm tracking-wide hover:bg-secondary/50 transition-all duration-300"
                >
                  GitHub
                </motion.a>
              )}
            </div>

            {/* Tech Stack Preview */}
            {proj.stack && (
              <div className="flex flex-wrap gap-2 pt-4">
                {proj.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary text-xs text-muted-foreground rounded-full font-medium border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
        </motion.div>
      </div>
    </motion.div>
  );
}

const projects = [
  {
    id: "01.",
    title: "COURT CATCHER",
    desc: "Revolutionizing how sports enthusiasts secure their playtime through high-speed cloud infrastructure and seamless booking experiences.",
    img: "/projects/court-catcher-mockup.png",
    imgSecondary: "/projects/court-catcher-logo.png",
    isMobile: true,
    github: "https://github.com/yourusername/court-catcher",
    stack: ["React", "Next.js", "TypeScript", "Stripe"]
  },
  {
    id: "02.",
    title: "HORIZON AI",
    desc: "A cutting-edge studio focused on making complex AI data tangible and visually breathtaking for engineers and data scientists.",
    img: "/projects/horizon.png",
    github: "https://github.com/yourusername/horizon-ai",
    stack: ["React", "D3.js", "Python", "TensorFlow"]
  },
  {
    id: "03.",
    title: "DENTARA",
    desc: "Closing the gap between dental practice and technology with a high-integrity patient data ecosystem built for modern clinics.",
    img: "/projects/dentara.png",
    github: "https://github.com/yourusername/dentara",
    stack: ["React", "Node.js", "PostgreSQL", "AWS"]
  },
  {
    id: "04.",
    title: "ELDERKEY",
    desc: "Empathy-driven design meeting rigorous security standards for an inclusive digital safety net protecting vulnerable populations.",
    img: "/projects/elderkey.png",
    github: "https://github.com/yourusername/elderkey",
    stack: ["Vue.js", "Express", "MongoDB", "Firebase"]
  },
  {
    id: "05.",
    title: "ATTENDANCE CHECK",
    desc: "A simple yet powerful QR scanning system for attendance tracking designed for quick and secure student logging.",
    img: "/projects/attendance-check.jfif",
    link: "https://check-vardz.vercel.app",
    github: "https://github.com/yourusername/attendance-check",
    stack: ["React", "QR Code", "Vercel"]
  }
];

export default function Projects() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = React.useRef(null);
  const wheelLockRef = React.useRef(false);
  const wheelDeltaRef = React.useRef(0);
  const lastIndex = projects.length - 1;

  useEffect(() => {
    const handleWheel = (event) => {
      if (selectedImg) return;

      const section = containerRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inFocusRange = rect.top <= 120 && rect.bottom >= window.innerHeight - 120;
      if (!inFocusRange) return;

      if (wheelLockRef.current) {
        event.preventDefault();
        return;
      }

      const delta = event.deltaY;
      const canGoNext = delta > 0 && activeIndex < lastIndex;
      const canGoPrev = delta < 0 && activeIndex > 0;

      // Keep the page pinned while horizontal navigation is still possible.
      if (canGoNext || canGoPrev) {
        event.preventDefault();
      } else {
        wheelDeltaRef.current = 0;
        return;
      }

      wheelDeltaRef.current += delta;
      const WHEEL_STEP_THRESHOLD = 65;
      if (Math.abs(wheelDeltaRef.current) < WHEEL_STEP_THRESHOLD) {
        return;
      }

      if (wheelDeltaRef.current > 0 && activeIndex < lastIndex) {
        wheelLockRef.current = true;
        wheelDeltaRef.current = 0;
        setActiveIndex((prev) => Math.min(prev + 1, lastIndex));
      } else if (wheelDeltaRef.current < 0 && activeIndex > 0) {
        wheelLockRef.current = true;
        wheelDeltaRef.current = 0;
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, lastIndex, selectedImg]);

  useEffect(() => {
    const timer = setTimeout(() => {
      wheelLockRef.current = false;
    }, 520);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const progressWidth = `${((activeIndex + 1) / projects.length) * 100}%`;

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative bg-background text-foreground overflow-hidden transition-colors duration-700 ease-in-out"
      style={{ height: "100vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(var(--foreground)_0.5px,transparent_0.5px)] bg-[size:32px_32px] opacity-5 pointer-events-none dark:opacity-5" />

        {/* Header */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-8 pt-10 md:pt-12">
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                  Selected Works
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
                Project Showcase
              </h2>
            </div>
            <div className="hidden md:block text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Scroll to Explore
            </div>
          </div>
        </div>

        {/* Horizontal Projects */}
        <motion.div
          animate={{ x: `${-activeIndex * 100}%` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-8 md:mt-12 flex h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)] will-change-transform"
        >
          {projects.map((proj, idx) => (
            <div key={idx} className="min-w-full px-6 md:px-8 flex items-center">
              <ProjectCard
                proj={proj}
                idx={idx}
                onOpen={(p) => setSelectedImg(p)}
              />
            </div>
          ))}
        </motion.div>

        {/* Progress Rail */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[84%] md:w-[60%] h-[2px] bg-border/60 rounded-full overflow-hidden z-20">
          <motion.div animate={{ width: progressWidth }} transition={{ duration: 0.4 }} className="h-full bg-foreground" />
        </div>
      </div>

      {/* Image Modal Dialog */}
      <Dialog open={!!selectedImg} onOpenChange={(open) => !open && setSelectedImg(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[95vw] md:max-w-[90vw] border-none bg-foreground/95 p-0 overflow-hidden shadow-2xl flex items-center justify-center dark:bg-background/95"
        >
          <DialogTitle className="sr-only">Project Image View</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed view of the selected project asset.
          </DialogDescription>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative ${
                selectedImg.isMobile
                  ? "h-[85vh] aspect-[9/19]"
                  : "w-full h-[80vh] aspect-video"
              } flex items-center justify-center`}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={selectedImg.url}
                  alt="Project View"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
