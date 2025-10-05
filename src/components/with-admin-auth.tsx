
"use client";

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TopLoader } from '@/components/top-loader';
import { UserWithProfile } from '@/firebase/provider';

export default function withAdminAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WithAdminAuth = (props: P) => {
    const { user, loading } = useUser();
    const router = useRouter();

    const typedUser = user as UserWithProfile; // Cast to the augmented type
    const isAdmin = typedUser?.userProfile?.role === 'admin';

    useEffect(() => {
      // If loading is finished and there's no user or the user is not an admin, redirect.
      if (!loading && (!user || !isAdmin)) {
        router.push('/login?redirect=/admin'); // Redirect non-admins to the login page
      }
    }, [user, isAdmin, loading, router]);

    // Show loader while we're verifying auth and role.
    if (loading || !user || !isAdmin) {
      return <TopLoader />;
    }

    // If everything checks out, render the component.
    return <WrappedComponent {...props} />;
  };

  WithAdminAuth.displayName = `WithAdminAuth(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

  return WithAdminAuth;
}
