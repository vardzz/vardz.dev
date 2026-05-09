"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  
  // Define destination color mapping
  const isBlackRoute = pathname.includes('/about') || pathname.includes('/contact');
  const overlayColor = isBlackRoute ? "#111111" : "#F4EDE4";

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full h-full">
        {/* The Swallow Overlay (Top to Bottom Sweep) */}
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          style={{ backgroundColor: overlayColor }}
          className="fixed inset-0 z-[9999] w-full h-screen pointer-events-none"
        />
        
        {/* The Delayed Content Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
