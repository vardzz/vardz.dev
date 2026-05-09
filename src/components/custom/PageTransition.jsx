"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  // 1. Theme Assignment
  const isBlackRoute = pathname.includes("/about") || pathname.includes("/contact");
  const overlayColor = isBlackRoute ? "#111111" : "#F4EDE4";

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full min-h-screen">
        
        {/* 2. The Color Sweep Overlay */}
        <motion.div
          className="fixed inset-0 z-[9999] w-full h-screen pointer-events-none"
          style={{ backgroundColor: overlayColor }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          exit={{ y: "0%" }} // Sweeps down to swallow the old page during unmount
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* 3. The Content Wrapper (Blur Exit & Fade Enter) */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeInOut",
            delay: 0.2 // Wait slightly for the overlay to clear before revealing
          }}
        >
          {children}
        </motion.div>

      </div>
    </AnimatePresence>
  );
}