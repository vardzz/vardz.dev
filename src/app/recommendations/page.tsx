import React from 'react';
import { Metadata } from 'next';
import RecommendationCard, {
  Recommendation,
} from '@/components/recommendations/RecommendationCard';
import RecommendationForm from '@/components/recommendations/RecommendationForm';
import { recommendations as fallbackRecommendations } from '@/data/recommendations';
import { supabaseAdmin } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Recommendations — Vardz',
};

// Ensure fresh dynamic data on each request so newly approved recommendations appear immediately
export const dynamic = 'force-dynamic';

async function getApprovedRecommendations(): Promise<Recommendation[]> {
  try {
    if (!supabaseAdmin) {
      return [];
    }
    const { data, error } = await supabaseAdmin
      .from('recommendations')
      .select('name, title, message, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map((item) => ({
      name: item.name,
      title: item.title,
      quote: item.message,
      date: item.created_at ? item.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
    }));
  } catch (e) {
    console.error('Error fetching approved recommendations:', e);
    return [];
  }
}

export default async function RecommendationsPage() {
  const dbApproved = await getApprovedRecommendations();
  // Live approved recommendations from Supabase + any in recommendations.ts
  const allRecommendations = [...dbApproved, ...fallbackRecommendations];

  // Split recommendations into 3 columns for masonry layout
  const columns: Recommendation[][] = [[], [], []];
  allRecommendations.forEach((rec, i) => {
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
                What leaders, teammates, and mentors say about working with me.
              </p>
            </header>

            {/* Masonry Grid or Clean Empty State */}
            {allRecommendations.length > 0 ? (
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
            ) : (
              <div className="p-[32px] rounded-[16px] border border-line/60 bg-accent/[0.02] text-center my-[24px]">
                <p className="text-soft text-[14px] mb-[6px] font-medium">
                  No recommendations published yet.
                </p>
                <p className="text-muted text-[13px]">
                  Be the first to share your experience working with Jericho below.
                </p>
              </div>
            )}

            {/* Write a Recommendation Form at the bottom */}
            <RecommendationForm />
          </div>
        </div>
      </main>
    </div>
  );
}
