"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vardz/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/vardzz",
    icon: Github,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/v_ardzz/",
    icon: Instagram,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const isAboutPage = pathname === "/about";

  const glitchStyle = isAboutPage
    ? { textShadow: "1.5px 0 0 rgba(255,0,0,0.8), -1.5px 0 0 rgba(0,255,255,0.8)" }
    : {};

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col bg-transparent py-6 sm:flex md:w-24">
        <div className="flex flex-1 flex-col items-center justify-start pt-4">
          <div className="flex flex-col items-center gap-8">
            {isAboutPage ? (
              <Link
                href="/"
                className="group flex flex-col items-center gap-12"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={glitchStyle}
                  className="-rotate-90 whitespace-nowrap font-mono text-sm font-bold tracking-[0.3em] text-accent transition-opacity hover:opacity-100 opacity-80"
                >
                  HOME
                </motion.span>
                <div className="h-32 w-px bg-[#C9C8C5]" />
              </Link>
            ) : (
              <>
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
                    className="group flex h-8 w-8 items-center justify-center rounded-full text-accent transition-colors duration-300 hover:text-accent hover:opacity-100 opacity-70"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] dark:group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]" />
                  </motion.a>
                ))}
                <div className="mt-1 h-32 w-px bg-[#C9C8C5] opacity-100" />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center pb-4">
          <span
            style={glitchStyle}
            className="-rotate-90 whitespace-nowrap text-xs tracking-[0.35em] text-accent opacity-50"
          >
            © {currentYear}
          </span>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between border-t border-accent/10 bg-base/95 px-4 backdrop-blur-md sm:hidden">
        <div className="flex items-center gap-3">
          {isAboutPage ? (
            <Link href="/">
              <motion.span
                style={glitchStyle}
                className="font-mono text-xs font-bold tracking-[0.3em] text-accent"
              >
                HOME
              </motion.span>
            </Link>
          ) : (
            socialLinks.map(({ label, href, icon: Icon }) => (
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
            ))
          )}
        </div>

        <span
          style={glitchStyle}
          className="font-mono text-[10px] tracking-[0.3em] text-accent opacity-50"
        >
          @ {currentYear}
        </span>
      </div>
    </>
  );
}