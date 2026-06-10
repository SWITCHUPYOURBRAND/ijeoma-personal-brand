"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { supabase } from "@/lib/supabase";

type Article = {
  id: number;
  title: string;
  publication: string;
  link: string;
};

export default function FeaturedWork() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setArticles(data);
    }

    setLoading(false);
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <FadeIn>
      <section
        id="publications"
        className="bg-[#F7F1EA] py-32"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <p className="uppercase tracking-[0.3em] text-[#A37B55] text-sm mb-4">
            Featured Work
          </p>

          <h2
            className="
              hero-heading
              text-4xl
              md:text-5xl
              text-[#222222]
              mb-6
            "
          >
            Selected publications and
            editorial contributions.
          </h2>

          {!loading && articles.length > 0 && (
            <div className="flex items-center justify-between mb-8">

              <p className="text-gray-500">
                {articles.length} Published Articles
              </p>

              <div className="flex gap-3">

                <button
                  onClick={scrollLeft}
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-white
                    shadow-md
                    hover:shadow-lg
                    transition
                  "
                >
                  ←
                </button>

                <button
                  onClick={scrollRight}
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-white
                    shadow-md
                    hover:shadow-lg
                    transition
                  "
                >
                  →
                </button>

              </div>

            </div>
          )}

          {loading ? (
            <p className="text-gray-500">
              Loading articles...
            </p>
          ) : articles.length === 0 ? (
            <p className="text-gray-500">
              No articles published yet.
            </p>
          ) : (
            <div
              ref={scrollRef}
              className="
                flex
                gap-6
                overflow-x-auto
                snap-x
                snap-mandatory
                pb-4
                scrollbar-hide
              "
            >
              {articles.map((article) => (
                <a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-[85vw]
                    sm:w-[400px]
                    md:w-[450px]
                    lg:w-[500px]
                    bg-white
                    p-8
                    rounded-3xl
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-3
                    hover:shadow-2xl
                    block
                    snap-center
                    flex-shrink-0
                  "
                >
                  <p className="text-[#A37B55] text-sm mb-4">
                    {article.publication}
                  </p>

                  <h3 className="text-2xl font-semibold text-[#222222] mb-6 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-gray-500">
                    Read Article →
                  </p>
                </a>
              ))}
            </div>
          )}

        </div>
      </section>
    </FadeIn>
  );
}