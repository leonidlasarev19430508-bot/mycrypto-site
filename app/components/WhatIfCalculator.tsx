'use client';
import { useState, useEffect } from 'react';

// ── Affiliate посилання — замінити після отримання реальних ──────
const AFFILIATE = {
  bitcoin:  process.env.NEXT_PUBLIC_AFFILIATE_BINANCE  || '#',
  ethereum: process.env.NEXT_PUBLIC_AFFILIATE_BINANCE  || '#',
  solana:   process.env.NEXT_PUBLIC_AFFILIATE_BYBIT    || '#',
  bnb:      process.env.NEXT_PUBLIC_AFFILIATE_BINANCE  || '#',
  xrp:      process.env.NEXT_PUBLIC_AFFILIATE_BYBIT    || '#',
};

const COINS = [
  { id: 'bitcoin',  symbol: 'BTC', label: 'BTC',  exchange: 'Binance' },
  { id: 'ethereum', symbol: 'ETH', label: 'ETH',  exchange: 'Binance' },
  { id: 'solana',   symbol: 'SOL', label: 'SOL',  exchange: 'Bybit'   },
  { id: 'bnb',      symbol: 'BNB', label: 'BNB',  exchange: 'Binance' },
  { id: 'xrp',      symbol: 'XRP', label: 'XRP',  exchange: 'Bybit'   },
];

const QUICK_DATES: { label: string; months: number }[] = [
  { label: '6 міс.', months: 6  },
  { label: '1 рік',  months: 12 },
  { label: '2 роки', months: 24 },
  { label: '3 роки', months: 36 },
  { label: '5 років',months: 60 },
];

function fmt(n: number): string {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000)     return '$' + Math.round(n).toLocaleString('uk-UA');
  return '$' + n.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtCoins(n: number, sym: string): string {
  if (n >= 1000) return n.toFixed(1) + ' ' + sym;
  if (n >= 1)    return n.toFixed(4) + ' ' + sym;
  return n.toFixed(6) + ' ' + sym;
}

function getDateNMonthsAgo(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d.toISOString().split('T')[0];
}

interface Result {
  priceThen: number;
  priceNow: number;
  coins: number;
  nowValue: number;
  profit: number;
  multiplier: number;
  isGain: boolean;
}

export default function WhatIfCalculator() {
  const [coin, setCoin] = useState(COINS[0]);
  const [amount, setAmount] = useState(1000);
  const [date, setDate] = useState(getDateNMonthsAgo(12));
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const maxDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  })();

  async function calculate() {
    setError('');
    setResult(null);
    if (!amount || amount <= 0) { setError('Введи суму більше 0'); return; }
    if (!date) { setError('Обери дату'); return; }

    setLoading(true);
    try {
      const [y, m, d] = date.split('-');
      const cgDate = `${d}-${m}-${y}`;

      const [histRes, nowRes] = await Promise.all([
        fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/history?date=${cgDate}&localization=false`),
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd`),
      ]);

      const hist = await histRes.json();
      const now  = await nowRes.json();

      const priceThen = hist?.market_data?.current_price?.usd;
      const priceNow  = now?.[coin.id]?.usd;

      if (!priceThen) throw new Error('Немає ціни для цієї дати. Спробуй іншу.');
      if (!priceNow)  throw new Error('Не вдалося отримати поточну ціну.');

      const coins     = amount / priceThen;
      const nowValue  = coins * priceNow;
      const profit    = nowValue - amount;
      const multiplier = nowValue / amount;

      setResult({ priceThen, priceNow, coins, nowValue, profit, multiplier, isGain: profit >= 0 });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Помилка. Спробуй пізніше.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
          Калькулятор
        </span>
        <h2 className="text-3xl font-bold text-gray-900">
          Якби ти купив {coin.symbol}...
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          Дізнайся скільки б ти заробив
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* Coin selector */}
        <div className="flex gap-2 mb-5 bg-gray-50 p-1 rounded-xl">
          {COINS.map(c => (
            <button
              key={c.id}
              onClick={() => { setCoin(c); setResult(null); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                coin.id === c.id
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Сума інвестиції
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              min={1}
              step={100}
              className="w-full pl-7 pr-4 py-3 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Дата покупки
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            min="2013-01-01"
            max={maxDate}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {QUICK_DATES.map(q => (
              <button
                key={q.months}
                onClick={() => setDate(getDateNMonthsAgo(q.months))}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-600 transition-colors"
              >
                {q.label} тому
              </button>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={calculate}
          disabled={loading}
          className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-base"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
              </svg>
              Отримую дані...
            </span>
          ) : 'Порахувати →'}
        </button>

        {/* Error */}
        {error && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-5 border border-gray-100 rounded-xl overflow-hidden">
            {/* Big number */}
            <div className={`px-5 py-4 ${result.isGain ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="text-xs text-gray-500 mb-1">Зараз коштувало б</p>
              <p className={`text-4xl font-black ${result.isGain ? 'text-green-600' : 'text-red-600'}`}>
                {fmt(result.nowValue)}
              </p>
              <span className={`inline-block mt-1 text-sm font-semibold px-3 py-0.5 rounded-full ${
                result.isGain ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {result.isGain
                  ? `×${result.multiplier.toFixed(2)} — +${((result.multiplier - 1) * 100).toFixed(0)}%`
                  : `−${(100 - result.multiplier * 100).toFixed(0)}% від вкладеного`}
              </span>
            </div>

            {/* Details */}
            <div className="divide-y divide-gray-100">
              {[
                ['Інвестиція', fmt(amount)],
                [`Ціна ${coin.symbol} тоді`, fmt(result.priceThen)],
                ['Куплено монет', fmtCoins(result.coins, coin.symbol)],
                [`Поточна ціна ${coin.symbol}`, fmt(result.priceNow)],
                ['Прибуток / збиток', (result.isGain ? '+' : '') + fmt(result.profit)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center px-5 py-3 bg-white">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
              <p className="text-sm text-gray-600 mb-3">
                {result.isGain
                  ? `Ще не пізно почати. Зареєструйся на ${coin.exchange} і торгуй вже сьогодні.`
                  : `Довгострокова стратегія завжди виграє. Відкрий акаунт на ${coin.exchange}.`}
              </p>
              <a
                href={AFFILIATE[coin.id as keyof typeof AFFILIATE]}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Зареєструватись на {coin.exchange} →
              </a>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        Дані: CoinGecko API · Не є фінансовою порадою
      </p>
    </section>
  );
}
