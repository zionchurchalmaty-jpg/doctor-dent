"use client";

import { Filter, ChevronDown } from "lucide-react";

interface CaseFilterProps {
  doctors: { id: string; name: string }[];
  clinics: string[];
  selectedDoctor: string;
  selectedClinic: string;
  onDoctorChange: (id: string) => void;
  onClinicChange: (clinic: string) => void;
}

export default function CaseFilter({
  doctors,
  clinics,
  selectedDoctor,
  selectedClinic,
  onDoctorChange,
  onClinicChange
}: CaseFilterProps) {
  return (
    <div className="bg-white rounded-[24px] shadow-lg p-6 max-w-5xl mx-auto relative z-20 -mt-8 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <h3 className="text-gray-900 font-semibold text-lg">Фильтры</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1 ml-1">Медицинский центр</label>
          <div className="relative">
            <select 
              value={selectedClinic}
              onChange={(e) => onClinicChange(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#2563EB] focus:border-[#2563EB] block px-4 py-3 pr-10 outline-none transition-colors cursor-pointer"
            >
              <option value="">Все клиники</option>
              {clinics.map((clinic, idx) => (
                <option key={idx} value={clinic}>{clinic}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1 ml-1">Врач</label>
          <div className="relative">
            <select 
              value={selectedDoctor}
              onChange={(e) => onDoctorChange(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#2563EB] focus:border-[#2563EB] block px-4 py-3 pr-10 outline-none transition-colors cursor-pointer"
            >
              <option value="">Все врачи</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}