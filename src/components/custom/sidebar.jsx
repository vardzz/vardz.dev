"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: Github,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
];

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : false;

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center justify-between border-r border-black/10 bg-white py-10 dark:border-white/10 dark:bg-[#050505] sm:flex md:w-24">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group flex h-9 w-9 items-center justify-center rounded-full text-zinc-900 transition-colors duration-300 hover:bg-black hover:text-white dark:text-zinc-100 dark:hover:bg-white dark:hover:text-black"
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] dark:group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]" />
              </motion.a>
            ))}
          </div>

          <div className="my-6 h-24 w-px bg-zinc-300 dark:bg-zinc-800" />

          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="relative flex h-16 w-8 items-center justify-center rounded-full border border-black/10 bg-zinc-100 p-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),inset_0_-10px_20px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:scale-105 dark:border-white/10 dark:bg-zinc-900 dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),inset_0_-10px_20px_rgba(0,0,0,0.45)]"
          >
            <motion.div
              initial={false}
              animate={{ y: isDark ? 14 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="absolute left-1/2 top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg dark:bg-black dark:text-white"
            >
              <Sun className={`h-3.5 w-3.5 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`} />
            </motion.div>

            <motion.div
              initial={false}
              animate={{ y: isDark ? 14 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="absolute left-1/2 bottom-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-black text-white shadow-lg dark:bg-white dark:text-black"
            >
              <Moon className={`h-3.5 w-3.5 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`} />
            </motion.div>
          </button>
        </div>

        <div className="flex items-center justify-center">
          <span className="-rotate-90 whitespace-nowrap font-mono text-xs tracking-[0.35em] text-zinc-500">
            © {currentYear}
          </span>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between border-t border-black/10 bg-white/95 px-4 backdrop-blur-md dark:border-white/10 dark:bg-[#050505]/95 sm:hidden">
        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-900 transition-colors duration-300 hover:bg-black hover:text-white dark:text-zinc-100 dark:hover:bg-white dark:hover:text-black"
            >
              <Icon className="h-4 w-4" />
            </motion.a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
          className="relative flex h-10 w-16 items-center rounded-full border border-black/10 bg-zinc-100 px-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-8px_18px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),inset_0_-8px_18px_rgba(0,0,0,0.45)]"
        >
          <motion.div
            initial={false}
            animate={{ x: isDark ? 26 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg dark:bg-black dark:text-white"
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.div>
        </button>

        <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">
          © {currentYear}
        </span>
      </div>
    </>
  );
}