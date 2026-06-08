"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
    }

    if (data) {
      setMessages(data);
    }

    setLoading(false);
  }

  async function deleteMessage(id: number) {
    const confirmed = confirm(
      "Delete this message permanently?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchMessages();
    }
  }

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl text-white font-bold">
            Messages
          </h1>

          <p className="text-gray-400 mt-2">
            View and manage incoming messages.
          </p>
        </div>

        <div
          className="
            bg-[#1A1A1A]
            px-5
            py-3
            rounded-2xl
            border
            border-white/5
          "
        >
          <p className="text-gray-400 text-sm">
            Total Messages
          </p>

          <p className="text-white text-2xl font-bold">
            {messages.length}
          </p>
        </div>

      </div>

      {loading && (
        <div className="bg-[#1A1A1A] p-8 rounded-3xl">
          <p className="text-gray-400">
            Loading messages...
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500 rounded-2xl p-4 mb-6">
          <p className="text-red-400">
            {errorMessage}
          </p>
        </div>
      )}

      {!loading &&
        !errorMessage &&
        messages.length === 0 && (
          <div className="bg-[#1A1A1A] rounded-3xl p-8">
            <p className="text-gray-400">
              No messages found.
            </p>
          </div>
        )}

      <div className="space-y-6">

        {messages.map((item) => (
          <div
            key={item.id}
            className="
              bg-[#1A1A1A]
              rounded-3xl
              p-6
              border
              border-white/5
            "
          >

            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-5">

              <div>
                <h2 className="text-white text-xl font-semibold">
                  {item.name}
                </h2>

                <p className="text-[#C8A97E] mt-1">
                  {item.email}
                </p>
              </div>

              <div className="text-right">

                <p className="text-gray-500 text-sm mb-3">
                  {new Date(
                    item.created_at
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <button
                  onClick={() =>
                    deleteMessage(item.id)
                  }
                  className="
                    bg-red-600
                    hover:bg-red-700
                    transition
                    text-white
                    px-4
                    py-2
                    rounded-full
                    text-sm
                  "
                >
                  Delete
                </button>

              </div>

            </div>

            <div
              className="
                bg-black/20
                rounded-2xl
                p-5
              "
            >
              <p className="text-gray-300 leading-8">
                {item.message}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}