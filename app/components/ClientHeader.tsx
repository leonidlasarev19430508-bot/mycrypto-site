'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTranslation, type Locale } from '../lib/i18n';

const LOCALE_LABELS: Record<Locale, string> = {
  uk: '🇺🇦 UA',
  pl: '🇵🇱 PL',
  de: '🇩🇪 DE',
  en: '🇬🇧 EN',
};

const LOCALES: Locale[] = ['uk', 'pl', 'de', 'en'];

function getLocalizedPath(locale: Locale, page: string): string {
  const prefix = locale === 'uk' ? '' : `/${locale}`;
  return page === '' ? (prefix || '/') : `${prefix}/${page}`;
}

function getCurrentPage(pathname: string, locale: Locale): string {
  const prefix = locale === 'uk' ? '' : `/${locale}`;
  const page = prefix ? pathname.replace(prefix, '') : pathname;
  return page.replace(/^\//, '') || '';
}

export default function ClientHeader() {
  const pathname = usePathname();
  const locale: Locale = pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : pathname.startsWith('/en') ? 'en'
    : 'uk';

  const t = getTranslation(locale);
  const homeHref = getLocalizedPath(locale, '');

  const currentPage = getCurrentPage(pathname, locale);

  const aboutLabel: Record<Locale, string> = {
    uk: 'Про нас', en: 'About', pl: 'O nas', de: 'Über uns',
  };
  const learnLabel: Record<Locale, string> = {
    uk: 'Навчання', en: 'Learn', pl: 'Nauka', de: 'Lernen',
  };
  const blogLabel: Record<Locale, string> = {
  uk: '📰 Блог', en: '📰 Blog', pl: '📰 Blog', de: '📰 Blog',
  };
  const coinsLabel: Record<Locale, string> = {
    uk: 'Монети', en: 'Coins', pl: 'Monety', de: 'Münzen',
  };
  const bonusesLabel: Record<Locale, string> = {
    uk: '🎁 Бонуси', en: '🎁 Bonuses', pl: '🎁 Bonusy', de: '🎁 Boni',
  };

  return (
    <header className="bg-black text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <Link href={homeHref} className="font-bold text-xl hover:text-gray-300">
          CryptoNavigator
        </Link>
        <nav className="flex flex-wrap gap-6 items-center">
          <Link href={homeHref} className="hover:text-gray-300">{t.nav.home}</Link>
          <Link href={getLocalizedPath(locale, 'coins')} className="hover:text-gray-300">{coinsLabel[locale]}</Link>
          <Link href={getLocalizedPath(locale, 'bonuses')} className="text-orange-400 hover:text-orange-300 font-semibold">{bonusesLabel[locale]}</Link>
          <Link href={getLocalizedPath(locale, 'markets')} className="hover:text-gray-300">{t.nav.markets}</Link>
          <Link href={getLocalizedPath(locale, 'news')} className="hover:text-gray-300">{t.nav.news}</Link>
          <Link href={getLocalizedPath(locale, 'assistant')} className="hover:text-gray-300">{t.nav.assistant}</Link>
          <Link href={getLocalizedPath(locale, 'blog')} className="hover:text-gray-300">{blogLabel[locale]}</Link>
          <Link href={getLocalizedPath(locale, 'faq')} className="hover:text-gray-300">FAQ</Link>
          <Link href={getLocalizedPath(locale, 'about')} className="hover:text-gray-300">{aboutLabel[locale]}</Link>
          <Link href={getLocalizedPath(locale, 'learn')} className="hover:text-gray-300">{learnLabel[locale]}</Link>
          <div className="flex gap-1 ml-4 border-l border-gray-600 pl-4">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={getLocalizedPath(l, currentPage)}
                className={`text-sm px-2 py-1 rounded transition-colors ${
                  locale === l
                    ? 'text-white font-bold bg-gray-700'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {LOCALE_LABELS[l]}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
