"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  const isBlackRoute = pathname.includes("/about") || pathname.includes("/contact");
  const overlayColor = isBlackRoute ? "#111111" : "#F4EDE4";

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

        {/* Content Wrapper - Synced Reveal */}
        <motion.div
          // We remove the opacity/blur from initial/animate so it mounts instantly beneath the curtain.
          // We only keep the exit animation to melt the OLD page away.
          exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {children}
        </motion.div>

      </div>
    </AnimatePresence>
  );
}