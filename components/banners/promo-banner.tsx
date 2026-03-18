import { ReactNode } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  variant?: "yellow" | "orange";
  icon?: ReactNode;
}

export function PromoBanner({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink,
  variant = "yellow",
  icon 
}: PromoBannerProps) {
  
  const styles = {
    yellow: {
      wrapper: "bg-[#FFEAC2] border-[#FFD075]",
      iconBg: "bg-[#FFB020]",
      button: "bg-[#FFB020] hover:bg-[#F0A010] shadow-sm",
    },
    orange: {
      wrapper: "bg-white border-gray-200 shadow-sm",
      iconBg: "bg-[#FF5A00]",
      button: "bg-[#FF5A00] hover:bg-[#E04D00]",
    }
  };

  const currentStyle = styles[variant];
  
  const DisplayIcon = icon || <Star className="w-6 h-6 text-white fill-white" />;

  return (
    <div className={`border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${currentStyle.wrapper}`}>
      
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${currentStyle.iconBg}`}>
          {DisplayIcon}
        </div>
        
        <div>
          <h4 className="text-lg font-bold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>
      </div>

      <Link 
        href={buttonLink}
        className={`w-full md:w-auto px-6 py-3 transition-colors text-white font-semibold rounded-xl text-sm whitespace-nowrap text-center ${currentStyle.button}`}
      >
        {buttonText}
      </Link>
      
    </div>
  );
}