import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export interface DoctorCardProps {
  id: string;
  isTop?: boolean;
  topRank?: number;
  image: string;
  name: string;
  specialty: string;
  rating?: number;
  reviewsCount?: number;
  experienceYears?: number;
  location?: string;
  shortDescription?: string | null;
  quote?: {
    text: string;
    author: string;
  } | null;
  price: number;
  lang?: "ru" | "kz";
}

export default function DoctorCard({
  id,
  isTop,
  topRank,
  image,
  name,
  specialty,
  rating,
  reviewsCount,
  experienceYears,
  location,
  shortDescription,
  quote,
  price,
  lang = "ru",
}: DoctorCardProps) {
  const t = useTranslations("HomePage.TopDoctors.DoctorCard");
  const formattedPrice = new Intl.NumberFormat(
    lang === "kz" ? "kk-KZ" : "ru-RU",
  ).format(price);

  return (
    <div
      className={`flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md h-full ${
        isTop ? "border-2 border-yellow-400" : "border border-gray-100"
      }`}
    >
      <div className="relative h-56 w-full shrink-0">
        <Image
          src={image || "/images/placeholder.png"}
          alt={name || "Doctor"}
          fill
          className="object-cover"
        />

        {isTop && topRank && (
          <div className="absolute top-0 left-0 bg-yellow-400 text-white font-bold px-4 py-2 rounded-br-2xl z-10">
            #{topRank}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
            {name}
          </h3>
          <p className="text-sm text-gray-500">{specialty}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-xs font-medium text-gray-500">
          {rating && (
            <div className="flex items-center gap-1 text-gray-900">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-gray-400 font-normal ml-1">
                {reviewsCount} {t("reviews")}
              </span>
            </div>
          )}
          {experienceYears && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                {t("experience")} {experienceYears} {t("years")}
              </span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {features && features.length > 0 && (
          <div className="flex flex-col gap-2 mb-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-2 rounded-xl"
              >
                {feature}
              </div>
            ))}
          </div>
        )}

        {quote && (
          <div className="bg-gray-50 text-gray-500 text-xs italic p-4 rounded-xl mb-4">
            &quot;{quote.text}&quot;
            <span className="block mt-2 not-italic font-medium">
              — {quote.author}
            </span>
          </div>
        )}

        <div className="flex-grow"></div>

        <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
              {t("price")}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {formattedPrice} ₸
            </p>
          </div>

          <Link
            href={`/${lang}/doctor/${id}`}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {t("more")} <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
