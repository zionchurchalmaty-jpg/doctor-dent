import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PromoForm } from "@/components/admin/promo-form";
import { getContentById } from "@/lib/firestore/content";

export const metadata: Metadata = {
  title: "Редактирование акции | Админка",
};

export default async function EditPromoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const promo = await getContentById(id, "promos");

  if (!promo) {
    notFound();
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 md:p-8">
      <div className="max-w-4xl mx-auto mb-6 flex items-center gap-4">
        <Link
          href="/admin/promos"
          className="p-2 rounded-full hover:bg-[#FFEAC2] text-[#5F6368] hover:text-[#FF5A00] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-medium text-[#202124]">
            Редактирование акции
          </h1>
          <p className="text-sm text-gray-500 mt-1">ID: {id}</p>
        </div>
      </div>

      <PromoForm initialData={promo} isEditing={true} />
    </div>
  );
}
