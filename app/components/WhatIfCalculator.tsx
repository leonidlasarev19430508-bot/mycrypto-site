'use client';
import { useState } from 'react';
import { useTranslation, type Locale } from '../lib/i18n';

const AFFILIATE = {
  bitcoin:  process.env.NEXT_PUBLIC_AFFILIATE_BINANCE  || 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
  ethereum: process.env.NEXT_PUBLIC_AFFILIATE_BINANCE  || 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
  solana:   process.env.NEXT_PUBLIC_AFFILIATE_BYBIT    || 'https://www.bybit.com/register?ref=CRYPTONAV',
  bnb:      process.env.NEXT_PUBLIC_AFFILIATE_BINANCE  || 'https://www.binance.com/register?ref=GRO_28502_BIO0R',
  xrp:      process.env.NEXT_PUBLIC_AFFILIATE_BYBIT    || 'https://www.bybit.com/register?ref=CRYPTONAV',
};

const COINS = [
  { id: 'bitcoin',  symbol: 'BTC', exchange: 'Binance' },
  { id: 'ethereum', symbol: 'ETH', exchange: 'Binance' },
  { id: 'solana',   symbol: 'SOL', exchange: 'Bybit'   },
  { id: 'bnb',      symbol: 'BNB', exchange: 'Binance' },
  { id: 'xrp',      symbol: 'XRP', exchange: 'Bybit'   },
];

function fmt(n: number): string {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000)     return '$' + Math.round(n).toLocaleString();
  return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

interface Props {
  locale?: Locale;
}

export default function WhatIfCalculator({ locale = 'uk' }: Props) {
  const t = useTranslation(locale);
  const c = t.calculator;

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
    if (!amount || amount <= 0) { setError(c.error_amount); return; }
    if (!date) { setError(c.error_date); return; }

    setLoading(true);
    try {
      const [y, m, d] = date.split('-');
      const cgDate = `${d}-${m}-${y}`;

      const [histRes, nowRes] = await Promise.all([
        fetch(`/api/coin-history/${coin.id}?date=${cgDate}`),
        fetch(`/api/coin-price?ids=${coin.id}`),
      ]);

      const hist = await histRes.json();
      const now  = await nowRes.json();

      const priceThen = hist?.market_data?.current_price?.usd;
      const priceNow  = now?.[coin.id]?.usd;

      if (!priceThen) { setError(c.error_price); setLoading(false); return; }
      if (!priceNow)  { setError(c.error_current); setLoading(false); return; }

      const coins      = amount / priceThen;
      const nowValue   = coins * priceNow;
      const profit     = nowValue - amount;
      const multiplier = nowValue / amount;

      setResult({ priceThen, priceNow, coins, nowValue, profit, multiplier, isGain: profit >= 0 });
    } catch {
      setError(c.error_generic);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
          {c.badge}
        </span>
        <h2 className="text-3xl font-bold text-gray-900">
          {c.title} {coin.symbol}...
        </h2>
        <p className="text-gray-500 mt-1 text-sm">{c.subtitle}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* Coin selector */}
        <div className="flex gap-2 mb-5 bg-gray-50 p-1 rounded-xl">
          {COINS.map(co => (
            <button
              key={co.id}
              onClick={() => { setCoin(co); setResult(null); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                coin.id === co.id
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {co.symbol}
            </button>
          ))}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {c.amount_label}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              min={1}
              step={100}
              className="w-full pl-7 pr-4 py-3 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {c.date_label}
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            min="2013-01-01"
            max={maxDate}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {c.quick_dates.map((q) => (
              <button
                key={q.months}
                onClick={() => setDate(getDateNMonthsAgo(q.months))}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-600 transition-colors"
              >
                {q.label} {c.ago}
              </button>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={calculate}
          disabled={loading}
          className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
              </svg>
              {c.loading}
            </span>
          ) : c.calculate}
        </button>

        {error && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-5 border border-gray-100 rounded-xl overflow-hidden">
            <div className={`px-5 py-4 ${result.isGain ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="text-xs text-gray-500 mb-1">{c.result_label}</p>
              <p className={`text-4xl font-black ${result.isGain ? 'text-green-600' : 'text-red-600'}`}>
                {fmt(result.nowValue)}
              </p>
              <span className={`inline-block mt-1 text-sm font-semibold px-3 py-0.5 rounded-full ${
                result.isGain ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {result.isGain
                  ? `×${result.multiplier.toFixed(2)} — +${((result.multiplier - 1) * 100).toFixed(0)}%`
                  : `−${(100 - result.multiplier * 100).toFixed(0)}%`}
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {[
                [c.details.investment, fmt(amount)],
                [`${c.details.price_then} ${coin.symbol}`, fmt(result.priceThen)],
                [c.details.coins_bought, fmtCoins(result.coins, coin.symbol)],
                [`${c.details.price_now} ${coin.symbol}`, fmt(result.priceNow)],
                [c.details.profit, (result.isGain ? '+' : '') + fmt(result.profit)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center px-5 py-3 bg-white">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 bg-blue-50 border-t border-blue-100">
              <p className="text-sm text-gray-600 mb-3">
                {result.isGain ? `${c.gain} ${coin.exchange}.` : `${c.loss} ${coin.exchange}.`}
              </p>
              <a
                href={AFFILIATE[coin.id as keyof typeof AFFILIATE]}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {c.register} {coin.exchange} →
              </a>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">{c.footer}</p>
    </section>
  );
}
