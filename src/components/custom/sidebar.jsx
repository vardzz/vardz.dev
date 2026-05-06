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
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col border-r border-accent/10 bg-base py-8 sm:flex md:w-24">
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
                className="group flex h-9 w-9 items-center justify-center rounded-full text-accent transition-colors duration-300 hover:text-accent hover:opacity-100 opacity-70"
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] dark:group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]" />
              </motion.a>
            ))}
          </div>

          <div className="my-6 h-24 w-px bg-accent opacity-20" />
        </div>

        <div className="flex flex-col items-center pb-2">
          <span className="mt-6 -rotate-90 whitespace-nowrap text-xs tracking-[0.35em] text-accent opacity-50">
            © {currentYear}
          </span>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between border-t border-accent/10 bg-base/95 px-4 backdrop-blur-md sm:hidden">
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
              className="flex h-8 w-8 items-center justify-center rounded-full text-accent transition-colors duration-300 hover:opacity-100 opacity-70"
            >
              <Icon className="h-4 w-4" />
            </motion.a>
          ))}
        </div>

        <span className="font-mono text-[10px] tracking-[0.3em] text-accent opacity-50">
          © {currentYear}
        </span>
      </div>
    </>
  );
}