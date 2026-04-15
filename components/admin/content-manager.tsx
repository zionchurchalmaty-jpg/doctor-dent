"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContentList } from "@/components/admin/content-list";
import { deleteContent } from "@/lib/firestore/client-content";
import { SerializedContent, ContentType } from "@/lib/firestore/types";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ContentManagerProps {
  initialItems: SerializedContent[];
  contentType: ContentType;
  title: string;
  createLink: string;
}

export function ContentManager({ 
  initialItems, 
  contentType, 
  title, 
  createLink 
}: ContentManagerProps) {
  const [items, setItems] = useState<SerializedContent[]>(initialItems);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    {/* Native confirmation dialog before destructive action */}
    if (!window.confirm("Вы уверены? Это действие нельзя отменить.")) return;

    try {
      await deleteContent(id, contentType);
      
      {/* Optimistic UI update: remove item from local state */}
      setItems((prev) => prev.filter((item) => item.id !== id));
      
      router.refresh();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Ошибка при удалении");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#202124]">{title}</h1>
          <p className="text-sm text-[#5F6368] mt-1">
            Всего записей: {items.length}
          </p>
        </div>
        
        {/* Only render creation link if path is provided */}
        {createLink && (
          <Link 
            href={createLink} 
            className="inline-flex items-center justify-center px-4 py-2 bg-[#1A73E8] text-white rounded-lg hover:bg-[#1557B0] transition-colors font-medium text-sm gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </Link>
        )}
      </div>

      <ContentList 
        items={items} 
        contentType={contentType} 
        onDelete={handleDelete} 
      />
    </div>
  );
}