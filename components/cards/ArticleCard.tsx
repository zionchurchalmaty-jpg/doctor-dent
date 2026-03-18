import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface ArticleCardProps {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

export default function ArticleCard({
  id,
  image,
  category,
  date,
  title,
  excerpt,
  link,
}: ArticleCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Дата не указана";

  return (
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full border border-gray-100">
      <div className="relative h-[200px] w-full shrink-0">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
            {category}
          </span>
          <div className="flex items-center text-gray-400 text-xs font-medium gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </div>
        </div>

        <h3 className="text-[17px] font-bold text-gray-900 leading-snug mb-3">
          {title}
        </h3>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex-grow" />

        <Link
          href={link}
          className="flex items-center text-[13px] font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wide"
        >
          Читать далее <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
      </div>
    </div>
  );
}
