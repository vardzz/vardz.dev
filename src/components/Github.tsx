import React, { useEffect, useState } from 'react';

export default function Github() {
  const [contributions, setContributions] = useState<string[]>([]);
  const [columns, setColumns] = useState<number>(53);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/github?t=' + Date.now());
        const json = await res.json();
        
        if (json.error) {
          setError(json.error);
          setLoading(false);
        }

        if (json.data && (json.data.user || json.data.viewer)) {
          const userObj = json.data.user || json.data.viewer;
          const calendar = userObj.contributionsCollection.contributionCalendar;
          setTotal(calendar.totalContributions);
          
          const weeks = calendar.weeks;
          setColumns(weeks.length);
          
          // Determine relative thresholds based on non-zero contributions
          const counts: number[] = [];
          weeks.forEach((week: any) => {
            week.contributionDays.forEach((day: any) => {
              if (day.contributionCount > 0) counts.push(day.contributionCount);
            });
          });
          counts.sort((a, b) => a - b);
          
          const q1 = counts[Math.floor(counts.length * 0.25)] || 1;
          const q2 = counts[Math.floor(counts.length * 0.5)] || 2;
          const q3 = counts[Math.floor(counts.length * 0.75)] || 3;

          const result = Array.from({ length: weeks.length }, () => Array(7).fill("w-[2px] h-[2px] bg-white/10"));

          weeks.forEach((week: any, colIndex: number) => {
            week.contributionDays.forEach((day: any) => {
              const rowIndex = day.weekday !== undefined ? day.weekday : new Date(day.date).getUTCDay();
              const count = day.contributionCount;
              
              let sizeClass = "w-[2px] h-[2px] bg-text opacity-10 hover:opacity-100"; 
              if (count > q3) sizeClass = "w-[8px] h-[8px] bg-text opacity-100";
              else if (count > q2) sizeClass = "w-[6px] h-[6px] bg-text opacity-90 hover:opacity-100";
              else if (count > q1) sizeClass = "w-[5px] h-[5px] bg-text opacity-80 hover:opacity-100";
              else if (count > 0) sizeClass = "w-[4px] h-[4px] bg-text opacity-70 hover:opacity-100";
              
              result[colIndex][rowIndex] = sizeClass;
            });
          });
          
          setContributions(result.flat());
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <section className="py-[54px] md:py-[70px] w-full overflow-hidden" id="github">
      <div className="flex flex-col max-w-full">
        {/* Header */}
        <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
          <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">Github</h2>
          <a href="https://github.com/vardzz" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-[14px] font-mono group">
            @VARDZZ <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
          </a>
        </div>
        
        {/* Heatmap */}
        <div className="w-full pb-4">
          {loading ? (
            <div className="text-muted text-[11px] font-mono uppercase py-4">Fetching live data...</div>
          ) : error ? (
            <div className="text-muted text-[11px] font-mono uppercase py-4">Waiting for live data...</div>
          ) : (
            <div 
              className="grid grid-rows-7 grid-flow-col gap-[2px] sm:gap-[3px] md:gap-[4px] w-full max-w-full"
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {contributions.map((sizeClass, index) => (
                <div key={index} className="w-full aspect-square flex items-center justify-center">
                  <span className={`rounded-full transition-all duration-300 hover:scale-150 hover:bg-accent ${sizeClass}`}></span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer text */}
        <div className="mt-[20px] text-[11px] font-mono text-muted uppercase tracking-[0.05em]">
          {loading || error ? "..." : `${total.toLocaleString()} contributions in the last year`}
        </div>
      </div>
    </section>
  );
}
