import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();

  return (
    <footer className="bg-[#334155] text-white pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white font-bold rounded-lg">
              D
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-none">DentDoctor</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                {t('logoSubtitle')}
              </span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            {t('description')}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-white">{t('navTitle')}</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><Link href={`/${locale}`} className="hover:text-white transition">{t('home')}</Link></li>
            <li><Link href={`/${locale}/cases`} className="hover:text-white transition">{t('cases')}</Link></li>
            <li><Link href={`/${locale}/blog`} className="hover:text-white transition">{t('blog')}</Link></li>
            <li><Link href={`/${locale}/about`} className="hover:text-white transition">{t('about')}</Link></li>
            <li><Link href={`/${locale}/guide`} className="hover:text-white transition">{t('howToChoose')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-white">{t('doctorsTitle')}</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><Link href={`/${locale}/for-doctors`} className="hover:text-white transition">{t('rentPage')}</Link></li>
            <li><Link href={`/${locale}/terms`} className="hover:text-white transition">{t('terms')}</Link></li>
            <li><Link href={`/${locale}/policy`} className="hover:text-white transition">{t('policy')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-white">{t('contactsTitle')}</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <span>+7 (705) 279-30-78</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <a href="mailto:andrey.chen73@gmail.com" className="hover:text-white transition">andrey.chen73@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span>{t('location')}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="border-t border-slate-600 pt-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 DentDoctor.kz — {t('allRightsReserved')}
          </p>
          <p className="text-slate-500 text-xs max-w-xl text-left md:text-right">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}