import Link from 'next/link';
import RecommendationCard from '@/components/recommendations/RecommendationCard';
import { recommendations } from '@/data/recommendations';

export default function Recommendations() {
  const previewRecommendations = recommendations.slice(0, 3);

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
        {previewRecommendations.map((rec, i) => (
          <RecommendationCard
            key={i}
            rec={rec}
            truncateQuote={true}
          />
        ))}
      </div>
    </section>
  );
}
