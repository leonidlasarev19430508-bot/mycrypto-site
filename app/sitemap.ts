import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cryptotop.chat';
  const pages = ['', '/news', '/faq', '/markets', '/assistant', '/about'];
  const locales = ['', '/en', '/pl', '/de'];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      urls.push({
        url: `${base}${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  return urls;
}