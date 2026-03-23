export type ContentType = "blog" | "cases" | "doctors" | "promos";
export type ContentStatus = "draft" | "published";

export interface LocalizedText {
  ru: string;
  kz: string;
}

export interface DoctorEducationGroup {
  title: LocalizedText;
  items: LocalizedText[];
}

export interface DoctorLocation {
  cityId: string;
  address: LocalizedText;
  phone: string;
  schedule: LocalizedText;
  link2gis: string;
}

export interface DoctorCase {
  title: LocalizedText;
  duration: LocalizedText;
  price: string;
  beforeImage: string;
  afterImage: string;
  description: LocalizedText;
}

export interface DoctorCertificate {
  url?: string;
  name?: string;
}

export interface DoctorReview {
  authorName: LocalizedText;
  text: LocalizedText;
  rating: number;
  date: string;
}

export interface DoctorFAQ {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl: string;
  noIndex: boolean;
  schemaMarkup?: string;
  imageAlt?: string;
  imageTitle?: string;
  imageDescription?: string;
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
  shortDescription?: LocalizedText;
  experienceYears: number;
  
  reasons: LocalizedText[]; 
  services: LocalizedText[];
  equipment: LocalizedText[];
  
  videoUrl?: string;
  education: DoctorEducationGroup[];
  certificates: DoctorCertificate[];
  cases: DoctorCase[];
  reviews: DoctorReview[];
  prices: DoctorPrice[];
  faq: DoctorFAQ[];
  location: DoctorLocation;
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
  password?: string;
  previewContent?: string;
  isSeo?: boolean;
}

export interface ContentInput extends Partial<Content> {
  contentType: ContentType;
  title: string;
  status: ContentStatus;
  isSeo?: boolean;
}

export interface SerializedContent extends Omit<
  Content,
  "date" | "createdAt" | "updatedAt"
> {
  date?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  isSeo?: boolean;
}
