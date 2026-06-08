import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Ijeoma Thomas-Odia",
    template: "%s | Ijeoma Thomas-Odia",
  },

  description:
    "Award-winning journalist, editor, gender advocate and communications professional committed to stories that inform, inspire and create meaningful change.",

  keywords: [
    "Ijeoma Thomas-Odia",
    "Journalist",
    "Editor",
    "Communications Professional",
    "Gender Advocate",
    "Media",
    "Leadership",
    "Storytelling",
    "Nigeria",
    "Lagos",
  ],

  authors: [
    {
      name: "Ijeoma Thomas-Odia",
    },
  ],

  creator: "Ijeoma Thomas-Odia",

  openGraph: {
    title: "Ijeoma Thomas-Odia",
    description:
      "Award-winning journalist, editor, gender advocate and communications professional.",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ijeoma Thomas-Odia",
    description:
      "Award-winning journalist, editor, gender advocate and communications professional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable}`}
      >
        {children}

        <Analytics />
      </body>
    </html>
  );
}