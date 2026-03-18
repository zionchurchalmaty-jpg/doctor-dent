"use client";

import { usePathname, useRouter, useParams } from "next/navigation";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const locale = (params?.locale as string) || "ru";

  const toggleLanguage = () => {
    const nextLocale = locale === "ru" ? "kz" : "ru";

    let pathWithoutLocale = pathname;
    if (pathname.startsWith(`/${locale}/`)) {
      pathWithoutLocale = pathname.replace(`/${locale}/`, "/");
    } else if (pathname === `/${locale}`) {
      pathWithoutLocale = "/";
    }

    let newPath;
    if (nextLocale === "ru") {
      newPath = pathWithoutLocale;
    } else {
      newPath = `/${nextLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    }

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    router.replace(newPath);
    router.refresh();
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      className="rounded-full px-4 h-9 flex items-center gap-2 hover:bg-gray-50"
    >
      <Languages />
      <span className="text-sm font-medium">
        {locale === "ru" ? "Қаз" : "Рус"}
      </span>
    </Button>
  );
}
