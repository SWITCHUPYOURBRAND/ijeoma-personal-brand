"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Article = {
  id: number;
  title: string;
  publication: string;
  link: string;
};

export default function ArticlesPage() {
  const [title, setTitle] = useState("");
  const [publication, setPublication] = useState("");
  const [link, setLink] = useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("id", { ascending: false });

    if (data) setArticles(data);
  }

  async function saveArticle(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("articles")
        .update({
          title,
          publication,
          link,
        })
        .eq("id", editingId);

      if (!error) {
        alert("Article updated!");

        setEditingId(null);
        setTitle("");
        setPublication("");
        setLink("");

        fetchArticles();
      }

      return;
    }

    const { error } = await supabase
      .from("articles")
      .insert([
        {
          title,
          publication,
          link,
        },
      ]);

    if (!error) {
      alert("Article published!");

      setTitle("");
      setPublication("");
      setLink("");

      fetchArticles();
    }
  }

  function editArticle(article: Article) {
    setEditingId(article.id);

    setTitle(article.title);
    setPublication(article.publication);
    setLink(article.link);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deleteArticle(id: number) {
    const confirmed = confirm(
      "Delete this article permanently?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchArticles();
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setPublication("");
    setLink("");
  }

  return (
    <div>
      <h1 className="text-4xl text-white font-bold mb-8">
        Articles
      </h1>

      <div className="bg-[#1A1A1A] rounded-3xl p-8 mb-8">

        <h2 className="text-white text-2xl font-semibold mb-2">
          {editingId
            ? "Edit Article"
            : "Publish New Article"}
        </h2>

        <p className="text-gray-400 mb-6">
          Add, edit or manage published articles.
        </p>

        <form
          onSubmit={saveArticle}
          className="space-y-4"
        >
          <div>
            <label className="block text-white mb-2">
              Article Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-black text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Publication
            </label>

            <input
              value={publication}
              onChange={(e) =>
                setPublication(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-black text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Article Link
            </label>

            <input
              value={link}
              onChange={(e) =>
                setLink(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-black text-white"
              required
            />
          </div>

          <div className="flex gap-3">

            <button
              type="submit"
              className="
                bg-[#C8A97E]
                text-black
                px-6
                py-3
                rounded-full
                font-semibold
              "
            >
              {editingId
                ? "Update Article"
                : "Publish Article"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="
                  bg-gray-700
                  text-white
                  px-6
                  py-3
                  rounded-full
                "
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      <div className="space-y-5">

        {articles.map((article) => (
          <div
            key={article.id}
            className="
              bg-[#1A1A1A]
              p-6
              rounded-3xl
              border
              border-white/5
            "
          >
            <h2 className="text-white text-xl font-semibold">
              {article.title}
            </h2>

            <p className="text-[#C8A97E] mt-2">
              {article.publication}
            </p>

            <a
              href={article.link}
              target="_blank"
              className="
                inline-block
                mt-3
                text-blue-400
              "
            >
              View Article →
            </a>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() =>
                  editArticle(article)
                }
                className="
                  bg-[#A37B55]
                  text-white
                  px-5
                  py-2
                  rounded-full
                "
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteArticle(article.id)
                }
                className="
                  bg-red-600
                  text-white
                  px-5
                  py-2
                  rounded-full
                "
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}