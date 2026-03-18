"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function DoctorPricesTab() {
  const { register, control } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  return (
    <TabsContent value="prices" className="mt-0 space-y-6">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">10. Цены на услуги</h2>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => append({ serviceName: { ru: "", kz: "" }, price: 0 })}
        >
          <Plus className="w-4 h-4 mr-2" /> Добавить услугу
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Название услуги (RU)</Label>
                  <Input {...register(`prices.${index}.serviceName.ru`)} placeholder="Например: Металлокерамическая коронка" />
                </div>
                <div>
                  <Label className="text-xs">Название услуги (KZ)</Label>
                  <Input {...register(`prices.${index}.serviceName.kz`)} placeholder="Мысалы: Металлокерамикалық тәж" />
                </div>
              </div>
              <div className="max-w-[200px]">
                <Label className="text-xs">Цена (Тенге)</Label>
                <Input type="number" {...register(`prices.${index}.price`, { valueAsNumber: true })} />
              </div>
            </div>
            
            <Button type="button" variant="ghost" className="text-red-500 hover:bg-red-50 mt-5" onClick={() => remove(index)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        {fields.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8 border border-dashed rounded-xl">Прайс-лист пуст.</p>
        )}
      </div>
    </TabsContent>
  );
}