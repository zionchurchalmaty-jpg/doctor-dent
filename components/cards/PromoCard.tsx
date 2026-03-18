import Image from "next/image";
import Link from "next/link";

export interface PromoCardProps {
  image: string;
  badge?: string;
  title: string;
  description: string;
  newPrice: string | number;
  oldPrice?: string | number;
  buttonText: string;
  link: string;
}

export default function PromoCard({
  image,
  badge,
  title,
  description,
  newPrice,
  oldPrice,
  buttonText,
  link,
}: PromoCardProps) {
  const formatPrice = (value: string | number) => {
    if (!value) return null;
    const numericValue =
      typeof value === "string" ? Number(value.replace(/\D/g, "")) : value;
    return new Intl.NumberFormat("ru-RU").format(numericValue);
  };

  const formattedNewPrice = formatPrice(newPrice);
  const formattedOldPrice = oldPrice ? formatPrice(oldPrice) : null;

  const isFromPrice =
    typeof newPrice === "string" && newPrice.toLowerCase().includes("от");

  return (
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full border border-gray-100">
      <div className="relative h-48 w-full shrink-0">
        <Image src={image} alt={title} fill className="object-cover" />

        {badge && (
          <div className="absolute top-4 right-4 bg-[#FF5A00] text-white text-[11px] font-bold px-3 py-1.5 rounded-full z-10 uppercase tracking-wide">
            {badge}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6 flex-grow">{description}</p>

        <div className="flex items-center gap-3 mb-6">
          <p className="text-2xl font-bold text-[#ff5722]">
            {isFromPrice && (
              <span className="text-lg mr-1 tracking-normal">от</span>
            )}
            {formattedNewPrice} ₸
          </p>
          {formattedOldPrice && (
            <p className="text-sm text-gray-400 line-through decoration-gray-300">
              {formattedOldPrice} ₸
            </p>
          )}
        </div>

        <Link
          href={link}
          className="w-full bg-[#ff5722] hover:bg-[#e64a19] text-white font-medium text-center py-3 rounded-xl transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
