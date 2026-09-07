"use client";
import { useState } from "react";
import photos from "../data/photos.json";
import Lightbox from "./Lightbox";
import { TRACKS } from "./TrackMaps";
import type { Album } from "../app/page";
const names: Record<string, string> = { algarve: "Portimão", estoril: "Estoril", pacific: "Pacific Raceways", ridge: "The Ridge", gt4: "The GT4" };
const VIDEOS = [{ poster: "/video/estoril-poster.jpg", href: "https://youtu.be/RzpMaU0VYzA", title: "Estoril · Onboard" }, { poster: "/video/gt4-poster.jpg", href: "https://www.youtube.com/watch?v=Ry88WxWedhs", title: "The GT4 · In motion" }, { poster: "/video/redgt4-poster.jpg", href: "https://www.youtube.com/watch?v=C1cIG04eZyw", title: "A day on track" }];
export default function Gallery({ activeAlbum }: {
    activeAlbum: Album;
}) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [expanded, setExpanded] = useState(false);
    const filtered = activeAlbum === 'all' ? photos : photos.filter(p => p.album === activeAlbum);
    const visible = expanded ? filtered : filtered.slice(0, 12);
    const track = TRACKS.find(t => t.album === activeAlbum);
    return <section id="gallery" className="gallery-section section-wrap"><div className="section-heading"><div><p className="eyebrow">02 / THE COLLECTION</p><h2>{activeAlbum === 'all' ? 'Life around the racing line.' : track?.name}</h2></div><p className="gallery-count" aria-live="polite">{filtered.length} photographs {track && <span>· {track.region}</span>}</p></div>{track && <div className="selected-circuit" key={track.album}><img src={track.svg} alt=""/><span>{track.detail} <span className="detail-separator">/</span> {track.turns} turns</span><span className="eyebrow">{track.name}</span></div>}
 {filtered.length === 0 ? <div className="gallery-empty"><h3>A place in the collection.</h3><p>Photos from The Ridge haven’t been added to this album yet.</p></div> : <><div className="editorial-grid">{visible.map((photo, index) => <button className={`photo-tile ${index % 6 === 0 ? 'photo-wide' : ''} ${photo.height > photo.width ? 'photo-portrait' : ''}`} key={photo.id} onClick={() => setLightboxIndex(index)} aria-label={`Open photograph ${index + 1}: ${photo.caption || names[photo.album]}`}><img src={index % 6 === 0 ? photo.src : photo.thumb} alt={photo.caption || `Red Porsche 718 Cayman GT4 · ${names[photo.album] || 'On track'}`} width={photo.width} height={photo.height} loading="lazy" decoding="async"/><span className="photo-caption"><span>{photo.caption || names[photo.album]}</span><span aria-hidden="true">↗</span></span></button>)}</div>{filtered.length > 12 && <div className="gallery-more"><span>Showing {visible.length} of {filtered.length}</span><button className="outline-button" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show highlights' : 'View the full collection'} <span aria-hidden="true">{expanded ? '−' : '+'}</span></button></div>}</>}
 {(activeAlbum === 'all' || activeAlbum === 'estoril') && <div className="films"><div className="section-heading"><h3>Press play.</h3><p className="eyebrow">FROM THE DRIVER’S SEAT</p></div><div className="film-grid">{(activeAlbum === 'estoril' ? VIDEOS.slice(0, 1) : VIDEOS).map(video => <a key={video.href} href={video.href} target="_blank" rel="noopener noreferrer" className="film"><div className="film-image"><img src={video.poster} alt="" loading="lazy" width="640" height="360"/><span className="play-symbol" aria-hidden="true">▶</span></div><span>{video.title}<span aria-hidden="true">↗</span></span></a>)}</div></div>}
 {lightboxIndex !== null && <Lightbox photos={filtered} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)}/>}
 </section>;
}
