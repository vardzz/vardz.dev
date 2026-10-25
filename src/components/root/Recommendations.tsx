'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RecommendationCard, {
  Recommendation,
} from '@/components/recommendations/RecommendationCard';

export default function Recommendations() {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch('/api/recommendations')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Recommendation[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  const allRecommendations = items;

  // Automatic horizontal sliding is ONLY applied when there are 4 or more recommendations
  const shouldSlide = allRecommendations.length >= 4;

  return (
    <section className="py-[54px] md:py-[70px]" id="recommendations">
      {/* Header */}
      <div className="flex justify-between gap-[12px] sm:gap-[20px] items-baseline mb-[28px]">
        <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">
          Recommendations
        </h2>
        <Link
          href="/recommendations"
          prefetch={true}
          className="text-muted hover:text-accent transition-colors text-[11px] sm:text-[14px] font-mono whitespace-nowrap group flex items-center gap-[4px]"
        >
          all recommendations{' '}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
            →
          </span>
        </Link>
      </div>

      {allRecommendations.length === 0 ? (
        /* Empty State */
        <div className="p-[32px] rounded-[16px] border border-line/60 bg-accent/[0.02] text-center">
          <p className="text-soft text-[14px] mb-[8px] font-medium">
            Worked with Jericho?
          </p>
          <Link
            href="/recommendations"
            prefetch={true}
            className="text-muted hover:text-accent font-mono text-[12px] transition-colors inline-flex items-center gap-[4px] group"
          >
            Leave the first recommendation{' '}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
              →
            </span>
          </Link>
        </div>
      ) : shouldSlide ? (
        /* Automatic Continuous Horizontal Sliding (Active for >= 4 recommendations) */
        <div
          className="relative group/carousel overflow-hidden -mx-[24px] px-[24px] md:-mx-0 md:px-0 py-2"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Subtle gradient fade masks on edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-bg to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-bg to-transparent z-10" />

          {/* Continuous Sliding Track */}
          <div className="flex w-max">
            {/* Primary Set */}
            <div
              className="flex gap-[16px] shrink-0 animate-marquee items-stretch"
              style={{ animationPlayState: isPaused ? 'paused' : undefined }}
            >
              {allRecommendations.map((rec, i) => (
                <div
                  key={`orig-${i}`}
                  className="shrink-0 w-[85vw] max-w-[340px] md:w-[360px] flex flex-col"
                >
                  <RecommendationCard
                    rec={rec}
                    truncateQuote={true}
                    className="h-full"
                  />
                </div>
              ))}
            </div>

            {/* Seamless Infinite Loop Duplicate */}
            <div
              className="flex gap-[16px] shrink-0 animate-marquee items-stretch ml-[16px]"
              aria-hidden="true"
              style={{ animationPlayState: isPaused ? 'paused' : undefined }}
            >
              {allRecommendations.map((rec, i) => (
                <div
                  key={`dup-${i}`}
                  className="shrink-0 w-[85vw] max-w-[340px] md:w-[360px] flex flex-col"
                >
                  <RecommendationCard
                    rec={rec}
                    truncateQuote={true}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Static Grid (Active when fewer than 4 recommendations) */
        <div
          className={`grid grid-cols-1 ${
            allRecommendations.length === 2
              ? 'md:grid-cols-2'
              : allRecommendations.length === 3
              ? 'md:grid-cols-3'
              : ''
          } gap-[16px]`}
        >
          {allRecommendations.map((rec, i) => (
            <RecommendationCard key={i} rec={rec} truncateQuote={true} />
          ))}
        </div>
      )}
    </section>
  );
}
