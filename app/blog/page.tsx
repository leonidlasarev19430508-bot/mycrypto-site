import { headers } from 'next/headers';
import BlogClientProps from '../components/BlogClientProps';
import { getBlogArticles } from '../lib/blog';

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

export const revalidate = 1800; // ISR: оновлення кожні 30 хвилин

async function getArticles(locale: string): Promise<{ articles: Article[]; total: number }> {
  try {
    const { articles, total } = await getBlogArticles(locale, undefined, undefined, 12, 0);
    return { articles, total };
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return { articles: [], total: 0 };
  }
}

export default async function BlogPage() {
  const headersList = await headers();
  const locale = headersList.get('x-middleware-request-locale') || 'uk';
  const { articles, total } = await getArticles(locale);

  return <BlogClientProps initialArticles={articles} initialTotal={total} locale={locale as 'uk' | 'en' | 'pl' | 'de'} />;
}