"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List, Settings2, Star, Trophy, Layers } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CREDENTIAL_CATEGORIES = [
  {
    id: "all",
    label: "ALL",
    icon: Layers,
    description:
      "Comprehensive collection of all certifications, achievements, and credentials across various categories, showcasing a holistic view of professional development and accomplishments.",
  },
  {
    id: "core",
    label: "CORE",
    icon: Star,
    description:
      "Foundational certifications that validate core engineering fluency, technical consistency, and the standards used to build reliable products.",
  },
  {
    id: "hackathons",
    label: "HACKATHONS",
    icon: Trophy,
    description:
      "Event-driven achievements earned in fast-paced build environments, where problem solving, collaboration, and execution speed matter most.",
  },
  {
    id: "others",
    label: "OTHERS",
    icon: Settings2,
    description:
      "Supplementary validations, workshops, and participation credentials that round out a broader professional development profile.",
  },
];

const VIEW_MODES = [
  {
    id: "grid",
    icon: LayoutGrid,
  },
  {
    id: "list",
    icon: List,
  },
];

const initialCertificates = [
  {
    id: 1,
    title: "Thesis and Capstone Ready",
    category: "others",
    issuer: "College of Computing Studies",
    date: "2026",
    imgSrc: "/public/certificates/attendance.png",
  },
  {
    id: 2,
    title: "Top 8 Finalist | Participation",
    category: "hackathons",
    issuer: "DLSU - DASMARINAS | CICSSG",
    date: "2026",
    imgSrc: "/public/certificates/sikaptala.png",
  },
  {
    id: 3,
    title: "Introduction to Cloud Computing Certificate",
    category: "core",
    issuer: "Simplilearn",
    date: "2026",
    imgSrc: "/public/certificates/cloud_computing.png",
  },
];

