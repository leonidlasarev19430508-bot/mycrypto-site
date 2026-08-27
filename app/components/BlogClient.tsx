'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Article = {
  id: number;
  title: string;
  coin_slug: string;
  coin_name: string;
  sentiment: string;
  recommendation: string;
  source_name: string;
  source_url: string;
  published_at: string;
  summary: string;
};

const UI = {
  uk: {
    title: '📰 Крипто Блог',
    subtitle: 'AI-аналіз новин криптовалютного ринку',
    all: 'Всі',
    positive: '📈 Позитивні',
    negative: '📉 Негативні',
    neutral: '⚖️ Нейтральні',
    readMore: 'Читати далі →',
    source: 'Джерело',
    loading: 'Завантаження...',
    noArticles: 'Статей не знайдено',
    loadMore: 'Завантажити ще',
    buy: '🟢 Купити',
    sell: '🔴 Продати',
    hold: '🟡 Тримати',
  },
  en: {
    title: '📰 Crypto Blog',
    subtitle: 'AI analysis of cryptocurrency market news',
    all: 'All',
    positive: '📈 Positive',
    negative: '📉 Negative',
    neutral: '⚖️ Neutral',
    readMore: 'Read more →',
    source: 'Source',
    loading: 'Loading...',
    noArticles: 'No articles found',
    loadMore: 'Load more',
    buy: '🟢 Buy',
    sell: '🔴 Sell',
    hold: '🟡 Hold',
  },
  pl: {
    title: '📰 Blog Krypto',
    subtitle: 'Analiza AI wiadomości rynku kryptowalut',
    all: 'Wszystkie',
    positive: '📈 Pozytywne',
    negative: '📉 Negatywne',
    neutral: '⚖️ Neutralne',
    readMore: 'Czytaj więcej →',
    source: 'Źródło',
    loading: 'Ładowanie...',
    noArticles: 'Nie znaleziono artykułów',
    loadMore: 'Załaduj więcej',
    buy: '🟢 Kupuj',
    sell: '🔴 Sprzedaj',
    hold: '🟡 Trzymaj',
  },
  de: {
    title: '📰 Krypto Blog',
    subtitle: 'KI-Analyse der Kryptowährungsmarktnachrichten',
    all: 'Alle',
    positive: '📈 Positiv',
    negative: '📉 Negativ',
    neutral: '⚖️ Neutral',
    readMore: 'Mehr lesen →',
    source: 'Quelle',
    loading: 'Laden...',
    noArticles: 'Keine Artikel gefunden',
    loadMore: 'Mehr laden',
    buy: '🟢 Kaufen',
    sell: '🔴 Verkaufen',
    hold: '🟡 Halten',
  },
};

function timeAgo(dateStr: string, locale: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (locale === 'uk') {
    if (diff < 3600) return Math.floor(diff / 60) + ' хв тому';
    if (diff < 86400) return Math.floor(diff / 3600) + ' год тому';
    return Math.floor(diff / 86400) + ' дн тому';
  }
  if (locale === 'pl') {
    if (diff < 3600) return Math.floor(diff / 60) + ' min temu';
    if (diff < 86400) return Math.floor(diff / 3600) + ' godz temu';
    return Math.floor(diff / 86400) + ' dni temu';
  }
  if (locale === 'de') {
    if (diff < 3600) return 'vor ' + Math.floor(diff / 60) + ' Min';
    if (diff < 86400) return 'vor ' + Math.floor(diff / 3600) + ' Std';
    return 'vor ' + Math.floor(diff / 86400) + ' Tagen';
  }
  if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
  if (diff < 86400) return Math.floor(diff / 3600) + ' h ago';
  return Math.floor(diff / 86400) + ' days ago';
}