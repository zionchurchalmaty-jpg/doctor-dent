"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2 } from "lucide-react";
import { getSearchFilters } from "@/lib/actions/search";
import { CITIES } from "@/lib/cities";

export default function SearchWidget() {
  // Возвращаем переводы
  const t = useTranslations("HomePage.Hero");
  const router = useRouter();

  const [selectedCityId, setSelectedCityId] = useState("");
  const [cityInputText, setCityInputText] = useState("");
  
  const [direction, setDirection] = useState("");

  const [dbDirections, setDbDirections] = useState<string[]>([]);

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDirectionDropdown, setShowDirectionDropdown] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await getSearchFilters('ru');
        setDbDirections(filters.specialties || []);
      } catch (error) {
        console.error("Ошибка загрузки фильтров:", error);
      }
    };
    fetchFilters();
  }, []);

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
            const detectedCity = data.address.city || data.address.town || data.address.village;
            
            if (detectedCity) {
              const matchedCity = CITIES.find(
                (c) => c.name.ru.toLowerCase() === detectedCity.toLowerCase() || 
                       c.id.toLowerCase() === detectedCity.toLowerCase()
              );

              if (matchedCity) {
                setSelectedCityId(matchedCity.id);
                setCityInputText(matchedCity.name.ru);
              } else {
                setCityInputText(detectedCity);
              }
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
    if (selectedCityId) {
      params.append("city", selectedCityId);
    } else if (cityInputText) {
      const matched = CITIES.find(c => c.name.ru.toLowerCase().includes(cityInputText.toLowerCase()));
      if (matched) params.append("city", matched.id);
      else params.append("city", cityInputText);
    }
    
    if (direction) params.append("specialty", direction);

    // Роутинг без префикса языка
    router.push(`/search?${params.toString()}`);
  };

  const handleCitySelect = (cityObj: typeof CITIES[0]) => {
    setSelectedCityId(cityObj.id);
    setCityInputText(cityObj.name.ru);
    setShowCityDropdown(false);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white text-gray-900 p-6 rounded-[24px] shadow-lg max-w-lg relative z-20"
    >
      <div className="grid grid-cols-2 gap-4 mb-4">
        
        <div className="space-y-1 relative">
          <label className="text-xs text-gray-500 font-medium">
            {/* Перевод */}
            {t("directionLabel")}
          </label>
          <div className="flex items-center border rounded-xl px-3 py-2 bg-white relative focus-within:border-blue-500 transition-colors">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              onFocus={() => setShowDirectionDropdown(true)}
              onBlur={() => setTimeout(() => setShowDirectionDropdown(false), 200)}
              placeholder={t("directionPlaceholder")}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          {showDirectionDropdown && dbDirections.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg overflow-hidden z-30 max-h-48 overflow-y-auto">
              {dbDirections
                .filter((d) => d.toLowerCase().includes(direction.toLowerCase()))
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
            {/* Перевод */}
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
              value={cityInputText}
              onChange={(e) => {
                setCityInputText(e.target.value);
                setSelectedCityId("");
              }}
              onFocus={() => setShowCityDropdown(true)}
              onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
              placeholder={isLoadingLocation ? "Поиск..." : t("cityPlaceholder")}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          {showCityDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg overflow-hidden z-30 max-h-60 overflow-y-auto">
              {CITIES
                .filter((c) => c.name.ru.toLowerCase().includes(cityInputText.toLowerCase()))
                .map((cityObj) => (
                  <div
                    key={cityObj.id}
                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                    onMouseDown={() => handleCitySelect(cityObj)}
                  >
                    {cityObj.name.ru}
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
        {/* Перевод */}
        {t("searchBtn")}
      </button>
    </form>
  );
}