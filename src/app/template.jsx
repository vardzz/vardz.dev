"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Template({ children }) {
  const pathname = usePathname();

  // Route-based color logic
  const isBeige = pathname === "/work" || pathname === "/journey";
  const bgColor = isBeige ? "#F4EDE4" : "#111111";
  const textColor = isBeige ? "#111111" : "#F4EDE4";

  // Seamless background transition sync
  useEffect(() => {
    // Delay the body color switch until the Swallow block fully covers the screen (at 0.55s)
    const timeout = setTimeout(() => {
      document.body.style.backgroundColor = bgColor;
      document.body.style.color = textColor;
    }, 550);

    return () => clearTimeout(timeout);
  }, [bgColor, textColor]);

  return (
    <>
      {/* 
        The "Swallow" Block
        Initial State: y: "100%" (off-screen bottom)
        Animate State: sweeps upward through y: "0%" (covers screen)
        Exit State: continues to y: "-100%" (off-screen top)
      */}
      <motion.div
        key={`swallow-${pathname}`}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ backgroundColor: bgColor }}
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Page Content Sync */}
      <motion.main
        key={`content-${pathname}`}
        className="min-h-screen w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.55, ease: "easeOut" }}
      >
        {children}
      </motion.main>
    </>
  );
}
