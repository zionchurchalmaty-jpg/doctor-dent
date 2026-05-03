import { Award, CheckCircle2, CheckSquare, Contact, ShieldCheck, Target, TrendingUp, Users } from "lucide-react";

export function Advantages() {
  const patientAdvantages = [
    { icon: <Award className="w-6 h-6 text-[#2563EB]" />, title: "Детальные профили врачей", desc: "Каждый врач размещает кейсы, лицензии и отзывы — вся информация для вашего выбора." },
    { icon: <CheckCircle2 className="w-6 h-6 text-[#2563EB]" />, title: "Прозрачность", desc: "Реальные кейсы, цены и отзывы пациентов. Никакого обмана и скрытых платежей." },
    { icon: <Users className="w-6 h-6 text-[#2563EB]" />, title: "Удобный поиск", desc: "Найдите специалиста по направлению и городу за несколько кликов." },
    { icon: <ShieldCheck className="w-6 h-6 text-[#2563EB]" />, title: "Полная информация", desc: "Опыт работы, образование, сертификаты и примеры работ — всё в одном месте." }
  ];

  const doctorAdvantages = [
    { icon: <Target className="w-6 h-6 text-[#2563EB]" />, title: "Целевая аудитория", desc: "Все посетители сайта — это люди, которые ищут врача. Высокая конверсия в записи." },
    { icon: <TrendingUp className="w-6 h-6 text-[#2563EB]" />, title: "SEO-продвижение и Google Реклама", desc: "Мы занимаемся продвижением сайта и каждой страницы врача в поисковых системах." },
    { icon: <Contact className="w-6 h-6 text-[#2563EB]" />, title: "Персональная страница", desc: "Разместите портфолио, кейсы, цены и получайте заявки напрямую от пациентов." },
    { icon: <CheckSquare className="w-6 h-6 text-[#2563EB]" />, title: "Простая аренда", desc: "Фиксированная стоимость аренды страницы без скрытых комиссий и процентов от записей." }
  ];

  return (
    <section className="bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center md:text-left">Наши преимущества</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Для пациентов</h3>
            {patientAdvantages.map((item, idx) => (
              <div key={idx} className="group bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-100">
                <div className="transition-transform duration-300 group-hover:scale-110 w-fit">{item.icon}</div>
                <h4 className="font-bold text-[16px] text-gray-900">{item.title}</h4>
                <p className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Для врачей</h3>
            {doctorAdvantages.map((item, idx) => (
              <div key={idx} className="group bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-100">
                <div className="transition-transform duration-300 group-hover:scale-110 w-fit">{item.icon}</div>
                <h4 className="font-bold text-[16px] text-gray-900">{item.title}</h4>
                <p className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}