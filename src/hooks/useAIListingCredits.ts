import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useAIListingCredits() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc('get_user_credits', {
        p_user_id: user.id
      });

      if (rpcError) {
        console.error('Error fetching credits:', rpcError);
        setError('Failed to load credits');
        setCredits(0);
      } else {
        setCredits(data || 0);
      }
    } catch (err) {
      console.error('Unexpected error fetching credits:', err);
      setError('Failed to load credits');
      setCredits(0);
    } finally {
      setLoading(false);
    }
  };

  const consumeCredit = async (propertyId?: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error: rpcError } = await supabase.rpc('consume_ai_listing_credit', {
      p_user_id: user.id,
      p_property_id: propertyId || null
    });

    if (rpcError) {
      console.error('Error consuming credit:', rpcError);
      throw new Error('Failed to consume credit');
    }

    if (!data) {
      throw new Error('Insufficient credits');
    }

    await fetchCredits();
    return true;
  };

  const hasCredits = () => credits > 0;

  useEffect(() => {
    fetchCredits();
  }, [user]);

  return {
    credits,
    loading,
    error,
    fetchCredits,
    consumeCredit,
    hasCredits
  };
}
