"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContentGridProps {
  title?: React.ReactNode;
  subtitle?: string;
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
    <div className="w-full max-w-7xl mx-auto py-10">
      {(title || subtitle) && (
        <div className="mb-8">
          <div className="flex items-center gap-3">
            {icon && <div className="text-yellow-400">{icon}</div>}
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          {subtitle && <p className="text-gray-500 mt-2 text-sm">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm font-medium text-gray-700 px-4">
            Страница {currentPage} из {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {bottomContent && <div className="mt-10">{bottomContent}</div>}
    </div>
  );
}
