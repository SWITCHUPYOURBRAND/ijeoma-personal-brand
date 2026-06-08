"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    console.log("Starting login...");

    try {
      const response =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      console.log(
        "LOGIN RESPONSE:",
        response
      );

      if (response.error) {
        setError(response.error.message);
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      setError(
        "Unexpected error occurred."
      );
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6">

      <form
        onSubmit={handleLogin}
        className="bg-[#1A1A1A] p-10 rounded-3xl w-full max-w-md"
      >

        <h1 className="text-4xl text-white font-bold mb-3">
          Admin Login
        </h1>

        <p className="text-gray-400 mb-8">
          Sign in to access the CMS.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black text-white mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black text-white mb-4"
        />

        {error && (
          <p className="text-red-400 mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-[#C8A97E]
            text-black
            py-4
            rounded-xl
            font-semibold
            disabled:opacity-50
          "
        >
          {loading
            ? "Signing In..."
            : "Login"}
        </button>

      </form>

    </div>
  );
}