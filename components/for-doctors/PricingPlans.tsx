"use client";

import { 
  Zap, 
  TrendingUp, 
  Check, 
  Phone, 
  Mail, 
  Video,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingPlans() {
  return (
    <section className="bg-[#F8FAFC] pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Тарифы на аренду</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-8">
          
          <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-gray-200 mt-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:bg-white hover:border-blue-100 flex flex-col h-full">
            <h3 className="font-bold text-xl mb-4 text-gray-900">Базовый</h3>
            <div className="text-3xl font-bold mb-8 text-gray-900">25 000 ₸<span className="text-sm text-gray-500 font-normal">/мес</span></div>
            <ul className="space-y-4 mb-8 text-[14px] text-gray-700 flex-grow">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>Персональная страница 24/7</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>Общее SEO-продвижение</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>До 5 фото кейсов</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>Видео обращение</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>Все формы захвата</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>Цены на услуги</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>Контакты и адрес</span></li>
            </ul>
            <Button className="w-full bg-[#0F172A] hover:bg-gray-800 text-white rounded-xl h-12 text-sm font-medium transition-all duration-200 active:scale-95 mt-auto">Выбрать тариф</Button>
          </div>

          <div className="bg-[#2563EB] text-white p-8 rounded-3xl shadow-xl relative z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-600/30 flex flex-col h-full">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFC107] text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">Популярный</div>
            <h3 className="font-bold text-xl mb-4 text-white">Стандарт</h3>
            <div className="text-4xl font-bold mb-8 text-white">35 000 ₸<span className="text-base font-normal opacity-80">/мес</span></div>
            <ul className="space-y-4 mb-8 text-[14px] text-white/90 flex-grow">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-white shrink-0" /> <span>Все из Базового</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-white shrink-0" /> <span>SEO-оптимизация</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-white shrink-0" /> <span>До 10 фото кейсов</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-white shrink-0" /> <span>Вручную прописанные отзывы (для ИИ)</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-white shrink-0" /> <span>FAQ секция (для ИИ)</span></li>
            </ul>
            <Button className="w-full bg-white hover:bg-gray-50 text-[#2563EB] rounded-xl h-12 text-sm font-medium transition-all duration-200 active:scale-95 shadow-md mt-auto">Выбрать тариф</Button>
          </div>

          <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-gray-200 mt-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:bg-white hover:border-blue-100 flex flex-col h-full">
            <h3 className="font-bold text-xl mb-4 text-gray-900">Премиум</h3>
            <div className="text-3xl font-bold mb-8 text-gray-900">80 000 ₸<span className="text-sm text-gray-500 font-normal">/мес</span></div>
            <ul className="space-y-4 mb-8 text-[14px] text-gray-700 flex-grow">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>Все из Стандарт</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>Аналитика посещений</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>SEO Статьи с сылкой на вашу страницу (5 в месяц)</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#10B981] shrink-0" /> <span>Специально оформленные кейсы (для ИИ) (3 в месяц)</span></li>
            </ul>
            <Button className="w-full bg-[#0F172A] hover:bg-gray-800 text-white rounded-xl h-12 text-sm font-medium transition-all duration-200 active:scale-95 mt-auto">Выбрать тариф</Button>
          </div>

        </div>
      </div>
    </section>
  );
}