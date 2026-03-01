export default function TrackMaps() {
  return (
    <section className="border-y border-white/5 bg-[#0f0f0f]">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 px-6 py-10 sm:grid-cols-4 sm:gap-6">
        {TRACKS.map((track) => (
          <div
            key={track.name}
            className="group flex flex-col items-center gap-3"
          >
            <img
              src={track.svg}
              alt={`${track.name} circuit layout`}
              className="h-16 w-16 opacity-30 transition-opacity duration-200 group-hover:opacity-100 sm:h-20 sm:w-20 md:h-28 md:w-28"
            />
            <div className="text-center">
              <p className="text-xs font-semibold tracking-wide text-white/50 uppercase transition-colors duration-200 group-hover:text-white">
                {track.name}
              </p>
              <p className="relative text-[10px] text-white/25 cursor-default transition-colors duration-200 group-hover:text-white/60">
                <span className="transition-opacity duration-200 group-hover:opacity-0">
                  {track.detail}
                </span>
                <span className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {track.miles}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const TRACKS = [
  {
    name: "Portimão",
    detail: "4.653 km · 16 turns",
    miles: "2.891 mi · 16 turns",
    svg: "/tracks/portimao.svg",
  },
  {
    name: "Estoril",
    detail: "4.182 km · 13 turns",
    miles: "2.598 mi · 13 turns",
    svg: "/tracks/estoril.svg",
  },
  {
    name: "Pacific Raceways",
    detail: "3.621 km · 10 turns",
    miles: "2.250 mi · 10 turns",
    svg: "/tracks/pacific.svg",
  },
  {
    name: "The Ridge",
    detail: "3.975 km · 16 turns",
    miles: "2.470 mi · 16 turns",
    svg: "/tracks/ridge.svg",
  },
];
