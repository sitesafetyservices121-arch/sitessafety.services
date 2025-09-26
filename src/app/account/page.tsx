
"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth is not loading and there's no user, redirect to login.
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // While loading or if there's no user (and redirect is imminent), show a loading state.
  if (loading || !user) {
    return <div className="container py-24 text-center">Loading...</div>;
  }
  
  // Only render the account details if the user is logged in and auth state is resolved.
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
              <AvatarImage src={user.photoURL ?? ''} />
              <AvatarFallback>{user.email?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
                <p className="text-lg font-semibold">{user.displayName ?? 'No display name'}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <form action={signOut}>
            <Button variant="outline" className="w-full" type="submit">Log Out</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
