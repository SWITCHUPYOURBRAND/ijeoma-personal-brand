"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  instagram: string;
  bio: string;
};

export default function Footer() {
  const [lagosTime, setLagosTime] = useState("");
  const [profile, setProfile] =
    useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile();

    const updateTime = () => {
      const time = new Date().toLocaleTimeString(
        "en-GB",
        {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }
      );

      setLagosTime(time);
    };

    updateTime();

    const interval = setInterval(
      updateTime,
      1000
    );

    return () => clearInterval(interval);
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
    <footer className="bg-[#111111] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

        {/* Main Footer */}

        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* Brand */}

          <div>

            <h3 className="hero-heading text-3xl text-white mb-4">
              {profile?.name ||
                "Ijeoma Thomas-Odia"}
            </h3>

            <p className="text-gray-400 leading-7">
              {profile?.title ||
                "Journalist • Editor • Communications Professional"}
            </p>

            <p className="text-gray-500 mt-5 leading-7 max-w-md">
              {profile?.bio ||
                "Using words, stories, and strategic communication to shape conversations that matter."}
            </p>

          </div>

          {/* Connect */}

          <div className="lg:text-center">

            <h4 className="text-[#C8A97E] uppercase tracking-[0.2em] text-sm mb-6">
              Connect
            </h4>

            <div className="flex flex-col gap-4">

              <a
                href={`mailto:${profile?.email}`}
                className="text-gray-300 hover:text-[#C8A97E] transition"
              >
                Email
              </a>

              <a
                href={profile?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#C8A97E] transition"
              >
                LinkedIn
              </a>

              <a
                href={profile?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#C8A97E] transition"
              >
                Instagram
              </a>

            </div>

          </div>

          {/* Clock */}

          <div className="lg:text-right">

            <p className="text-[#C8A97E] uppercase tracking-[0.25em] text-xs mb-2">
              Lagos, Nigeria
            </p>

            <p className="text-white text-3xl font-light">
              {lagosTime}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              West Africa Time (WAT)
            </p>

          </div>

        </div>

        {/* Bottom Bar */}

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()}{" "}
            {profile?.name ||
              "Ijeoma Thomas-Odia"}
            . All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Designed & Developed by{" "}
            <span className="text-[#C8A97E]">
              Switch
            </span>
          </p>

        </div>

      </div>
    </footer>
  );
}