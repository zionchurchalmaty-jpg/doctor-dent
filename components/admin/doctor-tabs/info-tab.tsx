"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";

export function DoctorInfoTab() {
  const { register } = useFormContext();

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
        <h2 className="text-xl font-bold border-b pb-2 mb-4">5. Опыт и образование</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <Label>Описание (RU)</Label>
             <Textarea {...register("education.ru")} rows={4} placeholder="Окончил КазНМУ им. Асфендиярова..." />
          </div>
          <div>
             <Label>Описание (KZ)</Label>
             <Textarea {...register("education.kz")} rows={4} placeholder="Асфендияров атындағы ҚазҰМУ бітірді..." />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold border-b pb-2 mb-4">7. Оборудование и диагностика</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <Label>Описание (RU)</Label>
             <Textarea {...register("equipment.ru")} rows={3} placeholder="Используем микроскоп Carl Zeiss..." />
          </div>
          <div>
             <Label>Описание (KZ)</Label>
             <Textarea {...register("equipment.kz")} rows={3} placeholder="Carl Zeiss микроскопын қолданамыз..." />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold border-b pb-2 mb-4">11. Место приёма</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <Label>Адрес (RU)</Label>
             <Input {...register("location.ru")} placeholder="г. Алматы, пр. Абая 150" />
          </div>
          <div>
             <Label>Адрес (KZ)</Label>
             <Input {...register("location.kz")} placeholder="Алматы қ., Абай даңғылы 150" />
          </div>
        </div>
      </section>

    </TabsContent>
  );
}