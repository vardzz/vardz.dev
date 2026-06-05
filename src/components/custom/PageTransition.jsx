"use client";

import React, { useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

function FrozenRoute({ children }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context);

  return (
    <LayoutRouterContext.Provider value={frozen.current}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function PageTransition({ children }) {
  const pathname = usePathname();

  const isBlackRoute = pathname.includes("/about") || pathname.includes("/contact");
  const overlayColor = isBlackRoute ? "#111111" : "#F4EDE4";

  // Check if current route requires the blur entrance
  const isBlurRoute = pathname === "/work" || pathname === "/contact" || pathname.includes("/about") || pathname.includes("/journey");

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full min-h-screen">
        
        {/* The Curtain Overlay */}
        <motion.div
          className="fixed inset-0 z-[9999] w-full h-screen pointer-events-none"
          style={{ backgroundColor: overlayColor }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          exit={{ y: "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Content Wrapper - Blur & Synced Reveal */}
        <motion.div
          className="will-change-filter"
          initial={isBlurRoute ? { filter: "blur(20px)", opacity: 0 } : {}}
          animate={isBlurRoute ? { filter: "blur(0px)", opacity: 1 } : {}}
          exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
          transition={{ 
            duration: isBlurRoute ? 1.2 : 0.4, 
            ease: isBlurRoute ? [0.16, 1, 0.3, 1] : "easeInOut",
            staggerChildren: 0.1
          }}
        >
          <FrozenRoute>{children}</FrozenRoute>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}