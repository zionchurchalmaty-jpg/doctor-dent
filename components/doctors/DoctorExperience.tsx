"use client";

import { useTranslations, useLocale } from "next-intl";
import { DoctorProfile } from "@/lib/firestore/types";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function DoctorExperience({ doctor }: { doctor: DoctorProfile }) {
  const t = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";

  const getLocalizedText = (textField: any) => {
    if (!textField) return "";
    return textField[locale] || textField["ru"] || "";
  };
  const certificatesWithImages = doctor.certificates?.filter(cert => cert.url) || [];

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {doctor.education && doctor.education.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <GraduationCap className="w-7 h-7 text-[#2563EB]" />
              {t("educationTitle")}
            </h2>
            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 flex flex-col lg:flex-row gap-12">
              <div className="flex-1 space-y-8">
                {doctor.education.map((eduBlock, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{getLocalizedText(eduBlock.title)}</h3>
                    <ul className="space-y-3">
                      {eduBlock.items?.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
                          <span>{getLocalizedText(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {certificatesWithImages.length > 0 && (
                <div className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
                  {certificatesWithImages.slice(0, 2).map((cert, idx) => (
                    <div key={idx} className="h-32 bg-gray-50 border border-gray-100 rounded-xl relative overflow-hidden shadow-sm">
                       <Image 
                         src={cert.url!} 
                         alt={cert.name || "Сертификат"} 
                         fill 
                         className="object-cover hover:scale-105 transition-transform duration-500" 
                       />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {doctor.certificates && doctor.certificates.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Award className="w-7 h-7 text-[#2563EB]" />
              {t("certificatesTitle")}
            </h2>
            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctor.certificates.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      {cert.name ? cert.name : `Сертификат #${idx + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {doctor.equipment && doctor.equipment.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">{t("equipmentTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {doctor.equipment.map((eq, idx) => (
                <div key={idx} className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2563EB] shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{getLocalizedText(eq)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}