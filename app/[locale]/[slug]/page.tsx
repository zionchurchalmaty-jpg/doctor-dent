import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/firestore/client-content";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>; 
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (locale === "kz") {
    notFound();
  }

  const article = await getContentBySlug(slug, "blog");

  if (!article) return { title: "Статья не найдена" };

  const imageUrl = article.image || "/images/blog-placeholder.png";
  const imageAlt = article.seo?.imageAlt || article.title;

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params;

  if (locale === "kz") {
    notFound();
  }

  const article = await getContentBySlug(slug, "blog");

  if (!article) {
    notFound();
  }

  const rawDate = article.date || article.createdAt;
  const dateObject =
    rawDate && typeof rawDate === "object" && "toDate" in rawDate
      ? rawDate.toDate()
      : new Date(rawDate || Date.now());

  const formattedDate = dateObject.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const firstTag =
    article.tags && article.tags.length > 0 ? article.tags[0] : null;

  return (
    <>
      {article.seo?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: article.seo.schemaMarkup }}
        />
      )}
      <main className="min-h-screen bg-white pt-8 pb-20 font-sans">
        <div className="border-b border-gray-100 mb-10 pb-4">
          <div className="max-w-4xl mx-auto px-6">
            <Link
              href={`/seo-blog`}
              className="inline-flex items-center text-sm font-medium text-[#2563EB] hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к блогу
            </Link>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            {firstTag && (
              <span className="bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-md text-xs font-semibold tracking-wide">
                {firstTag}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 leading-tight">
            {article.title}
          </h1>

          {article.image && (
            <div className="w-full max-w-none mx-auto mb-12">
              <figure className="max-w-6xl mx-auto w-full">
                <div className="relative w-full aspect-[2560/1695] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                  <Image
                    src={article.image}
                    alt={article.seo?.imageAlt || article.title}
                    title={article.seo?.imageTitle}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </figure>
            </div>
          )}

          {article.content && (
            <div
              className="prose prose-lg max-w-none text-gray-800 prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-[#2563EB]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

          <div className="mt-20 bg-[#F4F7FB] rounded-3xl p-10 md:p-14 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Нужна консультация?
            </h3>
            <p className="text-gray-600 mb-8 text-base md:text-lg">
              Найдите квалифицированного стоматолога в вашем городе
            </p>
            <Link
              href={`/search`}
              className="inline-block bg-[#2563EB] text-white px-10 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Выбрать врача
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}