"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Save, Loader2, UploadCloud, X } from "lucide-react";
import { useAuth } from "./auth-provider";
import { createContent, updateContent } from "@/lib/firestore/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export function PromoForm({ initialData, isEditing = false }: any) {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const methods = useForm({
    defaultValues: initialData || {
      contentType: "promos",
      status: "published",
      image: "",
      badge: "",
      title: "",
      description: "",
      newPrice: "",
      oldPrice: "",
      buttonText: "Записаться",
    },
  });

  const currentImage = methods.watch("image");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uniqueFileName = `promos/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, uniqueFileName);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      methods.setValue("image", downloadURL, { shouldDirty: true });
    } catch (error) {
      console.error("Ошибка при загрузке картинки:", error);
      alert(
        "Не удалось загрузить картинку. Проверьте правила Firebase Storage.",
      );
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!user) return alert("Ошибка: Вы не авторизованы!");

    setSaving(true);
    try {
      if (isEditing && initialData?.id) {
        await updateContent(initialData.id, data);
      } else {
        await createContent(data, user.uid, user.email || "Admin");
      }
      router.push("/admin/promos");
      router.refresh();
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось сохранить акцию.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-[#DADCE0] gap-4">
          <h1 className="text-xl font-bold text-[#202124]">
            {isEditing ? "Редактирование акции" : "Создание акции"}
          </h1>
          <Button
            type="submit"
            disabled={saving || uploading}
            className="bg-[#FF5A00] hover:bg-[#E04D00] text-white w-full sm:w-auto"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEditing ? "Сохранить" : "Опубликовать"}
          </Button>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-[#DADCE0] space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Фотография акции
            </label>

            {currentImage ? (
              <div className="relative w-full max-w-sm h-48 rounded-xl overflow-hidden border border-gray-200 group">
                <Image
                  src={currentImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => methods.setValue("image", "")}
                    className="bg-white text-red-500 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4" /> Удалить фото
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full max-w-sm h-48 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploading ? (
                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-2" />
                  ) : (
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                  )}
                  <p className="text-sm text-gray-500 font-medium">
                    {uploading ? "Загрузка..." : "Нажмите, чтобы загрузить"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP до 5MB
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заголовок акции
              </label>
              <Input
                {...methods.register("title")}
                placeholder="Например: Профессиональное отбеливание"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Бейдж (опционально)
              </label>
              <Input
                {...methods.register("badge")}
                placeholder="Например: -30% или Новинка"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Краткое описание
            </label>
            <Textarea
              {...methods.register("description")}
              placeholder="Результат до 8 тонов за 1 процедуру..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Новая цена (₸)
              </label>
              <Input
                {...methods.register("newPrice")}
                placeholder="Например: 49 000 или от 49 000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Старая цена (₸)
              </label>
              <Input
                {...methods.register("oldPrice")}
                placeholder="Например: 70 000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Текст на кнопке
              </label>
              <Input
                {...methods.register("buttonText")}
                placeholder="Записаться"
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
