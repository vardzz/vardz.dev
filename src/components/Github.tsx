import React, { useEffect, useState } from 'react';

export default function Github() {
  const [contributions, setContributions] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/github');
        const json = await res.json();
        
        if (json.error) {
          setError(json.error);
          setLoading(false);
          return;
        }

        if (json.data && json.data.user) {
          const calendar = json.data.user.contributionsCollection.contributionCalendar;
          setTotal(calendar.totalContributions);
          
          const weeks = calendar.weeks;
          const days: number[] = [];
          
          // Flatten days
          for (const week of weeks) {
            for (const day of week.contributionDays) {
              days.push(day.contributionCount);
            }
          }

          // We want the last 52 weeks * 7 days = 364 days to fit our 52x7 grid
          const last364 = days.slice(-364);
          const result = [];

          for (const count of last364) {
            let sizeClass = "w-[2px] h-[2px] bg-white/20"; 
            if (count > 10) sizeClass = "w-[8px] h-[8px] bg-white opacity-100";
            else if (count > 5) sizeClass = "w-[6px] h-[6px] bg-white/80";
            else if (count > 2) sizeClass = "w-[4px] h-[4px] bg-white/60";
            else if (count > 0) sizeClass = "w-[3px] h-[3px] bg-white/40";
            result.push(sizeClass);
          }
          
          setContributions(result);
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
        <div className="flex justify-between items-baseline mb-[32px]">
          <h2 className="m-0 text-[11px] font-mono text-muted uppercase tracking-[0.1em]">Github</h2>
          <a href="https://github.com/vardzz" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-[11px] font-mono uppercase tracking-[0.1em] group">
            @VARDZZ <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
          </a>
        </div>
        
        {/* Heatmap */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
          <div className="min-w-[max-content] flex gap-[10px]">
            {loading ? (
              <div className="text-muted text-[11px] font-mono uppercase py-4">Fetching live data...</div>
            ) : error ? (
              <div className="text-muted text-[11px] font-mono uppercase py-4">Waiting for GITHUB_TOKEN in .env.local</div>
            ) : (
              Array.from({ length: 52 }).map((_, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-[10px]">
                  {Array.from({ length: 7 }).map((_, rowIndex) => {
                    const index = colIndex * 7 + rowIndex;
                    const sizeClass = contributions[index] || "w-[2px] h-[2px] bg-white/20";
                    return (
                      <div key={rowIndex} className="w-[10px] h-[10px] flex items-center justify-center">
                        <span className={`rounded-full transition-all duration-300 hover:scale-150 hover:bg-accent ${sizeClass}`}></span>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-[20px] text-[11px] font-mono text-muted uppercase tracking-[0.05em]">
          {loading || error ? "..." : `${total.toLocaleString()} contributions in the last year`}
        </div>
      </div>
    </section>
  );
}
