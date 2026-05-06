import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin, ArrowRight, Eye } from "lucide-react";
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
  pricePrefix?: string;
  views?: number;
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
  pricePrefix,
  lang = "ru",
  views,
}: DoctorCardProps) {
  const t = useTranslations("HomePage.TopDoctors.DoctorCard");

  const formattedPrice = new Intl.NumberFormat(
    lang === "kz" ? "kk-KZ" : "ru-RU",
  )
    .format(price)
    .replace(/,/g, " ");

  return (
    <div
      className={`relative flex flex-col bg-white rounded-[24px] shadow-sm transition-all hover:shadow-md h-full ${
        isTop ? "border-2 border-[#F5A623]" : "border border-gray-100"
      }`}
    >
      {isTop && topRank && (
        <div className="absolute -top-4 -left-4 bg-[#F5A623] text-white font-bold w-12 h-12 flex items-center justify-center rounded-full z-20 shadow-md text-lg">
          #{topRank}
        </div>
      )}
      
      <div className="relative w-full aspect-square shrink-0 bg-gray-100 rounded-t-[22px] overflow-hidden">
        <Image
          src={image || "/images/placeholder.png"}
          alt={name || "Doctor"}
          fill
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="mb-4">
          <h3 className="text-[18px] font-bold text-gray-900 leading-snug mb-1">
            {name}
          </h3>
          <p className="text-sm text-gray-500">{specialty}</p>
        </div>
        <div className="flex items-center gap-3 mb-4">
          {rating !== undefined && (
            <div className="flex items-center gap-1.5 bg-[#FFF9EB] px-2.5 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
              <span className="text-sm font-bold text-gray-900">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
          {reviewsCount !== undefined && (
            <span className="text-sm text-gray-500">
              {reviewsCount} {t("reviews")}
            </span>
          )}
          {views !== undefined && (
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Eye className="w-4 h-4 text-gray-400" />
              <span>{views}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-5 mb-5 text-sm text-gray-500">
          {experienceYears !== undefined && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>
                {t("experience")} {experienceYears} {t("years")}
              </span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{location}</span>
            </div>
          )}
        </div>
        {shortDescription && (
          <div className="bg-[#F0F5FF] text-[#2563EB] text-sm px-4 py-3 rounded-xl mb-4 font-medium">
            {shortDescription}
          </div>
        )}
        {quote ? (
          <div className="bg-[#F8F9FA] p-4 rounded-xl mb-6 flex-grow">
            <p className="text-sm text-gray-600 italic line-clamp-2 mb-2">
              &quot;{quote.text}&quot;
            </p>
            <p className="text-sm text-gray-500">— {quote.author}</p>
          </div>
        ) : (
          <div className="mb-6 flex-grow" />
        )}
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400 mb-1">{t("price")}</p>
            <p className="text-[20px] font-bold text-gray-900 leading-none whitespace-nowrap">
              {pricePrefix && (
                <span className="text-sm font-normal text-gray-500 mr-1">
                  {pricePrefix}
                </span>
              )}
              {formattedPrice} ₸
            </p>
          </div>

          <Link
            href={`/doctor/${id}`}
            className="text-[#2563EB] font-medium text-sm flex items-center gap-1 hover:text-blue-700 transition-colors"
          >
            {t("more")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
