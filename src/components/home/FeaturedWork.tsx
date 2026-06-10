"use client";

import { useEffect, useState } from "react";
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

          <p className="text-gray-500 mb-12">
            Swipe or scroll horizontally to explore featured articles.
          </p>

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
              className="
                flex
                gap-8
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
                    min-w-[320px]
                    md:min-w-[450px]
                    max-w-[450px]
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