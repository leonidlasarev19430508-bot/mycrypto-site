import type { Metadata } from 'next';
import HomePage from '../components/HomePageClient';
import { getTranslation } from '../lib/i18n';

const t = getTranslation('en');

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: '/en' },
};

export default function ENPage() {
  return <HomePage />;
}