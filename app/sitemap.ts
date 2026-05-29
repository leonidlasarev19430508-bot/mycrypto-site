import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cryptotop.chat';
  const pages = ['', '/news', '/faq', '/markets', '/assistant', '/about', '/learn', '/coins', '/bonuses', '/blog'];
  const locales = ['', '/en', '/pl', '/de'];
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      urls.push({
        url: `${base}${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: (page === '' || page === '/news') ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page === '/bonuses' ? 0.9 : locale === '' ? 0.8 : 0.7,
      });
    }
  }

  return urls;
}