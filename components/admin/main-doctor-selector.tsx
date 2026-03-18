"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Star } from "lucide-react";
import { DoctorProfile } from "@/lib/firestore/types";

export function MainDoctorSelector({
  doctors,
  currentMainId,
}: {
  doctors: DoctorProfile[];
  currentMainId: string | null;
}) {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleChange = async (doctorId: string) => {
    setSaving(true);
    try {
      await setDoc(
        doc(db, "settings", "general"),
        { mainDoctorId: doctorId },
        { merge: true },
      );
      router.refresh();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-[#DADCE0] shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <h3 className="text-lg font-medium text-[#202124]">
          Карточка на главном экране
        </h3>
      </div>
      <p className="text-sm text-[#5F6368]">
        Выберите врача, который будет отображаться на главной странице сайта
        (секция ТОП врач).
      </p>

      <div className="flex items-center gap-4 max-w-md mt-4">
        <Select
          value={currentMainId || ""}
          onValueChange={handleChange}
          disabled={saving}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите врача..." />
          </SelectTrigger>
          <SelectContent>
            {doctors.map((doc) => (
              <SelectItem key={doc.id} value={doc.id}>
                {doc.name?.ru || "Без имени"} —{" "}
                {doc.specialty?.ru || "Нет специальности"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {saving && <Loader2 className="w-5 h-5 animate-spin text-[#1A73E8]" />}
      </div>
    </div>
  );
}
