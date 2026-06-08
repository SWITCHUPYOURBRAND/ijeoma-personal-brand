"use client";

import { useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { supabase } from "@/lib/supabase";

type GalleryImage = {
  id: number;
  image_url: string;
};

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<
    GalleryImage[]
  >([]);

  const featuredImages = [
    "/images/gallery1.jpeg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpeg",
    "/images/gallery5.jpeg",
  ];

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  async function fetchGalleryImages() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setGalleryImages(data);
    }
  }

  return (
    <FadeIn>
      <section
        id="gallery"
        className="bg-white py-32"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* SECTION HEADER */}

          <p className="uppercase tracking-[0.3em] text-[#A37B55] text-sm mb-4">
            Gallery
          </p>

          <h2
            className="
              hero-heading
              text-4xl
              md:text-5xl
              text-[#222222]
              mb-16
            "
          >
            Moments, milestones
            and media engagements.
          </h2>

          {/* FEATURED GALLERY */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px] mb-24">

            <div className="lg:col-span-2 lg:row-span-2 overflow-hidden rounded-[32px]">
              <img
                src={featuredImages[0]}
                alt=""
                className="
                  w-full
                  h-full
                  object-cover
                  transition
                  duration-700
                  hover:scale-110
                "
              />
            </div>

            {featuredImages.slice(1).map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[32px]"
              >
                <img
                  src={image}
                  alt=""
                  className="
                    w-full
                    h-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-110
                  "
                />
              </div>
            ))}

          </div>

          {/* RECENT EVENTS */}

          {galleryImages.length > 0 && (
            <>
              <div className="mb-14">

                <p className="uppercase tracking-[0.25em] text-[#A37B55] text-sm mb-3">
                  Recent Events
                </p>

                <h3
                  className="
                    hero-heading
                    text-3xl
                    md:text-4xl
                    text-[#222222]
                  "
                >
                  Media Engagements &
                  Public Appearances
                </h3>

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-8
                "
              >

                {galleryImages.map((image) => (
                  <div
                    key={image.id}
                    className="
                      overflow-hidden
                      rounded-[32px]
                      aspect-[4/5]
                      shadow-md
                      hover:shadow-xl
                      transition-all
                      duration-500
                    "
                  >
                    <img
                      src={image.image_url}
                      alt=""
                      className="
                        w-full
                        h-full
                        object-cover
                        transition
                        duration-700
                        hover:scale-105
                      "
                    />
                  </div>
                ))}

              </div>
            </>
          )}

        </div>
      </section>
    </FadeIn>
  );
}