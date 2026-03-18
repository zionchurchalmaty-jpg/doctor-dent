export type ContentType = "blog" | "cases" | "doctors" | "promos";
export type ContentStatus = "draft" | "published";

export interface LocalizedText {
  ru: string;
  kz: string;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl: string;
  noIndex: boolean;
  schemaMarkup?: string;
}

export interface DoctorCase {
  beforeImage: string;
  afterImage: string;
  description: LocalizedText;
}

export interface DoctorReview {
  authorName: LocalizedText;
  text: LocalizedText;
  rating: number;
}

export interface DoctorPrice {
  serviceName: LocalizedText;
  price: number;
}

export interface DoctorProfile {
  id: string;
  slug?: string;
  contentType: "doctors";
  status: ContentStatus;
  seo?: SEOData;
  date?: { toDate: () => Date } | string | null;
  createdAt?: { toDate: () => Date } | string | null;
  updatedAt?: { toDate: () => Date } | string | null;

  photo: string;
  name: LocalizedText;
  specialty: LocalizedText;
  experienceYears: number;
  reasons: { ru: string[]; kz: string[] };
  videoUrl?: string;
  services: { ru: string[]; kz: string[] };
  education: LocalizedText;
  certificates: string[];
  equipment: LocalizedText;
  cases: DoctorCase[];
  reviews: DoctorReview[];
  prices: DoctorPrice[];
  location: LocalizedText;
}

export interface Content {
  id: string;
  slug?: string;
  contentType: ContentType;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  coverImage?: string;
  tags?: string[];
  status: ContentStatus;
  seo?: SEOData;
  date?: { toDate: () => Date };
  createdAt?: { toDate: () => Date };
  updatedAt?: { toDate: () => Date };
  createdBy?: string;
  authorName?: string;
  isPaid?: boolean;
  password?: string;
  previewContent?: string;
}

export interface ContentInput extends Partial<Content> {
  contentType: ContentType;
  title: string;
  status: ContentStatus;
}

export interface SerializedContent extends Omit<Content, 'date' | 'createdAt' | 'updatedAt'> {
  date?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}