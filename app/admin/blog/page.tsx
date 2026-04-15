import { getAdminContent } from "@/lib/firestore/client-content";
import { ContentManager } from "@/components/admin/content-manager";
import { SerializedContent } from "@/lib/firestore/types";

export default async function AdminBlogPage() {
  const articles = await getAdminContent("blog");

  const formattedArticles: SerializedContent[] = articles.map(a => ({
    ...a,
    date: a.date?.toDate ? a.date.toDate().toISOString() : null,
    createdAt: a.createdAt?.toDate ? a.createdAt.toDate().toISOString() : null,
    updatedAt: a.updatedAt?.toDate ? a.updatedAt.toDate().toISOString() : null,
  }));

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] font-sans p-6 md:p-10">
      <ContentManager 
        initialItems={formattedArticles} 
        contentType="blog" 
        title="Управление статьями"
        createLink="/admin/blog/new"
      />
    </div>
  );
}