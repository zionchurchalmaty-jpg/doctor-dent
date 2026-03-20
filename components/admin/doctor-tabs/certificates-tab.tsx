"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "../image-upload";

export function DoctorCertificatesTab() {
  const { register, control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "certificates" });

  return (
    <TabsContent value="certs" className="mt-0 space-y-6">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">6. Сертификаты и лицензии</h2>
        <Button type="button" variant="outline" onClick={() => append({ url: "", name: "" })}>
          <Plus className="w-4 h-4 mr-2" /> Добавить сертификат
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col relative bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="mb-4">
              <ImageUpload 
                value={watch(`certificates.${index}.url`)} 
                onChange={(url) => setValue(`certificates.${index}.url`, url, { shouldDirty: true })} 
                folder="certificates" 
                label={`Скан сертификата #${index + 1}`} 
                aspectRatio="auto"
              />
            </div>
            
            <div className="space-y-2 flex-1">
              <Label className="text-xs text-gray-500">Или напишите название текстом</Label>
              <Input 
                {...register(`certificates.${index}.name`)} 
                placeholder="Сертификат Nobel Biocare..." 
                className="text-sm"
              />
            </div>

            <Button type="button" variant="destructive" size="sm" className="w-full mt-4" onClick={() => remove(index)}>
              <Trash2 className="w-4 h-4 mr-2" /> Удалить
            </Button>
          </div>
        ))}
      </div>
    </TabsContent>
  );
}