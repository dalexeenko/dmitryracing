"use client";
import ArrowUpRight from "./ArrowUpRight";
export default function Nav() {
    return <header className="racing-nav"><nav aria-label="Main navigation"><a href="#top" className="wordmark">dmitry<span>racing</span></a><div className="nav-links"><a href="#tracks">Circuits</a><a href="#gallery">Gallery</a><a href="#instructors">Instructors</a><a href="#lights" className="nav-play">Lights out <span aria-hidden="true"><ArrowUpRight /></span></a></div></nav></header>;
}
