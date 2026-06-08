"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FadeIn from "@/components/ui/FadeIn";

type Profile = {
  about_heading: string;
  about_description: string;
  about_description_2: string;
};

export default function About() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

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

  return (
    <FadeIn>
      <section
        id="about"
        className="bg-white py-32"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div>

              <p className="uppercase tracking-[0.3em] text-[#A37B55] text-sm mb-4">
                About Ijeoma
              </p>

              <h2
                className="
                  hero-heading
                  text-4xl
                  md:text-5xl
                  text-[#222222]
                  leading-tight
                  mb-8
                "
              >
                {profile?.about_heading ||
                  "A decade of journalism, advocacy and leadership."}
              </h2>

              <p className="text-lg leading-9 text-[#555555]">
                {profile?.about_description}
              </p>

              <p className="mt-6 text-lg leading-9 text-[#555555]">
                {profile?.about_description_2}
              </p>

            </div>

            <div className="grid grid-cols-2 gap-5">

              {[
                {
                  title: "10+",
                  desc: "Years of Professional Experience",
                },
                {
                  title: "Editor",
                  desc: "Editorial Leadership & Strategy",
                },
                {
                  title: "Advocate",
                  desc: "Women & Gender Development",
                },
                {
                  title: "Media",
                  desc: "Journalism & Communication",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-[#F7F1EA]
                    p-8
                    rounded-3xl
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                  "
                >
                  <h3 className="text-3xl font-bold text-[#A37B55]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[#444]">
                    {item.desc}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>
    </FadeIn>
  );
}