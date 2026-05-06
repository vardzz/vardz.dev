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
    link: "https://dentara.vercel.app/",
    github: "https://github.com/vardzz/dentara",
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

function PhoneMockup({ image, onImageClick, rotate = 0, compact = false }) {
  const src = normalizeProjectImageSrc(image);

  // compact = smaller size used in the MobileProjectView dual-phone layout
  const frameR      = compact ? "1.18rem" : "2.05rem";
  const screenR     = compact ? "1.05rem" : "1.82rem";
  const screenInset = compact ? "4px"     : "5.5px";
  const diW         = compact ? 38        : 62;
  const diH         = compact ? 10        : 16;
  const diTop       = compact ? 7         : 10;
  const btnW        = 2.5;
  const muteH       = compact ? 13        : 20;
  const volH        = compact ? 21        : 30;
  const powerH      = compact ? 28        : 42;
  const speakerDots = compact ? 5         : 7;
  const speakerDotW = compact ? 2         : 2.5;
  const speakerDotH = compact ? 4         : 5.5;
  const speakerBot  = compact ? 7         : 11;

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate }}
      className="relative w-full"
    >
      {/* drop-shadow wrapping the whole phone */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: compact ? "90px" : "200px",
          filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.72)) drop-shadow(0 4px 8px rgba(0,0,0,0.40))",
        }}
      >
        {/* 9 : 19.5 aspect ratio — iPhone 16 Pro */}
        <div className="relative w-full" style={{ paddingBottom: "216.67%" }}>

          {/* ── OUTER TITANIUM BODY ── */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: frameR,
              background: "linear-gradient(158deg, #3a3a3c 0%, #1c1c1e 45%, #2c2c2e 70%, #111113 100%)",
            }}
          />
          {/* Polished frame highlight */}
          <div
            className="absolute inset-[1.5px]"
            style={{
              borderRadius: `calc(${frameR} - 1.5px)`,
              background: "linear-gradient(158deg, #8e8e93 0%, #48484a 25%, #636366 55%, #2c2c2e 100%)",
            }}
          />
          {/* Inner face */}
          <div
            className="absolute inset-[3px]"
            style={{
              borderRadius: `calc(${frameR} - 3px)`,
              background: "#0d0d0f",
            }}
          />

          {/* ── SCREEN ── */}
          <div
            className="absolute z-10 overflow-hidden"
            style={{
              inset: screenInset,
              borderRadius: screenR,
              background: "#000",
              border: "0.5px solid rgba(255,255,255,0.06)",
            }}
          >
            <Image
              src={src}
              alt="Mobile"
              fill
              unoptimized
              priority
              className="object-cover cursor-pointer"
              onClick={onImageClick}
            />
            {/* Glass glare */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(118deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 22%, transparent 46%)",
                mixBlendMode: "screen",
              }}
            />
            {/* Vignette depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 26px rgba(0,0,0,0.20)" }}
            />
          </div>

          {/* ── DYNAMIC ISLAND ── */}
          <div
            className="absolute left-1/2 z-30 pointer-events-none"
            style={{
              top: `${diTop}px`,
              width: `${diW}px`,
              height: `${diH}px`,
              transform: "translateX(-50%)",
              borderRadius: `${diH / 2}px`,
              background: "#000",
              boxShadow: "0 1px 4px rgba(0,0,0,0.7), inset 0 0 0 0.5px rgba(255,255,255,0.05)",
            }}
          />

          {/* ── LEFT: mute toggle ── */}
          <div className="absolute pointer-events-none" style={{ left: "-2px", top: "17%", width: `${btnW}px`, height: `${muteH}px`, borderRadius: "1.5px 0 0 1.5px", background: "linear-gradient(180deg,#636366 0%,#3a3a3c 100%)" }} />
          {/* volume up */}
          <div className="absolute pointer-events-none" style={{ left: "-2px", top: "26%", width: `${btnW}px`, height: `${volH}px`, borderRadius: "1.5px 0 0 1.5px", background: "linear-gradient(180deg,#636366 0%,#3a3a3c 100%)" }} />
          {/* volume down */}
          <div className="absolute pointer-events-none" style={{ left: "-2px", top: "37%", width: `${btnW}px`, height: `${volH}px`, borderRadius: "1.5px 0 0 1.5px", background: "linear-gradient(180deg,#636366 0%,#3a3a3c 100%)" }} />

          {/* ── RIGHT: power ── */}
          <div className="absolute pointer-events-none" style={{ right: "-2px", top: "29%", width: `${btnW}px`, height: `${powerH}px`, borderRadius: "0 1.5px 1.5px 0", background: "linear-gradient(180deg,#636366 0%,#3a3a3c 100%)" }} />

          {/* ── BOTTOM SPEAKER GRILLE ── */}
          <div
            className="absolute left-1/2 z-30 pointer-events-none flex items-center"
            style={{ bottom: `${speakerBot}px`, transform: "translateX(-50%)", gap: "3px" }}
          >
            {Array.from({ length: speakerDots }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: `${speakerDotW}px`,
                  height: `${speakerDotH}px`,
                  borderRadius: "1px",
                  background: "rgba(130,130,138,0.55)",
                }}
              />
            ))}
          </div>

        </div>
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

