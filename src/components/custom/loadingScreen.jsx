"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onFinished }) => {
  const [text, setText] = useState("");
  const fullText = "Hi, I'm Vardz";
  const typingSpeed = 100; // ms per character

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= fullText.length) {
        setText(fullText.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
        // Wait a bit after typing finishes before hiding
        setTimeout(() => {
          onFinished();
        }, 1000);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-base"
    >
      <div className="text-center">
        <motion.h1 
          className="text-5xl md:text-8xl font-black text-accent tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block ml-1 w-[3px] h-[1em] bg-current align-middle"
          />
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
