import FadeIn from "@/components/ui/FadeIn";

export default function QuoteSection() {
  return (
    <FadeIn>
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <p
            className="
              text-[#A37B55]
              uppercase
              tracking-[0.3em]
              text-sm
              mb-8
            "
          >
            Philosophy
          </p>

          <blockquote
            className="
              hero-heading
              text-4xl
              md:text-5xl
              lg:text-6xl
              text-[#222222]
              leading-tight
            "
          >
            “Stories have the power to inform,
            inspire and transform societies.”
          </blockquote>

          <div className="w-20 h-[2px] bg-[#A37B55] mx-auto mt-10" />

          <p className="mt-6 text-[#666666]">
            — Ijeoma Thomas-Odia
          </p>

        </div>
      </section>
    </FadeIn>
  );
}