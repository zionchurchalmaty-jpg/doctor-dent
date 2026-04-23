import { MetadataRoute } from 'next';
import { getPublishedContent } from '@/lib/firestore/client-content';

const baseUrl = 'https://dentdoctor.kz';
const locales = ['ru', 'kz']; 

export const revalidate = 3600; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const doctors = await getPublishedContent("doctors").catch(() => []) || [];
  const articles = await getPublishedContent("blog").catch(() => []) || [];

  const generateMultiLangUrls = (path: string, lastModified: Date, priority: number, changeFrequency: 'daily' | 'weekly' | 'monthly') => {
    return locales.map(locale => ({
      url: `${baseUrl}/${locale}${path}`, 
      lastModified,
      changeFrequency,
      priority,
    }));
  };

  const generateRuOnlyUrls = (path: string, lastModified: Date, priority: number, changeFrequency: 'daily' | 'weekly' | 'monthly') => {
    return [{
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }];
  };

  const multiLangStaticPaths = [
    { path: '', priority: 1, freq: 'daily' as const },
    { path: '/search', priority: 0.9, freq: 'weekly' as const },
    { path: '/doctors', priority: 0.9, freq: 'weekly' as const }, 
    { path: '/about', priority: 0.8, freq: 'monthly' as const }, 
    { path: '/cases', priority: 0.8, freq: 'weekly' as const }, 
  ];

  const ruOnlyStaticPaths = [
    { path: '/blog', priority: 0.8, freq: 'daily' as const },
  ];

  const staticMultiUrls = multiLangStaticPaths.flatMap(route => 
    generateMultiLangUrls(route.path, new Date(), route.priority, route.freq)
  );

  const staticRuUrls = ruOnlyStaticPaths.flatMap(route => 
    generateRuOnlyUrls(route.path, new Date(), route.priority, route.freq)
  );

  const doctorUrls = doctors.flatMap((doctor: any) => {
    const date = doctor.updatedAt ? new Date(doctor.updatedAt) : new Date();
    const path = `/doctors/${doctor.slug}`; 
    return generateMultiLangUrls(path, date, 0.8, 'weekly');
  });

  const articleUrls = articles.flatMap((article: any) => {
    const date = article.updatedAt ? new Date(article.updatedAt) : new Date();
    const path = article.isSeo ? `/${article.slug}` : `/blog/${article.slug}`;
    const priority = article.isSeo ? 0.9 : 0.7;
    
    return generateRuOnlyUrls(path, date, priority, 'monthly');
  });

  return [...staticMultiUrls, ...staticRuUrls, ...doctorUrls, ...articleUrls];
}