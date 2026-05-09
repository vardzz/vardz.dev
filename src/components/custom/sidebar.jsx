// src/components/custom/sidebar.jsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/vardz/",        icon: Linkedin  },
  { label: "GitHub",    href: "https://github.com/vardzz",                  icon: Github    },
  { label: "Instagram", href: "https://www.instagram.com/v_ardzz/",         icon: Instagram },
];

export default function Sidebar() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isInternalPage = pathname === "/about" || pathname === "/journey" || pathname === "/contact" || pathname === "/work";
  const isBeigeBackground = pathname === "/journey" || pathname === "/work"; 

  // ── Per-route color tokens ───────────────────────────────────────────
  const textColor        = isBeigeBackground ? "text-[#111111]"   : "text-accent";
  const borderColor      = isBeigeBackground ? "border-[#111111]" : "border-accent";
  const decorationColor  = isBeigeBackground ? "decoration-[#111111]" : "decoration-accent";
  const lineColor        = isBeigeBackground
    ? "bg-[#111111] shadow-[0_0_12px_rgba(17,17,17,0.25)]"
    : "bg-[#F4EDE4] shadow-[0_0_12px_rgba(244,237,228,0.35)]";
  const dropShadow       = isBeigeBackground
    ? "hover:drop-shadow-[0_0_10px_rgba(17,17,17,0.22)]"
    : "hover:drop-shadow-[0_0_10px_rgba(244,237,228,0.22)]";

  // ── Sidebar background: beige on /journey and /work, transparent elsewhere ─────
  const asideBg  = isBeigeBackground ? "bg-[#F4EDE4]"      : "bg-transparent";
  const mobileBg = isBeigeBackground ? "bg-[#F4EDE4]/95"   : "bg-base/95";

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col ${asideBg} py-6 font-sans sm:flex md:w-24 transition-colors duration-300`}
      >
        <div className="flex flex-1 flex-col items-center justify-start pt-4">
          <div className="flex flex-col items-center gap-8">
            {isInternalPage ? (
              <Link href="/" className="group flex flex-col items-center gap-12">
                <motion.span
                  className={`-rotate-90 whitespace-nowrap font-sans text-xs font-bold tracking-[0.3em] ${textColor} opacity-80 transition-all duration-150 cursor-pointer group-hover:underline ${decorationColor} decoration-2 group-hover:underline-offset-[6px]`}
                >
                  HOME
                </motion.span>
                <div className={`h-36 w-[2px] rounded-full ${lineColor}`} />
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
                    className={`group flex h-8 w-8 items-center justify-center rounded-full ${textColor} transition-colors duration-300`}
                  >
                    <Icon className={`h-4 w-4 transition-transform duration-300 ${dropShadow}`} />
                  </motion.a>
                ))}
                <div className={`mt-2 h-36 w-[2px] rounded-full ${lineColor}`} />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center pb-4">
          <span className={`-rotate-90 whitespace-nowrap text-xs tracking-[0.35em] ${textColor}`}>
            © {currentYear}
          </span>
        </div>
      </aside>

      {/* ── Mobile Bottom Bar ────────────────────────────────────────── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between border-t ${borderColor}/10 ${mobileBg} px-4 font-sans backdrop-blur-md sm:hidden transition-colors duration-300`}
      >
        <div className="flex items-center gap-3">
          {isInternalPage ? (
            <Link href="/">
              <motion.span
                className={`font-sans text-[10px] font-bold tracking-[0.3em] ${textColor} cursor-pointer hover:underline ${decorationColor} decoration-2 hover:underline-offset-[4px]`}
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
                className={`flex h-8 w-8 items-center justify-center rounded-full ${textColor} opacity-70 hover:opacity-100 transition-colors duration-300`}
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))
          )}
        </div>

        <span className={`font-sans text-[10px] tracking-[0.3em] ${textColor}`}>
          © {currentYear}
        </span>
      </div>
    </>
  );
}