"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export function AutocompleteInput({ value, onChange, options, placeholder }: AutocompleteInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes((value || "").toLowerCase())
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        value={value || ""}
        onChange={(e) => {
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder={placeholder}
        autoComplete="off"
      />
      
      {showDropdown && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 max-h-48 overflow-y-auto">
          {filteredOptions.map((opt, idx) => (
            <div
              key={idx}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => {
                onChange(opt);
                setShowDropdown(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}