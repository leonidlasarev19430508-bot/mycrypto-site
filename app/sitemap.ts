import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cryptotop.chat';
  const pages = ['', '/news', '/faq', '/markets', '/assistant', '/about', '/learn', '/coins', '/bonuses'];
  const locales = ['', '/en', '/pl', '/de'];
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      urls.push({
        url: `${base}${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : page === '/news' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : page === '/bonuses' ? 0.9 : 0.8,
      });
    }
  }

  return urls;
}
