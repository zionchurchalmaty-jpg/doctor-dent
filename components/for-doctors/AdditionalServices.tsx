"use client";

import {
  Zap,
  TrendingUp,
  Check,
  Phone,
  Mail,
  Video,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const whatsappLink = "https://wa.me/77052793078";

export function AdditionalServices() {
  const services = [
    {
      title: "Показ на главной",
      price: "20 000 ₸",
      unit: "/мес",
      desc: "Ваша карточка врача в топе на главной странице",
    },
    {
      title: "Онлайн-запись",
      price: "10 000 ₸",
      unit: "/мес",
      desc: "Интеграция календаря и формы записи на прием",
    },
    {
      title: "Контекстная реклама Google",
      price: "75 000 ₸",
      unit: "/мес",
      desc: "Поисковая реклама. Баннерная реклама. Продвижение в Ютуб. Бюджет от 10 долларов в день",
    },
    {
      title: "Написание статей в блог",
      price: "5 000 ₸",
      unit: "/статью",
      desc: "Написание индивидуальных статей в блог с активными ссылками на страницу врача + индексация их в Google",
    },
    {
      title: "Блок акций и спецпредложений",
      price: "20 000 ₸",
      unit: "/мес",
      desc: "Специальный блок для промо-акций на странице ( есть скидки)",
    },
    {
      title: "Банерная реклама",
      price: "35 000 ₸",
      unit: "/мес",
      desc: "Реклама на популярных площадка РК. От 400 до 900 посещений в месяц. Посещаемость можно увеличивать по желанию.",
    },
  ];

  return (
    <section className="bg-[#F8FAFC] pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Дополнительные услуги
        </h2>
        <p className="text-center text-gray-500 mb-10 text-[15px]">
          Усильте эффективность вашей страницы с помощью дополнительных опций
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-100"
            >
              <div>
                <h3 className="font-bold text-[16px] text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#2563EB]">
                  {item.title}
                </h3>
                <div className="text-[#2563EB] font-bold text-xl mb-4">
                  {item.price}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    {item.unit}
                  </span>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>
              <Link href={whatsappLink}>
                <Button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl h-10 text-sm font-medium transition-all duration-200 active:scale-95 hover:shadow-md">
                  Подключить
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-[#1D4ED8] rounded-2xl p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20">
          <h2 className="text-2xl font-bold text-white mb-3">
            Индивидуальный пакет
          </h2>
          <p className="text-blue-100 max-w-2xl mb-8 text-[15px]">
            Нужны особые условия? Мы можем создать индивидуальный пакет услуг
            под ваши задачи и бюджет
          </p>
          <Link href={whatsappLink}>
          <Button className="bg-white text-[#1D4ED8] hover:bg-gray-50 rounded-xl px-8 h-12 text-sm font-medium transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95">
            Обсудить условия
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
