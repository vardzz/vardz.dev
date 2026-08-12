import Link from 'next/link';

export default function Experience() {
  return (
    <section className="py-[54px] md:py-[70px]" id="experience">
      <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
        <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Experience</h2>
        <Link href="/experience" className="text-muted hover:text-accent transition-colors text-[14px] font-mono group">full history <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">→</span></Link>
      </div>
      <div className="border-t border-line">
        <Link href="/experience" className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] px-[16px] -mx-[16px] border-b border-line hover:bg-text/5 transition-colors rounded-[12px] cursor-pointer">
          <div>
            <div className="text-[17px] tracking-[-.03em] text-text group-hover:text-accent transition-colors">Frontend AI Engineer · Flyrank</div>
            <div className="text-muted text-[13px] leading-[1.6] mt-[8px] max-w-[560px]">Architecting and shipping responsive frontend components using React, TypeScript, and Tailwind CSS for Fly-Rank's organic growth and SEO automation platform, using AI-assisted pair-programming workflows to accelerate scaffolding, refactoring, and deployment of production-ready UI.</div>
          </div>
          <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap uppercase pt-[4px]">June 2026 — Present</div>
        </Link>
        <Link href="/experience" className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] px-[16px] -mx-[16px] border-b border-line hover:bg-text/5 transition-colors rounded-[12px] cursor-pointer">
          <div>
            <div className="text-[17px] tracking-[-.03em] text-text group-hover:text-accent transition-colors">Membership Data Analyst · DEVCON Laguna</div>
            <div className="text-muted text-[13px] leading-[1.6] mt-[8px] max-w-[560px]">Track membership analytics, demographic trends, and registration data for 500+ members across 3 major event cycles to support community growth and execution planning.</div>
          </div>
          <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap uppercase pt-[4px]">July 2026 — Present</div>
        </Link>
      </div>
    </section>
  );
}
