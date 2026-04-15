"use client";

import { useTranslations, useLocale } from "next-intl";
import { DoctorProfile } from "@/lib/firestore/types";
import { CheckCircle2, PlayCircle } from "lucide-react";

const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return null;
  try {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    const videoId = match ? match[1] : null;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (e) {
    console.error("Ошибка парсинга видео", e);
  }
  return null;
};

export function DoctorInfo({ doctor }: { doctor: DoctorProfile }) {
  const t = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";

  const getLocalizedText = (textField: any) => {
    if (!textField) return "";
    return textField[locale] || textField["ru"] || "";
  };

  const embedUrl = getYouTubeEmbedUrl(doctor.videoUrl);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      
      {doctor.reasons && doctor.reasons.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">{t("reasonsTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctor.reasons.map((reason, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                <span className="text-sm font-medium text-gray-700">{getLocalizedText(reason)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {doctor.videoUrl && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <PlayCircle className="w-7 h-7 text-[#2563EB]" />
            {t("videoTitle")}
          </h2>
          
          {embedUrl ? (
            <div className="bg-white rounded-3xl p-2 md:p-4 shadow-sm border border-gray-100">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
                <iframe
                  src={embedUrl}
                  title="Видео визитка врача"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
              </div>
            </div>
          ) : (
            <a
              href={doctor.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <PlayCircle className="w-5 h-5" />
              Смотреть видео
            </a>
          )}
        </div>
      )}

      {doctor.services && doctor.services.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-[#2563EB]">🩺</span> {t("servicesTitle")}
          </h2>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            {doctor.services.map((service, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                <span className="text-sm text-gray-700">{getLocalizedText(service)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}