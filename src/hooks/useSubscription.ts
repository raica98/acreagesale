import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface PremiumStatus {
  hasAccess: boolean;
  purchaseDate: string | null;
  amount: number | null;
  loading: boolean;
}

export function useSubscription() {
  const { user } = useAuth();
  const [status, setStatus] = useState<PremiumStatus>({
    hasAccess: false,
    purchaseDate: null,
    amount: null,
    loading: true,
  });

  useEffect(() => {
    if (!user) {
      setStatus({
        hasAccess: false,
        purchaseDate: null,
        amount: null,
        loading: false,
      });
      return;
    }

    checkPremiumAccess();
  }, [user]);

  const checkPremiumAccess = async () => {
    if (!user) {
      setStatus({
        hasAccess: false,
        purchaseDate: null,
        amount: null,
        loading: false,
      });
      return;
    }

    try {
      const { data, error } = await supabase.rpc('get_user_premium_status');

      if (error) {
        console.error('Error checking premium status:', error);
        setStatus({
          hasAccess: false,
          purchaseDate: null,
          amount: null,
          loading: false,
        });
        return;
      }

      if (data && data.length > 0) {
        const premiumData = data[0];
        setStatus({
          hasAccess: premiumData.has_access,
          purchaseDate: premiumData.purchase_date,
          amount: premiumData.amount,
          loading: false,
        });
      } else {
        setStatus({
          hasAccess: false,
          purchaseDate: null,
          amount: null,
          loading: false,
        });
      }
    } catch (error) {
      console.error('Error in checkPremiumAccess:', error);
      setStatus({
        hasAccess: false,
        purchaseDate: null,
        amount: null,
        loading: false,
      });
    }
  };

  return { ...status, refetch: checkPremiumAccess };
}
