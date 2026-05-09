"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Page-level variants (Entrance: lift & float; Exit: dissolve & sink)
const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 1,
    },
  },
};

// Container to cascade children with a gentle stagger
const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
  exit: {},
};

// Child typography variant (physics-based spring)
export const staggeredChild = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
  },
  exit: { opacity: 0, y: 10, transition: { type: "spring", stiffness: 200, damping: 25, mass: 1 } },
};

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen w-full"
      >
        <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full">
          {children}
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
}
