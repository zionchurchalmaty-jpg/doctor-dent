"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Loader2, Tags } from "lucide-react";
import { getAdminContent, deleteContent } from "@/lib/firestore/content";

export default function PromosPage() {
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = async () => {
    try {
      const data = await getAdminContent("promos");
      setPromos(data);
    } catch (error) {
      console.error("Ошибка при загрузке акций:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Вы уверены, что хотите удалить эту акцию? Это действие нельзя отменить.",
      )
    )
      return;

    try {
      await deleteContent(id, "promos");
      setPromos(promos.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить акцию");
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#202124] flex items-center gap-2">
            <Tags className="w-6 h-6 text-[#FF5A00]" />
            Управление акциями
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Добавляйте и редактируйте спецпредложения на главной странице
          </p>
        </div>

        <Link
          href="/admin/promos/new"
          className="bg-[#FF5A00] hover:bg-[#E04D00] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить акцию
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF5A00]" />
          </div>
        ) : promos.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-[#FFF7ED] rounded-full flex items-center justify-center mx-auto mb-4">
              <Tags className="w-8 h-8 text-[#FF5A00]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Нет активных акций
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              Вы еще не добавили ни одного спецпредложения. Нажмите кнопку выше,
              чтобы создать первую акцию.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-40 w-full bg-gray-100">
                  {promo.image ? (
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Нет фото
                    </div>
                  )}
                  {promo.badge && (
                    <div className="absolute top-3 right-3 bg-[#FF5A00] text-white text-[11px] font-bold px-2 py-1 rounded-full uppercase">
                      {promo.badge}
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                    {promo.title}
                  </h3>

                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-lg font-bold text-[#FF5A00]">
                      {promo.newPrice} ₸
                    </span>
                    {promo.oldPrice && (
                      <span className="text-xs text-gray-400 line-through mb-0.5">
                        {promo.oldPrice} ₸
                      </span>
                    )}
                  </div>

                  <div className="flex-grow" />

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-2">
                    <Link
                      href={`/admin/promos/${promo.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1A73E8] rounded-lg text-sm font-medium transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Изменить
                    </Link>
                    <button
                      onClick={() => handleDelete(promo.id)}
                      className="px-3 py-2 bg-[#F8F9FA] hover:bg-[#FCE8E6] text-[#D93025] rounded-lg transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
