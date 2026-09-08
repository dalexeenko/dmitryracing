"use client";
import type { Album } from "../app/page";
export const TRACKS = [
    { name: "Portimão", region: "ALGARVE, PORTUGAL", detail: "4.653 km", turns: 16, svg: "/tracks/portimao.svg", album: "algarve" },
    { name: "Estoril", region: "ESTORIL, PORTUGAL", detail: "4.182 km", turns: 13, svg: "/tracks/estoril.svg", album: "estoril" },
    { name: "Pacific Raceways", region: "SEATTLE, WASHINGTON", detail: "3.621 km", turns: 10, svg: "/tracks/pacific.svg", album: "pacific" },
    { name: "The Ridge", region: "SEATTLE, WASHINGTON", detail: "3.975 km", turns: 16, svg: "/tracks/ridge.svg", album: "ridge" },
] as const;
export default function TrackMaps({ activeAlbum, onAlbumChange }: {
    activeAlbum: Album;
    onAlbumChange: (album: Album) => void;
}) {
    return <section id="tracks" className="circuits section-wrap"><div className="section-heading"><div><p className="eyebrow">01 / THE CIRCUITS</p><h2>Pick your playground.</h2></div><button className="text-button" aria-pressed={activeAlbum === 'all'} onClick={() => onAlbumChange('all')}>All circuits <span aria-hidden="true">↗</span></button></div><div className="circuit-grid" aria-label="Filter photos by circuit">{TRACKS.map((track, i) => <button key={track.album} className={`circuit ${activeAlbum === track.album ? 'selected' : ''}`} aria-pressed={activeAlbum === track.album} aria-controls="gallery" onClick={() => onAlbumChange(track.album)}><div className="circuit-top"><span className="eyebrow">0{i + 1}</span><span className="circuit-arrow" aria-hidden="true">↗</span></div><img src={track.svg} alt={`${track.name} circuit layout`}/><span className="circuit-name">{track.name}</span><span className="circuit-details">{track.detail} <span>·</span> {track.turns} turns</span><span className="circuit-region">{track.region}</span></button>)}</div></section>;
}
