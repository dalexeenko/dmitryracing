"use client";
import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
interface Photo {
    id: string;
    src: string;
    thumb: string;
    blurDataURL: string;
    width: number;
    height: number;
    album: string;
    caption?: string;
}
export default function Lightbox({ photos, initialIndex, onClose }: {
    photos: Photo[];
    initialIndex: number;
    onClose: () => void;
}) {
    const [index, setIndex] = useState(initialIndex);
    const dialog = useRef<HTMLDialogElement>(null);
    const stage = useRef<HTMLDivElement>(null);
    const [fullscreenError, setFullscreenError] = useState(false);
    const photo = photos[index];
    const [isFullscreen, setIsFullscreen] = useState(false);
    useEffect(() => {
        const update = () => setIsFullscreen(document.fullscreenElement === stage.current);
        document.addEventListener("fullscreenchange", update);
        return () => document.removeEventListener("fullscreenchange", update);
    }, []);
    const toggleFullscreen = async () => {
        try {
            setFullscreenError(false);
            if (document.fullscreenElement === stage.current) await document.exitFullscreen();
            else await stage.current?.requestFullscreen();
        } catch {
            setFullscreenError(true);
        }
    };
    useEffect(() => { const el = dialog.current; const overflow = document.body.style.overflow; el?.showModal(); document.body.style.overflow = 'hidden'; return () => { el?.close(); document.body.style.overflow = overflow; }; }, []);
    const prev = () => setIndex(i => Math.max(0, i - 1));
    const next = () => setIndex(i => Math.min(photos.length - 1, i + 1));
    const swipe = useSwipeable({ onSwipedLeft: next, onSwipedRight: prev, preventScrollOnSwipe: true });
    return <dialog ref={dialog} className="photo-dialog" aria-label="Photo viewer" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget)
        onClose(); }} onKeyDown={e => { if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
    } if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
    } }}><div ref={stage} className="lightbox-stage"><div className="lightbox-toolbar"><span aria-live="polite">{index + 1} / {photos.length}</span><div className="lightbox-actions">{fullscreenError && <span role="status">Full screen is unavailable in this browser.</span>}<button onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}>{isFullscreen ? "Exit full screen" : "Full screen"}</button><button autoFocus aria-label="Close photo viewer" onClick={onClose}>Close <span aria-hidden="true">×</span></button></div></div><div {...swipe} className="lightbox-image"><img src={photo.src} alt={photo.caption || 'Porsche 718 Cayman GT4 on track'}/></div><div className="lightbox-bottom"><button onClick={prev} disabled={index === 0} aria-label="Previous photograph">← Previous</button><p>{photo.caption}</p><button onClick={next} disabled={index === photos.length - 1} aria-label="Next photograph">Next →</button></div></div></dialog>;
}
