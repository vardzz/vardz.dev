import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Looks like a piece went missing",
  description: "Looks like a piece went missing. The requested page could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-6 select-none">
      {/* Emblem with missing piece */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="w-[136px] h-[136px] md:w-[148px] md:h-[148px] relative flex items-center justify-center not-found-glow">
          <Image
            src="/assets/404-piece-missing.png"
            alt="404 — Looks like a piece went missing"
            width={901}
            height={904}
            priority
            className="w-full h-auto object-contain not-found-emblem transition-all duration-300"
          />
        </div>
      </div>

      {/* 404 Status Code */}
      <h1 className="font-mono text-[17px] md:text-[18px] font-medium text-text tracking-[0.1em] mb-3">
        404
      </h1>

      {/* Message */}
      <p className="font-mono text-[14px] text-muted tracking-normal mb-10 max-w-[360px]">
        Looks like a piece went missing.
      </p>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="group inline-flex items-center gap-2 font-mono text-[13px] text-muted hover:text-text transition-colors"
      >
        <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
          ←
        </span>
        <span>Back home</span>
      </Link>
    </div>
  );
}
