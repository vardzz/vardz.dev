"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectLayout({
  name,
  role,
  nextProject,
  nextHref,
  launchHref,
  heroVariant = "default",
  children,
}) {
  const isCenteredHero = heroVariant === "centered";

  return (
    <div className="min-h-screen w-full bg-[#F4EDE4] pb-24 pl-0 text-[#111111] selection:bg-[#111111] selection:text-[#F4EDE4] md:pl-24 md:pb-0">
      {isCenteredHero ? (
        <header className="min-h-screen px-6 md:px-16 lg:px-24">
          <motion.div
            className="flex min-h-screen flex-col items-center justify-center text-center"
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="break-words font-heading font-display text-[clamp(4.5rem,12vw,10rem)] font-black uppercase leading-[0.85] tracking-[-0.08em] md:tracking-[-0.1em] lg:tracking-[-0.12em]">
              {name}
            </h1>
            <div className="mt-6 flex items-center gap-4 opacity-40">
              <span className="text-[10px] tracking-[0.3em] font-bold uppercase">
                {role}
              </span>
            </div>
          </motion.div>
        </header>
      ) : (
        <header className="px-6 pb-20 pt-32 md:px-16 lg:px-24">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="mb-6 break-words font-heading font-display text-6xl font-black uppercase leading-[0.8] tracking-tighter md:text-8xl lg:text-[10vw]">
              {name}
            </h1>
            <div className="flex items-center gap-4 opacity-50">
              <div className="h-[1px] w-12 bg-current" />
              <span className="text-[10px] tracking-[0.3em] font-bold uppercase">
                {role}
              </span>
            </div>
          </motion.div>
        </header>
      )}

      <main className={isCenteredHero ? "px-6 pb-40 md:px-16 lg:px-24" : "px-6 pb-40 md:px-16 lg:px-24"}>{children}</main>

      <footer className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-t border-black/5 bg-[#F4EDE4]/85 px-6 backdrop-blur-md md:left-24 md:h-24 md:px-16">
        {launchHref ? (
          <Link
            href={launchHref}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] font-bold tracking-[0.2em] uppercase hover:underline underline-offset-4 transition-all"
          >
            Launch Project
          </Link>
        ) : (
          <button className="text-[10px] font-bold tracking-[0.2em] uppercase hover:underline underline-offset-4 transition-all">
            Launch Project
          </button>
        )}

        <Link href={nextHref} className="group flex flex-col items-end">
          <span className="text-[9px] opacity-40 uppercase tracking-widest mb-1">
            Next Project
          </span>
          <span className="text-sm font-bold uppercase group-hover:pr-2 transition-all duration-300">
            {nextProject} →
          </span>
        </Link>
      </footer>
    </div>
  );
}