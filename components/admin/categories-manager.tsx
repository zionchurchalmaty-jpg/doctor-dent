"use client";

import { useState } from "react";
import { DoctorCategory } from "@/lib/firestore/types";
import { Plus, Trash2, Save } from "lucide-react";
import { saveCategories } from "@/lib/firestore/client-content";
import { useRouter } from "next/navigation";

export function CategoriesManager({
  initialCategories,
}: {
  initialCategories: DoctorCategory[];
}) {
  const router = useRouter();
  
  const [categories, setCategories] = useState<DoctorCategory[]>(initialCategories || []);
  const [isSaving, setIsSaving] = useState(false);

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        id: Date.now().toString(),
        title: { ru: "", kz: "" },
        description: { ru: "", kz: "" },
      },
    ]);
  };

  const updateCategory = (id: string, field: "title" | "description", lang: "ru" | "kz", value: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === id) {
          const fieldObj = cat[field] || { ru: "", kz: "" };
          return { ...cat, [field]: { ...fieldObj, [lang]: value } };
        }
        return cat;
      })
    );
  };

  const updateCategoryPrice = (id: string, value: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, basePrice: Number(value) } : cat))
    );
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveCategories(categories);
      alert("Категории сохранены!");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Категории на главной</h2>
        <button
          onClick={addCategory}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          <Plus className="w-4 h-4" /> Добавить категорию
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="p-4 border border-gray-200 rounded-xl space-y-4 relative bg-gray-50">
            <button
              onClick={() => removeCategory(cat.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-2 gap-4 pr-10">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Название (RU)</label>
                <input
                  value={cat.title.ru}
                  onChange={(e) => updateCategory(cat.id, "title", "ru", e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Имплантация зубов"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Название (KZ)</label>
                <input
                  value={cat.title.kz}
                  onChange={(e) => updateCategory(cat.id, "title", "kz", e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Тіс имплантациясы"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Описание (RU, необяз.)</label>
                <textarea
                  value={cat.description?.ru || ""}
                  onChange={(e) => updateCategory(cat.id, "description", "ru", e.target.value)}
                  className="w-full border rounded-md p-2 text-sm h-20"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Описание (KZ, необяз.)</label>
                <textarea
                  value={cat.description?.kz || ""}
                  onChange={(e) => updateCategory(cat.id, "description", "kz", e.target.value)}
                  className="w-full border rounded-md p-2 text-sm h-20"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Примерная стоимость (₸, от)</label>
                <input
                  type="number"
                  value={cat.basePrice || ""}
                  onChange={(e) => updateCategoryPrice(cat.id, e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="150000"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        <Save className="w-4 h-4" /> {isSaving ? "Сохранение..." : "Сохранить категории"}
      </button>
    </div>
  );
}