import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface ListingCredits {
  credits: number;
  hasUnlimited: boolean;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useListingCredits(): ListingCredits {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [hasUnlimited, setHasUnlimited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('user_listing_credits')
        .select('credits, has_unlimited')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching credits:', fetchError);
        setError(fetchError.message);
        return;
      }

      if (data) {
        setCredits(data.credits);
        setHasUnlimited(data.has_unlimited);
      } else {
        setCredits(0);
        setHasUnlimited(false);
      }
    } catch (err) {
      console.error('Error fetching credits:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch credits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [user?.id]);

  return {
    credits,
    hasUnlimited,
    loading,
    error,
    refresh: fetchCredits,
  };
}
