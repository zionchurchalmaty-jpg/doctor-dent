"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CaseFilter from "./CaseFilter";
import CaseCard from "./CaseCard";

interface CasesClientProps {
  initialCases: any[];
  doctorsList: { id: string; name: string }[];
  clinicsList: string[];
}

export default function CasesClient({
  initialCases,
  doctorsList,
  clinicsList,
}: CasesClientProps) {
  const searchParams = useSearchParams();
  const doctorFromUrl = searchParams.get("doctor") || "";

  const [selectedDoctor, setSelectedDoctor] = useState(doctorFromUrl);
  const [selectedClinic, setSelectedClinic] = useState("");

  useEffect(() => {
    if (doctorFromUrl) {
      setSelectedDoctor(doctorFromUrl);
    }
  }, [doctorFromUrl]);

  const filteredCases = useMemo(() => {
    return initialCases.filter((item) => {
      const matchDoctor = selectedDoctor
        ? item.doctorId === selectedDoctor
        : true;
      const matchClinic = selectedClinic
        ? item.clinicName === selectedClinic
        : true;

      return matchDoctor && matchClinic;
    });
  }, [initialCases, selectedDoctor, selectedClinic]);

  return (
    <div className="px-6 mb-16 flex-grow">
      <CaseFilter
        doctors={doctorsList}
        clinics={clinicsList}
        selectedDoctor={selectedDoctor}
        selectedClinic={selectedClinic}
        onDoctorChange={setSelectedDoctor}
        onClinicChange={setSelectedClinic}
      />

      <div className="max-w-7xl mx-auto mt-12">
        <div className="mb-6">
          <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wider">
            Найдено кейсов:{" "}
            <span className="font-bold text-gray-900">
              {filteredCases.length}
            </span>
          </h2>
        </div>
{filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((item) => (
              <CaseCard
                key={item.id}
                id={item.id}
                slug={item.slug}
                tags={item.tags || []}
                
                title={item.title?.ru || (typeof item.title === "string" ? item.title : "Без названия")}
                doctorName={item.doctorName?.ru || (typeof item.doctorName === "string" ? item.doctorName : "Врач не указан")}
                doctorSlug={item.doctorSlug}
                problem={item.description?.ru || (typeof item.description === "string" ? item.description : "Описание отсутствует")}
                duration={item.duration?.ru || (typeof item.duration === "string" ? item.duration : "-")}
                
                price={item.price ? `${item.price} ₸` : "По запросу"}
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            Кейсы по заданным параметрам не найдены.
          </div>
        )}
      </div>
    </div>
  );
}
