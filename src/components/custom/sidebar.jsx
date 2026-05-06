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
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col border-r border-white/5 bg-white py-8 dark:bg-[#050505] sm:flex md:w-24">
        <div className="flex flex-1 flex-col items-center">
          <div className="flex flex-col items-center gap-5 pt-2">
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
        </div>

        <div className="flex flex-col items-center pb-2">
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="relative flex h-16 w-8 items-center justify-center rounded-full border border-zinc-800 bg-black/50 p-1 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-18px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-105"
          >
            <motion.div
              initial={false}
              animate={{ y: isDark ? 14 : 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="absolute left-1/2 top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-white text-zinc-900 shadow-[0_4px_18px_rgba(255,255,255,0.14)]"
            >
              <Sun className={`h-3.5 w-3.5 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`} />
            </motion.div>

            <motion.div
              initial={false}
              animate={{ y: isDark ? 14 : 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="absolute left-1/2 bottom-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-black text-white shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
            >
              <Moon className={`h-3.5 w-3.5 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`} />
            </motion.div>
          </button>

          <span className="mt-6 -rotate-90 whitespace-nowrap text-xs tracking-[0.35em] text-zinc-500">
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
          className="relative flex h-10 w-16 items-center rounded-full border border-zinc-800 bg-black/50 px-1 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-14px_22px_rgba(0,0,0,0.45)]"
        >
          <motion.div
            initial={false}
            animate={{ x: isDark ? 26 : 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-900 shadow-[0_8px_20px_rgba(255,255,255,0.12)] dark:bg-black dark:text-white"
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