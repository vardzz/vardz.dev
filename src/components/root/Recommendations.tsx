import Link from 'next/link';

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
  date: string;
}

const recommendations: Recommendation[] = [
  {
    quote:
      "Jericho is one of the most driven developers I've worked with. His ability to quickly grasp complex concepts and turn them into polished, production-ready code is genuinely impressive.",
    name: 'Alex Rivera',
    title: 'Senior Software Engineer at TechCorp',
    date: 'Sep 2026',
  },
  {
    quote:
      "Working with Jericho was an absolute pleasure. He brings a rare combination of technical skill and creative problem-solving that elevates every project he touches. His work on our frontend was exceptional.",
    name: 'Maria Santos',
    title: 'Engineering Manager at Flyrank AI',
    date: 'Oct 2026',
  },
  {
    quote:
      "Jericho has a natural talent for building intuitive interfaces. His attention to detail and commitment to code quality set him apart. He's always eager to learn and consistently delivers beyond expectations.",
    name: 'David Chen',
    title: 'CTO at StartupLab',
    date: 'Aug 2026',
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function Recommendations() {
  return (
    <section className="py-[54px] md:py-[70px]" id="recommendations">
      <div className="flex justify-between gap-[20px] items-baseline mb-[38px]">
        <h2 className="m-0 text-[20px] font-medium tracking-[-.04em] text-text">
          Recommendations
        </h2>
        <Link
          href="/recommendations"
          className="text-muted font-mono text-[11px] md:text-[12px] hover:text-accent transition-colors group flex items-center gap-[4px]"
        >
          all recommendations{' '}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="group flex flex-col justify-between p-[28px] rounded-[16px] border border-line bg-accent/[0.02] hover:bg-accent/[0.04] transition-all duration-300"
          >
            {/* Quote Icon */}
            <div>
              <QuoteIcon className="text-muted/40 mb-[16px] w-[20px] h-[20px] transition-colors duration-300 group-hover:text-muted/70" />

              {/* Quote Text */}
              <p className="text-soft text-[13px] leading-[1.7] tracking-[-.01em] mb-[24px] line-clamp-5">
                {rec.quote}
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-[12px] pt-[16px] border-t border-line/50">
              {/* Avatar */}
              <div className="w-[36px] h-[36px] rounded-full bg-accent/[0.08] border border-line/50 flex items-center justify-center text-muted font-mono text-[11px] font-medium shrink-0">
                {getInitials(rec.name)}
              </div>

              <div className="min-w-0">
                <div className="text-text text-[13px] font-medium tracking-[-.02em] truncate">
                  {rec.name}
                </div>
                <div className="text-muted font-mono text-[10px] uppercase tracking-widest truncate">
                  {rec.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
