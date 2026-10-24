import React from 'react';
import { Metadata } from 'next';
import RecommendationCard from '@/components/recommendations/RecommendationCard';
import { recommendations } from '@/data/recommendations';

export const metadata: Metadata = {
  title: 'Recommendations — Vardz',
};

export default function RecommendationsPage() {
  // Split recommendations into 3 columns for masonry layout
  const columns = [[], [], []] as (typeof recommendations)[];
  recommendations.forEach((rec, i) => {
    columns[i % 3].push(rec);
  });

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
                What leaders, teammates, and mentors say about working with me — straight from LinkedIn.
              </p>
            </header>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-[16px]">
              {columns.map((column, colIndex) => (
                <React.Fragment key={colIndex}>
                  {column.map((rec, i) => (
                    <RecommendationCard
                      key={`${colIndex}-${i}`}
                      rec={rec}
                      className="break-inside-avoid mb-[16px]"
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
