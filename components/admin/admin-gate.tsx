"use client";

import { useAuth } from "@/components/admin/auth-provider";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Loader2 } from "lucide-react";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, loading, signInWithGoogle, error, isAuthorized } = useAuth();

  {/* Display loading spinner during authentication check */}
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1A73E8]" />
      </div>
    );
  }

  {/* Show login screen if user is unauthenticated or unauthorized */}
  if (!user || !isAuthorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FA] px-4 text-center">
        <h1 className="text-2xl font-bold text-[#202124] mb-2">Админ-панель</h1>
        <p className="text-[#5F6368] mb-8 max-w-[280px]">
          Доступ ограничен. Войдите с разрешённого Google-аккаунта.
        </p>
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-3 bg-white border border-[#DADCE0] px-6 py-3 rounded-lg font-medium text-[#3C4043] hover:bg-[#F8F9FA] transition-all shadow-sm active:scale-95"
        >
          <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-5 h-5" alt="G" />
          Войти через Google
        </button>
        {error && <p className="mt-6 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-md">{error}</p>}
      </div>
    );
  }

  {/* Render admin layout for authorized users */}
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <AdminSidebar />
      <main className="min-h-screen pt-16 lg:pt-0 lg:pl-64 w-full">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}