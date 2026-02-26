import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    initialized: false,
  });

  useEffect(() => {
    let mounted = true;
    let authSubscription: any = null;

    // Restore session from localStorage on page load
    const restoreSession = async () => {
      try {
        const savedSession = localStorage.getItem("supabase_session");
        if (savedSession) {
          const session = JSON.parse(savedSession);
          // Validate session is still valid
          if (session.expires_at && new Date(session.expires_at * 1000) > new Date()) {
            await supabase.auth.setSession(session);
          } else {
            localStorage.removeItem("supabase_session");
          }
        }
      } catch (error) {
        console.warn('Error restoring session:', error);
        localStorage.removeItem("supabase_session");
      }
    };

    // Clear corrupted session data from localStorage
    const clearCorruptedSession = () => {
      try {
        // Clear all Supabase-related keys from localStorage
        const allKeys = Object.keys(localStorage);
        const supabaseKeys = allKeys.filter(key =>
          key.startsWith('supabase') ||
          key.startsWith('sb-') ||
          key.includes('auth-token')
        );

        supabaseKeys.forEach(key => {
          localStorage.removeItem(key);
        });

        console.log('Cleared potentially corrupted auth tokens:', supabaseKeys.length, 'keys removed');
      } catch (error) {
        console.warn('Error clearing localStorage:', error);
      }
    };

    // Initialize auth state - skip getSession() as it's timing out
    const initializeAuth = async () => {
      try {
        // Don't call getSession() - it's timing out
        // Instead, just rely on the auth state listener below
        // and check localStorage for existing session
        const savedSession = localStorage.getItem("supabase_session");

        if (savedSession && mounted) {
          try {
            const session = JSON.parse(savedSession);
            if (session.expires_at && new Date(session.expires_at * 1000) > new Date()) {
              setAuthState({
                user: session.user,
                session: session,
                loading: false,
                initialized: true,
              });
              return;
            }
          } catch (e) {
            // Invalid session in localStorage
          }
        }

        // No valid session found
        if (mounted) {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            initialized: true,
          });
        }

        // Set up auth state listener with error handling
        try {
          authSubscription = supabase.auth.onAuthStateChange(
            async (event, session) => {
              if (!mounted) return;
              
              console.log('Auth state changed:', event, session?.user?.email || 'no user');
              
              // Handle session persistence with error handling
              try {
                if (session) {
                  localStorage.setItem("supabase_session", JSON.stringify(session));
                } else {
                  localStorage.removeItem("supabase_session");
                }
              } catch (storageError) {
                console.warn('Failed to update localStorage:', storageError);
              }
              
              if (mounted) {
                setAuthState({
                  user: session?.user ?? null,
                  session: session,
                  loading: false,
                  initialized: true,
                });
              }

              // Handle specific auth events
              switch (event) {
                case 'SIGNED_IN':
                  console.log('User signed in:', session?.user?.email || 'unknown');
                  break;
                case 'SIGNED_OUT':
                  console.log('User signed out');
                  try {
                    localStorage.removeItem("supabase_session");
                  } catch (storageError) {
                    console.warn('Failed to clear localStorage:', storageError);
                  }
                  break;
                case 'TOKEN_REFRESHED':
                  console.log('Token refreshed for:', session?.user?.email || 'unknown');
                  try {
                    if (session) {
                      localStorage.setItem("supabase_session", JSON.stringify(session));
                    }
                  } catch (storageError) {
                    console.warn('Failed to update localStorage after token refresh:', storageError);
                  }
                  break;
                case 'USER_UPDATED':
                  console.log('User updated:', session?.user?.email || 'unknown');
                  break;
              }
            }
          ).data.subscription;
        } catch (listenerError) {
          console.warn('Failed to set up auth listener:', listenerError);
          // Continue without listener if it fails
        }

      } catch (error) {
        console.warn('Auth initialization failed, continuing without auth:', error);
        
        if (mounted) {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            initialized: true,
          });
        }
      }
    };

    // Initialize auth with session restoration
    restoreSession().then(() => {
      initializeAuth();
    }).catch((error) => {
      console.warn('Session restoration failed:', error);
      // Continue with normal auth initialization even if restoration fails
      initializeAuth();
    });

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      // Retry logic for sign up
      let retries = 3;
      let result: any = null;
      
      while (retries > 0) {
        try {
          result = await Promise.race([
            supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  full_name: fullName || ''
                }
              }
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Sign up timeout')), 15000)
            )
          ]) as any;
          break; // Success, exit retry loop
        } catch (retryError: any) {
          retries--;
          if (retries === 0) {
            throw retryError;
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log(`Retrying sign up... ${retries} attempts left`);
        }
      }
      
      const { data, error } = result;
      
      if (error) {
        console.error('Sign up error:', error);
        return { data: null, error };
      }

      console.log('Sign up successful:', data?.user?.email);
      return { data, error: null };
    } catch (error: any) {
      console.error('Sign up failed or timed out:', error);
      return { data: null, error: { message: 'Sign up failed. Please check your connection and try again.' } };
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      // Retry logic for sign in
      let retries = 3;
      let result: any = null;
      
      while (retries > 0) {
        try {
          result = await Promise.race([
            supabase.auth.signInWithPassword({
              email,
              password
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Sign in timeout')), 15000)
            )
          ]) as any;
          break; // Success, exit retry loop
        } catch (retryError: any) {
          retries--;
          if (retries === 0) {
            throw retryError;
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log(`Retrying sign in... ${retries} attempts left`);
        }
      }
      
      const { data, error } = result;
      
      if (error) {
        console.error('Sign in error:', error);
        return { data: null, error };
      }

      console.log('Sign in successful:', data?.user?.email);
      return { data, error: null };
    } catch (error: any) {
      console.error('Sign in failed or timed out:', error);
      return { data: null, error: { message: 'Sign in failed. Please check your connection and try again.' } };
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      // Clear session from localStorage first
      try {
        localStorage.removeItem("supabase_session");
      } catch (storageError) {
        console.warn('Failed to clear localStorage:', storageError);
      }
      
      // Always clear local state first to prevent UI issues
      setAuthState(prev => ({ 
        ...prev, 
        user: null, 
        session: null, 
        loading: false 
      }));
      
      // Attempt server-side logout with timeout and retry (but don't fail if it errors)
      try {
        let retries = 2;
        while (retries > 0) {
          try {
            await Promise.race([
              supabase.auth.signOut(),
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Sign out timeout')), 8000)
              )
            ]);
            break; // Success
          } catch (retryError: any) {
            retries--;
            if (retries === 0) {
              throw retryError;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      } catch (signOutError) {
        console.warn('Server-side sign out failed or timed out:', signOutError);
        // Local state is already cleared, so this is not critical
      }

      console.log('Sign out successful');
      return { error: null };
    } catch (error) {
      // Even if server logout fails, local state is already cleared
      console.warn('Sign out completed (server logout may have failed):', error);
      return { error };
    }
  };

  // Helper function to set user directly (for compatibility)
  const setUser = (user: User | null) => {
    setAuthState(prev => ({ ...prev, user }));
  };

  // Update user profile
  const updateProfile = async (updates: { full_name?: string; phone?: string }) => {
    try {
      if (!authState.user) {
        throw new Error('No authenticated user');
      }

      // Retry logic for profile updates
      let retries = 3;
      let result: any = null;
      
      while (retries > 0) {
        try {
          result = await Promise.race([
            supabase.auth.updateUser({
              data: updates
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Update timeout')), 15000)
            )
          ]) as any;
          break; // Success, exit retry loop
        } catch (retryError: any) {
          retries--;
          if (retries === 0) {
            throw retryError;
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log(`Retrying profile update... ${retries} attempts left`);
        }
      }
      
      const { data, error } = result;

      if (error) throw error;

      console.log('Profile updated successfully');
      return { data, error: null };
    } catch (error: any) {
      console.error('Profile update error:', error);
      return { data: null, error: { message: 'Profile update failed. Please check your connection and try again.' } };
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      // Retry logic for password reset
      let retries = 3;
      let result: any = null;
      
      while (retries > 0) {
        try {
          result = await Promise.race([
            supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${window.location.origin}/reset-password`,
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Reset timeout')), 15000)
            )
          ]) as any;
          break; // Success, exit retry loop
        } catch (retryError: any) {
          retries--;
          if (retries === 0) {
            throw retryError;
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log(`Retrying password reset... ${retries} attempts left`);
        }
      }
      
      const { data, error } = result;

      if (error) throw error;

      console.log('Password reset email sent');
      return { data, error: null };
    } catch (error: any) {
      console.error('Password reset error:', error);
      return { data: null, error: { message: 'Password reset failed. Please check your connection and try again.' } };
    }
  };

  return {
    // Auth state
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    initialized: authState.initialized,
    
    // Auth methods
    signUp,
    signIn,
    signOut,
    setUser,
    updateProfile,
    resetPassword,
    
    // Utility methods
    isAuthenticated: !!authState.user,
    isLoading: authState.loading,
    isInitialized: authState.initialized,
  };
}