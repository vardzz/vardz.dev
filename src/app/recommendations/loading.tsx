import React from 'react';

export default function RecommendationsLoading() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <main className="min-w-0">
        <div className="block pb-24">
          <div className="max-w-[680px] mx-auto px-[24px] md:px-[10vw] lg:px-0">
            {/* Header */}
            <header className="mb-[48px]">
              <h1 className="m-0 text-[28px] md:text-[32px] font-medium tracking-[-.04em] text-text mb-[12px]">
                Recommendations
              </h1>
              <p className="text-muted text-[14px] leading-[1.6] max-w-[560px]">
                What leaders, teammates, and mentors say about working with me.
              </p>
            </header>

            {/* Skeleton Cards */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-[16px]">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="p-[28px] rounded-[16px] border border-line bg-accent/[0.02] mb-[16px] animate-pulse"
                >
                  <div className="w-5 h-5 rounded bg-line mb-4" />
                  <div className="h-4 bg-line/60 rounded w-full mb-2" />
                  <div className="h-4 bg-line/60 rounded w-4/5 mb-2" />
                  <div className="h-4 bg-line/60 rounded w-2/3 mb-6" />
                  <div className="flex items-center gap-3 pt-4 border-t border-line/40">
                    <div className="w-9 h-9 rounded-full bg-line" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3 bg-line/80 rounded w-24" />
                      <div className="h-2.5 bg-line/40 rounded w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
