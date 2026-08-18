import React from 'react';

interface StatsBarProps {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({ wpm, accuracy, timeElapsed }) => {
  return (
    <div className="flex justify-center gap-12 mb-8 font-mono text-[var(--color-text)]">
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">{wpm}</span>
        <span className="text-xs uppercase tracking-widest text-[var(--color-muted)]">WPM</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">{accuracy}<span className="text-2xl text-[var(--color-muted)]">%</span></span>
        <span className="text-xs uppercase tracking-widest text-[var(--color-muted)]">ACC</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">{timeElapsed}<span className="text-2xl text-[var(--color-muted)]">s</span></span>
        <span className="text-xs uppercase tracking-widest text-[var(--color-muted)]">TIME</span>
      </div>
    </div>
  );
};
