import FadeIn from "@/components/ui/FadeIn";

export default function FeaturedIn() {
  const publications = [
    "The Guardian",
    "BusinessDay",
    "ThisDay",
    "Arise News",
    "The Nation",
    "Leadership",
  ];

  return (
    <FadeIn>
      <section className="bg-[#F7F1EA] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <p className="uppercase tracking-[0.3em] text-[#A37B55] text-sm text-center mb-4">
            Featured In
          </p>

          <h2
            className="
              hero-heading
              text-4xl
              md:text-5xl
              text-center
              text-[#222222]
              mb-14
            "
          >
            Trusted by leading media platforms.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

            {publications.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  rounded-2xl
                  p-6
                  text-center
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                <p className="font-semibold text-[#333]">
                  {item}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>
    </FadeIn>
  );
}