
import type { Metadata } from 'next';
import { PrivacyPageClient } from '@/components/privacy-page-client';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our policies on the collection, use, and disclosure of your information.',
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
