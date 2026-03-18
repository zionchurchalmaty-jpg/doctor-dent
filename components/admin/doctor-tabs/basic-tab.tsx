"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { ImageUpload } from "../image-upload";

export function DoctorBasicTab() {
  const { register, watch, setValue } = useFormContext();

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

          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <Label className="font-bold text-gray-700">Специализация</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">На русском (RU)</Label>
                <Input {...register("specialty.ru")} placeholder="Стоматолог-ортопед" />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">На казахском (KZ)</Label>
                <Input {...register("specialty.kz")} placeholder="Тіс дәрігері-ортопед" />
              </div>
            </div>
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