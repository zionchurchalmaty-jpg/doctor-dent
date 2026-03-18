"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2 } from "lucide-react";
import { getSearchFilters } from "@/lib/actions/search";

export default function SearchWidget() {
  const t = useTranslations("HomePage.Hero");
  const locale = useLocale() as "ru" | "kz";
  const router = useRouter();

  const [city, setCity] = useState("");
  const [direction, setDirection] = useState("");

  const [dbCities, setDbCities] = useState<string[]>([]);
  const [dbDirections, setDbDirections] = useState<string[]>([]);

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDirectionDropdown, setShowDirectionDropdown] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await getSearchFilters(locale);
        setDbCities(filters.cities);
        setDbDirections(filters.specialties);
      } catch (error) {
        console.error("Ошибка загрузки фильтров:", error);
      }
    };
    fetchFilters();
  }, [locale]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            );
            const data = await res.json();
            const detectedCity =
              data.address.city || data.address.town || data.address.village;
            if (detectedCity) {
              setCity(detectedCity);
            }
          } catch (error) {
            console.error("Ошибка геолокации:", error);
          } finally {
            setIsLoadingLocation(false);
          }
        },
        () => setIsLoadingLocation(false),
      );
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.append("city", city);
    if (direction) params.append("specialty", direction);

    router.push(`/${locale}/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white text-gray-900 p-6 rounded-[24px] shadow-lg max-w-lg relative z-20"
    >
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1 relative">
          <label className="text-xs text-gray-500 font-medium">
            {t("directionLabel")}
          </label>
          <div className="flex items-center border rounded-xl px-3 py-2 bg-white relative focus-within:border-blue-500 transition-colors">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              onFocus={() => setShowDirectionDropdown(true)}
              onBlur={() =>
                setTimeout(() => setShowDirectionDropdown(false), 200)
              }
              placeholder={t("directionPlaceholder")}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          {showDirectionDropdown && dbDirections.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg overflow-hidden z-30 max-h-48 overflow-y-auto">
              {dbDirections
                .filter((d) =>
                  d.toLowerCase().includes(direction.toLowerCase()),
                )
                .map((dir, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                    onMouseDown={() => setDirection(dir)}
                  >
                    {dir}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="space-y-1 relative">
          <label className="text-xs text-gray-500 font-medium flex justify-between">
            {t("cityLabel")}
          </label>
          <div className="flex items-center border rounded-xl px-3 py-2 bg-white relative focus-within:border-blue-500 transition-colors">
            {isLoadingLocation ? (
              <Loader2 className="w-4 h-4 text-blue-500 mr-2 shrink-0 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            )}
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => setShowCityDropdown(true)}
              onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
              placeholder={
                isLoadingLocation ? "Поиск..." : t("cityPlaceholder")
              }
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          {showCityDropdown && dbCities.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg overflow-hidden z-30 max-h-48 overflow-y-auto">
              {dbCities
                .filter((c) => c.toLowerCase().includes(city.toLowerCase()))
                .map((c, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                    onMouseDown={() => setCity(c)}
                  >
                    {c}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
      >
        {t("searchBtn")}
      </button>
    </form>
  );
}
