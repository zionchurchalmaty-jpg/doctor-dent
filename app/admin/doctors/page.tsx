import { getAdminContent } from "@/lib/firestore/client-content";
import { ContentManager } from "@/components/admin/content-manager";
import { SerializedContent } from "@/lib/firestore/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Управление врачами | Админка",
};

export default async function AdminDoctorsPage() {
  const rawDoctors = await getAdminContent("doctors");

  const formattedDoctors: SerializedContent[] = rawDoctors.map((doc: any) => ({
    ...doc,
    title: doc.name?.ru || "Врач без имени",
    excerpt: doc.specialty?.ru || "Специальность не указана",

    date: doc.date?.toDate ? doc.date.toDate().toISOString() : null,
    createdAt: doc.createdAt?.toDate
      ? doc.createdAt.toDate().toISOString()
      : null,
    updatedAt: doc.updatedAt?.toDate
      ? doc.updatedAt.toDate().toISOString()
      : null,
  }));

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] font-sans p-6 md:p-10">
      <ContentManager
        initialItems={formattedDoctors}
        contentType="doctors"
        title="Управление врачами"
        createLink="/admin/doctors/new"
      />
    </div>
  );
}
