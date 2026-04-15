import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import type { ContentType, Content, DoctorCategory, DoctorProfile } from "./types";
import { 
  getCollection, 
  serializeFirebaseData 
} from "./client-content";

export async function incrementDoctorViewsAdmin(id: string): Promise<void> {
  if (!id) return;
await adminDb!.collection("doctors").doc(id).update({    views: FieldValue.increment(1)
  });
}

export async function getTopDoctorsIdsAdmin(): Promise<string[]> {
  const snap = await adminDb!.collection("settings").doc("general").get();
  return snap.data()?.topDoctorsIds || ["", "", ""];
}

export async function updateTopDoctorsIdsAdmin(newIds: string[]): Promise<void> {
  await adminDb!.collection("settings").doc("general").set(
    { topDoctorsIds: newIds }, 
    { merge: true }
  );
}

export async function getPublishedContentAdmin(type: ContentType, limitCount?: number): Promise<Content[]> {
  const collName = getCollection(type);
  let ref: any = adminDb!.collection(collName).where("status", "==", "published").orderBy("date", "desc");
  if (limitCount) ref = ref.limit(limitCount);
  
  const snapshot = await ref.get();
  const rawData = snapshot.docs.map((d: any) => ({ id: d.id, contentType: type, ...d.data() }));
  return serializeFirebaseData(rawData) as Content[];
}

export async function getContentByIdAdmin(id: string, type: ContentType, includeDrafts: boolean = false): Promise<Content | null> {
  if (!id || typeof id !== 'string') return null;
  const collName = getCollection(type);
  const docSnap = await adminDb!.collection(collName).doc(id).get();
  
  if (!docSnap.exists) return null;
  const data = docSnap.data()!;
  if (!includeDrafts && data.status === "draft") return null;
  
  const rawData = { id: docSnap.id, contentType: type, ...data };
  return serializeFirebaseData(rawData) as Content;
}

export async function getContentBySlugAdmin(slug: string, type: ContentType, includeDrafts: boolean = false): Promise<Content | null> {
  if (!slug || typeof slug !== 'string') return null;
  const collName = getCollection(type);
  
  let queryRef: any = adminDb!.collection(collName).where("slug", "==", slug);
  if (!includeDrafts) queryRef = queryRef.where("status", "==", "published");
  
  const snapshot = await queryRef.limit(1).get();
  if (snapshot.empty) return null;
  
  const docSnap = snapshot.docs[0];
  const rawData = { id: docSnap.id, contentType: type, ...docSnap.data() };
  return serializeFirebaseData(rawData) as Content;
}

export async function getAdminContentAdmin(type: ContentType): Promise<Content[]> {
  const collName = getCollection(type);
  const snapshot = await adminDb!.collection(collName).orderBy("date", "desc").get();
  const rawData = snapshot.docs.map((d: any) => ({ id: d.id, contentType: type, ...d.data() }));
  return serializeFirebaseData(rawData) as Content[];
}

export async function getDashboardStatsAdmin() {
  const [articles, cases] = await Promise.all([
    adminDb!.collection("articles").count().get(),
    adminDb!.collection("cases").count().get()
  ]);
  return {
    articlesCount: articles.data().count,
    casesCount: cases.data().count
  };
}

export async function getMainDoctorIdAdmin(): Promise<string | null> {
const snap = await adminDb!.collection("settings").doc("general").get();
  return snap.data()?.mainDoctorId || null;
}

export async function getCategoriesAdmin(): Promise<DoctorCategory[]> {
const snap = await adminDb!.collection("settings").doc("categories").get();  return snap.data()?.items || [];
}

export async function saveCategoriesAdmin(categories: DoctorCategory[]): Promise<void> {
  await adminDb!.collection("settings").doc("categories").set({ items: categories }, { merge: true });
}

export async function getDoctorsByCategoryAdmin(categoryId: string): Promise<DoctorProfile[]> {
  const snapshot = await adminDb!.collection("doctors")
    .where("status", "==", "published")
    .where("categoryId", "==", categoryId)
    .get();
    
  const rawData = snapshot.docs.map((d: any) => ({ id: d.id, contentType: "doctors", ...d.data() }));
  return serializeFirebaseData(rawData) as DoctorProfile[];
}