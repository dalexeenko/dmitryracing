"use client";
export default function Hero() {
    return (<section id="top" className="racing-hero">
      <div className="hero-heading">
        <p className="eyebrow">PORSCHE 718 CAYMAN GT4 · PORTUGAL & THE PACIFIC NORTHWEST</p>
        <h1>DMITRY<span>RACING</span><span className="title-dot">.</span></h1>
      </div>
      <div className="hero-image">
        <picture><source media="(max-width: 640px)" srcSet="/photos/full/before-the-first-lap-mobile.webp"/><img src="/photos/full/before-the-first-lap.webp" alt="Red Porsche 718 Cayman GT4 waiting outside the Estoril pit garages" width="2200" height="1467" fetchPriority="high"/></picture>
        <div className="hero-caption"><div><span className="eyebrow">ESTORIL, PORTUGAL</span><p>Before the first lap.</p></div><a href="#tracks" className="hero-explore">Explore the circuits <span aria-hidden="true">↘</span></a></div>
      </div>
      <div className="hero-bottom"><span>Four circuits. One red GT4.</span><a href="#gallery">The photo collection <span aria-hidden="true">↓</span></a></div>
    </section>);
}
