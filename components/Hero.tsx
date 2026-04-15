"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Target,
  TrendingUp,
  Users,
  Mail,
  Check,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { DoctorProfile } from "@/lib/firestore/types";
import SearchWidget from "./SearchWidget";
import { Button } from "@/components/ui/button";
import { CITIES } from "@/lib/cities";

interface HeroProps {
  variant?: "home" | "blog" | "doctor" | "cases" | "rent" | "about";
  topDoctor?: DoctorProfile | null;
  doctor?: DoctorProfile;
  title?: string;
  subtitle?: string;
  tags?: string[];
  stats?: {
    cases?: number | string;
    doctors?: number | string;
    cities?: number | string;
    successRate?: string;
  };
}

export default function Hero({
  variant = "home",
  topDoctor,
  doctor,
  title,
  subtitle,
  tags = [],
  stats = { cases: 12, doctors: 38, successRate: "98%" },
}: HeroProps) {
  if (variant === "rent") {
    return (
      <section className="bg-[#1d4ed8] px-6 py-12 md:py-20 lg:py-24 font-sans relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-white relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight max-w-xl">
              {title || "Арендуйте персональную страницу на DentDoctor.kz"}
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-lg opacity-90">
              {subtitle ||
                "Получайте пациентов напрямую через SEO-продвижение вашей страницы"}
            </p>

            <ul className="space-y-5 mt-4">
              <li className="flex items-center gap-4">
                <div className="bg-[#10B981] rounded-full p-2 shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-base md:text-lg font-medium">
                  Прямые заявки от пациентов
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-[#10B981] rounded-full p-2 shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-base md:text-lg font-medium">
                  SEO-продвижение вашей страницы
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-[#10B981] rounded-full p-2 shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-base md:text-lg font-medium">
                  Только целевая аудитория
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href="tel:+77052793078"
                className="bg-white text-[#1d4ed8] hover:bg-gray-100 rounded-xl px-8 h-12 text-base font-bold shadow-lg inline-flex items-center justify-center cursor-pointer"
              >
                Позвонить нам
              </a>
              <Button className="bg-[#3b82f6] text-white hover:bg-[#2563eb] rounded-xl px-8 h-12 text-base font-bold shadow-lg border border-blue-400/30">
                Написать email
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end w-full relative z-10">
            <div className="w-full max-w-[500px] bg-white rounded-[32px] overflow-hidden shadow-2xl">
              <div className="relative w-full h-[240px] md:h-[280px]">
                <Image
                  src="/images/for-doctors_hero.png"
                  alt="Стоматолог за работой"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:p-10 bg-white">
                <h3 className="text-gray-900 font-bold text-xl mb-6">
                  Преимущества платформы
                </h3>

                <ul className="space-y-3">
                  {[
                    "Быстрая окупаемость инвестиций",
                    "Гибкие тарифы под ваш бюджет",
                    "Полная техническая поддержка",
                    "Портал на русском и казахском языках",
                    "Продвижение на двух языках — больше аудитории",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-sm md:text-[15px] text-gray-700 font-medium leading-tight">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "about") {
    return (
      <section className="bg-[#1d4ed8] px-6 py-12 md:py-20 lg:py-24 font-sans relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-white relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight max-w-xl">
              {title || "О проекте DentDoctor.kz"}
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-lg opacity-90 leading-relaxed">
              {subtitle ||
                "Платформа для поиска стоматологов с полными профилями, кейсами и отзывами"}
            </p>

            <ul className="space-y-5 mt-4">
              <li className="flex items-center gap-4">
                <div className="bg-[#10B981] rounded-full p-2 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-base md:text-lg font-medium">
                  Полные профили с кейсами и лицензиями
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-[#10B981] rounded-full p-2 shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-base md:text-lg font-medium">
                  Удобный поиск по направлениям
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-[#10B981] rounded-full p-2 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-base md:text-lg font-medium">
                  Реальные отзывы пациентов
                </span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end w-full relative z-10">
            <div className="w-full max-w-[500px] bg-white rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-blue-900/40 hover:-translate-y-1">
              <div className="relative w-full h-[220px] md:h-[260px]">
                <Image
                  src="/images/about_hero.png"
                  alt="Команда DentDoctor"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:p-10 bg-white">
                <h3 className="text-gray-900 font-bold text-xl mb-8">
                  DentDoctor в цифрах
                </h3>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-[#2563EB]">
                      {stats?.doctors || 0}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium">
                      Врачей
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-x border-gray-100">
                    <span className="text-3xl md:text-4xl font-bold text-[#2563EB]">
                      {stats?.cities || 0}+
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium">
                      Городов
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-[#2563EB]">
                      100%
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium">
                      Качество
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "cases") {
    const caseFeatures = [
      "Реальные фото до и после",
      "Подробное описание проблемы и решения",
      "Прозрачные цены и сроки лечения",
    ];

    return (
      <section className="bg-[#1d4ed8] px-6 py-12 md:py-20 lg:py-24 font-sans relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-white relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {title || "Кейсы врачей"}
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-lg leading-relaxed opacity-90">
              {subtitle ||
                "Реальные результаты лечения наших специалистов. Фото до и после, описание процедур и стоимость."}
            </p>

            <ul className="space-y-4 mt-4">
              {caseFeatures.map((text, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="bg-[#10B981] rounded-full p-1 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base md:text-lg font-medium text-white/95">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end w-full relative z-10">
            <div className="w-full max-w-[520px] bg-white rounded-[32px] overflow-hidden shadow-2xl">
              <div className="relative w-full h-[240px] md:h-[300px]">
                <Image
                  src="/images/cases_hero.png"
                  alt="Стоматологический кабинет"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:p-10">
                <h3 className="text-gray-900 font-bold text-xl mb-8">
                  База кейсов
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-extrabold text-[#2563EB]">
                      {stats.cases}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wider">
                      Кейсов
                    </span>
                  </div>

                  <div className="flex flex-col border-x border-gray-100 px-4">
                    <span className="text-2xl md:text-3xl font-extrabold text-[#2563EB]">
                      {stats.doctors}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wider">
                      Врачей
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-2xl md:text-3xl font-extrabold text-[#2563EB]">
                      {stats.successRate}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wider">
                      Успеха
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "blog") {
    const blogFeatures = [
      "Экспертные советы от врачей",
      "Гиды по процедурам и лечению",
      "Актуальные новости стоматологии",
    ];

    return (
      <section className="bg-[#1d4ed8] px-8 py-16 lg:py-24 font-sans relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 text-white relative z-10">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1]">
                {title || "Блог"}
              </h1>
              <p className="text-blue-100 text-lg max-w-md">
                {subtitle ||
                  "Полезные статьи о стоматологии, здоровье зубов и современных методах лечения"}
              </p>
            </div>

            <ul className="space-y-4">
              {blogFeatures.map((text, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px] font-medium text-white">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end w-full mt-8 lg:mt-0 relative z-10">
            <div className="w-full max-w-[480px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              <div className="relative w-full h-[240px]">
                <Image
                  src="/images/blog_hero.png"
                  alt="Blog Hero"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wider">
                  Популярные темы
                </h3>

                <div className="flex flex-wrap gap-2">
                  {tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className="uppercase inline-flex items-center justify-center px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold tracking-wide border border-blue-100/50 whitespace-nowrap"
                      >
                        {typeof tag === "string" ? tag : String(tag)}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs italic">
                      Темы появятся позже
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const tHome = useTranslations("HomePage.Hero");
  const tDoc = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";

  const getLocalizedText = (textField: any) => {
    if (!textField) return null;
    if (typeof textField === "string") return textField;
    return textField[locale] || textField["ru"] || null;
  };

  if (variant === "doctor" && doctor) {
    const rawAddress = getLocalizedText(doctor.location?.address);
    const shortAddress = rawAddress ? rawAddress.split(",")[0] : null;

    const cityId = doctor.location?.cityId;
    const cityObj = CITIES.find((c) => c.id === cityId);
    const cityName = cityObj ? cityObj.name[locale] : cityId || "";

    const shortLocation =
      cityName && shortAddress
        ? `${cityName}, ${shortAddress}`
        : cityName || shortAddress || null;

    const highlightText =
      getLocalizedText(doctor.shortDescription) ||
      getLocalizedText(doctor.reasons?.[0]);

    let cleanPhone = doctor.location?.phone
      ? doctor.location.phone.replace(/\D/g, "")
      : "";

    if (cleanPhone.startsWith("8") && cleanPhone.length === 11) {
      cleanPhone = "7" + cleanPhone.slice(1);
    }

    const whatsappUrl = `https://wa.me/${cleanPhone}`;
    const phoneUrl = doctor.location?.phone ? `tel:+${cleanPhone}` : "#";

    return (
      <section className="bg-[#2563EB] px-6 py-10 md:py-16 font-sans relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          <div className="relative w-64 h-64 md:w-[320px] md:h-[320px] shrink-0 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={doctor.photo || "/images/placeholder.png"}
              alt={getLocalizedText(doctor.name) || "Врач"}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 text-white w-full pt-2">
            {doctor.specialty && (
              <div className="bg-[#4B84F1] px-3 py-1 rounded-full text-[13px] font-medium w-fit">
                {getLocalizedText(doctor.specialty)}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight">
              {getLocalizedText(doctor.name)}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm md:text-base opacity-95 mt-1">
              {doctor.experienceYears ? (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {tDoc("experience", { years: doctor.experienceYears })}
                </span>
              ) : null}

              {shortLocation && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {shortLocation}
                </span>
              )}
            </div>
            {highlightText && (
              <div className="bg-[#3A74F0] rounded-xl p-4 md:p-5 mt-2 max-w-xl">
                <p className="font-medium text-sm md:text-base">
                  {highlightText}
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#22c05c] text-white hover:bg-[#059669] rounded-xl px-5 h-11 text-sm font-semibold w-full sm:w-auto inline-flex items-center justify-center cursor-pointer"
              >
                <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.622.844 5.05 2.274 7.042L.38 24l5.06-1.884A11.964 11.964 0 0012.031 24c6.648 0 12.031-5.383 12.031-12.031C24.062 5.383 18.679 0 12.031 0zm0 22.015a9.927 9.927 0 01-5.1-1.4l-.365-.216-3.791 1.41.996-3.696-.237-.377A9.914 9.914 0 012.046 12.03c0-5.508 4.48-9.988 9.985-9.988s9.985 4.48 9.985 9.988-4.48 9.987-9.985 9.987z" />
                </svg>
                WhatsApp
              </a>

              <a
                href={phoneUrl}
                className="bg-[#4B84F1] hover:bg-[#3A74F0] text-white rounded-xl px-5 h-11 text-sm font-semibold w-full sm:w-auto inline-flex items-center justify-center cursor-pointer"
              >
                <Phone className="w-4 h-4 mr-2" />
                {tDoc("callButton")}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const heroImage = topDoctor?.photo || "/images/placeholder.png";

  return (
    <section className="bg-[#1d4ed8] px-8 py-16 lg:py-24 font-sans relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8 text-white relative z-10">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] whitespace-pre-line">
              {title || tHome("title")}
            </h1>
            <p className="text-blue-100 text-lg lg:text-xl max-w-md">
              {subtitle || tHome("subtitle")}
            </p>
          </div>

          <SearchWidget />
        </div>

        <div className="flex justify-center lg:justify-end w-full mt-8 lg:mt-0 relative z-10">
          <div className="w-full max-w-[420px] bg-white rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-2xl flex flex-col">
            <div className="relative w-full h-[320px] lg:h-[400px]">
              <Image
                src={heroImage}
                alt={
                  topDoctor
                    ? `Top Doctor: ${getLocalizedText(topDoctor.name)}`
                    : "Healthcare"
                }
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-white text-gray-900 p-6 lg:p-8 flex-1">
              <h3 className="font-bold text-[18px] lg:text-[20px] mb-5">
                {tHome("whyTitle")}
              </h3>
              <ul className="space-y-4">
                {[1, 2, 3].map((num) => (
                  <li key={num} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-gray-600 leading-snug">
                      {tHome(`reason${num}` as any)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
