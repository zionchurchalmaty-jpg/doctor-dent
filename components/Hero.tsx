"use client";

import { useTranslations, useLocale } from "next-intl";
import { 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  MapPin, 
  Languages, 
  Calendar, 
  Phone 
} from "lucide-react";
import Image from "next/image";
import { DoctorProfile } from "@/lib/firestore/types";
import SearchWidget from "./SearchWidget";
import { Button } from "@/components/ui/button";

interface HeroProps {
  variant?: "home" | "blog" | "doctor";
  topDoctor?: DoctorProfile | null;
  doctor?: DoctorProfile;
  title?: string;
  subtitle?: string;
  tags?: string[];
}

export default function Hero({
  variant = "home",
  topDoctor,
  doctor,
  title,
  subtitle,
  tags = [],
}: HeroProps) {
  const tHome = useTranslations("HomePage.Hero");
  const tDoc = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";

  const getLocalizedText = (textField: any) => {
    if (!textField) return null;
    if (typeof textField === "string") return textField;
    return textField[locale] || textField["ru"] || null;
  };

  if (variant === "doctor" && doctor) {
    const fullAddress = getLocalizedText(doctor.location?.address);
    const shortLocation = fullAddress ? fullAddress.split(",")[0] : null;
    const highlightText = getLocalizedText(doctor.shortDescription) || getLocalizedText(doctor.reasons?.[0]);

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
                <p className="font-medium text-sm md:text-base">{highlightText}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-4">
              <Button className="bg-white text-[#2563EB] hover:bg-gray-100 rounded-xl px-5 h-11 text-sm font-semibold">
                <Calendar className="w-4 h-4 mr-2" />
                {tDoc("bookButton")}
              </Button>
              
              <Button className="bg-[#10B981] text-white hover:bg-[#059669] rounded-xl px-5 h-11 text-sm font-semibold">
                <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.622.844 5.05 2.274 7.042L.38 24l5.06-1.884A11.964 11.964 0 0012.031 24c6.648 0 12.031-5.383 12.031-12.031C24.062 5.383 18.679 0 12.031 0zm0 22.015a9.927 9.927 0 01-5.1-1.4l-.365-.216-3.791 1.41.996-3.696-.237-.377A9.914 9.914 0 012.046 12.03c0-5.508 4.48-9.988 9.985-9.988s9.985 4.48 9.985 9.988-4.48 9.987-9.985 9.987z"/></svg>
                WhatsApp
              </Button>

              <Button className="bg-[#4B84F1] hover:bg-[#3A74F0] text-white rounded-xl px-5 h-11 text-sm font-semibold">
                <Phone className="w-4 h-4 mr-2" />
                {tDoc("callButton")}
              </Button>
            </div>
          </div>

        </div>
      </section>
    );
  }

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
              {title || tHome("title")}
            </h1>
            <p className="text-blue-100 text-lg lg:text-xl max-w-md">
              {subtitle || tHome("subtitle")}
            </p>
          </div>

          <SearchWidget />

          <button className="flex items-center text-sm font-medium hover:text-blue-200 w-fit transition-colors">
            {tHome("placePage")} <ArrowRight className="w-4 h-4 ml-1" />
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
