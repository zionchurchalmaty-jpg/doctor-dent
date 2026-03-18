import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="p-6 rounded-xl border border-[#DADCE0] bg-white shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#5F6368]">{title}</p>
          <h3 className="text-3xl font-normal text-[#202124] mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}