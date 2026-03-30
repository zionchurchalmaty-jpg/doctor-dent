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

export function IncludedFeatures() {
  const features = [
    { 
      icon: <Zap className="w-6 h-6 text-[#2563EB]" />, 
      title: "Персональная SEO-страница 24/7", 
      desc: "Полноценная страница с вашим портфолио, кейсами, ценами и контактами" 
    },
    { 
      icon: <TrendingUp className="w-6 h-6 text-[#2563EB]" />, 
      title: "SEO-продвижение", 
      desc: "Мы продвигаем наш портал в поисковых системах по вашим услугам" 
    },
    { 
      icon: <Check className="w-6 h-6 text-[#2563EB]" />, 
      title: "Размещение кейсов", 
      desc: "Загружайте фото до/после, описания работ и получайте больше доверия" 
    },
    { 
      icon: <Phone className="w-6 h-6 text-[#2563EB]" />, 
      title: "Прямые заявки", 
      desc: "Пациенты связываются с вами напрямую по телефону или WhatsApp" 
    },
    { 
      icon: <Mail className="w-6 h-6 text-[#2563EB]" />, 
      title: "Управление контентом", 
      desc: "Вы можете обновлять информацию, цены и добавлять новые кейсы" 
    },
    { 
      icon: <Video className="w-6 h-6 text-[#2563EB]" />, 
      title: "Видео кейс / Видео обращение", 
      desc: "Вы можете загрузить на вашу страницу ваше видео презентацию" 
    }
  ];

  return (
    <section className="bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Что включено в аренду страницы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-100 cursor-default"
            >
              <div className="mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600 w-fit">
                {item.icon}
              </div>
              <h3 className="font-bold text-[17px] mb-3 text-gray-900">{item.title}</h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}