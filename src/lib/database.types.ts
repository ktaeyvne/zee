/**
 * Mirrors the tables defined in supabase/schema.sql.
 * If you modify the schema, update this file to match — or generate it
 * automatically with the Supabase CLI:
 *   npx supabase gen types typescript --project-id <your-project-ref> > src/lib/database.types.ts
 */
export interface Database {
  public: {
    Tables: {
      portfolio_items: {
        Row: {
          id: string;
          title: string;
          category: 'Mobil' | 'Motor' | 'Rolling Shot' | 'Night Shoot' | 'Cinematic Edit';
          location: string;
          image_url: string;
          span: 'tall' | 'wide' | 'square';
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: 'Mobil' | 'Motor' | 'Rolling Shot' | 'Night Shoot' | 'Cinematic Edit';
          location: string;
          image_url: string;
          span?: 'tall' | 'wide' | 'square';
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['portfolio_items']['Insert']>;
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          vehicle: string;
          avatar_url: string | null;
          rating: number;
          quote: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          vehicle: string;
          avatar_url?: string | null;
          rating: number;
          quote: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };
    };
  };
}
