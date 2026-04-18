"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// ─── helpers ──────────────────────────────────────────────────────────────────

function normalizeProjectImageSrc(src) {
  if (!src) return src;
  let n = src.trim();
  n = n.replace(/^\/public\//, "/");
  n = n.replace(/^\/pprojects\//, "/projects/");
  n = n.replace(/^\/projects\/cour-catcher/, "/projects/court-catcher");
  return n;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: "01",
    title: "COURT CATCHER",
    desc: "Revolutionizing how sports enthusiasts secure their playtime through high-speed cloud infrastructure and seamless booking experiences.",
    img: "/projects/court-catcher-mockup.png",
    imgSecondary: "/projects/court-catcher-logo.png",
    isMobile: true,
    link: null,
    github: "https://github.com/yourusername/court-catcher",
    stack: ["React", "Next.js", "TypeScript", "Stripe"],
    accent: "#4ade80",
  },
  {
    id: "02",
    title: "HORIZON AI",
    desc: "A cutting-edge studio focused on making complex AI data tangible and visually breathtaking for engineers and data scientists.",
    img: "/projects/horizon.png",
    isMobile: false,
    github: "https://github.com/yourusername/horizon-ai",
    stack: ["React", "D3.js", "Python", "TensorFlow"],
    accent: "#60a5fa",
  },
  {
    id: "03",
    title: "DENTARA",
    desc: "Closing the gap between dental practice and technology with a high-integrity patient data ecosystem built for modern clinics.",
    img: "/projects/dentara.png",
    isMobile: false,
    github: "https://github.com/yourusername/dentara",
    stack: ["React", "Node.js", "PostgreSQL", "AWS"],
    accent: "#f472b6",
  },
  {
    id: "04",
    title: "ELDERKEY",
    desc: "Empathy-driven design meeting rigorous security standards for an inclusive digital safety net protecting vulnerable populations.",
    img: "/projects/elderkey.png",
    isMobile: false,
    github: "https://github.com/yourusername/elderkey",
    stack: ["Vue.js", "Express", "MongoDB", "Firebase"],
    accent: "#fb923c",
  },
  {
    id: "05",
    title: "ATTENDANCE CHECK",
    desc: "A simple yet powerful QR scanning system for attendance tracking designed for quick and secure student logging.",
    img: "/projects/attendance-check.jfif",
    isMobile: false,
    link: "https://check-vardz.vercel.app",
    github: "https://github.com/yourusername/attendance-check",
    stack: ["React", "QR Code", "Vercel"],
    accent: "#a78bfa",
  },
];

// ─── Mockups ───────────────────────────────────────────────────────────────────

function LaptopMockup({ image, onImageClick }) {
  const src = normalizeProjectImageSrc(image);
  return (
    <div className="relative w-full max-w-[680px] mx-auto drop-shadow-2xl">
      <div className="relative w-full aspect-[16/10] rounded-t-[1.6rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 p-[9px] border border-zinc-500/40">
        <div className="relative h-full w-full rounded-t-[1rem] bg-black border border-zinc-800 overflow-hidden">
          <Image
            src={src} alt="Project" fill unoptimized priority
            className="object-cover cursor-pointer transition-transform duration-700 hover:scale-[1.04]"
            onClick={onImageClick}
          />
          <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_28%,transparent_52%)] mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] pointer-events-none" />
        </div>
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[110px] h-[8px] rounded-b-lg bg-black border-x border-b border-zinc-700/70" />
      </div>
      <div className="mx-auto -mt-px h-[4px] w-[85%] rounded-full bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700" />
      <div className="relative w-[110%] -ml-[5%] h-7 rounded-b-[1.2rem] bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-900 border border-zinc-600/60">
        <div className="absolute left-1/2 top-[6px] -translate-x-1/2 h-[9px] w-[160px] rounded-full bg-zinc-400/30 border border-zinc-600/40" />
      </div>
      <div className="mx-auto mt-[5px] h-[6px] w-[75%] rounded-full bg-black/40 blur-[3px]" />
    </div>
  );
}

