import { Metadata } from "next";
import { ContentForm } from "@/components/admin/content-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Новый кейс | Админка",
};

export default function NewCasePage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#202124] p-6 md:p-8">
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <Link 
          href="/admin/cases" 
          className="p-2 rounded-full hover:bg-[#E8F0FE] text-[#5F6368] hover:text-[#1A73E8] transition-colors"
          title="Назад к списку"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-medium text-[#202124]">Новый кейс</h1>
      </div>

      <ContentForm contentType="cases" />
    </div>
  );
}