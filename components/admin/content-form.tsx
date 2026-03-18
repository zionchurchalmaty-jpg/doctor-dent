"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentEditor } from "./content-editor";
import { SEOFields } from "./seo-fields";
import { ImageUpload } from "./image-upload";
import { useAuth } from "./auth-provider";
import {
  createContent,
  updateContent,
  deleteContent,
} from "@/lib/firestore/content";
import type {
  Content,
  ContentInput,
  ContentType,
  SEOData,
  ContentStatus,
} from "@/lib/firestore/types";
import { Loader2, Save, Trash2, Lock, Unlock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContentFormProps {
  contentType: ContentType;
  initialData?: Content;
  isEditing?: boolean;
}

export function ContentForm({
  contentType,
  initialData,
  isEditing = false,
}: ContentFormProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  
  const [isPaid, setIsPaid] = useState(initialData?.isPaid || false);
  const [password, setPassword] = useState(initialData?.password || "");
  const [previewContent, setPreviewContent] = useState(initialData?.previewContent || "");

  const [image, setImage] = useState(
    initialData?.image || initialData?.coverImage || "",
  );

  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") || "",
  );
  const [status, setStatus] = useState<ContentStatus>(
    initialData?.status || "published",
  );
  const [seo, setSeo] = useState<SEOData>(
    initialData?.seo || {
      metaTitle: "",
      metaDescription: "",
      ogImage: "",
      canonicalUrl: "",
      noIndex: false,
    },
  );

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const typeConfig: Record<string, { label: string; backPath: string }> = {
    blog: { label: "Статья", backPath: "/admin/blog" },
    cases: { label: "Кейс", backPath: "/admin/cases" },
    leads: { label: "Заявка", backPath: "/admin/leads" },
  };

  const config = typeConfig[contentType] || typeConfig.blog;
  const contentTypeLabel = config.label;
  const backPath = config.backPath;

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const parsed = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setTags(parsed);
  };

  const handleSubmit = async (submitStatus?: ContentStatus) => {
    if (!user) return;

    const finalStatus = submitStatus || status;

    if (!title.trim()) {
      setError("Заголовок обязателен");
      return;
    }

    if (!content.trim()) {
      setError("Содержимое обязательно");
      return;
    }

    if (isPaid && !password.trim()) {
      setError("Для платной статьи необходим пароль");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      const input: any = {
        contentType,
        title: title.trim(),
        content,
        excerpt: excerpt.trim() || undefined,
        image: image || "",
        tags,
        status: finalStatus,
        seo,
        isPaid,
        password: isPaid ? password : "",
        previewContent: isPaid ? previewContent : "",
      };

      if (isEditing && initialData) {
        await updateContent(initialData.id, input);
      } else {
        await createContent(
          input,
          user.uid,
          user.displayName || user.email || "Unknown",
        );
      }

      router.push(backPath);
      router.refresh();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Не удалось сохранить контент");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;

    setDeleting(true);
    try {
      await deleteContent(initialData.id, contentType);
      router.push(backPath);
      router.refresh();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Не удалось удалить контент");
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">
          {isEditing
            ? `Редактирование: ${contentTypeLabel}`
            : `Создание: ${contentTypeLabel}`}
        </h1>

        <div className="flex items-center gap-2">
          {isEditing && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="mr-2 h-4 w-4" /> Удалить
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Удалить этот материал?</AlertDialogTitle>
                  <AlertDialogDescription>Это действие нельзя отменить.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                    {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Удалить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button size="sm" onClick={() => handleSubmit()} disabled={saving || imageUploading} className="bg-[#1A73E8] hover:bg-[#1557B0] text-white">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Сохранить
          </Button>
        </div>
      </div>

      {error && <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите заголовок..." className="text-lg" />
          </div>

          <div className="space-y-2">
            <Label>Содержимое (скрытое паролем)</Label>
            <ContentEditor content={content} onChange={setContent} placeholder="Напишите основной текст здесь..." />
          </div>

          {isPaid && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <Label htmlFor="previewContent" className="text-[#1A73E8] flex items-center gap-2">
                <Unlock className="w-4 h-4" /> Превью содержания (доступно всем)
              </Label>
              <ContentEditor
                content={previewContent}
                onChange={setPreviewContent}
                placeholder="Этот текст будет виден ДО ввода пароля..."
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="excerpt">Краткое описание (для списка статей)</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Краткое содержание для карточки превью..." rows={3} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="font-medium text-navy flex items-center gap-2">
               Настройки доступа
            </h3>

            <div className="space-y-2">
              <Label>Тип контента</Label>
              <Select
                value={isPaid ? "paid" : "free"}
                onValueChange={(v) => setIsPaid(v === "paid")}
              >
                <SelectTrigger className={isPaid ? "border-[#1A73E8] bg-blue-50" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Бесплатная статья</SelectItem>
                  <SelectItem value="paid">Платная статья</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isPaid && (
              <div className="space-y-2 animate-in zoom-in-95 duration-200">
                <Label htmlFor="password">Пароль для доступа</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Придумайте пароль"
                    className="pr-10 border-[#1A73E8]"
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-[#1A73E8]" />
                </div>
              </div>
            )}

            <hr className="my-4" />

            <div className="space-y-2">
              <Label htmlFor="status">Статус публикации</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ContentStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Черновик</SelectItem>
                  <SelectItem value="published">Опубликовано</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ImageUpload value={image} onChange={setImage} onUploadingChange={setImageUploading} folder="images" label="Обложка" description="Загрузите файл..." aspectRatio="16/9" />

            <div className="space-y-2">
              <Label htmlFor="tags">Теги</Label>
              <Input id="tags" value={tagsInput} onChange={(e) => handleTagsChange(e.target.value)} placeholder="тег1, тег2, тег3" />
            </div>
          </div>

          <SEOFields value={seo} onChange={setSeo} defaultTitle={title} image={image} />
        </div>
      </div>
    </div>
  );
}