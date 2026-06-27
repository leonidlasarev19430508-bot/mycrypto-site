'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  coin_name: string;
  sentiment: string;
  published_at: string;
}

export default function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/news?limit=6')
      .then(r => r.json())
      .then(data => setArticles(data.news || data.articles || data || []))
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  const sentimentColor: Record<string, string> = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {articles.slice(0, 6).map(article => (
        <Link key={article.id} href={`/blog/${article.id}`}
          className="block p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
          {article.coin_name && (
            <span className="text-xs font-bold text-orange-600 uppercase mb-2 block">
              {article.coin_name}
            </span>
          )}
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-3">
            {article.title}
          </h3>
          <p className={`text-xs mt-2 font-semibold ${sentimentColor[article.sentiment] || 'text-gray-500'}`}>
            {article.sentiment === 'positive' ? '📈 Позитив' : article.sentiment === 'negative' ? '📉 Негатив' : '⚖️ Нейтрально'}
          </p>
        </Link>
      ))}
    </div>
  );
}