function PhoneMockup({ image, onImageClick, rotate = 0 }) {
  const src = normalizeProjectImageSrc(image);
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate }}
      className="relative w-full"
    >
      <div className="relative aspect-[9/19] w-full max-w-[200px] mx-auto">
        <div className="absolute inset-0 rounded-[2.6rem] bg-gradient-to-b from-zinc-700 via-zinc-900 to-black shadow-[0_24px_50px_-16px_rgba(0,0,0,0.9)]" />
        <div className="absolute inset-[1.5px] rounded-[2.5rem] border border-zinc-600/60 pointer-events-none" />
        <div className="absolute -left-[1.5px] top-[22%] h-7 w-[3px] rounded-r bg-zinc-500/60 pointer-events-none" />
        <div className="absolute -left-[1.5px] top-[30%] h-10 w-[3px] rounded-r bg-zinc-500/55 pointer-events-none" />
        <div className="absolute -right-[1.5px] top-[32%] h-14 w-[3px] rounded-l bg-zinc-500/65 pointer-events-none" />
        <div className="absolute inset-[9px] z-10 rounded-[2.1rem] overflow-hidden border border-zinc-800/70 bg-black">
          <Image
            src={src} alt="Mobile" fill unoptimized priority
            className="object-cover cursor-pointer"
            onClick={onImageClick}
          />
          <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_24%,transparent_46%)] mix-blend-screen pointer-events-none" />
        </div>
        <div className="absolute inset-[6px] z-20 rounded-[2.3rem] border border-zinc-700/50 pointer-events-none" />
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-full z-30 border border-zinc-800/80 pointer-events-none" />
        <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 w-14 h-[2px] bg-zinc-500/55 rounded-full z-30 pointer-events-none" />
      </div>
    </motion.div>
  );
}

function DualPhones({ firstImage, secondImage, onOpen }) {
  return (
    <div className="relative w-full flex items-end justify-center gap-3 md:gap-6 pb-4">
      <div className="flex-1 max-w-[180px] mb-6">
        <PhoneMockup
          image={firstImage}
          onImageClick={() => onOpen({ url: normalizeProjectImageSrc(firstImage), isMobile: true })}
          rotate={-7}
        />
      </div>
      <div className="flex-1 max-w-[180px]">
        <PhoneMockup
          image={secondImage}
          onImageClick={() => onOpen({ url: normalizeProjectImageSrc(secondImage), isMobile: true })}
          rotate={7}
        />
      </div>
    </div>
  );
}

// ─── Animation variants ────────────────────────────────────────────────────────
//
// IMAGE: Slides along X axis (left/right), scales slightly on enter/exit.
// TEXT:  Moves along Y axis (up/down) — two-axis split = premium feel.
// Each text child staggers in with a spring delay.

const IMAGE_VARIANTS = {
  enter: (dir) => ({
    x: dir > 0 ? "72%" : "-72%",
    opacity: 0,
    scale: 0.9,
    filter: "blur(6px)",
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x:       { type: "spring", stiffness: 52, damping: 17, mass: 0.9 },
      opacity: { duration: 0.38, ease: "easeOut" },
      scale:   { type: "spring", stiffness: 58, damping: 18 },
      filter:  { duration: 0.45, ease: "easeOut" },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-55%" : "55%",
    opacity: 0,
    scale: 0.94,
    filter: "blur(4px)",
    transition: {
      x:       { type: "spring", stiffness: 52, damping: 17, mass: 0.9 },
      opacity: { duration: 0.26, ease: "easeIn" },
      scale:   { duration: 0.38 },
      filter:  { duration: 0.28 },
    },
  }),
};

