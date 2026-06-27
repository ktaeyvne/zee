import { useEffect, useState } from 'react';
import { portfolioItems as fallbackPortfolioItems } from '@/data/portfolio';
import type { PortfolioItem } from '@/data/types';
import type { Database } from '@/lib/database.types';
import { supabase } from '@/lib/supabaseClient';

interface UsePortfolioItemsResult {
  items: PortfolioItem[];
  isLoading: boolean;
  isFallback: boolean;
  error: string | null;
}

type PortfolioItemRow = Database['public']['Tables']['portfolio_items']['Row'];

/**
 * Loads published portfolio items from Supabase (`portfolio_items` table),
 * ordered by `sort_order`. If Supabase is unreachable, misconfigured, or the
 * table is empty, the UI gracefully falls back to the bundled static data
 * in `src/data/portfolio.ts` so the section never renders empty or broken.
 */
export function usePortfolioItems(): UsePortfolioItemsResult {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const { data, error: fetchError } = await supabase
        .from('portfolio_items')
        .select('id, title, category, location, image_url, span')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!isMounted) return;

      if (fetchError || !data || data.length === 0) {
        setItems(fallbackPortfolioItems);
        setIsFallback(true);
        setError(fetchError?.message ?? null);
        setIsLoading(false);
        return;
      }

      const rows = data as PortfolioItemRow[];
      setItems(
        rows.map((row) => ({
          id: row.id,
          title: row.title,
          category: row.category,
          location: row.location,
          image: row.image_url,
          span: row.span,
        }))
      );
      setIsFallback(false);
      setIsLoading(false);
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { items, isLoading, isFallback, error };
}
