import { Advantages } from "@/components/about/Advantages";
import { ImportantInfo } from "@/components/about/ImportantInfo";
import { Mission } from "@/components/about/Mission";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import Hero from "@/components/Hero"; 
import { getPublishedContent } from "@/lib/firestore/content";

export const revalidate = 3600; 

export default async function AboutPage() {
  const doctors = await getPublishedContent("doctors");

  const uniqueCities = new Set();
  doctors.forEach((doc: any) => {
    if (doc.location?.cityId) {
      uniqueCities.add(doc.location.cityId);
    } else if (doc.location?.address?.ru) {
      uniqueCities.add(doc.location.address.ru.split(",")[0]);
    }
  });

  const citiesCount = uniqueCities.size > 0 ? uniqueCities.size : 1;

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      <Hero 
        variant="about" 
        stats={{
          doctors: doctors.length,
          cities: citiesCount
        }}
      />
      <WhoWeAre />
      <Advantages />
      <Mission />
      <ImportantInfo />
    </main>
  );
}