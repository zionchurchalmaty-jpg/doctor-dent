"use server";

import { getPublishedContent } from "@/lib/firestore/content";
import { DoctorProfile } from "@/lib/firestore/types";

export async function getSearchFilters(locale: "ru" | "kz") {
  const doctors = (await getPublishedContent(
    "doctors",
  )) as unknown as DoctorProfile[];

  const specialties = new Set<string>();

  doctors.forEach((doc) => {
    if (doc.specialty?.[locale]) {
      specialties.add(doc.specialty[locale]);
    }
  });

  return {
    cities: [],
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
      ? doc.location?.cityId === city
      : true;
      
    const matchSpecialty = specialty
      ? doc.specialty?.[locale]?.toLowerCase().includes(specialty.toLowerCase())
      : true;

    return matchCity && matchSpecialty;
  });
}