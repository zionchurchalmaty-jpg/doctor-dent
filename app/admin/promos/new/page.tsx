import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PromoForm } from "@/components/admin/promo-form";

export const metadata: Metadata = {
  title: "Добавить акцию | Админка",
};

export default function NewPromoPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 md:p-8">
      <div className="max-w-4xl mx-auto mb-6 flex items-center gap-4">
        <Link 
          href="/admin/promos" 
          className="p-2 rounded-full hover:bg-[#FFEAC2] text-[#5F6368] hover:text-[#FF5A00] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-medium text-[#202124]">Добавление акции</h1>
      </div>

      <PromoForm />
    </div>
  );
}