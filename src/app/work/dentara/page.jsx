// src/app/work/dentara/page.jsx
"use client";

import { motion } from "framer-motion";

export default function DentaraPage() {
  return (
    <main className="w-full overflow-x-hidden bg-[#111111] text-[#F4EDE4]">
      <section className="relative flex min-h-screen w-full overflow-hidden">
        <div className={`relative flex flex-1 items-center justify-center bg-[#F4EDE4] px-6 md:pl-28 md:pr-24 lg:pl-24 lg:pr-24 text-[#111111] pt-75`}>
          <div className="w-full flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-display text-[clamp(6rem,16vw,14rem)] font-black uppercase leading-[0.78] tracking-[-0.14em] text-center transform md:translate-x-10"
            >
              DENTARA
            </motion.h1>
          </div>
        </div>

        <div className="hidden min-h-screen w-24 bg-[#111111] md:block" aria-hidden="true" />
      </section>

      <section className="bg-[#111111] text-[#F4EDE4] px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <p className="mb-10 text-lg md:text-xl leading-relaxed opacity-90 mx-auto">
            Dentara is a progressive web application designed to streamline patient-student matching for dental training clinics. It simplifies appointment coordination, patient records, and supervision workflows so trainees can focus on clinical learning.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 opacity-40">Role</h4>
              <div className="text-sm opacity-90">Web Development</div>
            </div>

            <div className="flex flex-col items-center">
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 opacity-40">Responsibilities</h4>
              <div className="text-sm opacity-90">Consultation, PWA architecture, Supabase integration, UI implementation, and deployment.</div>
            </div>

            <div className="flex flex-col items-center">
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 opacity-40">URL</h4>
              <div className="text-sm opacity-90">https://dentara.example</div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
