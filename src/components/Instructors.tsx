const INSTRUCTORS = [
  {
    name: "Don Kitch Jr.",
    photo: "/instructors/don-kitch.jpg",
    description:
      "Veteran of 200+ professional starts. Founded ProFormance Racing School in 1994 and Team Seattle in 1997.",
    link: "https://proformanceracingschool.com/about/team/don-kitch-jr/",
    location: "Pacific Raceways & The Ridge",
  },
  {
    name: "Curtis Creager",
    photo: "/instructors/curtis-creager.jpg",
    description:
      "BMW and Porsche club instructor since 1999. With ProFormance since 2009, also runs manufacturer launch events across the USA.",
    link: "https://proformanceracingschool.com/about/team/curtis-creager/",
    location: "Pacific Raceways & The Ridge",
  },
  {
    name: "Diogo Soares",
    photo: "/instructors/diogo-soares.jpg",
    description:
      "Track instructor at the Algarve International Circuit in Portimão, Portugal.",
    link: "https://www.facebook.com/photo/?fbid=665096160973958&set=a.665096137640627",
    location: "Portimão & Estoril",
  },
];

export default function Instructors() {
  return (
    <section className="border-t border-white/5 px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-white/40">
          Thank You
        </h2>
        <p className="mb-10 text-lg text-white/60">
          To the instructors who made it all possible.
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {INSTRUCTORS.map((inst) => (
            <a
              key={inst.name}
              href={inst.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <img
                src={inst.photo}
                alt={inst.name}
                width={80}
                height={80}
                className="mb-3 rounded-full grayscale opacity-70 transition-opacity group-hover:opacity-100"
              />
              <p className="font-bold text-white/80 transition-colors group-hover:text-white">
                {inst.name}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-white/30">
                {inst.location}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/40 transition-colors group-hover:text-white/60">
                {inst.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
