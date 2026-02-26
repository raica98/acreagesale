import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../../hooks/useAuth';

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignUpForm = z.infer<typeof signUpSchema>;
type SignInForm = z.infer<typeof signInSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignIn = async (data: SignInForm) => {
    setLoading(true);
    setError(null);

    const { error } = await signIn(data.email, data.password);

    if (error) {
      setError(error.message || 'Sign in failed');
      setLoading(false);
    } else {
      await new Promise(resolve => setTimeout(resolve, 500));
      window.location.reload();
    }
  };

  const handleSignUp = async (data: SignUpForm) => {
    setLoading(true);
    setError(null);

    const { error } = await signUp(data.email, data.password, data.fullName);

    if (error) {
      setError(error.message || 'Sign up failed');
      setLoading(false);
    } else {
      await new Promise(resolve => setTimeout(resolve, 500));
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-hidden"
      onClick={onClose}
    >
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle className="text-center">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {mode === 'signin' ? (
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              <div>
                <Input
                  {...signInForm.register('email')}
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      signInForm.handleSubmit(handleSignIn)();
                    }
                  }}
                />
                {signInForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {signInForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...signInForm.register('password')}
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      signInForm.handleSubmit(handleSignIn)();
                    }
                  }}
                />
                {signInForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {signInForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue hover:bg-blue/90" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          ) : (
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <div>
                <Input
                  {...signUpForm.register('fullName')}
                  placeholder="Full Name"
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      signUpForm.handleSubmit(handleSignUp)();
                    }
                  }}
                />
                {signUpForm.formState.errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {signUpForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...signUpForm.register('email')}
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      signUpForm.handleSubmit(handleSignUp)();
                    }
                  }}
                />
                {signUpForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {signUpForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...signUpForm.register('password')}
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      signUpForm.handleSubmit(handleSignUp)();
                    }
                  }}
                />
                {signUpForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue hover:bg-blue/90" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          )}

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-blue hover:underline text-sm"
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'
              }
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="block w-full text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}