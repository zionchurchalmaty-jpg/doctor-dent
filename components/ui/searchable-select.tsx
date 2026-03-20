"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  subLabel?: string;
}

interface SearchableSelectProps {
  items: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}

export function SearchableSelect({
  items,
  value,
  onChange,
  placeholder = "Выберите значение...",
  searchPlaceholder = "Поиск...",
  emptyText = "Ничего не найдено",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.value === value);

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.subLabel?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedItem ? "text-foreground" : "text-muted-foreground"}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border rounded-md shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center px-3 py-2 border-b bg-gray-50/50">
            <Search className="h-4 w-4 mr-2 text-gray-400" />
            <input
              type="text"
              className="flex-1 outline-none text-sm bg-transparent placeholder:text-gray-400"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.value}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    onChange(item.value);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  <span className="font-medium text-gray-900">{item.label}</span>
                  {item.subLabel && <span className="text-gray-400 text-xs ml-2">{item.subLabel}</span>}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-gray-500">{emptyText}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}