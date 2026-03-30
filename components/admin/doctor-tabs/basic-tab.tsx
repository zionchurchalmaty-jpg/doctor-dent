"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { ImageUpload } from "../image-upload";

interface CategoryItem {
  id: string;
  title: { ru: string; kz: string };
}

export function DoctorBasicTab() {
  const { register, watch, setValue } = useFormContext();
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const docRef = doc(db, "settings", "categories");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCategories(data.items || []);
        }
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setValue("categoryId", selectedId, { shouldDirty: true });

    const matchedCategory = categories.find(c => c.id === selectedId);
    if (matchedCategory) {
      setValue("specialty.ru", matchedCategory.title?.ru || "", { shouldDirty: true });
      setValue("specialty.kz", matchedCategory.title?.kz || "", { shouldDirty: true });
    } else {
      setValue("specialty.ru", "", { shouldDirty: true });
      setValue("specialty.kz", "", { shouldDirty: true });
    }
  };

  return (
    <TabsContent value="basic" className="mt-0 space-y-6">
      <h2 className="text-xl font-bold border-b pb-2 mb-4">1. Данные врача</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ImageUpload 
            value={watch("photo")} 
            onChange={(url) => setValue("photo", url, { shouldDirty: true })} 
            folder="doctors" 
            label="Фото врача" 
            aspectRatio="3/4"
          />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <Label className="font-bold text-gray-700">ФИО врача</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">На русском (RU)</Label>
                <Input {...register("name.ru")} placeholder="Иванов Иван Иванович" />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">На казахском (KZ)</Label>
                <Input {...register("name.kz")} placeholder="Иванов Иван" />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <div>
              <Label className="font-bold text-gray-700 block mb-2">Привязка к категории (Специализация)</Label>
              <select
                value={watch("categoryId") || ""}
                onChange={handleCategoryChange}
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
              >
                <option value="" disabled>-- Выберите категорию --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title?.ru} / {cat.title?.kz}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-70 pointer-events-none">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Отображается на RU</Label>
                <Input value={watch("specialty.ru") || ""} readOnly className="bg-gray-100" />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Отображается на KZ</Label>
                <Input value={watch("specialty.kz") || ""} readOnly className="bg-gray-100" />
              </div>
            </div>
            <p className="text-xs text-gray-500 italic mt-1">Добавить категорию можно на главной странице админ панели</p>
          </div>

          <div>
            <Label>Стаж работы (лет)</Label>
            <Input type="number" {...register("experienceYears", { valueAsNumber: true })} className="max-w-[150px] mt-1" />
          </div>
        </div>
      </div>
    </TabsContent>
  );
}