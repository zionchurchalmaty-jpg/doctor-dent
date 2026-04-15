import React from "react";
import Link from "next/link";
import { getDashboardStats, getAdminContent, getTopDoctorsIds, updateTopDoctorsIds, getCategories, saveCategories } from "@/lib/firestore/client-content";
import { StatCard } from "@/components/admin/stat-card";
import { FileText, Briefcase, Users } from "lucide-react";
import { DoctorProfile, DoctorCategory } from "@/lib/firestore/types";
import { TopDoctorsManager } from "@/components/admin/top-doctors-manager";
import { CategoriesManager } from "@/components/admin/categories-manager";

export const metadata = { title: "Обзор | Админ-панель SEOMAN" };

export default async function AdminDashboardPage() {
  const [stats, doctorsRaw, topIdsRaw, initialCategories] = await Promise.all([
    getDashboardStats(),
    getAdminContent("doctors"),
    getTopDoctorsIds(),
    getCategories()
  ]);

  const doctors = doctorsRaw as unknown as DoctorProfile[];

  const saveTopDoctors = async (newIds: string[]) => {
    "use server";
    await updateTopDoctorsIds(newIds);
  };

  const handleSaveCategories = async (newCats: DoctorCategory[]) => {
    "use server";
    await saveCategories(newCats);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#202124]">Обзор</h1>
        <p className="text-sm text-[#5F6368] mt-1">Сводка по сайту и настройки главной страницы</p>
      </div>

      <TopDoctorsManager 
        allDoctors={doctors} 
        initialTopIds={topIdsRaw} 
        onSave={saveTopDoctors} 
      />

      <CategoriesManager 
        initialCategories={initialCategories} 
        onSave={handleSaveCategories} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/doctors" className="block group">
           <StatCard title="Врачи" value={doctors.length} icon={Users} color="bg-[#E8F0FE] text-[#1967D2]" />
        </Link>
        <Link href="/admin/blog" className="block group">
          <StatCard title="Статьи" value={stats.articlesCount} icon={FileText} color="bg-[#CEEAD6] text-[#137333]" />
        </Link>
        <Link href="/admin/cases" className="block group">
          <StatCard title="Кейсы" value={stats.casesCount} icon={Briefcase} color="bg-[#FEF7E0] text-[#B06000]" />
        </Link>
      </div>
    </div>
  );
}