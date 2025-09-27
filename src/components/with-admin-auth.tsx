"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TopLoader } from '@/components/top-loader';

// Temporary list of admin UIDs
const ADMIN_UIDS = ['admin-user-uid', 'ADMIN_USER_UID_2']; // Replace with actual admin UIDs

export default function withAdminAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WithAdminAuth = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || !ADMIN_UIDS.includes(user.uid))) {
        router.push('/login'); // Redirect non-admins to the login page
      }
    }, [user, loading, router]);

    if (loading || !user || !ADMIN_UIDS.includes(user.uid)) {
      return <TopLoader />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAdminAuth.displayName = `WithAdminAuth(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

  return WithAdminAuth;
}