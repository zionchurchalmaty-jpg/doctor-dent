"use client";

import { useTranslations, useLocale } from "next-intl";
import { DoctorProfile } from "@/lib/firestore/types";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DoctorShowcase({ doctor }: { doctor: DoctorProfile }) {
  const t = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";

  const getLocalizedText = (textField: any) => {
    if (!textField) return "";
    return textField[locale] || textField["ru"] || "";
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        
        {doctor.cases && doctor.cases.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{t("casesTitle")}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctor.cases.map((c, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex w-full h-48 relative">
                    <div className="w-1/2 relative border-r border-white/20">
                      <Image src={c.beforeImage || "/images/placeholder.png"} alt="Before" fill className="object-cover" />
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">До</span>
                    </div>
                    <div className="w-1/2 relative">
                      <Image src={c.afterImage || "/images/placeholder.png"} alt="After" fill className="object-cover" />
                      <span className="absolute top-2 right-2 bg-[#10B981] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">После</span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-sm text-gray-900 mb-2">{getLocalizedText(c.title)}</h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-3 flex-1">{getLocalizedText(c.description)}</p>
                    
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
                      <div className="text-xs text-gray-500">
                        {t("duration")}: {getLocalizedText(c.duration)}
                      </div>
                      <div className="text-sm font-bold text-[#2563EB]">
                        {c.price} ₸
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link
                href={`/${locale}/cases?doctor=${doctor.id}`}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl text-[#2563EB] bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Посмотреть все кейсы врача
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

          </div>
        )}

        {doctor.reviews && doctor.reviews.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">{t("reviewsTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctor.reviews.map((review, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic flex-1 mb-6">"{getLocalizedText(review.text)}"</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                    <span className="font-bold text-gray-900">{getLocalizedText(review.authorName)}</span>
                    <span>{review.date || "Недавно"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}