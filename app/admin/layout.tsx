import '@/app/globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Админ-панель',
  robots: 'noindex, nofollow',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru"> 
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-[#F8F9FA]`}>
        {children}
      </body>
    </html>
  );
}