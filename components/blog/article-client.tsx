"use client";

import { useState } from "react";
import { Lock as LockIcon, Unlock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ArticleClientProps {
  content: string;
  previewContent?: string;
  isPaid: boolean;
  correctPassword?: string;
  locale: string;
}

export function ArticleClient({
  content,
  previewContent,
  isPaid,
  correctPassword,
  locale,
}: ArticleClientProps) {
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const translations = {
    ru: {
      unlocked: "Полный доступ открыт",
      paidTitle: "Это приватный материал",
      paidDesc: "Для прочтения полного материала получите пароль у администрации. После получения кода введите его ниже.",
      buyBtn: "Купить доступ (WhatsApp)",
      alreadyHave: "Уже есть пароль?",
      placeholder: "Введите ваш пароль",
      unlockBtn: "Разблокировать контент",
      wrongPass: "Неверный пароль",
    },
    kz: {
      unlocked: "Толық қолжетімділік ашылды",
      paidTitle: "Бұл жабық материал",
      paidDesc: "Толық материалды оқу үшін әкімшіліктен құпия сөзді алыңыз. Кодты алғаннан кейін оны төменде енгізіңіз.",
      buyBtn: "Қолжетімділікті сатып алу (WhatsApp)",
      alreadyHave: "Құпия сөз бар ма?",
      placeholder: "Құпия сөзді енгізіңіз",
      unlockBtn: "Мазмұнды ашу",
      wrongPass: "Құпия сөз қате",
    }
  };

  const strings = translations[locale as 'ru' | 'kz'] || translations.ru;

  if (!isPaid) {
    return (
      <div
        className="prose prose-lg prose-blue max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-10">
      {isUnlocked ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2 text-green-600 font-bold mb-8 bg-green-50 p-3 rounded-lg w-fit border border-green-100">
            <Unlock className="w-5 h-5" /> {strings.unlocked}
          </div>
          <div
            className="prose prose-lg prose-blue max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          {previewContent && (
            <div className="relative mb-12">
              <div 
                className="prose prose-lg prose-blue max-w-none text-gray-800 opacity-60 pointer-events-none select-none"
                dangerouslySetInnerHTML={{ __html: previewContent }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>
          )}

          <div className="bg-[#F8F9FA] border-2 border-[#1A73E8]/10 rounded-[2rem] p-8 md:p-14 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 bg-[#E8F0FE] text-[#1A73E8] rounded-full flex items-center justify-center mx-auto mb-8">
              <LockIcon className="w-10 h-10" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#202124]">
              {strings.paidTitle}
            </h3>

            <p className="text-lg text-[#5F6368] mb-10 leading-relaxed">
              {strings.paidDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="https://wa.me/77052793078"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 h-14 bg-[#1A73E8] text-white rounded-2xl font-bold text-lg hover:bg-[#1557B0] transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                {strings.buyBtn}
              </a>
            </div>

            <div className="max-w-xs mx-auto border-t border-gray-200 pt-10">
              <p className="text-sm font-bold text-[#202124] uppercase tracking-wider mb-4">
                {strings.alreadyHave}
              </p>
              <form onSubmit={handleUnlock} className="space-y-4">
                <Input
                  type="password"
                  placeholder={strings.placeholder}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className={`h-12 text-center text-lg rounded-xl border-gray-300 focus:border-[#1A73E8] transition-all ${
                    error ? "border-red-500 ring-1 ring-red-500" : ""
                  }`}
                />
                {error && (
                  <p className="text-red-500 text-sm font-medium">
                    {strings.wrongPass}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full h-12 border-[#1A73E8] text-[#1A73E8] hover:bg-[#E8F0FE] rounded-xl font-bold"
                >
                  {strings.unlockBtn}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}