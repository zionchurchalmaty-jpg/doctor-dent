import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getLocale()) ?? 'ru';
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-gray-50`}>
              <Navbar/>
        
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}