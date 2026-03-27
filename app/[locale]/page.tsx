import { ContentGrid } from "@/components/ui/content-grid";
import { PromoBanner } from "@/components/banners/promo-banner";
import DoctorCard from "@/components/cards/DoctorCard";
import PromoCard from "@/components/cards/PromoCard";
import { Star, Tags, TrendingUp } from "lucide-react";
import {
  getTopDoctorsIds,
  getContentById,
  getPublishedContent,
  getCategories,
} from "@/lib/firestore/content";
import { DoctorProfile } from "@/lib/firestore/types";
import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "kz" ? "kz" : "ru";

  const t = await getTranslations("HomePage");

  const [topIds, promosData, categories, allDoctorsData] = await Promise.all([
    getTopDoctorsIds(),
    getPublishedContent("promos", 3),
    getCategories(),
    getPublishedContent("doctors"),
  ]);

  const allDoctors = allDoctorsData as unknown as DoctorProfile[];

  const topDoctorsPromises = topIds
    .filter((id) => id !== "")
    .map((id) => getContentById(id, "doctors"));

  const topDoctorsData = await Promise.all(topDoctorsPromises);
  const topDoctors = topDoctorsData.filter(
    (doc) => doc !== null,
  ) as unknown as DoctorProfile[];
  const heroDoctor = topDoctors.length > 0 ? topDoctors[0] : null;

  const categoriesWithDoctors = categories.map((cat) => {
    const docs = allDoctors.filter((doc) => doc.categoryId === cat.id);

    docs.sort((a, b) => {
      const ratingA = a.reviews?.length
        ? a.reviews.reduce((acc, r) => acc + r.rating, 0) / a.reviews.length
        : 5.0;
      const ratingB = b.reviews?.length
        ? b.reviews.reduce((acc, r) => acc + r.rating, 0) / b.reviews.length
        : 5.0;
      return ratingB - ratingA;
    });

    return { ...cat, doctors: docs };
  });

  return (
    <div className="min-h-screen">
      <Hero topDoctor={heroDoctor} />

      <main className="bg-[#F8F9FA] pb-20 pt-10">
        <ContentGrid
          title={t("TopDoctors.topTitle")}
          subtitle={t("TopDoctors.topSubtitle")}
          icon={<Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />}
          items={topDoctors.map((doctor, index) => {
            const reviews = doctor.reviews || [];
            const reviewsCount = reviews.length;
            const avgRating =
              reviewsCount > 0
                ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviewsCount
                : 5.0;
            const reviewSnippet =
              reviewsCount > 0
                ? {
                    text: reviews[0].text[lang],
                    author: reviews[0].authorName[lang],
                  }
                : null;
            const fullAddress = doctor.location?.address?.[lang];
            const shortLocation = fullAddress
              ? fullAddress.split(",")[0]
              : "Город не указан";

            const lowestPrice = doctor.prices?.length
              ? Math.min(...doctor.prices.map((p) => p.price))
              : 0;

            return (
              <div key={doctor.id} className="pt-4 pl-4 h-full">
                <DoctorCard
                  id={doctor.slug || doctor.id}
                  name={doctor.name?.[lang]}
                  specialty={doctor.specialty?.[lang]}
                  price={lowestPrice}
                  pricePrefix={lang === "kz" ? "бастап" : "от"}
                  image={doctor.photo}
                  location={shortLocation}
                  experienceYears={doctor.experienceYears}
                  rating={avgRating}
                  reviewsCount={reviewsCount}
                  shortDescription={
                    doctor.shortDescription?.[lang] ||
                    doctor.reasons?.[0]?.[lang]
                  }
                  quote={reviewSnippet}
                  isTop={true}
                  topRank={index + 1}
                  lang={lang as "ru" | "kz"}
                />
              </div>
            );
          })}
          rows={1}
          showPagination={false}
          bottomContent={
            <PromoBanner
              title={t("TopDoctors.promoTitle")}
              subtitle={t("TopDoctors.promoSubtitle")}
              buttonText={t("TopDoctors.promoBtn")}
              buttonLink={`/${locale}/services/top-promotion`}
            />
          }
        />

        {promosData && promosData.length > 0 && (
          <section className="bg-[#FFF7ED] py-12 md:py-20 w-full mt-16">
            <ContentGrid
              title="Акции и спецпредложения"
              icon={<Tags className="w-8 h-8 text-[#FF5A00]" />}
              items={promosData.map((promo: any) => (
                <PromoCard
                  key={promo.id}
                  image={promo.image}
                  badge={promo.badge}
                  title={promo.title}
                  description={promo.description}
                  newPrice={promo.newPrice}
                  oldPrice={promo.oldPrice}
                  buttonText={promo.buttonText || "Записаться"}
                  link={`/${locale}/promos/${promo.id}`}
                />
              ))}
              rows={1}
              showPagination={false}
              bottomContent={
                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FF5A00] flex items-center justify-center shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">
                        Хотите разместить свою акцию?
                      </h4>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Привлекайте больше пациентов с блоком спецпредложений
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/${locale}/business/ads`}
                    className="w-full md:w-auto px-6 py-3 bg-[#FF5A00] hover:bg-[#E04D00] transition-colors text-white font-semibold rounded-xl text-sm whitespace-nowrap text-center"
                  >
                    Подключить услугу
                  </Link>
                </div>
              }
            />
          </section>
        )}

        {categoriesWithDoctors.map((category) => {
          if (category.doctors.length === 0) return null;

          const formattedPrice = category.basePrice
            ? new Intl.NumberFormat(lang === "kz" ? "kk-KZ" : "ru-RU")
                .format(category.basePrice)
                .replace(/,/g, " ")
            : null;

          const categorySubtitle = (
            <div className="space-y-4">
              <p>{category.description?.[lang]}</p>
              {formattedPrice && (
                <Link
                  href={`/${locale}/services`}
                  className="inline-block text-[#1A73E8] font-medium hover:text-blue-800 transition-colors text-sm"
                >
                  {lang === "kz"
                    ? `Шамамен құны: ${formattedPrice} ₸ бастап`
                    : `Примерная стоимость: от ${formattedPrice} ₸`}
                </Link>
              )}
            </div>
          );

          return (
            <div key={category.id} className="mt-16">
              <ContentGrid
                title={category.title[lang]}
                subtitle={categorySubtitle}
                items={category.doctors.map((doctor: DoctorProfile) => {
                  const reviews = doctor.reviews || [];
                  const reviewsCount = reviews.length;
                  const avgRating =
                    reviewsCount > 0
                      ? reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviewsCount
                      : 5.0;
                  const reviewSnippet =
                    reviewsCount > 0
                      ? {
                          text: reviews[0].text[lang],
                          author: reviews[0].authorName[lang],
                        }
                      : null;
                  const fullAddress = doctor.location?.address?.[lang];
                  const shortLocation = fullAddress
                    ? fullAddress.split(",")[0]
                    : "Город не указан";

                  const lowestPrice = doctor.prices?.length
                    ? Math.min(...doctor.prices.map((p) => p.price))
                    : 0;

                  return (
                    <div key={doctor.id} className="pt-4 pl-4 h-full">
                      <DoctorCard
                        id={doctor.slug || doctor.id}
                        name={doctor.name?.[lang]}
                        specialty={doctor.specialty?.[lang]}
                        price={lowestPrice}
                        pricePrefix={lang === "kz" ? "бастап" : "от"}
                        image={doctor.photo}
                        location={shortLocation}
                        experienceYears={doctor.experienceYears}
                        rating={avgRating}
                        reviewsCount={reviewsCount}
                        shortDescription={
                          doctor.shortDescription?.[lang] ||
                          doctor.reasons?.[0]?.[lang]
                        }
                        quote={reviewSnippet}
                        lang={lang as "ru" | "kz"}
                      />
                    </div>
                  );
                })}
                rows={1}
                showPagination={false}
              />
            </div>
          );
        })}
      </main>
    </div>
  );
}
