// src/components/auth/google-auth-button.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@/firebase';

type GoogleAuthButtonMode = 'login' | 'signup';

const TEXT_MAP: Record<GoogleAuthButtonMode, { idle: string; loading: string; toast: string }> = {
  login: {
    idle: 'Sign in with Google',
    loading: 'Signing in...',
    toast: 'Sign-In',
  },
  signup: {
    idle: 'Sign up with Google',
    loading: 'Signing up...',
    toast: 'Sign-Up',
  },
};

interface GoogleAuthButtonProps {
  redirectUrl: string;
  mode: GoogleAuthButtonMode;
}

export function GoogleAuthButton({ redirectUrl, mode }: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const copy = TEXT_MAP[mode];

  const handleGoogleAuth = async () => {
    if (user) {
      router.push(redirectUrl);
      return;
    }

    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      toast({
        title: `${copy.toast} Error`,
        description: 'Could not initiate Google authentication. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleGoogleAuth}
      disabled={loading}
      className="w-full"
      size="lg"
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && (
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-79.3 79.3C311.5 118.8 281.5 108 248 108c-73.4 0-134.3 59.8-134.3 134.3s60.9 134.3 134.3 134.3c81.3 0 115.7-55.8 119.5-83.3H248v-97.2h239.5c1.4 12.3 2.5 24.5 2.5 36.8z"
          />
        </svg>
      )}
      {loading ? copy.loading : copy.idle}
    </Button>
  );
}
