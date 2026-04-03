"use client";

import {  
  Mail, 
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="bg-[#1D4ED8] py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Готовы начать?</h2>
      <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-[16px]">
        Свяжитесь с нами, и мы поможем создать вашу страницу и настроить продвижение
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-white text-[#2563EB] hover:bg-gray-50 rounded-xl px-8 h-12 font-medium flex items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95">
          <PhoneCall className="w-4 h-4" /> +7 (705) 279-30-78
        </Button>
        <Button className="bg-[#3B82F6] text-white hover:bg-blue-400 rounded-xl px-8 h-12 font-medium flex items-center gap-2 border-none transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95">
          <Mail className="w-4 h-4" /> andrey.chen73@gmail.com
        </Button>
      </div>
    </section>
  );
}