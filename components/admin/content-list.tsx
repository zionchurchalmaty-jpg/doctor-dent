"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  CircleDashed,
  ExternalLink,
} from "lucide-react";
import { Timestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";
import { ContentType } from "@/lib/firestore/types";

interface ContentListProps {
  items: any[];
  contentType: ContentType | "consents" | "leads";
  onDelete?: (id: string) => void;
}

const formatDate = (val: any) => {
  if (!val) return { date: "—", time: "" };
  let date: Date;
  if (val instanceof Timestamp) date = val.toDate();
  else if (val?.seconds) date = new Date(val.seconds * 1000);
  else date = new Date(val);

  return {
    date: date.toLocaleDateString("ru-RU"),
    time: date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export function ContentList({
  items,
  contentType,
  onDelete,
}: ContentListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const isSimpleMessage = contentType === "leads" || contentType === "consents";

  const config: Record<
    string,
    { basePath: string; publicPath: string; label: string; meta: string }
  > = {
    blog: {
      basePath: "/admin/blog",
      publicPath: "",
      label: "Статья",
      meta: "Теги",
    },
    cases: {
      basePath: "/admin/cases",
      publicPath: "/cases",
      label: "Проект",
      meta: "Теги",
    },
    leads: {
      basePath: "/admin/leads",
      publicPath: "",
      label: "Клиент",
      meta: "Телефон",
    },
    doctors: {
      basePath: "/admin/doctors",
      publicPath: "/doctor",
      label: "Врач",
      meta: "Инфо",
    },
    consents: {
      basePath: "/admin/consents",
      publicPath: "",
      label: "Пользователь",
      meta: "Телефон",
    },
  };

  const currentConfig = config[contentType as string] || {
    basePath: "#",
    publicPath: "",
    label: "Запись",
    meta: "Инфо",
  };

  const filteredItems = items.filter((item: any) => {
    const s = search.toLowerCase();
    return (
      (item.title || "").toLowerCase().includes(s) ||
      (item.excerpt || "").toLowerCase().includes(s) ||
      (item.content || "").toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {!isSimpleMessage && (
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setStatusFilter("all")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-all",
                statusFilter === "all"
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              Все
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-all flex items-center gap-1.5",
                statusFilter === "published"
                  ? "bg-white shadow-sm text-green-700"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Публикации
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-all flex items-center gap-1.5",
                statusFilter === "draft"
                  ? "bg-white shadow-sm text-amber-700"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <CircleDashed className="w-3.5 h-3.5" /> Черновики
            </button>
          </div>
        )}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-4">{currentConfig.label}</th>
              <th className="px-6 py-4">
                {contentType === "leads" ? "Сообщение" : currentConfig.meta}
              </th>
              <th className="px-6 py-4">Дата</th>
              <th className="px-6 py-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredItems.map((item: any) => {
              if (
                !isSimpleMessage &&
                statusFilter !== "all" &&
                item.status !== statusFilter
              )
                return null;

              const { date, time } = formatDate(item.date);

              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 align-top">
                    <div className="font-medium text-slate-900 flex items-center gap-2">
                      {item.title}
                      {!isSimpleMessage && item.isSeo && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full">
                          SEO СТАТЬЯ
                        </span>
                      )}
                    </div>
                    <div className="font-medium text-slate-900">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {item.excerpt}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 align-top max-w-xs">
                    {isSimpleMessage ? (
                      <div className="whitespace-pre-wrap break-words text-sm leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                        {item.content || "—"}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded border border-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top whitespace-nowrap">
                    <div className="text-slate-700">{date}</div>
                    <div className="text-xs text-slate-400">{time}</div>
                  </td>
                  <td className="px-6 py-4 align-top text-right">
                    <div className="flex justify-end gap-1">
                      {!isSimpleMessage &&
                        item.slug &&
                        item.status === "published" && (
                          <a
                            href={
                              item.isSeo
                                ? `/${item.slug}`
                                : `${currentConfig.publicPath}/${item.slug}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-[#1A73E8] hover:bg-blue-50 rounded transition-colors"
                            title="Открыть на сайте"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                      {!isSimpleMessage && (
                        <Link
                          href={`${currentConfig.basePath}/${item.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Редактировать"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-sm">
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
