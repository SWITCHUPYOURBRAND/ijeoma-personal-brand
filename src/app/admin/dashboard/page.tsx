"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: number;
  name: string;
  message: string;
};

type Article = {
  id: number;
  title: string;
  publication: string;
};

export default function DashboardPage() {
  const [articles, setArticles] = useState(0);
  const [messages, setMessages] = useState(0);
  const [gallery, setGallery] = useState(0);

  const [recentMessages, setRecentMessages] =
    useState<Message[]>([]);

  const [recentArticles, setRecentArticles] =
    useState<Article[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { count: articleCount } = await supabase
      .from("articles")
      .select("*", {
        count: "exact",
        head: true,
      });

    const { count: messageCount } = await supabase
      .from("messages")
      .select("*", {
        count: "exact",
        head: true,
      });

    const { count: galleryCount } = await supabase
      .from("gallery")
      .select("*", {
        count: "exact",
        head: true,
      });

    const { data: latestMessages } = await supabase
      .from("messages")
      .select("id,name,message")
      .order("created_at", {
        ascending: false,
      })
      .limit(3);

    const { data: latestArticles } = await supabase
      .from("articles")
      .select("id,title,publication")
      .order("id", {
        ascending: false,
      })
      .limit(3);

    setArticles(articleCount || 0);
    setMessages(messageCount || 0);
    setGallery(galleryCount || 0);

    if (latestMessages) {
      setRecentMessages(latestMessages);
    }

    if (latestArticles) {
      setRecentArticles(latestArticles);
    }
  }

  return (
    <div>

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-5xl font-bold text-white mb-3">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400">
          Manage publications, media appearances,
          gallery content and incoming enquiries.
        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

        <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-[#C8A97E]/20">

          <p className="text-gray-400 mb-3">
            📄 Articles
          </p>

          <h2 className="text-5xl font-bold text-white">
            {articles}
          </h2>

        </div>

        <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-[#C8A97E]/20">

          <p className="text-gray-400 mb-3">
            📨 Messages
          </p>

          <h2 className="text-5xl font-bold text-white">
            {messages}
          </h2>

        </div>

        <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-[#C8A97E]/20">

          <p className="text-gray-400 mb-3">
            🖼 Gallery Images
          </p>

          <h2 className="text-5xl font-bold text-white">
            {gallery}
          </h2>

        </div>

        <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-[#C8A97E]/20">

          <p className="text-gray-400 mb-3">
            🕒 Last Updated
          </p>

          <h2 className="text-xl font-bold text-[#C8A97E]">
            {new Date().toLocaleDateString()}
          </h2>

        </div>

      </div>

      {/* CONTENT GRID */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* RECENT MESSAGES */}

        <div className="bg-[#1A1A1A] rounded-3xl p-8">

          <h2 className="text-2xl text-white font-bold mb-6">
            Recent Messages
          </h2>

          {recentMessages.length === 0 ? (
            <p className="text-gray-500">
              No messages yet.
            </p>
          ) : (
            <div className="space-y-5">

              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="border-b border-white/5 pb-4"
                >
                  <p className="text-[#C8A97E] font-medium">
                    {message.name}
                  </p>

                  <p className="text-gray-400 text-sm mt-2">
                    {message.message.slice(0, 120)}
                    ...
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* RECENT ARTICLES */}

        <div className="bg-[#1A1A1A] rounded-3xl p-8">

          <h2 className="text-2xl text-white font-bold mb-6">
            Recent Articles
          </h2>

          {recentArticles.length === 0 ? (
            <p className="text-gray-500">
              No articles published yet.
            </p>
          ) : (
            <div className="space-y-5">

              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="border-b border-white/5 pb-4"
                >
                  <p className="text-[#C8A97E] font-medium">
                    {article.title}
                  </p>

                  <p className="text-gray-400 text-sm mt-2">
                    {article.publication}
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="mt-10">

        <h2 className="text-2xl text-white font-bold mb-5">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <a
            href="/admin/articles"
            className="
              bg-[#C8A97E]
              text-black
              font-semibold
              p-4
              rounded-2xl
              text-center
              hover:scale-105
              transition
            "
          >
            ➕ Add Article
          </a>

          <a
            href="/admin/gallery"
            className="
              bg-[#C8A97E]
              text-black
              font-semibold
              p-4
              rounded-2xl
              text-center
              hover:scale-105
              transition
            "
          >
            📤 Upload Image
          </a>

          <a
            href="/admin/messages"
            className="
              bg-[#C8A97E]
              text-black
              font-semibold
              p-4
              rounded-2xl
              text-center
              hover:scale-105
              transition
            "
          >
            📨 View Messages
          </a>

          <a
            href="/admin/profile"
            className="
              bg-[#C8A97E]
              text-black
              font-semibold
              p-4
              rounded-2xl
              text-center
              hover:scale-105
              transition
            "
          >
            ⚙️ Edit Profile
          </a>

        </div>

      </div>

    </div>
  );
}