"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "../image-upload";
import { ContentEditor } from "../content-editor";

export function DoctorCasesTab() {
  const { register, control, watch, setValue } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cases",
  });

  return (
    <TabsContent value="cases" className="mt-0 space-y-6">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">8. Кейсы (До / После)</h2>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => append({ 
            id: "",
            title: { ru: "", kz: "" },
            duration: { ru: "", kz: "" },
            price: "",
            beforeImage: "", 
            afterImage: "", 
            description: { ru: "", kz: "" } 
          })}
        >
          <Plus className="w-4 h-4 mr-2" /> Добавить кейс
        </Button>
      </div>

      <div className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative shadow-sm">
            
            <input type="hidden" {...register(`cases.${index}.id`)} />

            <Button 
              type="button" 
              variant="destructive" 
              size="icon" 
              className="absolute top-4 right-4 h-8 w-8"
              onClick={() => remove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <h3 className="font-medium mb-6 text-lg border-b pb-2">Кейс #{index + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="mb-2 block">Название кейса (RU)</Label>
                <Input {...register(`cases.${index}.title.ru`)} placeholder="Тотальная имплантация All-on-4" />
              </div>
              <div>
                <Label className="mb-2 block">Название кейса (KZ)</Label>
                <Input {...register(`cases.${index}.title.kz`)} placeholder="All-on-4 толық имплантациясы" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label className="mb-2 block">Срок лечения (RU)</Label>
                <Input {...register(`cases.${index}.duration.ru`)} placeholder="3 месяца" />
              </div>
              <div>
                <Label className="mb-2 block">Срок лечения (KZ)</Label>
                <Input {...register(`cases.${index}.duration.kz`)} placeholder="3 ай" />
              </div>
              <div>
                <Label className="mb-2 block">Цена (₸)</Label>
                <Input {...register(`cases.${index}.price`)} placeholder="1 500 000" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <ImageUpload 
                  value={watch(`cases.${index}.beforeImage`)} 
                  onChange={(url) => setValue(`cases.${index}.beforeImage`, url, { shouldDirty: true })} 
                  folder="cases" 
                  label="Фото ДО" 
                  aspectRatio="4/3"
                />
              </div>
              <div>
                <ImageUpload 
                  value={watch(`cases.${index}.afterImage`)} 
                  onChange={(url) => setValue(`cases.${index}.afterImage`, url, { shouldDirty: true })} 
                  folder="cases" 
                  label="Фото ПОСЛЕ" 
                  aspectRatio="4/3"
                />
              </div>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100">
              <Label className="font-bold text-base block border-b pb-2">Описание проведенного лечения</Label>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 block">Развернутое описание (RU)</Label>
                  <ContentEditor 
                    content={watch(`cases.${index}.description.ru`) || ""} 
                    onChange={(html: string) => setValue(`cases.${index}.description.ru`, html, { shouldDirty: true })} 
                    placeholder="Опишите процесс лечения, используемые материалы и результат..." 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700 block">Краткое описание (KZ)</Label>
                  <Input 
                    {...register(`cases.${index}.description.kz`)} 
                    placeholder="Емдеу барысы туралы қысқаша ақпарат..." 
                  />
                </div>
              </div>
            </div>

          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            Нет добавленных кейсов. Нажмите «Добавить кейс», чтобы загрузить работы.
          </div>
        )}
      </div>
    </TabsContent>
  );
}