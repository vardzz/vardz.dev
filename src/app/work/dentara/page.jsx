// src/app/work/dentara/page.jsx
"use client";

import { motion } from "framer-motion";

export default function DentaraPage() {
  return (
    <main className="w-full overflow-x-hidden bg-[#111111] text-[#F4EDE4]">
      <section className="relative flex min-h-screen w-full overflow-hidden">
        <div className="relative flex flex-1 items-center justify-center bg-[#F4EDE4] px-6 text-[#111111] md:px-16 lg:px-24">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-display text-[clamp(6rem,16vw,14rem)] font-black uppercase leading-[0.78] tracking-[-0.14em] text-center"
          >
            DENTARA
          </motion.h1>
        </div>

        <div className="hidden min-h-screen w-24 bg-[#111111] md:block" aria-hidden="true" />
      </section>
    </main>
  );
}
