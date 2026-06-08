"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  name: string;
  title: string;
  hero_heading: string;
  hero_description: string;
  hero_image: string;
};
export default function Hero() {
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

  if (!profile) {
    return (
      <section className="bg-[#F7F1EA] min-h-screen flex items-center justify-center">
        <p className="text-[#A37B55] text-lg">
          Loading...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F1EA] min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT */}

          <div className="max-w-2xl">

            <p
              className="
                uppercase
                tracking-[0.08em]
                text-[#A37B55]
                text-lg
                font-bold
                mb-6
              "
            >
              {profile.title ||
                "AWARD-WINNING JOURNALIST"}
            </p>

            <h1
              className="
                hero-heading
                text-5xl
                md:text-6xl
                lg:text-[78px]
                leading-[0.95]
                tracking-[-0.04em]
                text-[#222222]
                font-semibold
              "
            >
              {profile.hero_heading ||
                "Shaping Conversations. Amplifying Voices. Driving Impact."}
            </h1>

            <p
              className="
                mt-8
                text-xl
                leading-9
                text-[#666666]
                max-w-xl
              "
            >
              {profile.hero_description ||
                "Award-winning journalist, editor and communications strategist dedicated to amplifying impactful stories, advancing public discourse and driving meaningful conversations around leadership, gender development and social impact."}
            </p>

            <div className="mt-8">
              <p
                className="
                  text-[#A37B55]
                  text-xl
                  md:text-2xl
                  font-medium
                "
              >
                — {profile.name}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">

              <button
                className="
                  bg-[#A37B55]
                  text-white
                  px-8
                  py-4
                  rounded-full
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-[#8A6548]
                "
              >
                Explore Publications
              </button>

              <button
                className="
                  border
                  border-[#A37B55]
                  px-8
                  py-4
                  rounded-full
                  text-[#A37B55]
                  transition-all
                  duration-300
                  hover:bg-[#A37B55]
                  hover:text-white
                "
              >
                Get In Touch
              </button>

            </div>

            {/* STATS */}

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">

              <div>
                <h3 className="text-4xl font-bold text-[#A37B55]">
                  15+
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Years of Experience
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-[#A37B55]">
                  100+
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Published Features
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-[#A37B55]">
                  4+
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Strategic Partnerships
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center lg:justify-end pt-10">

            <img
              src="/images/logo.png"
              alt="Logo"
              className="
                absolute
                w-[320px]
                opacity-[0.08]
                -left-16
                top-12
                pointer-events-none
                select-none
              "
            />

            <div
              className="
                absolute
                w-[500px]
                h-[500px]
                rounded-full
                bg-[#EADFD2]
                blur-3xl
                opacity-70
              "
            />

            <div
              className="
                relative
                w-[420px]
                h-[560px]
                rounded-[40px]
                overflow-hidden
                bg-white
                shadow-[0_25px_80px_rgba(0,0,0,0.12)]
              "
            >
        <img
  src={
    profile.hero_image ||
    "/images/ijeoma.jpeg"
  }
  alt="Ijeoma Thomas-Odia"
  className="
    w-full
    h-full
    object-cover
    object-top
  "
/>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}