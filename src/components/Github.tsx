export default function Github() {
  return (
    <section className="py-[54px] md:py-[70px]" id="github">
      <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
        <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Github activity</h2>
      </div>
      <div className="block md:grid md:grid-cols-[1.2fr_.8fr] gap-[50px]">
        <div className="grid grid-cols-[repeat(20,1fr)] md:grid-cols-[repeat(26,1fr)] gap-[4px] content-start" id="heatmap" aria-label="A visual summary of recent Github activity">
          {/* Heatmap rendered via JS */}
        </div>
        <div className="mt-[28px] md:mt-0 text-soft text-[13px] leading-[1.7]">
          <strong className="block text-text text-[36px] font-medium tracking-[-.07em] mb-[3px]">1,204</strong>
          contributions in the last year.<br/><br/>
          Consistent commits across personal projects, cloud tools, and open source.<br/><br/>
          <a className="text-muted font-mono text-[11px] hover:text-accent transition-colors" href="https://github.com" target="_blank">view github ↗</a>
        </div>
      </div>
    </section>
  );
}
