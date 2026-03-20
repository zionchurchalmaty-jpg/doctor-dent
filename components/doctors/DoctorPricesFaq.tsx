"use client";

import { useTranslations, useLocale } from "next-intl";
import { DoctorProfile } from "@/lib/firestore/types";
import { ChevronDown } from "lucide-react";

export function DoctorPricesFaq({ doctor }: { doctor: DoctorProfile }) {
  const t = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";

  const getLocalizedText = (textField: any) => {
    if (!textField) return "";
    return textField[locale] || textField["ru"] || "";
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6 space-y-20">
        
        {doctor.prices && doctor.prices.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">{t("pricesTitle")}</h2>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center bg-gray-50/50 px-6 py-4 border-b border-gray-100 text-sm font-medium text-gray-500">
                <span>Услуга</span>
                <span>Стоимость</span>
              </div>
              <div className="divide-y divide-gray-100">
                {doctor.prices.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <span className="text-sm text-gray-700">{getLocalizedText(item.serviceName)}</span>
                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap ml-4">
                      {item.price} ₸
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {doctor.faq && doctor.faq.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">{t("faqTitle")}</h2>
            <div className="space-y-4">
              {doctor.faq.map((faqItem, idx) => (
                <details 
                  key={idx} 
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-medium text-gray-900 transition-colors hover:text-[#2563EB]">
                    <span className="text-sm md:text-base pr-4">{getLocalizedText(faqItem.question)}</span>
                    <span className="transition duration-300 group-open:-rotate-180 shrink-0 text-gray-400">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                    {getLocalizedText(faqItem.answer)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}