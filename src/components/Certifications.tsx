export default function Certifications() {
  return (
    <section className="py-[54px] md:py-[70px]" id="certifications">
      <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
        <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Certifications</h2>
      </div>
      <div className="border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line group cursor-pointer">
          <div className="text-[17px] tracking-[-.03em] transition-colors group-hover:text-accent text-text">AWS Certified Developer — Associate</div>
          <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap">AWS · 2025</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[9px] md:gap-[20px] py-[22px] border-b border-line group cursor-pointer">
          <div className="text-[17px] tracking-[-.03em] transition-colors group-hover:text-accent text-text">AWS Certified Solutions Architect</div>
          <div className="text-muted font-mono text-[11px] text-left md:text-right whitespace-nowrap">AWS · 2024</div>
        </div>
      </div>
    </section>
  );
}
