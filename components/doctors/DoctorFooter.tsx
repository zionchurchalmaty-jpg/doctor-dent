"use client";

import { useTranslations, useLocale } from "next-intl";
import { DoctorProfile } from "@/lib/firestore/types";
import { Button } from "@/components/ui/button";

export function DoctorFooter({ doctor }: { doctor: DoctorProfile }) {
  const t = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";

  const getLocalizedText = (textField: any) => {
    if (!textField) return "";
    return textField[locale] || textField["ru"] || "";
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">{t("locationTitle")}</h2>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-8">
           <div className="flex-1 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#2563EB] mb-1 flex items-center gap-2">📍 {t("address")}</h4>
                <p className="text-sm text-gray-700">{getLocalizedText(doctor.location.address)}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2563EB] mb-1 flex items-center gap-2">🕒 {t("schedule")}</h4>
                <p className="text-sm text-gray-700">{getLocalizedText(doctor.location.schedule)}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2563EB] mb-1 flex items-center gap-2">📞 {t("contacts")}</h4>
                <p className="text-sm text-gray-700">{doctor.location.phone}</p>
              </div>
           </div>
           
           <div className="flex-1 bg-gray-100 rounded-2xl min-h-[200px] flex items-center justify-center">
           </div>
        </div>
      </div>

      <div className="bg-[#2563EB] rounded-[2rem] p-12 text-center text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">{t("ctaTitle")}</h2>
          <p className="text-blue-100">{t("ctaSubtitle")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button className="bg-white text-[#2563EB] hover:bg-gray-100 px-8 py-6 text-base rounded-xl">
              {t("bookButton")}
            </Button>
            <Button className="bg-[#10B981] text-white hover:bg-[#059669] px-8 py-6 text-base rounded-xl">
              Написать в WhatsApp
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}