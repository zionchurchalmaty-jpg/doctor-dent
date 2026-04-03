import { notFound } from "next/navigation";
import { getContentBySlug, getContentById } from "@/lib/firestore/content";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Banknote, User } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  
  let caseDoc: any = await getContentBySlug(slug, "cases");
  if (!caseDoc) caseDoc = await getContentById(slug, "cases");

  if (!caseDoc) return { title: "Кейс не найден" };

  const titleText = typeof caseDoc.title === "string" 
    ? caseDoc.title 
    : (caseDoc.title?.[locale] || caseDoc.title?.ru || "Кейс лечения");

  return {
    title: `${titleText} — Результаты лечения`,
    description: "Посмотрите результаты лечения до и после в нашей клинике.",
  };
}

export default async function CasePostPage({ params }: PageProps) {

  const { slug, locale } = await params;
  const lang = locale as "ru" | "kz";

  let caseData: any = await getContentBySlug(slug, "cases");
  if (!caseData) caseData = await getContentById(slug, "cases");

  if (!caseData) {
    notFound();
  }

  const tags: string[] = caseData.tags || [];

  const rawDate = caseData.date || caseData.createdAt;
  const dateObject =
    rawDate && typeof rawDate === "object" && "toDate" in rawDate
      ? rawDate.toDate()
      : new Date(rawDate || Date.now());

  const formattedDate = dateObject.toLocaleDateString("ru-RU", { 
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric" 
  });

  const title = caseData.title?.[lang] || caseData.title?.ru || "Кейс лечения";
  const description = caseData.description?.[lang] || caseData.description?.ru;
  const duration = caseData.duration?.[lang] || caseData.duration?.ru;
  const doctorName = caseData.doctorName?.[lang] || caseData.doctorName?.ru;

  return (
    <main className="min-h-screen bg-white pt-8 pb-20 font-sans">
      
      <div className="border-b border-gray-100 mb-10 pb-4">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href={`/${locale}/cases`}
            className="inline-flex items-center text-sm font-medium text-[#2563EB] hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к кейсам
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6">
        
<div className="flex flex-wrap items-center gap-3 mb-6">
          {tags.length > 0 ? (
            tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-md text-xs font-semibold tracking-wide"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-md text-xs font-semibold tracking-wide">
              Кейс лечения
            </span>
          )}
          
          <span className="flex items-center gap-1.5 text-sm text-gray-500 ml-1">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 leading-tight">
          {title}
        </h1>

        <div className="flex flex-wrap gap-6 p-6 bg-gray-50 rounded-2xl mb-12 border border-gray-100">
          {doctorName && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2563EB]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Врач</p>
                <p className="text-sm font-semibold text-gray-900">{doctorName}</p>
              </div>
            </div>
          )}
          
          {duration && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2563EB]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Срок лечения</p>
                <p className="text-sm font-semibold text-gray-900">{duration}</p>
              </div>
            </div>
          )}

          {caseData.price && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Стоимость</p>
                <p className="text-sm font-semibold text-gray-900">{caseData.price} ₸</p>
              </div>
            </div>
          )}
        </div>

        {(caseData.beforeImage || caseData.afterImage) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {caseData.beforeImage && (
              <div className="space-y-3">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                  <Image src={caseData.beforeImage} alt="До лечения" fill className="object-cover" />
                </div>
                <div className="text-center font-bold text-gray-500 uppercase tracking-widest text-sm">До</div>
              </div>
            )}
            {caseData.afterImage && (
              <div className="space-y-3">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                  <Image src={caseData.afterImage} alt="После лечения" fill className="object-cover" />
                </div>
                <div className="text-center font-bold text-[#10B981] uppercase tracking-widest text-sm">После</div>
              </div>
            )}
          </div>
        )}

        {description && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">О проведенном лечении</h2>
            <div 
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}

<div className="mt-16 bg-[#F4F7FB] rounded-3xl p-10 md:p-14 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Хотите такой же результат?
          </h3>
          <p className="text-gray-600 mb-8 text-base md:text-lg">
            Запишитесь на консультацию к врачу и получите план лечения
          </p>
          
          <Link 
            href={`/${locale}/doctor/${caseData.doctorSlug || caseData.doctorId}`} 
            className="inline-block bg-[#2563EB] text-white px-10 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Записаться к врачу
          </Link>
        </div>

      </article>
    </main>
  );
}