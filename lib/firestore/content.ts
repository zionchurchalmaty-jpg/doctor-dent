import {
  collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs,
  query, where, orderBy, limit, Timestamp,
  setDoc, writeBatch
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getCountFromServer } from "firebase/firestore";
import type { ContentInput, ContentType, Content, DoctorCategory, DoctorProfile } from "./types";
import slugify from "slugify";

const COLLECTION_MAP: Record<ContentType, string> = {
  blog: "articles",
  cases: "cases",
  doctors: "doctors",
  promos: "promos",
};

const PLACEHOLDERS: Record<ContentType, string> = {
  blog: "/images/blog-placeholder.png",
  cases: "/images/case-placeholder.png",
  doctors: "/images/doctor-placeholder.png",
  promos: "/images/promo-placeholder.png",
};

export function generateSlug(title: string): string {
  return slugify(title, { lower: true, strict: true, locale: "ru" });
}

function getPlaceholder(type: ContentType, isSeo?: boolean): string {
  if (type === "blog" && isSeo) {
    return "/images/seo-placeholder.png";
  }
  return PLACEHOLDERS[type] || "/images/placeholder.png";
}

function getCollection(contentType: ContentType): string {
  return COLLECTION_MAP[contentType] ?? "articles";
}

const isServer = typeof window === "undefined";

async function getAdminDb() {
  if (!isServer) return null;
  const { adminDb } = await import("@/lib/firebase-admin"); 
  return adminDb;
}

export function serializeFirebaseData(data: any): any {
  if (data === null || data === undefined) return null;
  if (Array.isArray(data)) return data.map(item => serializeFirebaseData(item));
  
  if (data && typeof data === 'object' && (data._seconds !== undefined || typeof data.toDate === 'function')) {
    return typeof data.toDate === 'function' 
      ? data.toDate().toISOString() 
      : new Date(data._seconds * 1000).toISOString();
  }
  
  if (typeof data === 'object') {
    const result: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = serializeFirebaseData(data[key]);
      }
    }
    return result;
  }
  
  return data;
}

function toFirestoreData(input: any, authorId: string, authorName: string) {
  const now = Timestamp.now();
  
  const mainImageUrl = input.photo || input.image || getPlaceholder(input.contentType, input.isSeo);
  const titleText = input.title || input.name?.ru || input.name?.kz || "untitled";
  const slug = generateSlug(titleText);

  return {
    ...input,
    slug,
    isSeo: input.isSeo ?? false,
    image: mainImageUrl,
    seo: {
      metaTitle: input.seo?.metaTitle || "",
      metaDescription: input.seo?.metaDescription || "",
      ogImage: mainImageUrl,
      canonicalUrl: input.seo?.canonicalUrl || "",
      noIndex: input.seo?.noIndex || false,
      schemaMarkup: input.seo?.schemaMarkup || "",
      imageAlt: input.seo?.imageAlt || "",
      imageTitle: input.seo?.imageTitle || "",
      imageDescription: input.seo?.imageDescription || "",
    },
    date: input.date || now,
    updatedAt: now,
    createdBy: authorId,
    authorName,
  };
}


export async function getTopDoctorsIds(): Promise<string[]> {
  const adminDb = await getAdminDb();
  if (adminDb) {
    const snap = await adminDb.collection("settings").doc("general").get();
    return snap.data()?.topDoctorsIds || ["", "", ""];
  }
  const snap = await getDoc(doc(db, "settings", "general"));
  return snap.exists() ? (snap.data()?.topDoctorsIds || ["", "", ""]) : ["", "", ""];
}

export async function updateTopDoctorsIds(newIds: string[]): Promise<void> {
  const adminDb = await getAdminDb();
  
  if (adminDb) {
    await adminDb.collection("settings").doc("general").set(
      { topDoctorsIds: newIds }, 
      { merge: true }
    );
    return;
  }

  const ref = doc(db, "settings", "general");
  await setDoc(ref, { topDoctorsIds: newIds }, { merge: true });
}



export async function createContent(input: any, authorId: string, authorName: string): Promise<string> {  const coll = getCollection(input.contentType);
  const data = toFirestoreData(input, authorId, authorName);
  const ref = await addDoc(collection(db, coll), { ...data, createdAt: data.date });
  return ref.id;
}

