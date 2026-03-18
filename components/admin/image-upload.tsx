"use client";

import { useCallback, useState, useRef } from "react";
import { 
  X, Link as LinkIcon, Loader2, Image as ImageIcon 
} from "lucide-react";
import { 
  uploadImage, 
  validateImageFile, 
} from "@/lib/storage";

{/* Reusable internal UI components */}
const Button = ({ children, onClick, variant = "primary", className, disabled, type = "button", ...props }: any) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all h-9 px-4 disabled:opacity-50 shadow-sm";
  const styles = {
    primary: "bg-[#1A73E8] text-white hover:bg-[#1557B0]",
    ghost: "bg-white text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] border border-[#DADCE0]",
  };
  return (
    <button 
      type={type}
      className={`${base} ${styles[variant as keyof typeof styles]} ${className}`} 
      disabled={disabled} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = (props: any) => (
  <input 
    {...props} 
    className="w-full bg-white border border-[#DADCE0] rounded-md px-3 py-2 text-[#202124] text-sm focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] transition-all placeholder:text-[#9AA0A6] disabled:opacity-50" 
  />
);

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  folder?: string;
  label?: string;
  description?: string;
  aspectRatio?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onUploadingChange,
  folder = "images",
  label,
  aspectRatio = "16/9",
  className,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      const validationError = validateImageFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setIsUploading(true);
      setUploadProgress(0);
      onUploadingChange?.(true);
      try {
        const { promise } = uploadImage(file, folder, (progress) => {
          setUploadProgress(progress.progress);
        });
        const result = await promise;
        
        setUrlInput("");
        onChange(result.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Загрузка не удалась");
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
        onUploadingChange?.(false);
      }
    },
    [folder, onChange, onUploadingChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  const submitUrl = useCallback(() => {
    if (urlInput.trim()) {
      setError(null);
      onChange(urlInput.trim());
    }
  }, [urlInput, onChange]);

  const handleRemove = useCallback(() => {
    onChange("");
    setError(null);
    setUrlInput("");
  }, [onChange]);

  {/* Revert to input mode if the provided image URL fails to load */}
  const handleImageError = () => {
    setError("Не удалось загрузить изображение. Ссылка недоступна.");
    
    if (!(value && !value.startsWith("http"))) {
       setUrlInput(value);
    }

    onChange(""); 
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-sm font-medium text-[#202124]">{label}</label>}

      {value ? (
        <div className="relative rounded-lg border border-[#DADCE0] overflow-hidden bg-[#F8F9FA] group animate-in fade-in">
          <div className="relative w-full" style={{ aspectRatio: aspectRatio === "16/9" ? 16/9 : "auto", minHeight: '200px' }}>
            <img
              src={value}
              alt="Uploaded content"
              className="absolute inset-0 w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
          <button
            type="button"
            className="absolute top-2 right-2 p-1.5 bg-white text-[#5F6368] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#D93025]"
            onClick={handleRemove}
            title="Удалить"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          
          <div
            className={`relative rounded-lg border-2 border-dashed transition-colors cursor-pointer bg-white
              ${isDragging 
                ? "border-[#1A73E8] bg-[#E8F0FE]/50" 
                : "border-[#E8EAED] hover:border-[#1A73E8] hover:bg-[#F8F9FA]"
              } 
              ${isUploading ? "pointer-events-none" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div
              className="flex flex-col items-center justify-center gap-3 p-6"
              style={{ minHeight: '140px' }}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-8 w-8 text-[#1A73E8] animate-spin" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#202124]">Загрузка...</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-[#F1F3F4] rounded-full text-[#5F6368] group-hover:text-[#1A73E8] transition-colors">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#202124]">
                      Нажмите для загрузки файла
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-[#E8EAED]"></div>
            <span className="flex-shrink-0 mx-3 text-[11px] text-[#9AA0A6] uppercase tracking-wider font-medium">или ссылка</span>
            <div className="flex-grow border-t border-[#E8EAED]"></div>
          </div>

          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e: any) => setUrlInput(e.target.value)}
              onBlur={submitUrl}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitUrl();
                }
              }}
              disabled={isUploading}
            />
            <Button onClick={submitUrl} disabled={!urlInput.trim() || isUploading} variant="ghost" className="px-3">
              <LinkIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-[#D93025] flex items-center gap-1 mt-2 animate-in fade-in font-bold">
          <X className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );
}