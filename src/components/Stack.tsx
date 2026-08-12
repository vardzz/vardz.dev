import Link from 'next/link';

export default function Stack() {
  return (
    <section className="py-[54px] md:py-[70px]" id="stack">
      <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
        <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Tech stack</h2>
        <Link href="/stack" className="text-muted hover:text-accent transition-colors text-[14px] font-mono group">view all <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">→</span></Link>
      </div>
      <div className="flex flex-wrap gap-[9px]">
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">TypeScript</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">React</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Next.js</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Node.js</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Python</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Laravel</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">PostgreSQL</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">AWS</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Docker</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Kubernetes</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">PyTorch</span>
        <span className="border border-line text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">Claude Code</span>
        <span className="border border-line border-dashed text-soft rounded-[6px] px-[12px] py-[9px] text-[13px]">+ more</span>
      </div>
    </section>
  );
}
