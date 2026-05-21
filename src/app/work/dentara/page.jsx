// src/app/work/dentara/page.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
          <h1 className={`mb-10 leading-tight opacity-90 mx-auto text-3xl md:text-5xl`}>
            Dentara is a health-tech PWA that helps dental students and clinics coordinate patients, records, and supervised care in one simple workflow.
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <p className="font-bold text-xs uppercase tracking-widest mb-4 opacity-40">Role</p>
              <div className="text-sm opacity-90">Web Development</div>
            </div>

            <div className="flex flex-col items-center">
              <p className="font-bold text-xs uppercase tracking-widest mb-4 opacity-40">Responsibilities</p>
              <div className="text-sm opacity-90">Consultation, PWA architecture, Supabase integration, UI implementation, and deployment.</div>
            </div>

            <div className="flex flex-col items-center">
              <p className="font-bold text-xs uppercase tracking-widest mb-4 opacity-40">URL</p>
              <a
                href="https://dentara.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-sm opacity-90 hover:underline underline-offset-4 hover:opacity-100 transition-opacity"
              >
                https://dentara.vercel.app/
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-6 pb-28 md:px-16 lg:px-24 lg:pb-36">
        <div className="mx-auto w-full max-w-[1220px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0C0C0C] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <Image
            src="/projects/dentara/dentara-landing.png"
            alt="Dentara showcase thumbnail"
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

    </main>
  );
}
