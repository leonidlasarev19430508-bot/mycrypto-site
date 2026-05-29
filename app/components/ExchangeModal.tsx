'use client';
import { useState, useEffect } from 'react';

type Locale = 'uk' | 'en' | 'pl' | 'de';

interface ExchangeInfo {
  founded: string;
  coins: string;
  volume: string;
  users: string;
  headquarters: string;
  description: Record<Locale, string>;
  pros: Record<Locale, string[]>;
  pageSlug: string;
}

const EXCHANGES: Record<string, ExchangeInfo> = {
  binance: {
    founded: '2017',
    coins: '350+',
    volume: '$15B+/день',
    users: '170M+',
    headquarters: 'Кайманові острови',
    description: {
      uk: 'Найбільша криптовалютна біржа у світі за обсягом торгів. Заснована Чанпен Чжао у 2017 році.',
      en: 'The world\'s largest crypto exchange by trading volume. Founded by Changpeng Zhao in 2017.',
      pl: 'Największa giełda kryptowalut na świecie pod względem wolumenu obrotu. Założona przez Changpeng Zhao w 2017.',
      de: 'Die weltweit größte Kryptobörse nach Handelsvolumen. Gegründet von Changpeng Zhao im Jahr 2017.',
    },
    pros: {
      uk: ['Найнижчі комісії 0.1%', 'Українська підтримка', '350+ монет', 'Стейкінг до 20%'],
      en: ['Lowest fees 0.1%', 'Ukrainian support', '350+ coins', 'Staking up to 20%'],
      pl: ['Najniższe opłaty 0.1%', 'Wsparcie w języku ukraińskim', '350+ monet', 'Staking do 20%'],
      de: ['Niedrigste Gebühren 0.1%', 'Ukrainischer Support', '350+ Coins', 'Staking bis 20%'],
    },
    pageSlug: 'binance',
  },
  mexc: {
    founded: '2018',
    coins: '1500+',
    volume: '$2B+/день',
    users: '10M+',
    headquarters: 'Сейшельські острови',
    description: {
      uk: 'Популярна біржа з підтримкою гривні та україномовним інтерфейсом. Одна з найкращих для українців.',
      en: 'Popular exchange with UAH support and Ukrainian interface. One of the best for Ukrainians.',
      pl: 'Popularna giełda z obsługą UAH i ukraińskim interfejsem. Jedna z najlepszych dla Ukraińców.',
      de: 'Beliebte Börse mit UAH-Unterstützung und ukrainischer Oberfläche. Eine der besten für Ukrainer.',
    },
    pros: {
      uk: ['Підтримка гривні UAH', 'Україномовний інтерфейс', '1500+ монет', 'Швидка верифікація'],
      en: ['UAH support', 'Ukrainian interface', '1500+ coins', 'Fast verification'],
      pl: ['Obsługa UAH', 'Ukraiński interfejs', '1500+ monet', 'Szybka weryfikacja'],
      de: ['UAH-Unterstützung', 'Ukrainische Oberfläche', '1500+ Coins', 'Schnelle Verifizierung'],
    },
    pageSlug: 'mexc',
  },
  bybit: {
    founded: '2018',
    coins: '300+',
    volume: '$8B+/день',
    users: '30M+',
    headquarters: 'Дубай, ОАЕ',
    description: {
      uk: 'Провідна біржа для активних трейдерів з плечем до 100x та copy trading.',
      en: 'Leading exchange for active traders with up to 100x leverage and copy trading.',
      pl: 'Wiodąca giełda dla aktywnych traderów z dźwignią do 100x i copy tradingiem.',
      de: 'Führende Börse für aktive Trader mit bis zu 100x Hebel und Copy Trading.',
    },
    pros: {
      uk: ['Плече до 100x', 'Copy trading', 'Висока ліквідність', '24/7 підтримка'],
      en: ['Up to 100x leverage', 'Copy trading', 'High liquidity', '24/7 support'],
      pl: ['Dźwignia do 100x', 'Copy trading', 'Wysoka płynność', 'Wsparcie 24/7'],
      de: ['Bis zu 100x Hebel', 'Copy Trading', 'Hohe Liquidität', '24/7 Support'],
    },
    pageSlug: 'bybit',
  },
  kucoin: {
    founded: '2017',
    coins: '700+',
    volume: '$1B+/день',
    users: '27M+',
    headquarters: 'Сейшельські острови',
    description: {
      uk: 'Сучасна платформа з широким вибором монет, стейкінгом та Web3 інтеграцією.',
      en: 'Modern platform with wide coin selection, staking and Web3 integration.',
      pl: 'Nowoczesna platforma z szerokim wyborem monet, stakingiem i integracją Web3.',
      de: 'Moderne Plattform mit großer Coin-Auswahl, Staking und Web3-Integration.',
    },
    pros: {
      uk: ['700+ монет', 'Web3 інтеграція', 'Стейкінг', 'Низькі комісії'],
      en: ['700+ coins', 'Web3 integration', 'Staking rewards', 'Low fees'],
      pl: ['700+ monet', 'Integracja Web3', 'Nagrody za staking', 'Niskie opłaty'],
      de: ['700+ Coins', 'Web3-Integration', 'Staking-Belohnungen', 'Niedrige Gebühren'],
    },
    pageSlug: 'kucoin',
  },
  okx: {
    founded: '2017',
    coins: '300+',
    volume: '$5B+/день',
    users: '50M+',
    headquarters: 'Сейшельські острови',
    description: {
      uk: 'Топова біржа з найнижчими комісіями 0.08%, Web3 гаманцем та NFT маркетплейсом.',
      en: 'Top exchange with lowest fees 0.08%, Web3 wallet and NFT marketplace.',
      pl: 'Czołowa giełda z najniższymi opłatami 0.08%, portfelem Web3 i rynkiem NFT.',
      de: 'Top-Börse mit niedrigsten Gebühren 0.08%, Web3-Wallet und NFT-Marktplatz.',
    },
    pros: {
      uk: ['Комісії 0.08%', 'Web3 гаманець', 'Стейкінг до 20%', 'NFT маркетплейс'],
      en: ['Fees 0.08%', 'Web3 wallet', 'Staking up to 20%', 'NFT marketplace'],
      pl: ['Opłaty 0.08%', 'Portfel Web3', 'Staking do 20%', 'Rynek NFT'],
      de: ['Gebühren 0.08%', 'Web3-Wallet', 'Staking bis 20%', 'NFT-Marktplatz'],
    },
    pageSlug: 'okx',
  },
};

