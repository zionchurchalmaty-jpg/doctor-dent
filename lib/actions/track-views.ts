"use server";

import { incrementDoctorViewsAdmin } from "@/lib/firestore/admin-content";

export async function trackDoctorViewAction(doctorId: string) {
  try {
    await incrementDoctorViewsAdmin(doctorId);
  } catch (error) {
    console.error("Ошибка при обновлении счетчика просмотров:", error);
  }
}