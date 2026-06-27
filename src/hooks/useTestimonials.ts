import { useEffect, useState } from 'react';
import { testimonials as fallbackTestimonials } from '@/data/testimonials';
import type { Testimonial } from '@/data/types';
import { supabase } from '@/lib/supabaseClient';

interface UseTestimonialsResult {
  testimonials: Testimonial[];
  isLoading: boolean;
  isFallback: boolean;
  error: string | null;
}

/**
 * Loads published testimonials from Supabase (`testimonials` table),
 * ordered by `sort_order`. Falls back to the bundled static data in
 * `src/data/testimonials.ts` if Supabase is unreachable, misconfigured, or
 * the table is empty.
 */
export function useTestimonials(): UseTestimonialsResult {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const { data, error: fetchError } = await supabase
        .from('testimonials')
        .select('id, name, vehicle, avatar_url, rating, quote')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!isMounted) return;

      if (fetchError || !data || data.length === 0) {
        setTestimonials(fallbackTestimonials);
        setIsFallback(true);
        setError(fetchError?.message ?? null);
        setIsLoading(false);
        return;
      }

      setTestimonials(
        data.map((row) => ({
          id: row.id,
          name: row.name,
          vehicle: row.vehicle,
          avatar: row.avatar_url ?? 'https://i.pravatar.cc/150',
          rating: row.rating,
          quote: row.quote,
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

  return { testimonials, isLoading, isFallback, error };
}