const LABELS: Record<Locale, Record<string, string>> = {
  uk: {
    founded: 'Рік заснування',
    coins: 'Кількість монет',
    volume: 'Добовий обіг',
    users: 'Користувачів',
    headquarters: 'Штаб-квартира',
    advantages: 'Переваги',
    more: 'Більше про біржу →',
    close: 'Закрити',
  },
  en: {
    founded: 'Founded',
    coins: 'Coins listed',
    volume: 'Daily volume',
    users: 'Users',
    headquarters: 'Headquarters',
    advantages: 'Advantages',
    more: 'More about exchange →',
    close: 'Close',
  },
  pl: {
    founded: 'Rok założenia',
    coins: 'Liczba monet',
    volume: 'Dzienny wolumen',
    users: 'Użytkownicy',
    headquarters: 'Siedziba',
    advantages: 'Zalety',
    more: 'Więcej o giełdzie →',
    close: 'Zamknij',
  },
  de: {
    founded: 'Gegründet',
    coins: 'Coins',
    volume: 'Tagesvolumen',
    users: 'Nutzer',
    headquarters: 'Hauptsitz',
    advantages: 'Vorteile',
    more: 'Mehr über die Börse →',
    close: 'Schließen',
  },
};

const LOGOS: Record<string, string> = {
  binance: '🟡',
  mexc: '🔷',
  bybit: '🔵',
  kucoin: '🟢',
  okx: '⚫',
};

interface Props {
  exchangeId: string;
  locale?: Locale;
  onClose: () => void;
}

export function ExchangeModal({ exchangeId, locale = 'uk', onClose }: Props) {
  const ex = EXCHANGES[exchangeId];
  const labels = LABELS[locale];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!ex) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{LOGOS[exchangeId]}</span>
            <h2 className="text-2xl font-black text-white">
            {{ binance: 'Binance', mexc: 'MEXC', bybit: 'Bybit', kucoin: 'KuCoin', okx: 'OKX' }[exchangeId]}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white text-2xl font-bold hover:opacity-70 transition leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-gray-600 text-sm mb-5">{ex.description[locale]}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: labels.founded, value: ex.founded },
              { label: labels.coins, value: ex.coins },
              { label: labels.volume, value: ex.volume },
              { label: labels.users, value: ex.users },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
                <p className="text-base font-black text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          {/* HQ */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <span>📍</span>
            <span>{labels.headquarters}: <strong className="text-gray-700">{ex.headquarters}</strong></span>
          </div>

          {/* Pros */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{labels.advantages}</p>
            <ul className="space-y-1.5">
              {ex.pros[locale].map(pro => (
                <li key={pro} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-500 font-bold">✓</span> {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Button */}
          <a
            href={`/exchange/${ex.pageSlug}`}
            className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition text-sm"
          >
            {labels.more}
          </a>
        </div>
      </div>
    </div>
  );
}

// Hook for easy use
export function useExchangeModal() {
  const [activeExchange, setActiveExchange] = useState<string | null>(null);
  const open = (id: string) => setActiveExchange(id);
  const close = () => setActiveExchange(null);
  return { activeExchange, open, close };
}
