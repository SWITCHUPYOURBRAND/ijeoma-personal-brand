"use client";

import { useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { supabase } from "@/lib/supabase";

type Profile = {
  email: string;
  linkedin: string;
  instagram: string;
};

export default function Contact() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data } = await supabase
      .from("profile")
      .select("*")
      .single();

    if (data) {
      setProfile(data);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          name,
          email,
          message,
        },
      ]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Thank you. Your message has been received and will be reviewed shortly."
      );

      setName("");
      setEmail("");
      setMessage("");
    }

    setLoading(false);
  }

  return (
    <FadeIn>
      <section
  id="contact"
  className="bg-[#222222] py-32 scroll-mt-28"
>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 text-center">

          <p className="uppercase tracking-[0.3em] text-[#C8A97E] text-sm mb-5">
            Get In Touch
          </p>

          <h2
            className="
              hero-heading
              text-4xl
              md:text-5xl
              lg:text-6xl
              text-white
              leading-tight
              mb-8
            "
          >
            Let's tell stories that matter.
          </h2>

          <p
            className="
              max-w-2xl
              mx-auto
              text-lg
              leading-8
              text-gray-300
              mb-14
            "
          >
            Whether it's a speaking engagement,
            media collaboration, editorial partnership,
            interview request or professional inquiry,
            I would love to hear from you.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">

            <a
              href={`mailto:${profile?.email}`}
              className="
                group
                bg-white/5
                backdrop-blur-sm
                rounded-3xl
                p-8
                text-left
                border
                border-white/10
                transition-all
                duration-300
                hover:-translate-y-2
                hover:bg-white/10
                hover:shadow-2xl
              "
            >
              <h3 className="text-[#C8A97E] font-semibold mb-3">
                Email
              </h3>

              <p className="text-white break-all">
                {profile?.email}
              </p>

              <p className="mt-4 text-gray-400 group-hover:text-white transition">
                Send an email →
              </p>
            </a>

            <a
              href={profile?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                bg-white/5
                backdrop-blur-sm
                rounded-3xl
                p-8
                text-left
                border
                border-white/10
                transition-all
                duration-300
                hover:-translate-y-2
                hover:bg-white/10
                hover:shadow-2xl
              "
            >
              <h3 className="text-[#C8A97E] font-semibold mb-3">
                LinkedIn
              </h3>

              <p className="text-white">
                Professional Profile
              </p>

              <p className="mt-4 text-gray-400 group-hover:text-white transition">
                Connect professionally →
              </p>
            </a>

            <a
              href={profile?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                bg-white/5
                backdrop-blur-sm
                rounded-3xl
                p-8
                text-left
                border
                border-white/10
                transition-all
                duration-300
                hover:-translate-y-2
                hover:bg-white/10
                hover:shadow-2xl
              "
            >
              <h3 className="text-[#C8A97E] font-semibold mb-3">
                Instagram
              </h3>

              <p className="text-white">
                Follow my journey
              </p>

              <p className="mt-4 text-gray-400 group-hover:text-white transition">
                Visit Instagram →
              </p>
            </a>

          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto"
          >

            <div className="grid md:grid-cols-2 gap-5 mb-5">

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  outline-none
                  focus:border-[#A37B55]
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  outline-none
                  focus:border-[#A37B55]
                "
              />

            </div>

            <textarea
              rows={6}
              placeholder="Tell me about your project, interview request, speaking engagement or collaboration..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              required
              className="
                w-full
                bg-white/5
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                text-white
                outline-none
                resize-none
                focus:border-[#A37B55]
              "
            />

            {success && (
              <p className="text-green-400 mt-5">
                {success}
              </p>
            )}

            {error && (
              <p className="text-red-400 mt-5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-8
                bg-[#A37B55]
                text-white
                px-10
                py-4
                rounded-full
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#8A6548]
                hover:shadow-2xl
                disabled:opacity-50
              "
            >
              {loading
                ? "Sending..."
                : "Send Message"}
            </button>

          </form>

        </div>
      </section>
    </FadeIn>
  );
}