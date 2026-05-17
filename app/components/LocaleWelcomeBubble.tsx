'use client';
import { usePathname } from 'next/navigation';
import WelcomeBubble from './WelcomeBubble';

export default function LocaleWelcomeBubble() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en'
    : pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : 'uk';
  return <WelcomeBubble locale={locale} />;
}
