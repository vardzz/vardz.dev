import React from 'react';

export const QuoteIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 8H6C4.89543 8 4 8.89543 4 10V14C4 15.1046 4.89543 16 6 16H8.5C8.5 17.3807 7.38071 18.5 6 18.5V20C8.48528 20 10.5 17.9853 10.5 15.5V10C10.5 8.89543 9.60457 8 8.5 8H10V8Z"
      fill="currentColor"
    />
    <path
      d="M20 8H16C14.8954 8 14 8.89543 14 10V14C14 15.1046 14.8954 16 16 16H18.5C18.5 17.3807 17.3807 18.5 16 18.5V20C18.4853 20 20.5 17.9853 20.5 15.5V10C20.5 8.89543 19.6046 8 18.5 8H20V8Z"
      fill="currentColor"
    />
  </svg>
);

export interface Recommendation {
  quote: string;
  name: string;
  title: string;
  date: string; // ISO date string, e.g. "2026-09-15"
  avatar?: string; // Optional image URL for real recommendations
  linkedinUrl?: string; // Optional LinkedIn or portfolio URL
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();
  return `${month}  ${year}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export interface RecommendationCardProps {
  rec: Recommendation;
  /** If true, truncates the quote text (used on homepage preview) */
  truncateQuote?: boolean;
  className?: string;
}

export default function RecommendationCard({
  rec,
  truncateQuote = false,
  className = '',
}: RecommendationCardProps) {
  return (
    <div
      className={`group flex flex-col justify-between p-[28px] rounded-[16px] border border-line bg-accent/[0.02] hover:bg-accent/[0.04] transition-all duration-300 ${className}`}
    >
      {/* Quote Icon */}
      <div>
        <QuoteIcon className="text-muted/40 mb-[16px] w-[20px] h-[20px] transition-colors duration-300 group-hover:text-muted/70" />

        {/* Quote Text */}
        <p
          className={`text-soft text-[13px] leading-[1.7] tracking-[-.01em] mb-[24px] ${
            truncateQuote ? 'line-clamp-5' : ''
          }`}
        >
          {rec.quote}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-start gap-[12px] pt-[16px] border-t border-line/50">
        {/* Avatar */}
        {rec.avatar ? (
          <img
            src={rec.avatar}
            alt={rec.name}
            className="w-[36px] h-[36px] rounded-full object-cover border border-line/50 shrink-0 mt-[2px]"
          />
        ) : (
          <div className="w-[36px] h-[36px] rounded-full bg-accent/[0.08] border border-line/50 flex items-center justify-center text-muted font-mono text-[11px] font-medium shrink-0 mt-[2px]">
            {getInitials(rec.name)}
          </div>
        )}

        <div className="min-w-0">
          <div className="text-text text-[13px] font-medium tracking-[-.02em]">
            {rec.linkedinUrl ? (
              <a
                href={rec.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-accent transition-colors"
              >
                {rec.name}
              </a>
            ) : (
              rec.name
            )}
          </div>
          <div className="text-muted font-mono text-[10px] uppercase tracking-widest mt-[2px]">
            {rec.title}
          </div>
          <div className="text-muted font-mono text-[10px] uppercase tracking-wider mt-[6px]">
            {formatDate(rec.date)}
          </div>
        </div>
      </div>
    </div>
  );
}
