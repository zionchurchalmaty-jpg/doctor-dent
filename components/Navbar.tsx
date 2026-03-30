import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm font-sans">
      <div className="flex items-center gap-3">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white font-bold rounded-lg">
            D
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold leading-none">DentDoctor</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">
              {t('logoSubtitle')}
            </span>
          </div>
        </Link>
      </div>

      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
        <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">{t('home')}</Link>
        <Link href={`/cases`} className="hover:text-blue-600 transition-colors">{t('cases')}</Link>
        <Link href={`/blog`} className="hover:text-blue-600 transition-colors">{t('blog')}</Link>
        <Link href={`/${locale}/about`} className="hover:text-blue-600 transition-colors">{t('about')}</Link>
      </nav>

      <div className="flex items-center gap-6">
        
        <LanguageSwitcher />

<Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5">
  <Link href={`/${locale}/for-doctors`}>
    {t('forDoctors')}
  </Link>
</Button>

        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-blue-600" />
          <div className="flex flex-col">
            <span className="font-bold text-sm">+7 (700) 123-45-67</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              {t('phoneSub')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}