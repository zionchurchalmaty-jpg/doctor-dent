import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export interface UploadProgress {
  progress: number;
  downloadURL?: string;
}

{/* Validates file type and size (max 10MB) */}
export function validateImageFile(file: File): string | null {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return "Неподдерживаемый формат. Используйте JPEG, PNG, GIF или WebP.";
  }
  if (file.size > 10 * 1024 * 1024) {
    return "Файл слишком большой. Максимальный размер 10MB.";
  }
  return null;
}

{/* Handles image upload to Firebase Storage with progress tracking */}
export function uploadImage(
  file: File,
  folder: string = "images",
  onProgress?: (progress: { progress: number }) => void
): { promise: Promise<{ url: string }> } {
  
  const timestamp = Date.now();
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
  const fullPath = `${folder}/${timestamp}_${cleanFileName}`;
  
  const storageRef = ref(storage, fullPath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  const promise = new Promise<{ url: string }>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress({ progress });
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File uploaded successfully:", url);
          resolve({ url });
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject(error);
        }
      }
    );
  });

  return { promise };
}