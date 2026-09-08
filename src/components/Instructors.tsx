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
    name: "Diogo Soares",
    photo: "/instructors/diogo-soares-rally.jpg",
    description:
      "Professional rally driver and instructor at Estoril and Portimão.",
    link: "https://www.autosport.pt/ralis/cnr-campeonato-nacional-de-ralis/diogo-soares-tentar-subir-classe-conseguir-um-r2-nacional/",
    location: "Portimão & Estoril",
  },
  {
    name: "Ricardo Madeira",
    photo: "/instructors/ricardo-madeira.jpg",
    description:
      "Professional race driver and safety car driver at Portimão.",
    link: undefined,
    location: "Portimão",
  },
];

export default function Instructors() {
  return (
    <section id="instructors" className="border-t border-white/5 px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-white/40">
          Thank You
        </h2>
        <p className="mb-10 text-lg text-white/60">
          To the instructors who made it all possible.
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {INSTRUCTORS.map((inst) => {
            const Card = inst.link ? "a" : "div";
            return (
              <Card
                key={inst.name}
                {...(inst.link ? { href: inst.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group block text-center"
              >
                <img
                  src={inst.photo}
                  alt={inst.name}
                  width={80}
                  height={80}
                  className="mx-auto mb-3 h-20 w-20 rounded-full object-cover grayscale opacity-70 transition-opacity group-hover:opacity-100"
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
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
