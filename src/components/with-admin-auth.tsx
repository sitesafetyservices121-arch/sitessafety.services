
"use client";

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TopLoader } from '@/components/top-loader';

export default function withAdminAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WithAdminAuth = (props: P) => {
    const { user, userProfile, loading } = useUser();
    const router = useRouter();

    const isAdmin = userProfile?.role === 'admin';

    useEffect(() => {
      if (!loading && (!user || !isAdmin)) {
        router.push('/login'); // Redirect non-admins to the login page
      }
    }, [user, isAdmin, loading, router]);

    if (loading || !user || !isAdmin) {
      return <TopLoader />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAdminAuth.displayName = `WithAdminAuth(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

  return WithAdminAuth;
}
