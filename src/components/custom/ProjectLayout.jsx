"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectLayout({
  name,
  role,
  nextProject,
  nextHref,
  launchHref,
  children,
}) {
  return (
    <div className="min-h-screen w-full bg-[#F4EDE4] text-[#111111] pl-20 md:pl-24 selection:bg-[#111111] selection:text-[#F4EDE4]">
      <header className="pt-32 pb-20 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-heading font-display text-6xl md:text-8xl lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] mb-6">
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

      <main className="px-8 md:px-16 lg:px-24 pb-40">{children}</main>

      <footer className="fixed bottom-0 left-20 md:left-24 right-0 h-24 bg-[#F4EDE4]/85 backdrop-blur-md border-t border-black/5 px-8 md:px-16 flex items-center justify-between z-40">
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