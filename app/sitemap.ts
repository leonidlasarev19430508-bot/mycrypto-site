import { MetadataRoute } from 'next'

async function getBlogArticles(): Promise<{ id: number; hasFullArticle: boolean }[]> {
  try {
    const res = await fetch('https://cryptotop.chat/api/blog?limit=200&offset=0', { next: { revalidate: 3600 } });
    const data = await res.json();
    return (data.articles || []).map((a: { id: number; full_article_uk?: string }) => ({
      id: a.id,
      hasFullArticle: !!(a.full_article_uk && a.full_article_uk.length > 50),
    }));
  } catch { return []; }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://cryptotop.chat';

  const mainPages = [
    '',
    '/faq',
    '/markets',
    '/assistant',
    '/about',
    '/learn',
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
  const articles = await getBlogArticles();
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
