// src/app/account/page.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth-context";
import { TopLoader } from "@/components/top-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/lib/firebase/auth";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // All hooks must be called unconditionally at the top of the component.
  const displayName = useMemo(() => user?.displayName || "No display name", [user]);
  const email = useMemo(() => user?.email || "", [user]);
  const avatarInitial = useMemo(() => {
    const fromName = displayName?.trim()?.[0];
    const fromEmail = email?.trim()?.[0];
    return (fromName || fromEmail || "U").toUpperCase();
  }, [displayName, email]);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent("/account")}`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <TopLoader />;
  }

  return (
    <div className="container py-24">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Account</CardTitle>
          <CardDescription>Your account details are below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.photoURL ?? undefined} />
              <AvatarFallback>{avatarInitial}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-lg font-semibold">{displayName}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          <form action={signOut}>
            <Button variant="outline" className="w-full" type="submit">
              Log Out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
