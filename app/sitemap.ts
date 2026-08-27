import { MetadataRoute } from 'next'
import { getBlogArticles } from './lib/blog'

async function getBlogArticlesForSitemap(): Promise<{ id: number; hasFullArticle: boolean }[]> {
  try {
    const { articles } = await getBlogArticles('uk', undefined, undefined, 200, 0);
    return articles.map((a) => ({
      id: a.id,
      hasFullArticle: !!(a.summary && a.summary.length > 50),
    }));
  } catch { return []; }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://cryptotop.chat';

  const mainPages = [
    '',
    '/faq',
    '/markets',
    '/assistant',
    '/about',
    '/learn',
    '/trading-bots',
    '/trading-bots/dca',
    '/trading-bots/grid',
    '/trading-bots/risks',
    '/trading-bots/platforms',
    '/trading-bots/strategies',
    '/coins',
    '/bonuses',
    '/blog',
    '/simulator',
  ];

  const legalPages = [
    '/privacy',
    '/terms',
    '/disclaimer',
  ];

  const locales = ['', '/en', '/pl', '/de'];
  const urls: MetadataRoute.Sitemap = [];

  // Основні сторінки всіма мовами
  for (const locale of locales) {
    for (const page of mainPages) {
      urls.push({
        url: `${base}${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === ''
          ? 1.0
          : page === '/bonuses'
          ? 0.9
          : page === '/simulator'
          ? 0.85
          : locale === ''
          ? 0.8
          : 0.7,
      });
    }
  }

  // Юридичні сторінки (тільки українська — основна)
  for (const page of legalPages) {
    urls.push({
      url: `${base}${page}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  }

  // Статті блогу — пріоритет залежить від наявності повної статті
  const articles = await getBlogArticlesForSitemap();
  for (const article of articles) {
    urls.push({
      url: `${base}/blog/${article.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: article.hasFullArticle ? 0.7 : 0.4,
    });
  }

  return urls;
}
