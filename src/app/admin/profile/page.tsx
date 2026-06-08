"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");

  const [heroQuote, setHeroQuote] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroDescription, setHeroDescription] = useState("");

  const [aboutHeading, setAboutHeading] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  const [aboutDescription2, setAboutDescription2] = useState("");
const [heroImage, setHeroImage] = useState("");

const [uploadingImage, setUploadingImage] =
  useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

async function fetchProfile() {
  const { data } = await supabase
    .from("profile")
    .select("*")
    .single();

  if (data) {
    setName(data.name || "");
    setTitle(data.title || "");
    setBio(data.bio || "");

    setEmail(data.email || "");
    setLinkedin(data.linkedin || "");
    setInstagram(data.instagram || "");

    setHeroQuote(data.hero_quote || "");
    setHeroHeading(data.hero_heading || "");
    setHeroDescription(data.hero_description || "");

    setAboutHeading(data.about_heading || "");
    setAboutDescription(data.about_description || "");
    setAboutDescription2(
      data.about_description_2 || ""
    );

    setHeroImage(
      data.hero_image || ""
    );
  }
}

async function uploadHeroImage(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    setUploadingImage(true);

    const fileName =
      Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("profile-images")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("profile-images")
      .getPublicUrl(fileName);

    setHeroImage(publicUrl);

    alert("Image uploaded successfully");
  } catch (error) {
    console.error(error);
    alert("Upload failed");
  } finally {
    setUploadingImage(false);
  }
}

async function saveProfile(
  e: React.FormEvent
) {
  e.preventDefault();

  const { error } = await supabase
    .from("profile")
    .update({
      name,
      title,
      bio,

      email,
      linkedin,
      instagram,

      hero_quote: heroQuote,
      hero_heading: heroHeading,
      hero_description: heroDescription,

      about_heading: aboutHeading,
      about_description: aboutDescription,
      about_description_2: aboutDescription2,

      hero_image: heroImage,
    })
    .eq("id", 1);

  if (!error) {
    alert("Profile updated successfully!");
  }
}

  return (
    <div className="max-w-5xl">

      <h1 className="text-5xl font-bold text-white mb-3">
        Profile CMS
      </h1>

      <p className="text-gray-400 mb-10">
        Manage all public website content from one place.
      </p>

      <form
        onSubmit={saveProfile}
        className="space-y-8"
      >

        {/* HERO SECTION */}

        <div className="bg-[#1A1A1A] p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Hero Section
          </h2>

          <div className="space-y-5">

            <div>
              <label className="block text-white mb-2 font-medium">
                Full Name
              </label>

              <p className="text-gray-500 text-sm mb-3">
                This appears as your public identity.
              </p>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

            <div>
  <label className="block text-white mb-2 font-medium">
    Hero Image
  </label>

  <p className="text-gray-500 text-sm mb-3">
    Upload the portrait shown on the homepage.
  </p>

  <input
    type="file"
    accept="image/*"
    onChange={uploadHeroImage}
    className="
      w-full
      p-4
      rounded-xl
      bg-black
      text-white
    "
  />

  {uploadingImage && (
    <p className="text-[#C8A97E] mt-3">
      Uploading image...
    </p>
  )}

  {heroImage && (
    <img
      src={heroImage}
      alt="Hero Preview"
      className="
        mt-5
        w-48
        h-64
        object-cover
        rounded-2xl
      "
    />
  )}
</div>

            <div>
              <label className="block text-white mb-2 font-medium">
                Professional Tagline
              </label>

              <p className="text-gray-500 text-sm mb-3">
                Example: Award-Winning Journalist • Editor • Advocate
              </p>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                Hero Headline
              </label>

              <p className="text-gray-500 text-sm mb-3">
                The large headline visitors see first.
              </p>

              <textarea
                value={heroHeading}
                onChange={(e) =>
                  setHeroHeading(e.target.value)
                }
                rows={3}
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                Hero Description
              </label>

              <p className="text-gray-500 text-sm mb-3">
                Supporting text beneath the hero headline.
              </p>

              <textarea
                value={heroDescription}
                onChange={(e) =>
                  setHeroDescription(e.target.value)
                }
                rows={5}
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

          </div>
        </div>

        {/* ABOUT SECTION */}

        <div className="bg-[#1A1A1A] p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            About Section
          </h2>

          <div className="space-y-5">

            <div>
              <label className="block text-white mb-2 font-medium">
                About Heading
              </label>

              <textarea
                value={aboutHeading}
                onChange={(e) =>
                  setAboutHeading(e.target.value)
                }
                rows={3}
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                About Paragraph One
              </label>

              <textarea
                value={aboutDescription}
                onChange={(e) =>
                  setAboutDescription(e.target.value)
                }
                rows={5}
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                About Paragraph Two
              </label>

              <textarea
                value={aboutDescription2}
                onChange={(e) =>
                  setAboutDescription2(e.target.value)
                }
                rows={5}
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                Short Biography
              </label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                rows={4}
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

          </div>
        </div>

        {/* CONTACT SECTION */}

        <div className="bg-[#1A1A1A] p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Contact Information
          </h2>

          <div className="space-y-5">

            <div>
              <label className="block text-white mb-2 font-medium">
                Email Address
              </label>

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                LinkedIn URL
              </label>

              <input
                value={linkedin}
                onChange={(e) =>
                  setLinkedin(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">
                Instagram URL
              </label>

              <input
                value={instagram}
                onChange={(e) =>
                  setInstagram(e.target.value)
                }
                className="w-full p-4 rounded-xl bg-black text-white"
              />
            </div>

          </div>
        </div>

        {/* OPTIONAL */}

        <div className="bg-[#1A1A1A] p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Optional Content
          </h2>

          <label className="block text-white mb-2 font-medium">
            Hero Quote
          </label>

          <textarea
            value={heroQuote}
            onChange={(e) =>
              setHeroQuote(e.target.value)
            }
            rows={4}
            className="w-full p-4 rounded-xl bg-black text-white"
          />
        </div>

        <button
          type="submit"
          className="
            bg-[#C8A97E]
            hover:bg-[#b8966c]
            transition
            text-black
            px-8
            py-4
            rounded-full
            font-semibold
          "
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}