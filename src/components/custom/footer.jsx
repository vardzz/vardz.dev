// src/components/custom/footer.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    // bg-base removed — footer now inherits the page background
    // text-accent kept so text color still follows the theme token
    <footer
      id="contact"
      className="relative w-full overflow-hidden border-t border-accent/10 pb-6 pt-24 text-accent md:pb-12 md:pt-32"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto mb-16 flex w-full max-w-[1600px] flex-col items-start justify-between gap-16 px-6 md:mb-32 md:flex-row md:items-end md:px-12"
      >
        {/* Collaborate */}
        <motion.div variants={itemVariants}>
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-accent/70 mb-6 block">
            Contact
          </span>
          <a
            href="mailto:vardz@dev.com"
            className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter border-b border-transparent hover:border-accent transition-all duration-500 cursor-pointer block"
          >
            VARDZ@DEV.COM
          </a>
        </motion.div>

        {/* Networks */}
        <motion.div variants={itemVariants} className="flex flex-col gap-6 md:text-right">
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-accent/70 block">
            Networks
          </span>
          <div className="flex flex-wrap gap-8">
            {[
              { label: "LinkedIn",  href: "https://www.linkedin.com/in/vardz/" },
              { label: "Instagram", href: "https://www.instagram.com/v_ardzz/" },
              { label: "Facebook",  href: "https://www.facebook.com/Changeiscomingtoday" },
              { label: "Github",    href: "https://github.com/vardzz" },
            ].map((net, i) => (
              <motion.a
                key={i}
                href={net.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-[10px] font-bold text-accent/70 hover:text-accent transition-colors duration-300 uppercase tracking-[0.2em] cursor-pointer"
              >
                {net.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Massive Fluid Signature */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 flex w-full items-center justify-center overflow-hidden py-8 transform-gpu will-change-transform"
      >
        <h1 className="font-heading font-display text-[20vw] font-black leading-[0.8] tracking-tighter whitespace-nowrap uppercase text-accent">
          @VARDZ
        </h1>
      </motion.div>

      {/* Bottom Details */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 text-[8px] font-bold uppercase tracking-[0.2em] text-accent/70 md:flex-row md:px-12 md:text-[10px]"
      >
        <span>© 2026 JERICHO VARDE. ALL RIGHTS RESERVED.</span>
        <span>LOCATED IN THE PHILIPPINES</span>
      </motion.div>
    </footer>
  );
}