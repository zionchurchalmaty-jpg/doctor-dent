"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  LogOut,
  Globe,
  Menu,
  X,
  Tags,
} from "lucide-react";


const navItems = [
  { name: "Обзор", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Блог", href: "/admin/blog", icon: FileText },
  { name: "Врачи", href: "/admin/doctors", icon: Users },
  { name: "Акции", href: "/admin/promos", icon: Tags },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <>
      {/* Mobile top navigation bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E7EB] px-4 flex items-center justify-between z-[60]">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-bold text-lg text-[#202124]"
        >
          <div className="w-7 h-7 bg-[#1A73E8] rounded-lg flex items-center justify-center text-white text-sm">
            D
          </div>
          FindDoctor
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-[#F1F3F4] rounded-lg transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop for mobile navigation */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[#E5E7EB] flex flex-col z-[56]
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-16 hidden lg:flex items-center border-b border-[#F3F4F6] px-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-bold text-xl text-[#202124] hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center text-white text-lg">
              D
            </div>
            FindDoctor
          </Link>
        </div>

        <div className="h-16 lg:hidden" />

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
          flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-full transition-colors mr-2
          ${
            isActive
              ? "bg-[#E8F0FE] text-[#1967D2]"
              : "text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]"
          }
        `}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-[#1967D2]" : "text-[#5F6368]"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#F3F4F6] space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] rounded-r-full w-full transition-colors mr-2"
          >
            <Globe className="w-5 h-5" />
            Открыть сайт
          </Link>

          <button
            onClick={handleLogOut}
            type="button"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#5F6368] hover:bg-[#FCE8E6] hover:text-[#D93025] rounded-r-full w-full transition-colors mr-2 text-left"
          >
            <LogOut className="w-5 h-5" />
            Выйти
          </button>
        </div>
      </aside>
    </>
  );
}
