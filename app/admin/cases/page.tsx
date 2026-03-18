import { getAdminContent } from "@/lib/firestore/content";
import { ContentManager } from "@/components/admin/content-manager";
import { SerializedContent } from "@/lib/firestore/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Управление кейсами | Админка",
};

export default async function AdminCasesPage() {
  const cases = await getAdminContent("cases");

  const formattedCases: SerializedContent[] = cases.map(c => ({
    ...c,
    date: c.date?.toDate ? c.date.toDate().toISOString() : null,
    createdAt: c.createdAt?.toDate ? c.createdAt.toDate().toISOString() : null,
    updatedAt: c.updatedAt?.toDate ? c.updatedAt.toDate().toISOString() : null,
  }));

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] font-sans p-6 md:p-10">
      <ContentManager 
        initialItems={formattedCases} 
        contentType="cases" 
        title="Кейсы"
        createLink="/admin/cases/new"
      />
    </div>
  );
}