export async function updateContent(id: string, input: any): Promise<void> {
  const coll = getCollection(input.contentType);
  const ref = doc(db, coll, id);
  const existing = await getDoc(ref);
  if (!existing.exists()) throw new Error("Document not found");

  const mainImageUrl = input.photo || input.image || getPlaceholder(input.contentType, input.isSeo);
  const titleText = input.title || input.name?.ru || input.name?.kz || "untitled";
  const slug = generateSlug(titleText);

  await updateDoc(ref, {
    ...input,
    slug,
    isSeo: input.isSeo ?? false,
    image: mainImageUrl,
    seo: { 
        ...(input.seo ?? existing.data()?.seo), 
        ogImage: mainImageUrl,
        schemaMarkup: input.seo?.schemaMarkup || existing.data()?.seo?.schemaMarkup || "",
    },
    updatedAt: Timestamp.now(),
  });
}

export async function deleteContent(id: string, contentType?: ContentType): Promise<void> {
  const coll = contentType ? getCollection(contentType) : null;
  if (coll) {
    const ref = doc(db, coll, id);
    if ((await getDoc(ref)).exists()) {
      await deleteDoc(ref);
      return;
    }
  }
  for (const c of ["articles", "cases", "doctors", "promos"]) {    const ref = doc(db, c, id);
    if ((await getDoc(ref)).exists()) {
      await deleteDoc(ref);
      return;
    }
  }
  throw new Error("Document not found");
}

export async function getPublishedContent(type: ContentType, limitCount?: number): Promise<Content[]> {
  const collName = getCollection(type);
  const adminDb = await getAdminDb();

  let rawData;

  if (adminDb) {
    let ref = adminDb.collection(collName).where("status", "==", "published").orderBy("date", "desc");
    if (limitCount) ref = ref.limit(limitCount);
    const snapshot = await ref.get();
    rawData = snapshot.docs.map(d => ({ id: d.id, contentType: type, ...d.data() }));
  } else {
    let q = query(collection(db, collName), where("status", "==", "published"), orderBy("date", "desc"));
    if (limitCount) q = query(q, limit(limitCount));
    const snapshot = await getDocs(q);
    rawData = snapshot.docs.map(d => ({ id: d.id, contentType: type, ...d.data() }));
  }

  return serializeFirebaseData(rawData) as Content[];
}

export async function getContentById(id: string, type: ContentType, includeDrafts: boolean = false): Promise<Content | null> {
  if (!id || typeof id !== 'string') return null;
  const collName = getCollection(type);
  const adminDb = await getAdminDb();

  if (adminDb) {
    const doc = await adminDb.collection(collName).doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data()!;
    if (!includeDrafts && data.status === "draft") return null;
    const rawData = { id: doc.id, contentType: type, ...data };
    return serializeFirebaseData(rawData) as Content;
  }

  const ref = doc(db, collName, id);
  const snap = await getDoc(ref);
if (!snap.exists()) return null;
  const data = snap.data();
  if (!includeDrafts && data.status === "draft") return null;
  
  const rawData = { id: snap.id, contentType: type, ...data };
  
  return serializeFirebaseData(rawData) as Content; 
}

export async function getContentBySlug(slug: string, type: ContentType, includeDrafts: boolean = false): Promise<Content | null> {
  if (!slug || typeof slug !== 'string') return null;
  const collName = getCollection(type);
  const adminDb = await getAdminDb();

  if (adminDb) {
    let queryRef = adminDb.collection(collName).where("slug", "==", slug);
    if (!includeDrafts) queryRef = queryRef.where("status", "==", "published");
    const snapshot = await queryRef.limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    const rawData = { id: doc.id, contentType: type, ...doc.data() };
    return serializeFirebaseData(rawData) as Content;
  }

  let q = query(collection(db, collName), where("slug", "==", slug));
  if (!includeDrafts) q = query(q, where("status", "==", "published"));
  q = query(q, limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, contentType: type, ...docSnap.data() } as Content;
}

