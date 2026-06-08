"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GalleryImage = {
  id: number;
  image_url: string;
};

export default function GalleryPage() {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setImages(data);
    }
  }

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      const file = e.target.files?.[0];

      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);

      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from("gallery")
        .insert([
          {
            image_url: publicUrlData.publicUrl,
          },
        ]);

      if (insertError) {
        alert(insertError.message);
      } else {
        alert("Image uploaded successfully!");
        fetchImages();
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setUploading(false);
  }

  async function deleteImage(id: number) {
    const confirmed = confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchImages();
    }
  }

  return (
    <div>
      <h1 className="text-4xl text-white font-bold mb-8">
        Gallery
      </h1>

      <div className="bg-[#1A1A1A] p-8 rounded-3xl mb-8">
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="text-white"
        />

        {uploading && (
          <p className="text-gray-400 mt-4">
            Uploading...
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-[#1A1A1A] rounded-3xl overflow-hidden"
          >
            <img
              src={image.image_url}
              alt=""
              className="w-full h-64 object-cover"
            />

            <button
              onClick={() => deleteImage(image.id)}
              className="
                w-full
                py-3
                bg-red-600
                hover:bg-red-700
                text-white
              "
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}