import { ContentGrid } from "@/components/ui/content-grid";
import { PromoBanner } from "@/components/banners/promo-banner";
import DoctorCard from "@/components/cards/DoctorCard";
import PromoCard from "@/components/cards/PromoCard";
import { Star, Tags, TrendingUp } from "lucide-react";
import { Metadata } from 'next';
import {
  getTopDoctorsIds,
  getContentById,
  getPublishedContent,
  getCategories,
} from "@/lib/firestore/client-content";
import { DoctorProfile } from "@/lib/firestore/types";
import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";
import Link from "next/link";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Найдите своего врача в Казахстане",
    description: "Ищете врача? FindDoctor.kz — реальные кейсы, отзывы пациентов, цены и лицензии врачей. Сравните и выберите специалиста онлайн за 2 минуты.",
  };
}

export default async function HomePage() {
  const lang = "ru";

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
      {/* Передаем массив topDoctors в обновленный Hero */}
      <Hero topDoctors={topDoctors} topDoctor={heroDoctor} />

      <main className="bg-[#F8F9FA] pb-12 md:pb-20 pt-8 md:pt-10">
        <ContentGrid
          title={t("TopDoctors.topTitle")}
          subtitle={t("TopDoctors.topSubtitle")}
          icon={<Star className="w-6 h-6 md:w-8 md:h-8 fill-yellow-400 text-yellow-400" />}
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
              <div key={doctor.id} className="h-full">
                <DoctorCard
                  id={doctor.slug || doctor.id}
                  name={doctor.name?.[lang]}
                  specialty={doctor.specialty?.[lang]}
                  price={lowestPrice}
                  pricePrefix="от"
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
                  lang="ru"
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
              buttonLink="/for-doctors"
            />
          }
        />

        {promosData && promosData.length > 0 && (
          <section className="bg-[#FFF7ED] py-10 md:py-20 w-full mt-10 md:mt-16">
            <ContentGrid
              title={t("Promos.title")}
              icon={<Tags className="w-6 h-6 md:w-8 md:h-8 text-[#FF5A00]" />}
              items={promosData.map((promo: any) => (
                <div key={promo.id} className="h-full">
                  <PromoCard
                    image={promo.image}
                    badge={promo.badge}
                    title={promo.title}
                    description={promo.description}
                    newPrice={promo.newPrice}
                    oldPrice={promo.oldPrice}
                    buttonText={promo.buttonText || "Записаться"}
                    link={
                      promo.doctorSlug 
                        ? `/doctor/${promo.doctorSlug}`
                        : `/promos/${promo.id}`
                    }
                  />
                </div>
              ))}
              rows={1}
              showPagination={false}
              bottomContent={
                <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm mt-4">
                  <div className="flex items-start md:items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF5A00] flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-gray-900">
                        {t("Promos.cardTitle")}                      
                      </h4>
                      <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0.5">
                        {t("Promos.cardText")}                      
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/for-doctors"
                    className="w-full md:w-auto px-6 py-3 bg-[#FF5A00] hover:bg-[#E04D00] transition-colors text-white font-semibold rounded-xl text-sm whitespace-nowrap text-center"
                  >
                    {t("Promos.buttonText")} 
                  </Link>
                </div>
              }
            />
          </section>
        )}

        {categoriesWithDoctors.map((category) => {
          if (category.doctors.length === 0) return null;

          const formattedPrice = category.basePrice
            ? new Intl.NumberFormat("ru-RU")
                .format(category.basePrice)
                .replace(/,/g, " ")
            : null;

          const categorySubtitle = (
            <div className="space-y-3 md:space-y-4">
              <p>{category.description?.ru}</p>
              {formattedPrice && (
                <Link
                  href="/services"
                  className="inline-block text-[#1A73E8] font-medium hover:text-blue-800 transition-colors text-sm"
                >
                  {`Примерная стоимость: от ${formattedPrice} ₸`}
                </Link>
              )}
            </div>
          );

          return (
            <div key={category.id} className="mt-10 md:mt-16">
              <ContentGrid
                title={category.title.ru}
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
                    <div key={doctor.id} className="h-full">
                      <DoctorCard
                        id={doctor.slug || doctor.id}
                        name={doctor.name?.[lang]}
                        specialty={doctor.specialty?.[lang]}
                        price={lowestPrice}
                        pricePrefix="от"
                        image={doctor.photo}
                        location={shortLocation}
                        experienceYears={doctor.experienceYears}
                        rating={avgRating}
                        reviewsCount={reviewsCount}
                        shortDescription={
                          doctor.shortDescription?.[lang] ||
                          doctor.reasons?.[0]?.[lang]
                        }
                        views={doctor.views}
                        quote={reviewSnippet}
                        lang="ru"
                      />
                    </div>
                  );
                })}
                rows={2}
                showPagination={true}
                
                bottomContent={
                  <div className="flex justify-center mt-6 md:mt-10">
                    <Link
                      href={`/search?specialty=${encodeURIComponent(category.title.ru)}`}
                      className="inline-flex items-center justify-center px-8 py-3.5 font-medium rounded-xl text-[#2563EB] bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm"
                    >
                      {`Все врачи направления «${category.title.ru}»`}
                    </Link>
                  </div>
                }
              />
            </div>
          );
        })}
      </main>

      <section className="bg-[#2563EB] w-full py-12 md:py-16 mt-12 md:mt-20 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-5 tracking-wide">
          Вы врач?
        </h2>
        <p className="text-white/90 text-sm md:text-lg mb-6 md:mb-8 max-w-2xl tracking-wide font-light">
          Разместите свою страницу на FindDoctor.kz и получайте пациентов напрямую
        </p>
        <Link
          href="/for-doctors" 
          className="bg-white text-[#2563EB] hover:bg-blue-50 transition-colors px-6 md:px-8 py-3 rounded-xl font-medium text-sm md:text-base shadow-sm w-full md:w-auto"
        >
          Узнать подробнее
        </Link>
      </section>
    </div>
  );
}