"use client";

import { AdditionalServices } from "@/components/for-doctors/AdditionalServices";
import { CallToAction } from "@/components/for-doctors/CallToAction";
import { IncludedFeatures } from "@/components/for-doctors/IncludedFeatures";
import { PricingPlans } from "@/components/for-doctors/PricingPlans";
import { Terms } from "@/components/for-doctors/Terms";

import Hero from "@/components/Hero";

export default function RentPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Hero variant="rent" />
      
      <IncludedFeatures />
      <PricingPlans />
      <AdditionalServices />
      <CallToAction />
      <Terms />
    </main>
  );
}