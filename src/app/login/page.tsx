// src/app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { Loader2 } from "lucide-react";

import { auth } from "@/lib/firebase/firebase";
import { useUser } from "@/firebase";
import { TopLoader } from "@/components/top-loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";


function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const handleGoogleSignIn = async () => {
    if (user) {
      router.push(redirectUrl);
      return;
    }
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      toast({
        title: "Sign-in Error",
        description: "Could not initiate Google Sign-In. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleGoogleSignIn}
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
            d="M488 261.8C488 403.3 391.1 504 248 504 
            110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 
            126 23.4 172.9 61.9l-79.3 79.3C311.5 
            118.8 281.5 108 248 108c-73.4 0-134.3 
            59.8-134.3 134.3s60.9 134.3 134.3 
            134.3c81.3 0 115.7-55.8 119.5-83.3H248v-97.2h239.5c1.4 
            12.3 2.5 24.5 2.5 36.8z"
          />
        </svg>
      )}
      {loading ? "Signing in..." : "Sign in with Google"}
    </Button>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHandlingRedirect, setIsHandlingRedirect] = useState(true);
  
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";
  const { toast } = useToast();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const idToken = await result.user.getIdToken(true);
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (res.ok) {
            window.location.href = redirectUrl;
          } else {
            const data = await res.json();
            toast({
              title: "Login Failed",
              description: data.message || "An unexpected error occurred.",
              variant: "destructive",
            });
          }
        }
      } catch (error: any) {
        if (error.code !== 'auth/redirect-cancelled-by-user') {
            toast({
              title: "Sign-in Error",
              description: "Could not complete sign-in. Please try again.",
              variant: "destructive",
            });
        }
      } finally {
        setIsHandlingRedirect(false);
      }
    };
    
    handleRedirectResult();
  }, [redirectUrl, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        window.location.href = redirectUrl;
      } else {
        const data = await response.json();
        setError(data.message || 'An unexpected error occurred.');
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setError("Invalid email or password. Please try again.");
      } else if (error.code === 'auth/too-many-requests') {
        setError("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || isHandlingRedirect) {
    return <TopLoader />;
  }

  return (
    <div className="container py-24">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" type="submit" disabled={loading} size="lg">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Logging In..." : "Log In"}
              </Button>
              {error && (
                <p className="text-sm text-destructive text-center">
                  {error}
                </p>
              )}
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton />

          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline font-semibold text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
