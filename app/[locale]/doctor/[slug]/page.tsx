import { notFound } from "next/navigation";
import { getContentBySlug, getContentById } from "@/lib/firestore/client-content";
import { DoctorProfile } from "@/lib/firestore/types";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import { DoctorInfo } from "@/components/doctors/DoctorInfo";
import { DoctorExperience } from "@/components/doctors/DoctorExperience";
import { DoctorShowcase } from "@/components/doctors/DoctorShowcase";
import { DoctorPricesFaq } from "@/components/doctors/DoctorPricesFaq";
import { DoctorFooter } from "@/components/doctors/DoctorFooter";
import { ViewTracker } from "@/components/doctors/ViewTracker";

interface DoctorPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DoctorPageProps) {
  const { slug, locale } = await params;

  let doc = await getContentBySlug(slug, "doctors");
  if (!doc) {
    doc = await getContentById(slug, "doctors");
  }
  
  if (!doc) return {};

  const doctor = doc as unknown as DoctorProfile;
  const name = doctor.name?.[locale as "ru" | "kz"] || doctor.name?.ru || "Врач";

  return {
    title: doctor.seo?.metaTitle || `${name} — Запись на прием`,
    description: doctor.seo?.metaDescription || `Запишитесь на прием к врачу: ${name}`,
  };
}

export default async function DoctorProfilePage({ params }: DoctorPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  let content = await getContentBySlug(slug, "doctors");
  if (!content) {
    content = await getContentById(slug, "doctors");
  }
  if (!content || content.status !== "published") {
    notFound();
  }
  const doctor = content as unknown as DoctorProfile;

  return (

    <main className="min-h-screen bg-white pb-20">
      <ViewTracker doctorId={doctor.id} />
      <Hero variant="doctor" doctor={doctor} />
      <DoctorInfo doctor={doctor} />
      <DoctorExperience doctor={doctor} />
      <DoctorShowcase doctor={doctor} />
      <DoctorPricesFaq doctor={doctor} />
      <DoctorFooter doctor={doctor} />
    </main>
  );
}