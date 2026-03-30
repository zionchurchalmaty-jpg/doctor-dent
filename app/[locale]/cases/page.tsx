import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CasesClient from "@/components/cases/CasesClient";
import { getPublishedContent } from "@/lib/firestore/content";
import { DoctorProfile } from "@/lib/firestore/types";

export const dynamic = "force-dynamic";

export default async function CasesPage() {
  const rawCases = await getPublishedContent("cases");
  
  const rawDoctors = await getPublishedContent("doctors");
  const doctors = rawDoctors as unknown as DoctorProfile[];

  const doctorsList = doctors.map(doc => ({
    id: doc.id,
    name: doc.name?.ru || "Неизвестный врач"
  }));

  const clinicsSet = new Set<string>();
  doctors.forEach(doc => {
    if (doc.location?.address?.ru) {
      clinicsSet.add(doc.location.address.ru); 
    }
  });
  const clinicsList = Array.from(clinicsSet);

const casesWithMeta = rawCases.map((c: any) => {
    const doctorRef = doctors.find(d => d.id === c.doctorId);
    return {
      ...c,
      doctorName: doctorRef?.name?.ru || "Врач не указан",
      doctorSlug: doctorRef?.slug || "",
      clinicName: doctorRef?.location?.address?.ru || ""
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Hero 
        variant="cases" 
        title="Кейсы врачей" 
        stats={{ 
          cases: rawCases.length,
          doctors: doctors.length, 
          successRate: "98%" 
        }}
      />

      <CasesClient 
        initialCases={casesWithMeta} 
        doctorsList={doctorsList}
        clinicsList={clinicsList}
      />

    </main>
  );
}