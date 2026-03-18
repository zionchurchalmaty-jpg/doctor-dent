import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DoctorForm } from "@/components/admin/doctor-form";

export const metadata: Metadata = {
  title: "Добавить врача | Админка",
};

export default function NewDoctorPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <Link 
          href="/admin/doctors" 
          className="p-2 rounded-full hover:bg-[#E8F0FE] text-[#5F6368] hover:text-[#1A73E8] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-medium text-[#202124]">Добавление врача</h1>
      </div>

      <DoctorForm />
    </div>
  );
}