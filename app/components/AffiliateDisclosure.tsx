'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation, type Locale } from '../lib/i18n';

function localeFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/pl')) return 'pl';
  if (pathname.startsWith('/de')) return 'de';
  return 'uk';
}

function localize(path: string, locale: Locale): string {
  return locale === 'uk' ? path : `/${locale}${path}`;
}

/**
 * Discreet affiliate disclosure shown near referral call-to-actions.
 * Keeps the site compliant and honest without breaking the flow.
 */
export default function AffiliateDisclosure() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const t = useTranslation(locale);

  return (
    <div className="text-center text-xs text-gray-500 mt-6 space-y-1 leading-relaxed">
      <p>
        {t.legal.affiliateDisclosure}{' '}
        <Link
          href={localize('/disclaimer#affiliate', locale)}
          className="underline underline-offset-2 hover:text-gray-700"
        >
          →
        </Link>
      </p>
      <Link
        href={localize('/methodology', locale)}
        className="underline underline-offset-2 hover:text-gray-700 inline-block"
      >
        {t.legal.howWeRate} →
      </Link>
    </div>
  );
}