"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function DoctorReviewsTab() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control, name: "reviews",
  });

  return (
    <TabsContent value="reviews" className="mt-0 space-y-6">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">9. Отзывы пациентов</h2>
        <Button type="button" variant="outline" onClick={() => append({ authorName: { ru: "", kz: "" }, text: { ru: "", kz: "" }, rating: 5, date: "" })}>
          <Plus className="w-4 h-4 mr-2" /> Добавить отзыв
        </Button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 bg-gray-50 rounded-xl border border-gray-100 relative">
            <Button type="button" variant="destructive" size="icon" className="absolute top-4 right-4 h-8 w-8" onClick={() => remove(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 pr-12">
              <div>
                <Label>Имя пациента (RU)</Label>
                <Input {...register(`reviews.${index}.authorName.ru`)} placeholder="Алия К." />
              </div>
              <div>
                <Label>Имя пациента (KZ)</Label>
                <Input {...register(`reviews.${index}.authorName.kz`)} placeholder="Әлия Қ." />
              </div>
              <div>
                <Label>Дата отзыва</Label>
                <Input type="date" {...register(`reviews.${index}.date`)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label>Текст отзыва (RU)</Label>
                <Textarea {...register(`reviews.${index}.text.ru`)} placeholder="Отличный врач..." rows={3} />
              </div>
              <div>
                <Label>Текст отзыва (KZ)</Label>
                <Textarea {...register(`reviews.${index}.text.kz`)} placeholder="Керемет дәрігер..." rows={3} />
              </div>
            </div>

            <div className="max-w-[150px]">
              <Label>Оценка (1-5)</Label>
              <Input type="number" min="1" max="5" step="0.1" {...register(`reviews.${index}.rating`, { valueAsNumber: true })} />
            </div>
          </div>
        ))}
      </div>
    </TabsContent>
  );
}