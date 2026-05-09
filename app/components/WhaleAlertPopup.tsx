'use client';
import { useState, useEffect } from 'react';

const EXCHANGES = {
  binance: { name: 'Binance', url: 'https://www.binance.com/register?ref=GRO_28502_BIO0R' },
  whitebit: { name: 'WhiteBIT', url: 'https://whitebit.com/referral/54626c3b-5240-4d39-9784-8e3eda5736de' },
};

function fmtUsd(n: number): string {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  return '$' + Math.round(n / 1e6) + 'M';
}

const DEMO_POPUPS = [
  {
    symbol: 'BTC',
    amountUsd: 164_000_000,
    emoji: '🚨',
    title: 'Великий продаж BTC!',
    message: '$164M BTC переміщено на біржу. Можливий тиск на ціну — будь готовий!',
    action: 'Торгувати зараз',
    color: 'from-red-600 to-red-700',
    exchange: 'binance',
  },
  {
    symbol: 'ETH',
    amountUsd: 111_000_000,
    emoji: '🐋',
    title: 'Кит виводить ETH!',
    message: '$111M ETH виведено з біржі. Сигнал накопичення — можливе зростання!',
    action: 'Купити зараз',
    color: 'from-green-600 to-green-700',
    exchange: 'binance',
  },
  {
    symbol: 'BTC',
    amountUsd: 69_500_000,
    emoji: '🐳',
    title: 'Увага! Рух BTC!',
    message: '$69M BTC переміщено на Binance. Великий гравець в дії!',
    action: 'Діяти зараз',
    color: 'from-orange-600 to-orange-700',
    exchange: 'binance',
  },
];

type PopupType = typeof DEMO_POPUPS[0];

export default function WhaleAlertPopup() {
  const [popup, setPopup] = useState<PopupType | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = (p: PopupType, duration: number) => {
      setPopup(p);
      setVisible(true);
      setTimeout(() => setVisible(false), duration);
    };

    const t1 = setTimeout(() => show(DEMO_POPUPS[0], 12000), 6000);
    const t2 = setTimeout(() => show(DEMO_POPUPS[1], 12000), 180000);
    const t3 = setTimeout(() => show(DEMO_POPUPS[2], 12000), 360000);

    return () => {
      clearTimeout(t1);