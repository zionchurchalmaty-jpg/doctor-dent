import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CaseCardProps {
  id: string;
  category: string;
  title: string;
  doctorName: string;
  problem: string;
  duration: string;
  price: string;
  doctorSlug?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function CaseCard({
  id,
  category,
  title,
  doctorName,
  problem,
  duration,
  price,
  doctorSlug,
  beforeImage,
  afterImage,
}: CaseCardProps) {

  const safeBeforeImage = beforeImage || "/images/placeholder.png"; 
  const safeAfterImage = afterImage || "/images/placeholder.png";

  return (
    <div className="flex flex-col bg-white rounded-[24px] shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden h-full">
      <div className="flex w-full h-48 relative shrink-0">
        <div className="w-1/2 relative border-r border-white">
          <span className="absolute top-3 left-3 bg-[#EF4444] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded z-10">
            До
          </span>
          <Image src={safeBeforeImage} alt="До" fill className="object-cover" />
        </div>
        <div className="w-1/2 relative">
          <span className="absolute top-3 right-3 bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded z-10">
            После
          </span>
          <Image src={safeAfterImage} alt="После" fill className="object-cover" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-blue-50 text-[#2563EB] text-xs font-semibold rounded-full mb-3">
            {category}
          </span>
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-4">Врач: {doctorName}</p>
        </div>

        <div className="text-sm text-gray-600 mb-6 flex-grow">
          <span className="font-semibold text-gray-900">Проблема:</span>{" "}
          <span className="line-clamp-3">{problem}</span>
        </div>

        <div className="flex flex-col gap-2 mb-6 text-sm">
          <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-gray-500">Срок лечения:</span>
            <span className="font-medium text-gray-900">{duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Стоимость:</span>
            <span className="font-bold text-[#2563EB]">{price}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <Link
            href={`/cases/${id}`}
            className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors"
          >
            Посмотреть кейс <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
<Link
            href={`/doctors/${doctorSlug}`} 
            className="w-full bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors"
          >
            Записаться к этому врачу <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}