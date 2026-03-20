"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { CITIES } from "@/lib/cities";
import { SearchableSelect } from "@/components/ui/searchable-select";

function EducationGroup({ groupIndex }: { groupIndex: number }) {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `education.${groupIndex}.items`,
  });

  return (
    <div className="mt-4 pl-4 border-l-2 border-[#1A73E8]/30 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <Label className="text-sm font-semibold text-gray-600">Пункты (список)</Label>
        <Button type="button" variant="ghost" size="sm" onClick={() => append({ ru: "", kz: "" })}>
          <Plus className="w-3 h-3 mr-1" /> Добавить пункт
        </Button>
      </div>
      {fields.map((item, itemIndex) => (
        <div key={item.id} className="flex gap-2 items-start">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input {...register(`education.${groupIndex}.items.${itemIndex}.ru`)} placeholder="Пункт (RU)" className="h-8 text-sm" />
            <Input {...register(`education.${groupIndex}.items.${itemIndex}.kz`)} placeholder="Пункт (KZ)" className="h-8 text-sm" />
          </div>
          <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500" onClick={() => remove(itemIndex)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export function DoctorInfoTab() {
  const { register, control, watch, setValue } = useFormContext();

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });
  const { fields: eqFields, append: appendEq, remove: removeEq } = useFieldArray({ control, name: "equipment" });

  const selectedCityId = watch("location.cityId");

  const cityOptions = CITIES.map((city) => ({
    value: city.id,
    label: city.name.ru,
    subLabel: city.name.kz,
  }));

  return (
    <TabsContent value="info" className="mt-0 space-y-10">
      
      <section>
        <h2 className="text-xl font-bold border-b pb-2 mb-4">3. Видео кейс / Обращение</h2>
        <div className="max-w-xl space-y-2">
          <Label>Ссылка на YouTube / Vimeo</Label>
          <Input {...register("videoUrl")} placeholder="https://youtube.com/watch?v=..." />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">5. Опыт и образование</h2>
          <Button type="button" variant="outline" onClick={() => appendEdu({ title: { ru: "", kz: "" }, items: [] })}>
            <Plus className="w-4 h-4 mr-2" /> Добавить блок (Заголовок)
          </Button>
        </div>
        <div className="space-y-6">
          {eduFields.map((field, index) => (
            <div key={field.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
              <Button type="button" variant="ghost" className="absolute top-2 right-2 text-red-500" onClick={() => removeEdu(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              
              <div className="mb-2">
                <Label className="font-bold text-base mb-2 block">Заголовок блока (например: Повышение квалификации)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input {...register(`education.${index}.title.ru`)} placeholder="Заголовок (RU)" />
                  <Input {...register(`education.${index}.title.kz`)} placeholder="Заголовок (KZ)" />
                </div>
              </div>
              
              <EducationGroup groupIndex={index} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">7. Оборудование и диагностика</h2>
          <Button type="button" variant="outline" onClick={() => appendEq({ ru: "", kz: "" })}>
            <Plus className="w-4 h-4 mr-2" /> Добавить оборудование
          </Button>
        </div>
        <div className="space-y-3">
          {eqFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Название (RU)</Label>
                  <Input {...register(`equipment.${index}.ru`)} placeholder="Микроскоп Carl Zeiss..." />
                </div>
                <div>
                  <Label className="text-xs">Название (KZ)</Label>
                  <Input {...register(`equipment.${index}.kz`)} placeholder="Carl Zeiss микроскопы..." />
                </div>
              </div>
              <Button type="button" variant="ghost" className="text-red-500 mt-5" onClick={() => removeEq(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold border-b pb-2 mb-4">11. Место приёма</h2>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Город</Label>
              <SearchableSelect
                items={cityOptions}
                value={selectedCityId}
                onChange={(val) => setValue("location.cityId", val, { shouldDirty: true })}
                placeholder="Выберите город..."
                searchPlaceholder="Поиск города..."
                emptyText="Город не найден"
              />
            </div>

            <div className="space-y-2">
               <Label>Номер телефона</Label>
               <Input {...register("location.phone")} placeholder="+7 (777) 000-00-00" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <Label>Адрес (RU)</Label>
               <Input {...register("location.address.ru")} placeholder="пр. Абая 150" />
            </div>
            <div className="space-y-2">
               <Label>Адрес (KZ)</Label>
               <Input {...register("location.address.kz")} placeholder="Абай даңғылы 150" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <Label>График работы (RU)</Label>
               <Input {...register("location.schedule.ru")} placeholder="Пн-Пт: 09:00 - 18:00" />
            </div>
            <div className="space-y-2">
               <Label>График работы (KZ)</Label>
               <Input {...register("location.schedule.kz")} placeholder="Дс-Жм: 09:00 - 18:00" />
            </div>
          </div>

          <div className="space-y-2">
             <Label>Ссылка на 2ГИС</Label>
             <Input {...register("location.link2gis")} placeholder="https://2gis.kz/..." />
          </div>

        </div>
      </section>

    </TabsContent>
  );
}