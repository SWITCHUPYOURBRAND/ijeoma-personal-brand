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
    <section className="bg-[#F7F1EA] py-16 lg:min-h-screen flex items-center">
     <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-24">

       <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* LEFT */}

          <div className="max-w-2xl order-2 lg:order-1">

            <p
              className="
                uppercase
                tracking-[0.08em]
                text-[#A37B55]
                text-base md:text-base md:text-lg
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
                text-4xl
sm:text-5xl
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
              mt-6
text-base
md:text-xl
leading-8
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

            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <a
  href="#publications"
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
    inline-flex
    justify-center
  "
>
  Explore Publications
</a>

              <a
  href="#contact"
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
    inline-flex
    justify-center
  "
>
  Get In Touch
</a>

            </div>

            {/* STATS */}

            <div className="mt-12 grid grid-cols-3 gap-4 md:gap-8">

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#A37B55]">
                  15+
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Years of Experience
                </p>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#A37B55]">
                  100+
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Published Features
                </p>
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#A37B55]">
                  4+
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Strategic Partnerships
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT */}

         <div
  className="
    relative
    flex
    justify-center
    lg:justify-end
    order-1
    lg:order-2
    mb-10
    lg:mb-0
  "
>

            <img
              src="/images/logo.png"
              alt="Logo"
              className="
                absolute
                w-[200px] md:w-[320px]
                opacity-[0.08]
                -left-4 md:-left-16
                top-12
                pointer-events-none
                select-none
              "
            />

            <div
              className="
                absolute
                w-[300px]
h-[300px]
md:w-[500px]
md:h-[500px]
                rounded-full
                bg-[#EADFD2]
                blur-3xl
                opacity-70
              "
            />

           <div
  className="
    relative
    w-full
    max-w-[420px]
    h-[420px]
    md:h-[560px]
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
  object-center
"
/>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}