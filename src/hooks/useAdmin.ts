import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useAuth } from './useAuth';

interface AdminProfile {
  id: string;
  email: string;
  full_name: string | null;
  is_admin: boolean;
  admin_role: string | null;
}

export function useAdmin() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const lastCheckedUserId = useRef<string | null>(null);

  const checkAdminStatus = useCallback(async (user: User) => {
    if (lastCheckedUserId.current === user.id && profile !== null) {
      return;
    }

    lastCheckedUserId.current = user.id;

    try {
      setLoading(true);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name, is_admin, admin_role')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching admin profile:', profileError);
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      if (profileData) {
        setProfile(profileData);
        const adminStatus = profileData.is_admin === true;
        setIsAdmin(adminStatus);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setProfile(null);
      setIsAdmin(false);
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!authUser) {
      setProfile(null);
      setIsAdmin(false);
      setLoading(false);
      lastCheckedUserId.current = null;
      return;
    }

    if (lastCheckedUserId.current !== authUser.id) {
      checkAdminStatus(authUser);
    } else {
      setLoading(false);
    }
  }, [authUser, authLoading, checkAdminStatus]);

  const logActivity = async (
    action: string,
    resourceType: string,
    resourceId?: string,
    details?: Record<string, any>
  ) => {
    if (!isAdmin) return;

    try {
      await supabase.rpc('log_admin_activity', {
        p_action: action,
        p_resource_type: resourceType,
        p_resource_id: resourceId || null,
        p_details: details || {},
        p_ip_address: null
      });
    } catch (error) {
      console.error('Error logging admin activity:', error);
    }
  };

  const refreshAdminStatus = useCallback(() => {
    if (authUser) {
      lastCheckedUserId.current = null;
      checkAdminStatus(authUser);
    }
  }, [authUser, checkAdminStatus]);

  return {
    user: authUser,
    profile,
    isAdmin,
    loading,
    logActivity,
    refreshAdminStatus
  };
}
