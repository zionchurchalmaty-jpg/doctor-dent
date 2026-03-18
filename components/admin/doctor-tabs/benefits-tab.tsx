"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function DoctorBenefitsTab() {
  const { register, control } = useFormContext();
  
  const { fields: reasons, append: appendReason, remove: removeReason } = useFieldArray({
    control, name: "reasons",
  });

  const { fields: services, append: appendService, remove: removeService } = useFieldArray({
    control, name: "services",
  });

  return (
    <TabsContent value="benefits" className="mt-0 space-y-10">
      
      <section>
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">2. Почему выбирают меня</h2>
          <Button type="button" variant="outline" onClick={() => appendReason({ ru: "", kz: "" })}>
            <Plus className="w-4 h-4 mr-2" /> Добавить пункт
          </Button>
        </div>
        <div className="space-y-3">
          {reasons.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">На русском (RU)</Label>
                  <Input {...register(`reasons.${index}.ru`)} placeholder="Более 1000 успешных операций..." />
                </div>
                <div>
                  <Label className="text-xs">На казахском (KZ)</Label>
                  <Input {...register(`reasons.${index}.kz`)} placeholder="1000-нан астам сәтті операциялар..." />
                </div>
              </div>
              <Button type="button" variant="ghost" className="text-red-500 mt-5" onClick={() => removeReason(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">4. Специализации и услуги</h2>
          <Button type="button" variant="outline" onClick={() => appendService({ ru: "", z: "" })}>
            <Plus className="w-4 h-4 mr-2" /> Добавить услугу
          </Button>
        </div>
        <div className="space-y-3">
          {services.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Название (RU)</Label>
                  <Input {...register(`services.${index}.ru`)} placeholder="Лечение кариеса" />
                </div>
                <div>
                  <Label className="text-xs">Название (KZ)</Label>
                  <Input {...register(`services.${index}.kz`)} placeholder="Тісжегіні емдеу" />
                </div>
              </div>
              <Button type="button" variant="ghost" className="text-red-500 mt-5" onClick={() => removeService(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

    </TabsContent>
  );
}