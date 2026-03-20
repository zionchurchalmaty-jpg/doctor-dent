import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/firestore/content";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { ArticleClient } from "@/components/blog/article-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getContentBySlug(slug, "blog");

  if (!article) return { title: "Статья не найдена" };

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: { images: article.image ? [article.image] : [] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const article = await getContentBySlug(slug, "blog");

  if (!article) {
    notFound();
  }

  const rawDate = article.date;
  const dateObject =
    rawDate && typeof rawDate === "object" && "toDate" in rawDate
      ? rawDate.toDate()
      : new Date(rawDate || Date.now());

  const formattedDate = dateObject.toLocaleDateString("ru-RU", { 
    day: "2-digit", 
    month: "long", 
    year: "numeric" 
  });

  return (
    <>
      {article.seo?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: article.seo.schemaMarkup }}
        />
      )}
      <main className="min-h-screen bg-white pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          <Link
            href={`/blog`}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#1A73E8] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к блогу
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
          </div>

          {article.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 bg-gray-100 shadow-sm">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <ArticleClient
            content={article.content}
            previewContent={article.previewContent || article.excerpt}
            correctPassword={article.password}
            locale="ru"
          />
        </article>
      </main>
    </>
  );
}