const TEXT_VARIANTS = {
  enter: (dir) => ({
    y: dir > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: {
      y:       { type: "spring", stiffness: 65, damping: 17, delay: 0.08 },
      opacity: { duration: 0.42, ease: "easeOut", delay: 0.04 },
    },
  },
  exit: (dir) => ({
    y: dir > 0 ? -36 : 36,
    opacity: 0,
    transition: {
      y:       { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2 },
    },
  }),
};

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [index, setIndex]         = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);

  const sectionRef  = useRef(null);
  const lockRef     = useRef(false);
  const touchStartY = useRef(null);

  const proj   = projects[index];
  const isEven = index % 2 === 0;

  // ── Navigate ───────────────────────────────────────────────────────────────

  const goTo = useCallback(
    (next) => {
      if (lockRef.current) return;
      if (next < 0 || next >= projects.length) return;
      lockRef.current = true;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
      setTimeout(() => { lockRef.current = false; }, 780);
    },
    [index]
  );

  // ── Wheel — trap while section is pinned ───────────────────────────────────

  useEffect(() => {
    const onWheel = (e) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned) return;

      const down = e.deltaY > 0;
      const up   = e.deltaY < 0;
      if (up   && index === 0) return;                   // allow page scroll up
      if (down && index === projects.length - 1) return; // allow page scroll down

      e.preventDefault();
      if (lockRef.current) return;
      goTo(index + (down ? 1 : -1));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [index, goTo]);

  // ── Touch swipe ────────────────────────────────────────────────────────────

  useEffect(() => {
    const onStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onEnd   = (e) => {
      if (touchStartY.current === null) return;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 42) return;
      goTo(index + (dy > 0 ? 1 : -1));
      touchStartY.current = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [index, goTo]);

  // ── Keyboard ───────────────────────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(index + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, goTo]);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    /**
     * OUTER SECTION — N × 100vh tall.
     * The browser must scroll through all of this before reaching the next
     * section, so the user finishes all projects first.
     * We intercept the wheel / touch events while the inner sticky div
     * is pinned and convert them into discrete project navigation.
     */
    <section
      id="work"
      ref={sectionRef}
      style={{ height: `${projects.length * 100}vh` }}
      className="relative bg-background"
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-background">

        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--foreground)_0.5px,transparent_0.5px)] bg-[size:28px_28px] opacity-[0.04] pointer-events-none" />

        {/* Per-project ambient glow */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`glow-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 65% 55% at ${isEven ? "78%" : "22%"} 52%, ${proj.accent}18 0%, transparent 68%)`,
            }}
          />
        </AnimatePresence>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-14 pt-8 md:pt-10">
          {/* Label */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: proj.accent }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            />
            <span className="text-xs font-bold text-muted-foreground tracking-[0.25em] uppercase">
              Selected Works
            </span>
          </div>

          {/* Live counter */}
          <div className="flex items-baseline gap-1.5">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.span
                key={`count-${index}`}
                custom={direction}
                initial={{ y: direction > 0 ? 20 : -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: direction > 0 ? -20 : 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="text-4xl font-black text-foreground tabular-nums leading-none"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm text-muted-foreground font-light">
              &nbsp;/ {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Main grid ───────────────────────────────────────────────────── */}
        <div className="relative z-10 h-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-center px-6 md:px-14 pt-24 pb-20">

          {/* IMAGE */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`img-${index}`}
              custom={direction}
              variants={IMAGE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              className={`order-1 md:order-${isEven ? "1" : "2"} w-full flex items-center justify-center md:${isEven ? "pr-4" : "pl-4"}`}
            >
              {proj.isMobile ? (
                <DualPhones
                  firstImage={proj.img}
                  secondImage={proj.imgSecondary}
                  onOpen={setSelectedImg}
                />
              ) : (
                <LaptopMockup
                  image={proj.img}
                  onImageClick={() =>
                    setSelectedImg({ url: normalizeProjectImageSrc(proj.img), isMobile: false })
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* TEXT */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`text-${index}`}
              custom={direction}
              variants={TEXT_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              className={`order-2 md:order-${isEven ? "2" : "1"} flex flex-col justify-center space-y-5 md:space-y-7 md:${isEven ? "pl-4" : "pr-4"}`}
            >
              {/* ID */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-3 w-fit"
              >
                <motion.div
                  className="h-px"
                  style={{ backgroundColor: proj.accent }}
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ delay: 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <span
                  className="text-xs font-bold tracking-[0.28em] uppercase"
                  style={{ color: proj.accent }}
                >
                  {proj.id}
                </span>
              </motion.div>

              {/* Title — character-by-character reveal */}
              <h3 className="text-4xl md:text-[3.8rem] font-black text-foreground tracking-tight leading-[0.88] overflow-hidden">
                {proj.title.split("").map((char, i) => (
                  <motion.span
                    key={`${index}-${i}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 95,
                      damping: 15,
                      delay: 0.16 + i * 0.022,
                    }}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm md:text-base text-muted-foreground leading-relaxed font-light max-w-[360px]"
              >
                {proj.desc}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-3 pt-1"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (proj.link) window.open(proj.link, "_blank", "noopener,noreferrer");
                    else setSelectedImg({ url: normalizeProjectImageSrc(proj.img), isMobile: proj.isMobile });
                  }}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide text-background shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ backgroundColor: proj.accent }}
                >
                  View Project
                </motion.button>

                {proj.github && (
                  <motion.a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 border border-border text-foreground rounded-full text-sm font-semibold tracking-wide hover:bg-secondary/40 transition-colors duration-300"
                  >
                    GitHub ↗
                  </motion.a>
                )}
              </motion.div>

              {/* Stack chips */}
              {proj.stack && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.52 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {proj.stack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.82 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.52 + i * 0.055,
                        type: "spring",
                        stiffness: 130,
                        damping: 18,
                      }}
                      className="px-3 py-1 text-xs text-muted-foreground rounded-full font-medium border border-border/50 bg-secondary/40"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom nav ──────────────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-14 pb-6 md:pb-8">

          {/* Dot / pill indicators */}
          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Project ${i + 1}`}
                className="flex items-center justify-center py-2"
              >
                <motion.span
                  animate={{ width: i === index ? 28 : 6, opacity: i === index ? 1 : 0.3 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="block h-[3px] rounded-full"
                  style={{ backgroundColor: i === index ? proj.accent : "var(--border)" }}
                />
              </button>
            ))}
          </div>

          {/* "Scroll to continue" hint on last project */}
          <AnimatePresence>
            {index === projects.length - 1 && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.55, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.5 }}
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground hidden md:block"
              >
                Scroll to continue ↓
              </motion.span>
            )}
          </AnimatePresence>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              whileHover={index > 0 ? { scale: 1.1, x: -2 } : {}}
              whileTap={index > 0 ? { scale: 0.93 } : {}}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground disabled:opacity-20 transition-colors hover:bg-secondary/50 text-base"
            >
              ←
            </motion.button>
            <motion.button
              onClick={() => goTo(index + 1)}
              disabled={index === projects.length - 1}
              whileHover={index < projects.length - 1 ? { scale: 1.1, x: 2 } : {}}
              whileTap={index < projects.length - 1 ? { scale: 0.93 } : {}}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground disabled:opacity-20 transition-colors hover:bg-secondary/50 text-base"
            >
              →
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      <Dialog open={!!selectedImg} onOpenChange={(open) => !open && setSelectedImg(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[95vw] md:max-w-[90vw] border-none bg-foreground/95 dark:bg-background/95 p-0 overflow-hidden shadow-2xl flex items-center justify-center"
        >
          <DialogTitle className="sr-only">Project Image</DialogTitle>
          <DialogDescription className="sr-only">Full view of the selected project.</DialogDescription>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className={`relative ${
                selectedImg.isMobile ? "h-[85vh] aspect-[9/19]" : "w-full h-[80vh] aspect-video"
              }`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={selectedImg.url}
                  alt="Project"
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