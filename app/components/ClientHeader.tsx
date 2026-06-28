'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { getTranslation, type Locale } from '../lib/i18n';

const LOCALE_LABELS: Record<Locale, string> = {
  uk: '🇺🇦 UA',
  pl: '🇵🇱 PL',
  de: '🇩🇪 DE',
  en: '🇬🇧 EN',
};

const LOCALES: Locale[] = ['uk', 'pl', 'de', 'en'];

const LOCALIZABLE_PAGES = new Set([
  '',
  'coins',
  'bonuses',
  'markets',
  'trading-bots',
  'news',
  'assistant',
  'blog',
  'faq',
  'about',
  'learn',
  'simulator',
]);

function getLocalizedPath(locale: Locale, page: string): string {
  const prefix = locale === 'uk' ? '' : `/${locale}`;
  return page === '' ? (prefix || '/') : `${prefix}/${page}`;
}

function getCurrentPage(pathname: string, locale: Locale): string {
  const prefix = locale === 'uk' ? '' : `/${locale}`;
  const page = prefix ? pathname.replace(prefix, '') : pathname;
  return page.replace(/^\//, '') || '';
}

function getSafeSwitchPath(locale: Locale, currentPage: string): string {
  const segments = currentPage.split('/').filter(Boolean);
  const baseSegment = segments[0] || '';
  if (baseSegment === 'blog' && segments.length >= 2) {
    const articleId = segments[1];
    return locale === 'uk' ? `/blog/${articleId}` : `/blog/${articleId}?lang=${locale}`;
  }
  if (LOCALIZABLE_PAGES.has(baseSegment)) {
    return getLocalizedPath(locale, currentPage);
  }
  return getLocalizedPath(locale, '');
}

function ClientHeaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const langParam = searchParams.get('lang');
  const isArticlePage = /^\/blog\/[^/]+$/.test(pathname);

  const locale: Locale = isArticlePage && (langParam === 'en' || langParam === 'pl' || langParam === 'de')
    ? langParam
    : pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : pathname.startsWith('/en') ? 'en'
    : 'uk';

  const t = getTranslation(locale);
  const homeHref = getLocalizedPath(locale, '');
  const currentPage = getCurrentPage(pathname, locale);

  const labels = {
    about: { uk: 'Про нас', en: 'About', pl: 'O nas', de: 'Über uns' },
    learn: { uk: 'Навчання', en: 'Learn', pl: 'Nauka', de: 'Lernen' },
    tradingBots: { uk: 'Торгові боти', en: 'Trading bots', pl: 'Boty handlowe', de: 'Trading-Bots' },
    coins: { uk: 'Монети', en: 'Coins', pl: 'Monety', de: 'Münzen' },
    bonuses: { uk: '🎁 Бонуси', en: '🎁 Bonuses', pl: '🎁 Bonusy', de: '🎁 Boni' },
    blog: { uk: '📰 Блог', en: '📰 Blog', pl: '📰 Blog', de: '📰 Blog' },
  };

  const navLinks = [
    { href: homeHref, label: t.nav.home },
    { href: getLocalizedPath(locale, 'trading-bots'), label: labels.tradingBots[locale] },
    { href: getLocalizedPath(locale, 'coins'), label: labels.coins[locale] },
    { href: getLocalizedPath(locale, 'bonuses'), label: labels.bonuses[locale], highlight: true },
    { href: getLocalizedPath(locale, 'markets'), label: t.nav.markets },
    { href: getLocalizedPath(locale, 'assistant'), label: t.nav.assistant },
    { href: getLocalizedPath(locale, 'blog'), label: labels.blog[locale] },
    { href: getLocalizedPath(locale, 'faq'), label: 'FAQ' },
    { href: getLocalizedPath(locale, 'about'), label: labels.about[locale] },
    { href: getLocalizedPath(locale, 'learn'), label: labels.learn[locale] },
    { href: getLocalizedPath(locale, 'simulator'), label: { uk: '🎮 Симулятор', en: '🎮 Simulator', pl: '🎮 Symulator', de: '🎮 Simulator' }[locale] },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href={homeHref} className="font-black text-xl text-gray-900 hover:text-orange-500 transition-colors flex-shrink-0">
          CryptoNavigator
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 flex-wrap">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                link.highlight
                  ? 'text-orange-500 font-bold hover:text-orange-600'
                  : 'text-gray-700 hover:text-orange-500'
              }`}>
              {link.label}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="flex gap-1 ml-2 border-l border-gray-200 pl-3">
            {LOCALES.map(l => (
              <Link key={l} href={getSafeSwitchPath(l, currentPage)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  locale === l
                    ? 'text-white font-bold bg-orange-500'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                {LOCALE_LABELS[l]}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile: lang + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex gap-1">
            {LOCALES.map(l => (
              <Link key={l} href={getSafeSwitchPath(l, currentPage)}
                className={`text-xs px-1.5 py-1 rounded transition-colors ${
                  locale === l
                    ? 'text-white font-bold bg-orange-500'
                    : 'text-gray-500 hover:text-gray-900'
                }`}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <button onClick={() => setMenuOpen(v => !v)}
            className="p-2 rounded hover:bg-gray-100 transition text-gray-700"
            aria-label="Menu">
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm py-2 px-3 rounded-lg hover:bg-gray-100 transition font-medium ${
                  link.highlight ? 'text-orange-500 font-bold' : 'text-gray-700'
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default function ClientHeader() {
  return (
    <Suspense fallback={null}>
      <ClientHeaderInner />
    </Suspense>
  );
}
