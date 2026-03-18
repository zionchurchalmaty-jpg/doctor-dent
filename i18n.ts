import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['ru', 'kz'];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale) locale = 'ru';

  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});