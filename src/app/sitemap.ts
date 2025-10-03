import { MetadataRoute } from 'next';

const URL = 'https://www.sitesafety.services';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about',
    '/acceptable-use-policy',
    '/contact',
    '/e-safety-file',
    '/experience',
    '/login',
    '/pay',
    '/popia',
    '/print-ready-safety-files',
    '/privacy',
    '/rent-a-safety-officer',
    '/safety-management-system',
    '/safety-management-system/signup',
    '/services',
    '/signup',
    '/terms',
    '/website-cookie-policy',
  ];

  return routes.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
