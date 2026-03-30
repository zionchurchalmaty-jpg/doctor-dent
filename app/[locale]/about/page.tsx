import { Advantages } from "@/components/about/Advantages";
import { ImportantInfo } from "@/components/about/ImportantInfo";
import { Mission } from "@/components/about/Mission";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import Hero from "@/components/Hero"; 


export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      <Hero variant="about" />
      <WhoWeAre />
      <Advantages />
      <Mission />
      <ImportantInfo />
    </main>
  );
}