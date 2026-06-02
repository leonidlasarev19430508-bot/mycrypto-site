import { MetadataRoute } from 'next'

async function getBlogIds(): Promise<number[]> {
  try {
    const res = await fetch('https://cryptotop.chat/api/blog?limit=200&offset=0', { next: { revalidate: 3600 } });
    const data = await res.json();
    return (data.articles || []).map((a: { id: number }) => a.id);
  } catch { return []; }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://cryptotop.chat';
  const pages = ['', '/faq', '/markets', '/assistant', '/about', '/learn', '/coins', '/bonuses', '/blog', '/simulator'];
  const locales = ['', '/en', '/pl', '/de'];
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      urls.push({
        url: `${base}${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page === '/bonuses' ? 0.9 : page === '/simulator' ? 0.85 : locale === '' ? 0.8 : 0.7,
      });
    }
  }

  const blogIds = await getBlogIds();
  for (const id of blogIds) {
    urls.push({
      url: `${base}/blog/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return urls;
}
