"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProjectTemplate({
  projectName,
  projectDescription,
  role,
  responsibilities,
  liveUrl,
  liveUrlText,
  imageSrc,
  imageAlt,
  nextProjectName,
  nextProjectHref,
}) {
  const hasLiveUrl = Boolean(liveUrl);

  return (
    <main className="w-full overflow-x-hidden bg-[#111111] text-[#F4EDE4]">
      <section className="relative flex min-h-screen w-full overflow-hidden">
        <div className={`relative flex flex-1 items-center justify-center bg-[#F4EDE4] px-6 md:pl-28 md:pr-24 lg:pl-24 lg:pr-24 text-[#111111] pt-75`}>
          <div className="w-full flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 72, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                y: { type: "spring", stiffness: 220, damping: 18 },
                opacity: { duration: 0.45, ease: "easeOut" },
                scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              }}
              className="font-heading font-display text-[clamp(6rem,16vw,14rem)] font-black uppercase leading-[0.78] tracking-[-0.14em] text-center transform md:translate-x-10"
            >
              {projectName}
            </motion.h1>
          </div>
        </div>

        <div className="hidden min-h-screen w-24 bg-[#111111] md:block" aria-hidden="true" />
      </section>

      <section className="bg-[#111111] text-[#F4EDE4] px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className={`mb-10 leading-tight opacity-90 mx-auto text-3xl md:text-5xl`}>
            {projectDescription}
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <p className="font-bold text-xs uppercase tracking-widest mb-4 opacity-40">Role</p>
              <div className="text-sm opacity-90">{role}</div>
            </div>

            <div className="flex flex-col items-center">
              <p className="font-bold text-xs uppercase tracking-widest mb-4 opacity-40">Responsibilities</p>
              <div className="text-sm opacity-90">{responsibilities}</div>
            </div>

            {hasLiveUrl && (
              <div className="flex flex-col items-center">
                <p className="font-bold text-xs uppercase tracking-widest mb-4 opacity-40">URL</p>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm opacity-90 hover:underline underline-offset-4 hover:opacity-100 transition-opacity"
                >
                  {liveUrlText}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-6 pb-28 md:px-16 lg:px-24 lg:pb-36">
        <div className="mx-auto w-full max-w-[1220px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0C0C0C] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-[#111111] px-6 pb-24 md:px-16 lg:px-24 lg:pb-32">
        <div className="mx-auto grid w-full max-w-[1220px] grid-cols-1 items-center gap-6 md:grid-cols-3">
          {hasLiveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-bold justify-self-center inline-flex items-center justify-center rounded-full bg-[#F4EDE4] px-8 py-4 text-[#111111] transition-transform duration-300 hover:scale-[1.04] md:col-start-2 md:translate-x-8"
            >
              <h1 className="text-bold font-heading text-2xl md:text-3xl leading-none">Check it out</h1>
              <span className="text-bold ml-4 font-heading text-2xl md:text-3xl leading-none">→</span>
            </Link>
          )}

          <Link
            href={nextProjectHref}
            className="justify-self-center text-[11px] font-bold uppercase tracking-[0.25em] text-[#F4EDE4] transition-opacity duration-300 hover:opacity-80 hover:underline underline-offset-4 md:justify-self-end md:col-start-3"
          >
            {nextProjectName} ›
          </Link>
        </div>
      </section>

    </main>
  );
}