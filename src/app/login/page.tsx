// src/app/login/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword, getRedirectResult } from "firebase/auth";
import { Loader2 } from "lucide-react";

import { useAuth, useUser } from "@/firebase";
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
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { getSafeRedirect } from "@/lib/auth/redirect";
import { exchangeIdTokenForSession } from "@/lib/auth/client";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHandlingRedirect, setIsHandlingRedirect] = useState(true);
  
  const auth = useAuth();
  const { loading: authLoading } = useUser();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirectUrl = useMemo(
    () => getSafeRedirect(redirectParam),
    [redirectParam]
  );
  const { toast } = useToast();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const idToken = await result.user.getIdToken(true);
          const sessionResult = await exchangeIdTokenForSession(idToken);

          if (sessionResult.ok) {
            window.location.href = redirectUrl;
          } else {
            toast({
              title: "Login Failed",
              description: sessionResult.message || "An unexpected error occurred.",
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
    
    if (auth) {
        handleRedirectResult();
    }
  }, [auth, redirectUrl, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken(true);

      const sessionResult = await exchangeIdTokenForSession(idToken);

      if (sessionResult.ok) {
        window.location.href = redirectUrl;
      } else {
        setError(sessionResult.message || 'An unexpected error occurred.');
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

          <GoogleAuthButton redirectUrl={redirectUrl} mode="login" />

          <div className="mt-6 text-center text-sm">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?{" "}
            <Link href="/signup" className="underline font-semibold text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
