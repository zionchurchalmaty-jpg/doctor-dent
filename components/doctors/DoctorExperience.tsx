"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { DoctorProfile } from "@/lib/firestore/types";
import { GraduationCap, Award, CheckCircle2, X } from "lucide-react";
import Image from "next/image";

export function DoctorExperience({ doctor }: { doctor: DoctorProfile }) {
  const t = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";
  
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const getLocalizedText = (textField: any) => {
    if (!textField) return "";
    return textField[locale] || textField["ru"] || "";
  };

  return (
    <>
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          
          {doctor.education && doctor.education.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <GraduationCap className="w-7 h-7 text-[#2563EB]" />
                {t("educationTitle")}
              </h2>
              <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8">
                <div className="space-y-8">
                  {doctor.education.map((eduBlock, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        {getLocalizedText(eduBlock.title)}
                      </h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {doctor.certificates.map((cert, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      
                      {cert.url && (
                        <div 
                          className="relative h-48 w-full bg-gray-50/50 border border-gray-100 rounded-xl overflow-hidden shadow-sm group cursor-pointer"
                          onClick={() => setSelectedCert(cert.url!)}
                        >
                          <Image 
                            src={cert.url} 
                            alt={cert.name || "Сертификат"} 
                            fill 
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                      )}
                      
                      <div className="flex items-start gap-3 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 font-medium">
                          {cert.name ? cert.name : `Сертификат #${idx + 1}`}
                        </span>
                      </div>

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

      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedCert(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedCert(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative w-full max-w-5xl h-[85vh] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedCert}
              alt="Увеличенный сертификат"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  );
}