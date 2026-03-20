"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function DoctorFAQTab() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control, name: "faq",
  });

  return (
    <TabsContent value="faq" className="mt-0 space-y-6">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">12. Часто задаваемые вопросы (FAQ)</h2>
        <Button type="button" variant="outline" onClick={() => append({ question: { ru: "", kz: "" }, answer: { ru: "", kz: "" } })}>
          <Plus className="w-4 h-4 mr-2" /> Добавить вопрос
        </Button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 bg-gray-50 rounded-xl border border-gray-100 relative">
            <Button type="button" variant="destructive" size="icon" className="absolute top-4 right-4 h-8 w-8" onClick={() => remove(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>

            <h3 className="font-medium mb-4">Вопрос-Ответ #{index + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label>Вопрос (RU)</Label>
                <Input {...register(`faq.${index}.question.ru`)} placeholder="Больно ли ставить имплант?" />
              </div>
              <div>
                <Label>Вопрос (KZ)</Label>
                <Input {...register(`faq.${index}.question.kz`)} placeholder="Имплант салу ауырта ма?" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Ответ (RU)</Label>
                <Textarea {...register(`faq.${index}.answer.ru`)} placeholder="Процедура проходит под местной анестезией..." rows={3} />
              </div>
              <div>
                <Label>Ответ (KZ)</Label>
                <Textarea {...register(`faq.${index}.answer.kz`)} placeholder="Процедура жергілікті анестезиямен өтеді..." rows={3} />
              </div>
            </div>
          </div>
        ))}
        
        {fields.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            Нет добавленных вопросов. Нажмите «Добавить вопрос», чтобы создать FAQ.
          </div>
        )}
      </div>
    </TabsContent>
  );
}