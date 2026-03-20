import { Metadata } from "next";
import { AuthProvider } from "@/components/admin/auth-provider";
import { AdminGate } from "@/components/admin/admin-gate";

export const metadata: Metadata = {
  title: "DentDoctor | Admin Panel",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminGate>{children}</AdminGate>
    </AuthProvider>
  );
}