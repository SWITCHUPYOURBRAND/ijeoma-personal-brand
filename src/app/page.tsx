import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import QuoteSection from "@/components/home/QuoteSection";
import About from "@/components/home/About";
import FeaturedIn from "@/components/home/FeaturedIn";
import FeaturedWork from "@/components/home/FeaturedWork";
import Gallery from "@/components/home/Gallery";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <QuoteSection />

      <About />

      <FeaturedIn />

      <FeaturedWork />

      <Gallery />

      <Contact />

      <Footer />
    </>
  );
}