"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, Save, User } from "lucide-react";
import { DoctorProfile } from "@/lib/firestore/types";
import { updateTopDoctorsIds } from "@/lib/firestore/client-content";
import { useRouter } from "next/navigation";

interface TopDoctorsManagerProps {
  allDoctors: DoctorProfile[];
  initialTopIds: string[];
}

const RANK_COLORS = [
  "bg-yellow-100 border-yellow-400 text-yellow-700",
  "bg-gray-100 border-gray-400 text-gray-700",
  "bg-orange-100 border-orange-400 text-orange-800",
];

export function TopDoctorsManager({
  allDoctors,
  initialTopIds,
}: TopDoctorsManagerProps) {
  const router = useRouter();
  
  const [selectedIds, setSelectedIds] = useState<string[]>([
    initialTopIds[0] || "",
    initialTopIds[1] || "",
    initialTopIds[2] || "",
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSelect = (index: number, doctorId: string) => {
    const newSelected = [...selectedIds];
    newSelected[index] = doctorId;
    setSelectedIds(newSelected);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateTopDoctorsIds(selectedIds);
      alert("ТОП врачи успешно обновлены!");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            ТОП-3 Врача на главной
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Выберите врачей, которые будут отображаться в желтых карточках
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Сохранение..." : "Сохранить ТОП"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => {
          const selectedDoctor = allDoctors.find(
            (d) => d.id === selectedIds[index],
          );

          return (
            <div
              key={index}
              className="flex flex-col gap-4 p-5 rounded-2xl border border-gray-200 bg-gray-50"
            >
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit font-bold text-sm ${RANK_COLORS[index]}`}
              >
                <Trophy className="w-4 h-4" />
                {index + 1} Место
              </div>

              <select
                value={selectedIds[index]}
                onChange={(e) => handleSelect(index, e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
              >
                <option value="">-- Выберите врача --</option>
                {allDoctors.map((doc) => {
                  const isAlreadySelected =
                    selectedIds.includes(doc.id!) &&
                    selectedIds[index] !== doc.id;
                  return (
                    <option
                      key={doc.id}
                      value={doc.id}
                      disabled={isAlreadySelected}
                    >
                      {doc.name?.ru || "Без имени"}
                    </option>
                  );
                })}
              </select>

              {selectedDoctor ? (
                <div className="mt-2 flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-100">
                    {selectedDoctor.photo ? (
                      <Image
                        src={selectedDoctor.photo}
                        alt="Врач"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm line-clamp-1">
                      {selectedDoctor.name?.ru}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {selectedDoctor.specialty?.ru ||
                        "Специальность не указана"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-center h-[74px] border border-dashed border-gray-300 rounded-xl text-gray-400 text-sm">
                  Место свободно
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}