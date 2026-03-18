import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getContentById } from "@/lib/firestore/content";
import { ContentForm } from "@/components/admin/content-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCasePage({ params }: PageProps) {
  const { id } = await params;
  const rawCase = await getContentById(id, "cases", true);

  if (!rawCase) {
    redirect("/admin/cases");
  }

  const serializedCase = JSON.parse(JSON.stringify({
    ...rawCase,
    date: (rawCase.date as any)?.toDate ? (rawCase.date as any).toDate().toISOString() : rawCase.date,
    createdAt: (rawCase.createdAt as any)?.toDate ? (rawCase.createdAt as any).toDate().toISOString() : rawCase.createdAt,
    updatedAt: (rawCase.updatedAt as any)?.toDate ? (rawCase.updatedAt as any).toDate().toISOString() : rawCase.updatedAt,
  }));

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#202124] p-6 md:p-8">
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <Link 
          href="/admin/cases" 
          className="p-2 rounded-full hover:bg-[#E8F0FE] text-[#5F6368] hover:text-[#1A73E8] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-medium text-[#202124]">Редактировать кейс</h1>
      </div>

      <ContentForm
        contentType="cases"
        initialData={{
          ...serializedCase,
          image: serializedCase.image || serializedCase.coverImage || "",
          status: serializedCase.status ?? "published",
          tags: serializedCase.tags ?? [],
          seo: serializedCase.seo ?? {
            metaTitle: "",
            metaDescription: "",
            ogImage: "",
            canonicalUrl: "",
            noIndex: false,
          },
        }}
        isEditing
      />
    </div>
  );
}