// Mobile-specific variants: image slides in from bottom, text fades up gently
const MOBILE_IMAGE_VARIANTS = {
  enter: (dir) => ({
    y: dir > 0 ? "40%" : "-40%",
    opacity: 0,
    scale: 0.88,
    filter: "blur(8px)",
  }),
  center: {
    y: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      y:       { type: "spring", stiffness: 55, damping: 18, mass: 0.8 },
      opacity: { duration: 0.4, ease: "easeOut" },
      scale:   { type: "spring", stiffness: 60, damping: 18 },
      filter:  { duration: 0.5, ease: "easeOut" },
    },
  },
  exit: (dir) => ({
    y: dir > 0 ? "-30%" : "30%",
    opacity: 0,
    scale: 0.92,
    filter: "blur(5px)",
    transition: {
      y:       { type: "spring", stiffness: 55, damping: 18 },
      opacity: { duration: 0.24, ease: "easeIn" },
      scale:   { duration: 0.32 },
      filter:  { duration: 0.24 },
    },
  }),
};

const MOBILE_TEXT_VARIANTS = {
  enter: (dir) => ({ y: dir > 0 ? 28 : -28, opacity: 0 }),
  center: {
    y: 0,
    opacity: 1,
    transition: { y: { type: "spring", stiffness: 70, damping: 18, delay: 0.1 }, opacity: { duration: 0.38, delay: 0.06 } },
  },
  exit: (dir) => ({
    y: dir > 0 ? -20 : 20,
    opacity: 0,
    transition: { y: { duration: 0.22 }, opacity: { duration: 0.18 } },
  }),
};

// ─── Mobile Layout ─────────────────────────────────────────────────────────────
//
// Mobile uses a dedicated vertical layout:
//   [ header: label + counter         ]
//   [ mockup — compact, centred       ]
//   [ id • title (2 lines max)        ]
//   [ desc (3 lines, truncated)       ]
//   [ buttons row                     ]
//   [ stack chips                     ]
//   [ bottom: dots + arrows           ]
//
// Everything lives within 100dvh with no overflow.

