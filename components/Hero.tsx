"use client";

import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import { DoctorProfile } from "@/lib/firestore/types";
import SearchWidget from "./SearchWidget";

interface HeroProps {
  variant?: "home" | "blog";
  topDoctor?: DoctorProfile | null;
  title?: string;
  subtitle?: string;
  tags?: string[];
}

export default function Hero({
  variant = "home",
  topDoctor,
  title,
  subtitle,
  tags = [],
}: HeroProps) {
  const t = useTranslations("HomePage.Hero");
  const locale = useLocale();

  const getLocalizedText = (textField: any) => {
    if (!textField) return "";
    if (typeof textField === "string") return textField;
    return textField[locale] || textField["ru"] || "";
  };

  if (variant === "blog") {
    const blogFeatures = [
      locale === "ru"
        ? "Экспертные советы от врачей"
        : "Дәрігерлердің сарапшылық кеңестері",
      locale === "ru"
        ? "Гиды по процедурам и лечению"
        : "Емдеу және процедуралар бойынша нұсқаулықтар",
      locale === "ru"
        ? "Актуальные новости стоматологии"
        : "Стоматологияның өзекті жаңалықтары",
    ];

    return (
      <section className="bg-[#1d4ed8] px-8 py-16 lg:py-24 font-sans relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 text-white relative z-10">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1]">
                {title || (locale === "ru" ? "Блог" : "Блог")}
              </h1>
              <p className="text-blue-100 text-lg max-w-md">
                {subtitle ||
                  (locale === "ru"
                    ? "Полезные статьи о стоматологии, здоровье зубов и современных методах лечения"
                    : "Стоматология, тіс саулығы және заманауи емдеу әдістері туралы пайдалы мақалалар")}
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
                  src="https://img.freepik.com/free-photo/woman-working-on-laptop-at-home_23-2148969851.jpg"
                  alt="Blog Hero"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wider">
                  {locale === "ru" ? "Популярные темы" : "Танымал тақырыптар"}
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
                      {locale === "ru"
                        ? "Темы появятся позже"
                        : "Тақырыптар жақында пайда болады"}
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

  const heroImage = topDoctor?.photo || "/images/placeholder.png";

  return (
    <section className="bg-[#1d4ed8] px-8 py-16 lg:py-24 font-sans relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8 text-white relative z-10">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] whitespace-pre-line">
              {title || t("title")}
            </h1>
            <p className="text-blue-100 text-lg lg:text-xl max-w-md">
              {subtitle || t("subtitle")}
            </p>
          </div>

          <SearchWidget />

          <button className="flex items-center text-sm font-medium hover:text-blue-200 w-fit transition-colors">
            {t("placePage")} <ArrowRight className="w-4 h-4 ml-1" />
          </button>
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
                {t("whyTitle")}
              </h3>
              <ul className="space-y-4">
                {[1, 2, 3].map((num) => (
                  <li key={num} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-gray-600 leading-snug">
                      {t(`reason${num}` as any)}
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
