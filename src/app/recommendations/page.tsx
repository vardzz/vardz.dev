import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Recommendations — Vardz",
};

const QuoteIcon = ({ className }: { className?: string }) => (
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

interface Recommendation {
  quote: string;
  name: string;
  title: string;
  date: string; // ISO date string, e.g. "2026-09-15"
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();
  return `${month}  ${year}`;
}

const recommendations: Recommendation[] = [
  {
    quote:
      "Jericho is one of the most driven developers I've worked with. His ability to quickly grasp complex concepts and turn them into polished, production-ready code is genuinely impressive.",
    name: 'Alex Rivera',
    title: 'Senior Software Engineer at TechCorp',
    date: '2026-09-15',
  },
  {
    quote:
      "Working with Jericho was an absolute pleasure. He brings a rare combination of technical skill and creative problem-solving that elevates every project he touches. His work on our frontend was exceptional — always pixel-perfect, always performant. I highly recommend him to anyone who is looking for a reliable and knowledgeable developer who can also bring a positive vibe to the team. I'm glad to have him around and I hope to work with him again in the future.",
    name: 'Maria Santos',
    title: 'Engineering Manager at Flyrank AI',
    date: '2026-10-01',
  },
  {
    quote:
      "Jericho has a natural talent for building intuitive interfaces. His attention to detail and commitment to code quality set him apart. He's always eager to learn and consistently delivers beyond expectations.",
    name: 'David Chen',
    title: 'CTO at StartupLab',
    date: '2026-08-10',
  },
  {
    quote:
      "I had the pleasure of working with Jericho on multiple frontend projects. His deep understanding of React and TypeScript, combined with his eye for design, made him an invaluable asset to our team. He's not just a strong developer — he's a true builder who takes ownership of every feature from concept to deployment.",
    name: 'Sarah Kim',
    title: 'Product Lead at InnovateTech',
    date: '2026-07-20',
  },
  {
    quote:
      "Jericho consistently exceeded our expectations. His AI-first workflow and ability to leverage modern tooling allowed him to ship features at twice the speed of most engineers, without sacrificing quality.",
    name: 'James Torres',
    title: 'VP of Engineering at DataFlow',
    date: '2026-09-05',
  },
  {
    quote:
      "What sets Jericho apart is his ability to communicate complex technical ideas clearly. He bridges the gap between engineering and product seamlessly. Whether it's a technical deep-dive or a stakeholder presentation, he always delivers with clarity and confidence. His enthusiasm at new opportunities makes him a great asset because he does everything with renewed energy and finds ways to optimize existing processes.",
    name: 'Anika Patel',
    title: 'Head of Product at CloudSync',
    date: '2026-08-22',
  },
  {
    quote:
      "Talented full-stack developer. Learns fast, ships faster.",
    name: 'Leo Mendez',
    title: 'Senior Frontend Engineer at Vercel',
    date: '2026-06-18',
  },
  {
    quote:
      "Jericho has been instrumental in our team's growth since day one. From leading key projects to mentoring junior developers, he consistently delivers high-quality solutions and forward-thinking architecture. His technical skill is matched only by his collaborative spirit.",
    name: 'Rachel Wong',
    title: 'Director of Engineering at PlatformX',
    date: '2026-10-12',
  },
  {
    quote:
      "Takes lead in software development. Can handle a team well. His problem-solving ability and dedication to clean code make him stand out.",
    name: 'Marcus Lee',
    title: 'Technical Lead at DigitalCraft',
    date: '2026-07-03',
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <div className="group p-[28px] rounded-[16px] border border-line bg-accent/[0.02] hover:bg-accent/[0.04] transition-all duration-300 break-inside-avoid mb-[16px]">
      {/* Quote Icon */}
      <QuoteIcon className="text-muted/40 mb-[16px] w-[20px] h-[20px] transition-colors duration-300 group-hover:text-muted/70" />

      {/* Quote Text */}
      <p className="text-soft text-[13px] leading-[1.7] tracking-[-.01em] mb-[24px]">
        {rec.quote}
      </p>

      {/* Author */}
      <div className="flex items-start gap-[12px] pt-[16px] border-t border-line/50">
        {/* Avatar */}
        <div className="w-[36px] h-[36px] rounded-full bg-accent/[0.08] border border-line/50 flex items-center justify-center text-muted font-mono text-[11px] font-medium shrink-0 mt-[2px]">
          {getInitials(rec.name)}
        </div>

        <div className="min-w-0">
          <div className="text-text text-[13px] font-medium tracking-[-.02em]">
            {rec.name}
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

export default function RecommendationsPage() {
  // Split recommendations into 3 columns for masonry layout
  const columns: Recommendation[][] = [[], [], []];
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
              {/* Distribute cards across columns for masonry effect */}
              {columns.map((column, colIndex) => (
                <React.Fragment key={colIndex}>
                  {column.map((rec, i) => (
                    <RecommendationCard key={`${colIndex}-${i}`} rec={rec} />
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
