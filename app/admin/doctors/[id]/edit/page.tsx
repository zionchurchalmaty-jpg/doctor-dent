import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getContentById, serializeFirebaseData } from "@/lib/firestore/client-content";
import { DoctorForm } from "@/components/admin/doctor-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDoctorPage({ params }: PageProps) {
  const { id } = await params;

  const rawDoctor = await getContentById(id, "doctors", true);

  if (!rawDoctor) {
    redirect("/admin/doctors");
  }

  const cleanDoctor = serializeFirebaseData(rawDoctor);

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <Link
          href="/admin/doctors"
          className="p-2 rounded-full hover:bg-[#E8F0FE] text-[#5F6368] hover:text-[#1A73E8] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-medium text-[#202124]">Редактирование врача</h1>
      </div>

      <DoctorForm initialData={cleanDoctor} isEditing={true} />
    </div>
  );
}