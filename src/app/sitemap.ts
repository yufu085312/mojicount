import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mojicount.yu-fu.site';
  
  const pages = [
    '',
    '/contact',
    '/disclaimer',
    '/privacy',
    '/terms',
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '' ? 1 : 0.8,
  }));
}
