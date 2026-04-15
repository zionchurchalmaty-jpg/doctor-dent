"use client";

import { useTranslations, useLocale } from "next-intl";
import { DoctorProfile } from "@/lib/firestore/types";
import { Button } from "@/components/ui/button";
import { CITIES } from "@/lib/cities";

export function DoctorFooter({ doctor }: { doctor: DoctorProfile }) {
  const t = useTranslations("DoctorProfile");
  const locale = useLocale() as "ru" | "kz";

  const getLocalizedText = (textField: any) => {
    if (!textField) return "";
    return textField[locale] || textField["ru"] || "";
  };

  const cityId = doctor.location?.cityId;
  const cityObj = CITIES.find((c) => c.id === cityId);

  const cityName = cityObj ? cityObj.name[locale] : cityId || "";

  const rawAddress = getLocalizedText(doctor.location.address);
  const fullAddress =
    cityName && rawAddress ? `${cityName}, ${rawAddress}` : rawAddress;

  let cleanPhone = doctor.location?.phone
    ? doctor.location.phone.replace(/\D/g, "")
    : "";
  if (cleanPhone.startsWith("8") && cleanPhone.length === 11) {
    cleanPhone = "7" + cleanPhone.slice(1);
  }
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  const renderMap = () => {
    const link = doctor.location?.link2gis;

    if (!link) {
      return (
        <div className="flex-1 bg-gray-100 rounded-2xl min-h-[300px] flex items-center justify-center text-gray-400">
          Карта не указана
        </div>
      );
    }

    if (link.includes("<iframe")) {
      return (
        <div
          className="flex-1 w-full min-h-[300px] rounded-2xl overflow-hidden shadow-inner"
          dangerouslySetInnerHTML={{ __html: link }}
        />
      );
    }

    if (link.includes("widgets.2gis.com")) {
      return (
        <iframe
          src={link}
          className="flex-1 w-full min-h-[300px] rounded-2xl border-none shadow-inner"
          loading="lazy"
        />
      );
    }

    return (
      <div className="flex-1 bg-green-50 border border-green-100 rounded-2xl min-h-[300px] flex flex-col items-center justify-center p-6 text-center gap-4">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
          <span className="text-2xl">📍</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">
            {locale === "kz" ? "2GIS-тегі маршрут" : "Маршрут в 2GIS"}
          </h4>
          <p className="text-sm text-gray-600 max-w-[250px]">
            {locale === "kz"
              ? "Дәл мекенжайды ашу және қосымшада маршрут құру үшін басыңыз"
              : "Нажмите, чтобы открыть точный адрес и построить маршрут в приложении"}
          </p>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#A3D935] text-gray-900 hover:bg-[#8CC627] rounded-xl font-bold px-8 shadow-sm">
            {locale === "kz" ? "Картаны ашу" : "Открыть карту"}
          </Button>
        </a>
      </div>
    );
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("locationTitle")}
        </h2>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-[#2563EB] mb-1 flex items-center gap-2">
                📍 {t("address")}
              </h4>
              <p className="text-sm text-gray-700">{fullAddress}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2563EB] mb-1 flex items-center gap-2">
                🕒 {t("schedule")}
              </h4>
              <p className="text-sm text-gray-700">
                {getLocalizedText(doctor.location.schedule)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2563EB] mb-1 flex items-center gap-2">
                📞 {t("contacts")}
              </h4>
              <a
                href={`tel:+${cleanPhone}`}
                className="text-sm text-gray-700 hover:text-[#2563EB] transition-colors"
              >
                {doctor.location.phone}
              </a>
            </div>
          </div>

          <div className="flex-1 flex min-h-[300px]">{renderMap()}</div>
        </div>
      </div>

      <div className="bg-[#2563EB] rounded-[2rem] p-12 text-center text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">{t("ctaTitle")}</h2>
          <p className="text-blue-100">{t("ctaSubtitle")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            {/* <Button className="bg-white text-[#2563EB] hover:bg-gray-100 px-8 py-6 text-base rounded-xl">
              {t("bookButton")}
            </Button> */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="bg-[#22c05c] text-white hover:bg-[#059669] px-8 py-6 text-base rounded-xl w-full sm:w-auto">
                {t("whatsapp")}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
