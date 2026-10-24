import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { recommendations as staticRecommendations } from '@/data/recommendations';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let dbItems: any[] = [];

    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('recommendations')
        .select('name, title, message, created_at')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!error && data) {
        dbItems = data.map((item) => ({
          name: item.name,
          title: item.title,
          quote: item.message,
          date: item.created_at ? item.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
        }));
      }
    }

    return NextResponse.json([...dbItems, ...staticRecommendations]);
  } catch {
    return NextResponse.json(staticRecommendations);
  }
}
