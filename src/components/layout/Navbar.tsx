"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", link: "#about" },
    { name: "Work", link: "#publications" },
    { name: "Gallery", link: "#gallery" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <header
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-[#F7F1EA]/80
        border-b
        border-[#E8DED2]
      "
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-5">

        {/* Logo */}

        <a
          href="#"
          className="flex items-center gap-3"
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-11 h-11 object-contain"
          />

          <div>
            <h1 className="text-xl lg:text-2xl font-semibold text-[#222222] leading-none">
              Ijeoma
            </h1>

            <p className="text-xs tracking-[0.25em] text-[#A37B55] uppercase mt-1">
              Thomas-Odia
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-10">

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="
                group
                relative
                text-[#222222]
                font-medium
                transition-all
                duration-300
                hover:text-[#A37B55]
              "
            >
              {item.name}

              <span
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-[2px]
                  w-0
                  bg-[#A37B55]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}

        </div>

        {/* Desktop CTA */}

        <a
          href="#contact"
          className="
            hidden
            md:block
            bg-[#A37B55]
            text-white
            px-6
            py-3
            rounded-full
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-xl
          "
        >
          Let's Connect
        </a>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            md:hidden
            text-3xl
            text-[#222222]
          "
        >
          ☰
        </button>

      </nav>

      {/* Mobile Menu */}

      {isOpen && (
        <div
          className="
            md:hidden
            bg-[#F7F1EA]
            border-t
            border-[#E8DED2]
            px-6
            py-6
          "
        >
          <div className="flex flex-col gap-6">

            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="
                  text-[#222222]
                  font-medium
                  hover:text-[#A37B55]
                "
              >
                {item.name}
              </a>
            ))}

            <a
              href="#contact"
              className="
                bg-[#A37B55]
                text-white
                text-center
                py-3
                rounded-full
              "
            >
              Let's Connect
            </a>

          </div>
        </div>
      )}

    </header>
  );
}