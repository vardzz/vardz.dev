import React, { useMemo } from 'react';

export default function Github() {
  const contributions = useMemo(() => {
    // Generate deterministic random dots for the heatmap
    const result = [];
    let seed = 42;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    
    // 52 columns x 7 rows
    for (let i = 0; i < 52 * 7; i++) {
      const val = random();
      let sizeClass = "w-[2px] h-[2px] bg-white/20"; // Level 0 (no activity)
      
      if (val > 0.95) sizeClass = "w-[8px] h-[8px] bg-white opacity-100"; // Level 4
      else if (val > 0.85) sizeClass = "w-[6px] h-[6px] bg-white/80"; // Level 3
      else if (val > 0.65) sizeClass = "w-[4px] h-[4px] bg-white/60"; // Level 2
      else if (val > 0.45) sizeClass = "w-[3px] h-[3px] bg-white/40"; // Level 1
      
      result.push(sizeClass);
    }
    return result;
  }, []);

  return (
    <section className="py-[54px] md:py-[70px] w-full overflow-hidden" id="github">
      <div className="flex flex-col max-w-full">
        {/* Header */}
        <div className="flex justify-between items-baseline mb-[32px]">
          <h2 className="m-0 text-[11px] font-mono text-muted uppercase tracking-[0.1em]">Github</h2>
          <a href="https://github.com/vardzz" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-[11px] font-mono uppercase tracking-[0.1em] group">
            @VARDZZ <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
          </a>
        </div>
        
        {/* Heatmap */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
          <div className="min-w-[max-content] flex gap-[10px]">
            {Array.from({ length: 52 }).map((_, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-[10px]">
                {Array.from({ length: 7 }).map((_, rowIndex) => {
                  const index = colIndex * 7 + rowIndex;
                  return (
                    <div key={rowIndex} className="w-[10px] h-[10px] flex items-center justify-center">
                      <span className={`rounded-full transition-all duration-300 hover:scale-150 hover:bg-accent ${contributions[index]}`}></span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-[20px] text-[11px] font-mono text-muted uppercase tracking-[0.05em]">
          1,204 contributions in the last year
        </div>
      </div>
    </section>
  );
}