export async function getAdminContent(type: ContentType): Promise<Content[]> {
  const collName = getCollection(type);
  const adminDb = await getAdminDb();

  if (adminDb) {
    const snapshot = await adminDb.collection(collName).orderBy("date", "desc").get();
    const rawData = snapshot.docs.map(d => ({ id: d.id, contentType: type, ...d.data() }));
    return serializeFirebaseData(rawData) as Content[];
  }

  const q = query(collection(db, collName), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
const rawData = snapshot.docs.map(d => ({ id: d.id, contentType: type, ...d.data() }));
  return serializeFirebaseData(rawData) as Content[];
}

export async function getDashboardStats() {
  const adminDb = await getAdminDb();

  if (adminDb) {
    const [articles, cases] = await Promise.all([
      adminDb.collection("articles").count().get(),
      adminDb.collection("cases").count().get()
    ]);
    return {
      articlesCount: articles.data().count,
      casesCount: cases.data().count
    };
  }

  const [articlesSnap, casesSnap] = await Promise.all([
    getCountFromServer(collection(db, "articles")),
    getCountFromServer(collection(db, "cases"))
  ]);

  return {
    articlesCount: articlesSnap.data().count,
    casesCount: casesSnap.data().count
  };
}

export async function getMainDoctorId(): Promise<string | null> {
  const adminDb = await getAdminDb();
  if (adminDb) {
    const snap = await adminDb.collection("settings").doc("general").get();
    return snap.data()?.mainDoctorId || null;
  }
  const snap = await getDoc(doc(db, "settings", "general"));
  return snap.exists() ? snap.data()?.mainDoctorId : null;
}

export async function getCategories(): Promise<DoctorCategory[]> {
  const adminDb = await getAdminDb();
  if (adminDb) {
    const snap = await adminDb.collection("settings").doc("categories").get();
    return snap.data()?.items || [];
  }
  const snap = await getDoc(doc(db, "settings", "categories"));
  return snap.exists() ? (snap.data()?.items || []) : [];
}

export async function saveCategories(categories: DoctorCategory[]): Promise<void> {
  const adminDb = await getAdminDb();
  if (adminDb) {
    await adminDb.collection("settings").doc("categories").set({ items: categories }, { merge: true });
    return;
  }
  const ref = doc(db, "settings", "categories");
  await setDoc(ref, { items: categories }, { merge: true });
}

export async function getDoctorsByCategory(categoryId: string): Promise<DoctorProfile[]> {
  const adminDb = await getAdminDb();
  let rawData;

  if (adminDb) {
    const snapshot = await adminDb.collection("doctors")
      .where("status", "==", "published")
      .where("categoryId", "==", categoryId)
      .get();
    rawData = snapshot.docs.map(d => ({ id: d.id, contentType: "doctors", ...d.data() }));
  } else {
    const q = query(
      collection(db, "doctors"), 
      where("status", "==", "published"),
      where("categoryId", "==", categoryId)
    );
    const snapshot = await getDocs(q);
    rawData = snapshot.docs.map(d => ({ id: d.id, contentType: "doctors", ...d.data() }));
  }

  return serializeFirebaseData(rawData) as DoctorProfile[];
}

export async function syncDoctorCases(doctorId: string, doctorSlug: string, doctorName: any, formCases: any[]) {
  const casesRef = collection(db, "cases");
  const batch = writeBatch(db);

  const q = query(casesRef, where("doctorId", "==", doctorId));
  const snapshot = await getDocs(q);
  const existingCasesIds = snapshot.docs.map(d => d.id);

  const formCasesIds: string[] = [];

  const safeFormCases = Array.isArray(formCases) ? formCases : [];

  for (const caseItem of safeFormCases) {
    const titleText = caseItem.title?.ru || caseItem.title?.kz || "untitled-case";
    const slug = generateSlug(titleText);

    const caseData = {
      ...caseItem,
      slug,
      doctorSlug,
      doctorId,
      doctorName: doctorName || { ru: "", kz: "" },
      contentType: "cases",
      status: "published",
      updatedAt: Timestamp.now(),
      date: Timestamp.now(),
    };

    if (caseItem.id) {
      formCasesIds.push(caseItem.id);
      const docRef = doc(db, "cases", caseItem.id);
      batch.update(docRef, caseData);
    } else {
      const { id, ...dataWithoutId } = caseData;
      const newDocRef = doc(collection(db, "cases"));
      batch.set(newDocRef, { ...dataWithoutId, createdAt: Timestamp.now() });
      formCasesIds.push(newDocRef.id);
    }
  }

  const casesToDelete = existingCasesIds.filter(id => !formCasesIds.includes(id));
  for (const idToDelete of casesToDelete) {
    batch.delete(doc(db, "cases", idToDelete));
  }

  await batch.commit();
}