function MobileProjectView({ proj, index, direction, onOpen, goTo }) {
  const isLaptop = !proj.isMobile;

  return (
    <div className="relative flex flex-col h-full w-full px-5 pt-[4.5rem] pb-6 gap-0">

      {/* ── Mockup zone — takes ~40% of screen height ── */}
      <div className="flex-none flex items-end justify-center" style={{ height: "38dvh" }}>
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={`mob-img-${index}`}
            custom={direction}
            variants={MOBILE_IMAGE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex items-end justify-center"
            style={{ height: "38dvh" }}
          >
            {proj.isMobile ? (
              // Compact dual phones for mobile view
              <div className="relative flex items-end justify-center gap-2 h-full pb-2">
                <div className="flex-none w-[90px] mb-5">
                  <PhoneMockup
                    image={proj.img}
                    onImageClick={() => onOpen({ url: normalizeProjectImageSrc(proj.img), isMobile: true })}
                    rotate={-6}
                    compact
                  />
                </div>
                <div className="flex-none w-[90px]">
                  <PhoneMockup
                    image={proj.imgSecondary}
                    onImageClick={() => onOpen({ url: normalizeProjectImageSrc(proj.imgSecondary), isMobile: true })}
                    rotate={6}
                    compact
                  />
                </div>
              </div>
            ) : (
              // Compact laptop for mobile view
              <div className="w-full max-w-[320px] px-2">
                <div className="relative w-full aspect-[16/10] rounded-t-[1rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 p-[6px] border border-zinc-500/40 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
                  <div className="relative h-full w-full rounded-t-[0.65rem] bg-black border border-zinc-800 overflow-hidden">
                    <Image
                      src={normalizeProjectImageSrc(proj.img)}
                      alt="Project" fill unoptimized priority
                      className="object-cover cursor-pointer"
                      onClick={() => onOpen({ url: normalizeProjectImageSrc(proj.img), isMobile: false })}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.12)_0%,transparent_50%)] mix-blend-screen pointer-events-none" />
                  </div>
                  <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[70px] h-[5px] rounded-b-md bg-black border-x border-b border-zinc-700/60" />
                </div>
                <div className="mx-auto -mt-px h-[3px] w-[84%] rounded-full bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700" />
                <div className="relative w-[108%] -ml-[4%] h-5 rounded-b-[0.9rem] bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-900 border border-zinc-600/50">
                  <div className="absolute left-1/2 top-[4px] -translate-x-1/2 h-[7px] w-[100px] rounded-full bg-zinc-400/25" />
                </div>
                <div className="mx-auto mt-[3px] h-[4px] w-[72%] rounded-full bg-black/35 blur-[2px]" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Divider ── */}
      <div className="flex-none mt-4 mb-3 flex items-center gap-3 px-1">
        <motion.div
          className="h-px flex-1"
          key={`mob-div-${index}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left", backgroundColor: `${proj.accent}40` }}
        />
        <span
          className="flex-none text-[10px] font-bold tracking-[0.3em] uppercase"
          style={{ color: proj.accent }}
        >
          {proj.id}
        </span>
        <motion.div
          className="h-px flex-1"
          key={`mob-div2-${index}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "right", backgroundColor: `${proj.accent}40` }}
        />
      </div>

      {/* ── Text zone ── */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={`mob-text-${index}`}
          custom={direction}
          variants={MOBILE_TEXT_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          className="flex-1 flex flex-col min-h-0 gap-3"
        >
          {/* Title */}
          <h3
            className="text-[2rem] font-black tracking-tight leading-[0.9] text-accent overflow-hidden"
            style={{ lineHeight: "0.92" }}
          >
            {proj.title === "ATTENDANCE CHECK" ? (
              <>
                <span className="block whitespace-nowrap">
                  {"ATTENDANCE".split("").map((char, i) => (
                    <motion.span
                      key={`${index}-mob-attendance-${i}`}
                      initial={{ y: "105%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 16,
                        delay: 0.14 + i * 0.018,
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="block whitespace-nowrap">
                  {"CHECK".split("").map((char, i) => (
                    <motion.span
                      key={`${index}-mob-check-${i}`}
                      initial={{ y: "105%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 16,
                        delay: 0.34 + i * 0.018,
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </>
            ) : (
              proj.title.split("").map((char, i) => (
                <motion.span
                  key={`${index}-mob-${i}`}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 16,
                    delay: 0.14 + i * 0.018,
                  }}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </motion.span>
              ))
            )}
          </h3>

          {/* Description — max 3 lines */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-[0.8rem] text-muted-foreground leading-relaxed font-light"
          >
            {proj.desc}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.42 }}
            className="flex items-center gap-2 flex-wrap"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (proj.link) window.open(proj.link, "_blank", "noopener,noreferrer");
                else onOpen({ url: normalizeProjectImageSrc(proj.img), isMobile: proj.isMobile });
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-background cursor-pointer"
              style={{ backgroundColor: proj.accent }}
            >
              View Project
            </motion.button>
            {proj.github && (
              <motion.a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-accent text-accent rounded-full text-xs font-semibold tracking-wide cursor-pointer"
              >
                GitHub ↗
              </motion.a>
            )}
          </motion.div>

          {/* Stack chips — single scrollable row */}
          {proj.stack && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.46 }}
              className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {proj.stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.46 + i * 0.05, type: "spring", stiffness: 140, damping: 18 }}
                  className="flex-none px-2.5 py-1 text-[10px] text-muted-foreground rounded-full font-medium border border-border/50 bg-secondary/40 whitespace-nowrap"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom nav ── */}
      <div className="flex-none flex items-center justify-between pt-3 border-t border-border/20 mt-2">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Project ${i + 1}`}
              className="flex items-center justify-center p-1 cursor-pointer"
            >
              <motion.span
                animate={{ width: i === index ? 20 : 5, opacity: i === index ? 1 : 0.3 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="block h-[2.5px] rounded-full"
                style={{ backgroundColor: i === index ? proj.accent : "var(--border)" }}
              />
            </button>
          ))}
        </div>

        {/* Counter badge */}
        <div className="flex items-baseline gap-0.5">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.span
              key={`mob-count-${index}`}
              initial={{ y: direction > 0 ? 12 : -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction > 0 ? -12 : 12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="text-xl font-black text-accent tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs text-muted-foreground">/{String(projects.length).padStart(2, "0")}</span>
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-1.5">
          <motion.button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            whileTap={index > 0 ? { scale: 0.9 } : {}}
            className="w-8 h-8 rounded-full border border-accent flex items-center justify-center text-accent disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer text-sm"
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => goTo(index + 1)}
            disabled={index === projects.length - 1}
            whileTap={index < projects.length - 1 ? { scale: 0.9 } : {}}
            className="w-8 h-8 rounded-full border border-accent flex items-center justify-center text-accent disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer text-sm"
          >
            →
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [index, setIndex]             = useState(0);
  const [direction, setDirection]     = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const sectionRef  = useRef(null);
  const lockRef     = useRef(false);
  const exitLockRef = useRef(false);
  const touchStartY = useRef(null);

  const proj   = projects[index];
  const isEven = index % 2 === 0;

  // Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobileView(mq.matches);
    const handler = (e) => setIsMobileView(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Navigate ───────────────────────────────────────────────────────────────

  const goTo = useCallback((next) => {
    if (lockRef.current) return;
    if (next < 0 || next >= projects.length) return;
    lockRef.current = true;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    setTimeout(() => { lockRef.current = false; }, 780);
  }, [index]);

  const exitPinnedSection = useCallback((dir) => {
    if (exitLockRef.current) return;
    exitLockRef.current = true;
    window.scrollBy({
      top: dir * window.innerHeight * 0.96,
      behavior: "smooth",
    });
    setTimeout(() => {
      exitLockRef.current = false;
    }, 560);
  }, []);

  // ── Wheel ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isMobileView) return;
    const onWheel = (e) => {
      if (selectedImg) return;
      const section = sectionRef.current;
      if (!section) return;
      const rect   = section.getBoundingClientRect();
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned) return;

      const down = e.deltaY > 0;
      const up   = e.deltaY < 0;
      if (up && index === 0) {
        e.preventDefault();
        exitPinnedSection(-1);
        return;
      }
      if (down && index === projects.length - 1) {
        e.preventDefault();
        exitPinnedSection(1);
        return;
      }

      e.preventDefault();
      if (lockRef.current) return;
      goTo(index + (down ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [index, goTo, exitPinnedSection, selectedImg, isMobileView]);

  // ── Touch swipe ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isMobileView) return;
    const onStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onEnd   = (e) => {
      if (touchStartY.current === null) return;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(dy) < 42) return;

      const section = sectionRef.current;
      if (!section) return;
      const rect   = section.getBoundingClientRect();
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned) return;

      if (dy < 0 && index === 0) {
        exitPinnedSection(-1);
        return;
      }
      if (dy > 0 && index === projects.length - 1) {
        exitPinnedSection(1);
        return;
      }

      goTo(index + (dy > 0 ? 1 : -1));
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [index, goTo, exitPinnedSection, isMobileView]);

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
    <section
      id="work"
      ref={sectionRef}
      style={{ height: isMobileView ? "auto" : `${projects.length * 100}vh` }}
      className="relative bg-base"
    >
      <div className={`${isMobileView ? "relative" : "sticky top-0 h-screen"} overflow-hidden bg-base`}>

        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--foreground)_0.5px,transparent_0.5px)] bg-[size:28px_28px] opacity-[0.04] pointer-events-none" />

        {/* Ambient glow */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`glow-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isMobileView
                ? `radial-gradient(ellipse 90% 40% at 50% 30%, ${proj.accent}14 0%, transparent 70%)`
                : `radial-gradient(ellipse 65% 55% at ${isEven ? "78%" : "22%"} 52%, ${proj.accent}18 0%, transparent 68%)`,
            }}
          />
        </AnimatePresence>

        {/* ─────────────────────── MOBILE VIEW ─────────────────────────── */}
        <div className="block md:hidden w-full">

          {/* Shared top bar — sits above everything */}
          <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 pt-5 pb-3">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: proj.accent }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              />
              <span className="text-[10px] font-bold text-muted-foreground tracking-[0.25em] uppercase">
                Selected Works
              </span>
            </div>
            {/* Thin accent line that grows with progress */}
            <div className="flex-1 mx-4 h-[1.5px] rounded-full bg-border/30 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: proj.accent }}
                animate={{ width: `${((index + 1) / projects.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
            </div>
          </div>

          <MobileProjectView
            proj={proj}
            index={index}
            direction={direction}
            onOpen={setSelectedImg}
            goTo={goTo}
          />
        </div>

        {/* ─────────────────────── DESKTOP VIEW ────────────────────────── */}
        <div className="hidden md:block h-full w-full">

          {/* Header */}
          <div className="absolute top-14 md:top-16 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-14">
            <div className="flex items-center gap-3 rounded-full border border-accent/50 bg-base/70 px-4 py-2 backdrop-blur-sm">
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
            <div className="flex items-baseline gap-1.5 rounded-full border border-accent/50 bg-base/70 px-4 py-2 backdrop-blur-sm">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.span
                  key={`count-${index}`}
                  custom={direction}
                  initial={{ y: direction > 0 ? 20 : -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction > 0 ? -20 : 20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="text-4xl font-black text-accent tabular-nums leading-none"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm text-muted-foreground font-light">
                &nbsp;/ {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Main grid */}
          <div className="relative z-10 h-full grid grid-cols-2 gap-6 md:gap-14 items-center px-6 md:px-14 pt-32 md:pt-36 pb-20">

            {/* IMAGE */}
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`img-${index}`}
                custom={direction}
                variants={IMAGE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                className="order-1 md:order-1 w-full flex items-center justify-center md:pr-4"
              >
                {proj.isMobile ? (
                  <DualPhones firstImage={proj.img} secondImage={proj.imgSecondary} onOpen={setSelectedImg} />
                ) : (
                  <LaptopMockup
                    image={proj.img}
                    onImageClick={() => setSelectedImg({ url: normalizeProjectImageSrc(proj.img), isMobile: false })}
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
                className="order-2 md:order-2 flex flex-col justify-center space-y-5 md:space-y-7 md:pl-4"
              >
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
                  <span className="text-xs font-bold tracking-[0.28em] uppercase" style={{ color: proj.accent }}>
                    {proj.id}
                  </span>
                </motion.div>

                <h3 className="text-4xl md:text-[3.8rem] font-black text-accent tracking-tight leading-[0.88] overflow-hidden">
                  {proj.title === "ATTENDANCE CHECK" ? (
                    <>
                      <span className="block whitespace-nowrap">
                        {"ATTENDANCE".split("").map((char, i) => (
                          <motion.span
                            key={`${index}-attendance-${i}`}
                            initial={{ y: "110%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            transition={{ type: "spring", stiffness: 95, damping: 15, delay: 0.16 + i * 0.022 }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                      <span className="block whitespace-nowrap">
                        {"CHECK".split("").map((char, i) => (
                          <motion.span
                            key={`${index}-check-${i}`}
                            initial={{ y: "110%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            transition={{ type: "spring", stiffness: 95, damping: 15, delay: 0.42 + i * 0.022 }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    </>
                  ) : (
                    proj.title.split("").map((char, i) => (
                      <motion.span
                        key={`${index}-${i}`}
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ type: "spring", stiffness: 95, damping: 15, delay: 0.16 + i * 0.022 }}
                        className="inline-block"
                        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                      >
                        {char}
                      </motion.span>
                    ))
                  )}
                </h3>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm md:text-base text-muted-foreground leading-relaxed font-light max-w-[360px]"
                >
                  {proj.desc}
                </motion.p>

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
                    className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide text-background shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
                      className="px-6 py-2.5 border border-accent text-accent rounded-full text-sm font-semibold tracking-wide hover:opacity-70 transition-all duration-300 cursor-pointer"
                    >
                      GitHub ↗
                    </motion.a>
                  )}
                </motion.div>

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
                        transition={{ delay: 0.52 + i * 0.055, type: "spring", stiffness: 130, damping: 18 }}
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

          {/* Bottom nav */}
          <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-14 pb-6 md:pb-8">
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Project ${i + 1}`} className="flex items-center justify-center py-2 cursor-pointer">
                  <motion.span
                    animate={{ width: i === index ? 28 : 6, opacity: i === index ? 1 : 0.3 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className="block h-[3px] rounded-full"
                    style={{ backgroundColor: i === index ? proj.accent : "var(--border)" }}
                  />
                </button>
              ))}
            </div>
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
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                whileHover={index > 0 ? { scale: 1.1, x: -2 } : {}}
                whileTap={index > 0 ? { scale: 0.93 } : {}}
                className="w-9 h-9 rounded-full border border-accent flex items-center justify-center text-accent disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:opacity-70 cursor-pointer text-base"
              >←</motion.button>
              <motion.button
                onClick={() => goTo(index + 1)}
                disabled={index === projects.length - 1}
                whileHover={index < projects.length - 1 ? { scale: 1.1, x: 2 } : {}}
                whileTap={index < projects.length - 1 ? { scale: 0.93 } : {}}
                className="w-9 h-9 rounded-full border border-accent flex items-center justify-center text-accent disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:opacity-70 cursor-pointer text-base"
              >→</motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedImg} onOpenChange={(open) => !open && setSelectedImg(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[95vw] md:max-w-[90vw] border-none bg-accent/95 p-0 overflow-hidden shadow-2xl flex items-center justify-center"
        >
          <DialogTitle className="sr-only">Project Image</DialogTitle>
          <DialogDescription className="sr-only">Full view of the selected project.</DialogDescription>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className={`relative ${selectedImg.isMobile ? "h-[85vh] aspect-[9/19]" : "w-full h-[80vh] aspect-video"}`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image src={selectedImg.url} alt="Project" fill className="object-contain" priority unoptimized />
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}