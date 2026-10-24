'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import RecommendationCard, {
  Recommendation,
} from '@/components/recommendations/RecommendationCard';


export default function Recommendations() {
  const [items, setItems] = useState<Recommendation[]>([]);

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

  const previewRecommendations = items.slice(0, 3);

  return (
    <section className="py-[54px] md:py-[70px]" id="recommendations">
      <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
        <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">
          Recommendations
        </h2>
        <Link
          href="/recommendations"
          className="text-muted hover:text-accent transition-colors text-[14px] font-mono group flex items-center gap-[4px]"
        >
          all recommendations{' '}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
            →
          </span>
        </Link>
      </div>

      {previewRecommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
          {previewRecommendations.map((rec, i) => (
            <RecommendationCard key={i} rec={rec} truncateQuote={true} />
          ))}
        </div>
      ) : (
        <div className="p-[32px] rounded-[16px] border border-line/60 bg-accent/[0.02] text-center">
          <p className="text-soft text-[14px] mb-[8px] font-medium">
            Worked with Jericho?
          </p>
          <Link
            href="/recommendations"
            className="text-muted hover:text-accent font-mono text-[12px] transition-colors inline-flex items-center gap-[4px] group"
          >
            Leave the first recommendation{' '}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
              →
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
