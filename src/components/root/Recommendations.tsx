'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import RecommendationCard, {
  Recommendation,
} from '@/components/recommendations/RecommendationCard';

export default function Recommendations() {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Show all recommendations instead of statically slicing to 3.
  // If only 1 recommendation exists currently in the database, duplicate it for preview so the sliding effect is functional.
  const displayItems =
    items.length === 1 ? [items[0], items[0], items[0]] : items;

  const scrollToSlide = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  }, []);

  const handlePrev = () => {
    const prev = currentIndex === 0 ? displayItems.length - 1 : currentIndex - 1;
    scrollToSlide(prev);
  };

  const handleNext = useCallback(() => {
    const next = (currentIndex + 1) % displayItems.length;
    scrollToSlide(next);
  }, [currentIndex, displayItems.length, scrollToSlide]);

  // Auto-advance slide effect every 4.5s (pauses on hover or touch)
  useEffect(() => {
    if (displayItems.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [displayItems.length, isPaused, handleNext]);

  // Update active dot index when scrolling
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || isDragging) return;

    const scrollLeft = container.scrollLeft;
    const firstCard = container.firstElementChild as HTMLElement | null;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 16; // width + gap
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < displayItems.length && index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  // Mouse drag support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftPos(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.3;
    container.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setIsPaused(false);
      handleScroll();
    }
  };

  return (
    <section className="py-[54px] md:py-[70px]" id="recommendations">
      {/* Header */}
      <div className="flex justify-between gap-[12px] sm:gap-[20px] items-baseline mb-[28px]">
        <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">
          Recommendations
        </h2>
        <Link
          href="/recommendations"
          className="text-muted hover:text-accent transition-colors text-[11px] sm:text-[14px] font-mono whitespace-nowrap group flex items-center gap-[4px]"
        >
          all recommendations{' '}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
            →
          </span>
        </Link>
      </div>

      {displayItems.length > 0 ? (
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!isDragging) setIsPaused(false);
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Horizontal Carousel Track */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className={`flex items-stretch gap-[16px] overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 -mx-[24px] px-[24px] md:-mx-0 md:px-0 no-scrollbar ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
          >
            {displayItems.map((rec, i) => (
              <div
                key={i}
                className="shrink-0 snap-start w-[85vw] max-w-[340px] md:w-[360px] flex flex-col"
              >
                <RecommendationCard
                  rec={rec}
                  truncateQuote={true}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Carousel Footer: Dots & Prev/Next Buttons */}
          {displayItems.length > 1 && (
            <div className="flex items-center justify-between mt-[20px] px-1">
              {/* Dot Indicators */}
              <div className="flex items-center gap-[6px]">
                {displayItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-[4px] rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? 'w-[22px] bg-accent'
                        : 'w-[6px] bg-line hover:bg-muted/80'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-[8px]">
                <button
                  onClick={handlePrev}
                  aria-label="Previous recommendation"
                  className="w-[32px] h-[32px] rounded-full border border-line bg-accent/[0.02] flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/[0.06] transition-all active:scale-95 text-[14px]"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next recommendation"
                  className="w-[32px] h-[32px] rounded-full border border-line bg-accent/[0.02] flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/[0.06] transition-all active:scale-95 text-[14px]"
                >
                  →
                </button>
              </div>
            </div>
          )}
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
