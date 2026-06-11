'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en'
    : pathname.startsWith('/pl') ? 'pl'
    : pathname.startsWith('/de') ? 'de'
    : 'uk';

  const prefix = locale === 'uk' ? '' : `/${locale}`;

  const links = {
    uk: {
      disclaimer: 'Дисклеймер',
      privacy: 'Політика конфіденційності',
      terms: 'Умови використання',
      affiliate: 'Партнерські посилання',
      notAdvice: '⚠️ Не є фінансовою порадою. Тільки для освітніх цілей.',
      rights: '© 2026 CryptoNavigator. Всі права захищені.',
    },
    en: {
      disclaimer: 'Disclaimer',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      affiliate: 'Affiliate Disclosure',
      notAdvice: '⚠️ Not financial advice. For educational purposes only.',
      rights: '© 2026 CryptoNavigator. All rights reserved.',
    },
    pl: {
      disclaimer: 'Zastrzeżenia',
      privacy: 'Polityka prywatności',
      terms: 'Warunki użytkowania',
      affiliate: 'Ujawnienie afiliacji',
      notAdvice: '⚠️ Nie jest poradą finansową. Tylko do celów edukacyjnych.',
      rights: '© 2026 CryptoNavigator. Wszelkie prawa zastrzeżone.',
    },
    de: {
      disclaimer: 'Haftungsausschluss',
      privacy: 'Datenschutzrichtlinie',
      terms: 'Nutzungsbedingungen',
      affiliate: 'Affiliate-Offenlegung',
      notAdvice: '⚠️ Keine Finanzberatung. Nur zu Bildungszwecken.',
      rights: '© 2026 CryptoNavigator. Alle Rechte vorbehalten.',
    },
  };

  const t = links[locale as keyof typeof links] || links.uk;

  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      {/* Disclaimer banner */}
      <div className="bg-yellow-900/40 border-t border-yellow-700/30 px-4 py-3">
        <p className="text-center text-yellow-300 text-xs font-medium">
          {t.notAdvice}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div>
            <span className="text-white font-black text-lg">CryptoNavigator</span>
            <p className="text-xs mt-1">cryptotop.chat</p>
          </div>

          {/* Legal links */}
          <nav className="flex flex-wrap gap-4 text-sm justify-center">
            <Link href={`${prefix}/disclaimer`} className="hover:text-orange-400 transition">
              {t.disclaimer}
            </Link>
            <Link href={`${prefix}/privacy`} className="hover:text-orange-400 transition">
              {t.privacy}
            </Link>
            <Link href={`${prefix}/terms`} className="hover:text-orange-400 transition">
              {t.terms}
            </Link>
            <Link href={`${prefix}/disclaimer#affiliate`} className="hover:text-orange-400 transition">
              {t.affiliate}
            </Link>
          </nav>
        </div>

        {/* Bottom line */}
        <<div className="border-t border-gray-800 mt-6 pt-4 text-center text-xs">
            <p>{t.rights}</p>
          </div>-6 pt-4 text-center text-sm">
          <p>{t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
