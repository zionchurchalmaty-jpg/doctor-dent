"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContentGridProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  items: React.ReactNode[];
  rows?: number;
  bottomContent?: React.ReactNode;
  showPagination?: boolean;
}

export function ContentGrid({
  title,
  subtitle,
  icon,
  items,
  rows = 1,
  bottomContent,
  showPagination = false,
}: ContentGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = rows * 3;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-8 md:py-10 px-4 md:px-8">
      {(title || subtitle) && (
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            {icon && <div className="text-yellow-400 shrink-0">{icon}</div>}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{title}</h2>
          </div>
          {subtitle && <div className="text-gray-500 mt-2 text-sm md:text-base">{subtitle}</div>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {currentItems}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 md:mt-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm font-medium text-gray-700 px-4">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {bottomContent && <div className="mt-8 md:mt-10">{bottomContent}</div>}
    </div>
  );
}