function normalizeCertificateSource(source) {
  return source.replace(/^\/public\//, "/");
}

function buildFallbackSources(source) {
  const normalized = normalizeCertificateSource(source);
  const basePath = normalized.replace(/\.[^.]+$/, "");

  return [
    normalized,
    `${basePath}.png`,
    `${basePath}.jpg`,
    `${basePath}.jpeg`,
    `${basePath}.webp`,
  ];
}

function getInitials(label) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Certificates() {
  const [activeFilter, setActiveFilter] = useState("core");
  const [viewMode, setViewMode] = useState("grid");

  const activeCategory =
    CREDENTIAL_CATEGORIES.find((category) => category.id === activeFilter) ??
    CREDENTIAL_CATEGORIES[0];

  const filteredCertificates = initialCertificates.filter((certificate) => {
    if (activeFilter === "all") {
      return true;
    }

    return certificate.category === activeFilter;
  });

  return (
    <section
      className="relative overflow-hidden px-6 py-32 md:py-48"
      style={{ backgroundColor: "#F4EDE4", color: "#111111" }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
          className="relative z-10 mb-10 flex flex-col items-center text-center md:mb-16"
        >
          <p className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[rgba(17,17,17,0.5)]">
            CREDENTIALS &amp; VALIDATIONS
          </p>
          <h2 className="font-heading font-display text-[clamp(2.75rem,7vw,5.5rem)] font-black uppercase tracking-tighter break-words hyphens-auto text-[#111111]">
            CERTIFICATES
          </h2>
        </motion.div>

        <div className="relative z-10 mb-3 flex flex-wrap justify-center gap-4 md:mb-8 md:gap-8">
          {CREDENTIAL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = activeFilter === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveFilter(category.id)}
                aria-pressed={isActive}
                className={`group flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2 pb-3 transition-all duration-300 ${
                  isActive
                    ? "border-[#111111] text-[#111111]"
                    : "border-transparent text-[rgba(17,17,17,0.5)] hover:border-[rgba(17,17,17,0.3)] hover:text-[rgba(17,17,17,0.7)]"
                }`}
              >
                <Icon
                  size={16}
                  className={`${isActive ? "text-[#111111]" : "text-[#111111] opacity-50 group-hover:opacity-70"}`}
                />
                <span
                  className={`text-[13px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive ? "text-[#111111]" : "text-[#111111] opacity-50 group-hover:opacity-70"
                  }`}
                >
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative z-10 mx-auto mb-12 max-w-2xl px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.2, 1, 0.3, 1] }}
              className="min-h-[40px] text-xs font-medium leading-relaxed text-[rgba(17,17,17,0.65)]"
            >
              {activeCategory.description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="relative z-10 flex flex-col gap-6 md:hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.55,
                    delay: index * 0.04,
                    ease: [0.215, 0.61, 0.355, 1],
                  },
                }}
                exit={{ opacity: 0, scale: 0.94, filter: "blur(4px)", transition: { duration: 0.25 } }}
                className="w-full"
              >
                <CertificateCard certificate={certificate} listMode />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="relative z-10 mb-4 hidden items-center justify-end gap-4 border-b border-[rgba(17,17,17,0.12)] pb-4 md:flex">
          <div
            role="tablist"
            aria-label="Certificate view mode"
            className="inline-flex rounded-full border border-[rgba(17,17,17,0.15)] bg-[rgba(255,255,255,0.25)] p-1 backdrop-blur-sm"
          >
            {VIEW_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = viewMode === mode.id;

              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setViewMode(mode.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#111111] text-[#F4EDE4] shadow-lg shadow-black/20"
                      : "text-[rgba(17,17,17,0.6)] hover:text-[#111111]"
                  }`}
                >
                  <Icon size={14} />
                  <span className="sr-only">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block">
          <AnimatePresence mode="wait" initial={false}>
          {viewMode === "grid" ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.2, 1, 0.3, 1] }}
              className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredCertificates.map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(4px)" }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.55,
                        delay: index * 0.04,
                        ease: [0.215, 0.61, 0.355, 1],
                      },
                    }}
                    exit={{ opacity: 0, scale: 0.94, filter: "blur(4px)", transition: { duration: 0.25 } }}
                  >
                    <CertificateCard certificate={certificate} compact />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.2, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col gap-6"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredCertificates.map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(4px)" }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.55,
                        delay: index * 0.04,
                        ease: [0.215, 0.61, 0.355, 1],
                      },
                    }}
                    exit={{ opacity: 0, scale: 0.94, filter: "blur(4px)", transition: { duration: 0.25 } }}
                    className="w-full"
                  >
                    <CertificateCard certificate={certificate} listMode />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ certificate, compact = false, listMode = false }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [hasFallback, setHasFallback] = useState(false);

  const fallbackSources = buildFallbackSources(certificate.imgSrc);
  const activeSource = fallbackSources[sourceIndex] ?? fallbackSources[0];

  useEffect(() => {
    setSourceIndex(0);
    setHasFallback(false);
  }, [certificate.imgSrc]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.article
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.35, ease: [0.2, 1, 0.3, 1] }}
          className={`group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-[rgba(17,17,17,0.12)] bg-[rgba(255,255,255,0.45)] shadow-[0_20px_60px_rgba(17,17,17,0.08)] transition-colors duration-300 hover:border-[rgba(17,17,17,0.22)] ${
            compact ? "h-full" : listMode ? "h-full w-full" : "h-full"
          }`}
        >
          <div className="flex h-full flex-col p-4 md:p-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[rgba(17,17,17,0.1)] bg-[rgba(17,17,17,0.03)]">
              {!hasFallback ? (
                <motion.img
                  key={activeSource}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.2, 1, 0.3, 1] }}
                  src={activeSource}
                  alt={certificate.title}
                  className="h-full w-full rounded-sm object-cover"
                  loading="lazy"
                  onError={() => {
                    if (sourceIndex < fallbackSources.length - 1) {
                      setSourceIndex((currentIndex) => currentIndex + 1);
                      return;
                    }

                    setHasFallback(true);
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[rgba(17,17,17,0.08)] via-transparent to-[rgba(17,17,17,0.03)] px-6 text-center">
                  <div className="space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(17,17,17,0.12)] bg-[rgba(255,255,255,0.35)] text-[12px] font-black tracking-[0.25em] text-[#111111]">
                      {getInitials(certificate.issuer)}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[rgba(17,17,17,0.5)]">
                      Preview unavailable
                    </p>
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="mt-4 flex items-end justify-between gap-4 border-t border-[rgba(17,17,17,0.1)] pt-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-bold uppercase tracking-[0.28em] text-[rgba(17,17,17,0.45)]">
                  {certificate.issuer}
                </p>
                <h3 className="truncate font-heading font-display text-lg font-black tracking-tighter text-[#111111] md:text-xl">
                  {certificate.title}
                </h3>
              </div>

              <time className="shrink-0 text-right text-[10px] font-bold uppercase tracking-[0.25em] text-[rgba(17,17,17,0.6)]">
                {certificate.date}
              </time>
            </div>
          </div>
        </motion.article>
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="fixed left-1/2 top-1/2 z-50 w-[min(98vw,1500px)] max-w-none translate-x-[-50%] translate-y-[-50%] rounded-[2rem] border border-[rgba(17,17,17,0.15)] bg-transparent p-0 shadow-none outline-none backdrop-blur-none sm:w-[min(96vw,1400px)]"
      >
        <DialogTitle className="sr-only">
          {certificate.title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Certificate issued by {certificate.issuer} in {certificate.date}.
        </DialogDescription>

        <DialogHeader className="sr-only">
          <DialogTitle>{certificate.title}</DialogTitle>
        </DialogHeader>

        <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(17,17,17,0.15)] bg-[rgba(244,237,228,0.96)] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:p-5">
          <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(17,17,17,0.08)] bg-white">
            <img
              src={normalizeCertificateSource(certificate.imgSrc)}
              alt={certificate.title}
              className="block max-h-[84vh] w-full object-contain"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4 px-1 pb-1">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold uppercase tracking-[0.3em] text-[rgba(17,17,17,0.45)]">
                {certificate.issuer}
              </p>
              <h3 className="truncate font-heading font-display text-3xl font-black tracking-tighter text-[#111111] md:text-4xl">
                {certificate.title}
              </h3>
            </div>

            <time className="shrink-0 text-right text-[10px] font-bold uppercase tracking-[0.25em] text-[rgba(17,17,17,0.6)]">
              {certificate.date}
            </time>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}