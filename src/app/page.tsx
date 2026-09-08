"use client";
import { useState } from "react";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import ArrowUpRight from "../components/ArrowUpRight";
import TrackMaps from "../components/TrackMaps";
import Gallery from "../components/Gallery";
import Instructors from "../components/Instructors";
import ReactionGame from "../components/ReactionGame";
export type Album = "all" | "algarve" | "estoril" | "gt4" | "pacific" | "ridge";
export default function Home() {
    const [activeAlbum, setActiveAlbum] = useState<Album>('all');
    return <main><Nav /><Hero /><TrackMaps activeAlbum={activeAlbum} onAlbumChange={setActiveAlbum}/><Gallery key={activeAlbum} activeAlbum={activeAlbum}/><ReactionGame /><Instructors /><footer className="racing-footer"><a href="#top" className="wordmark">dmitry<span>racing</span></a><div><a href="https://www.instagram.com/gt4.adventures" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight /></a><a href="https://dmitry.pt" target="_blank" rel="noopener noreferrer">dmitry.pt <ArrowUpRight /></a></div><a href="#top">Back to the top ↑</a></footer></main>;
}
