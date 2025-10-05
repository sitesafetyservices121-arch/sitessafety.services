// src/app/signup/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getRedirectResult, signInWithEmailAndPassword } from "firebase/auth";
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

let isHandlingRedirect = false;

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

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
      if (isHandlingRedirect) return;
      isHandlingRedirect = true;

      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const idToken = await result.user.getIdToken(true);

          // Retry mechanism for session exchange
          let sessionError: string | null = null;
          for (let attempt = 0; attempt < 3; attempt++) {
            const sessionResult = await exchangeIdTokenForSession(idToken);
            if (sessionResult.ok) {
              window.location.href = redirectUrl;
              return; // Success, exit the function
            }
            sessionError = sessionResult.message || null;
            if (attempt < 2) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
          
          // If all retries fail
          toast({
            title: "Login Failed",
            description: sessionError || "Could not log you in after multiple attempts. Please try again.",
            variant: "destructive",
          });
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
        setPageLoading(false);
        isHandlingRedirect = false;
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
      const signupResponse = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!signupResponse.ok) {
        const data = await signupResponse.json();
        setError(data.message || 'An unexpected error occurred.');
        setLoading(false); // Stop loading on signup failure
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken(true);

      const sessionResult = await exchangeIdTokenForSession(idToken);

      if (sessionResult.ok) {
        window.location.href = redirectUrl;
      } else {
        setError(sessionResult.message || 'An unexpected error occurred during login.');
      }
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      if (window.location.pathname.includes('/signup')) { // prevent setting loading to false on redirect
        setLoading(false);
      }
    }
  };

  if (authLoading || pageLoading) {
    return <TopLoader />;
  }

  return (
    <div className="container py-24">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <Button className="w-full" type="submit" disabled={loading} size="lg">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Signing Up..." : "Create an Account"}
              </Button>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
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

          <GoogleAuthButton redirectUrl={redirectUrl} mode="signup" />

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline font-semibold text-primary">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
