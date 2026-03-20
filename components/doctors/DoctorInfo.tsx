"use client";

import { useTranslations, useLocale } from "next-intl";
import { DoctorProfile } from "@/lib/firestore/types";
import { CheckCircle2, Play } from "lucide-react";
import Image from "next/image";

export function DoctorInfo({ doctor }: { doctor: DoctorProfile }) {
  const t = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";

  const getLocalizedText = (textField: any) => {
    if (!textField) return "";
    return textField[locale] || textField["ru"] || "";
  };

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
          <h2 className="text-2xl font-bold text-gray-900">{t("videoTitle")}</h2>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg group cursor-pointer bg-gray-900">
             <Image src={doctor.photo || "/images/placeholder.png"} alt="Video Thumbnail" fill className="object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                   <Play className="w-6 h-6 text-white fill-current" />
                </div>
             </div>
          </div>
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