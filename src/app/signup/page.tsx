
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpWithEmail } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

const initialState = {
  message: "",
  user: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending} size="lg">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Signing Up..." : "Create an Account"}
    </Button>
  );
}

function GoogleSignInButton() {
    const [loading, setLoading] = useState(false);
    
    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // Auth state change will be caught by useAuth and trigger redirect in main component
        } catch (error: any) {
            console.error("Google Sign-in Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant="outline" type="button" onClick={handleGoogleSignIn} disabled={loading} className="w-full" size="lg">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
             {!loading && (
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-79.3 79.3C311.5 118.8 281.5 108 248 108c-73.4 0-134.3 59.8-134.3 134.3s60.9 134.3 134.3 134.3c81.3 0 115.7-55.8 119.5-83.3H248v-97.2h239.5c1.4 12.3 2.5 24.5 2.5 36.8z"></path>
                </svg>
             )}
            {loading ? "Signing up..." : "Sign up with Google"}
        </Button>
    )
}

export default function SignUpPage() {
  const [state, formAction] = useActionState(signUpWithEmail, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const redirectUrl = searchParams.get("redirect") || "/account";

  useEffect(() => {
    // Redirect if user is logged in
    if (!loading && user) {
      router.push(redirectUrl);
    }
  }, [user, loading, router, redirectUrl]);

  useEffect(() => {
    // Redirect on successful form submission
    if (state.user) {
       router.push(redirectUrl);
    }
  }, [state.user, router, redirectUrl]);
  
  // While auth is loading or if the user is logged in (and about to be redirected),
  // show a loading state to prevent the form from flashing and causing loops.
  if (loading || user) {
    return <div className="container py-24 text-center">Loading...</div>;
  }

  return (
    <div className="container py-24">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <SubmitButton />
              {state.message && <p className="text-sm text-destructive text-center">{state.message}</p>}
            </div>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <GoogleSignInButton />
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
