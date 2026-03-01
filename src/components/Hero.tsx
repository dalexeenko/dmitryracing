export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/photos/full/sunset-racing-school-14-09-111.jpg"
        alt="Red Porsche 718 Cayman GT4 at speed on Algarve International Circuit"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-12 md:px-20 lg:px-28">
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          DMITRY
          <br />
          <span className="text-[#e53935]">RACING</span>
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/60 sm:text-xl">
          Portimão &middot; Estoril &middot; Pacific Raceways &middot; The Ridge
        </p>
        <a
          href="#gallery"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          View Gallery
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="translate-y-px"
          >
            <path
              d="M8 3v10m0 0l-4-4m4 4l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
