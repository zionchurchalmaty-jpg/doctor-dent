"use server";

import { getPublishedContent } from "@/lib/firestore/content";
import { DoctorProfile } from "@/lib/firestore/types";

export async function getSearchFilters(locale: "ru" | "kz") {
  const doctors = (await getPublishedContent(
    "doctors",
  )) as unknown as DoctorProfile[];

  const cities = new Set<string>();
  const specialties = new Set<string>();

  doctors.forEach((doc) => {
    const fullAddress = doc.location?.address?.[locale];
    const city = fullAddress ? fullAddress.split(",")[0] : null;
    if (city) cities.add(city);
    if (doc.specialty?.[locale]) {
      specialties.add(doc.specialty[locale]);
    }
  });

  return {
    cities: Array.from(cities),
    specialties: Array.from(specialties),
  };
}

export async function searchDoctors(
  locale: "ru" | "kz",
  city?: string,
  specialty?: string,
) {
  const doctors = (await getPublishedContent(
    "doctors",
  )) as unknown as DoctorProfile[];

  return doctors.filter((doc) => {
    const matchCity = city
      ? doc.location?.address?.[locale]
          ?.toLowerCase()
          .includes(city.toLowerCase())
      : true;
    const matchSpecialty = specialty
      ? doc.specialty?.[locale]?.toLowerCase().includes(specialty.toLowerCase())
      : true;

    return matchCity && matchSpecialty;
  });
}
