"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
type Phase = 'idle' | 'countdown' | 'go' | 'result' | 'early';
export default function ReactionGame() {
    const [phase, setPhase] = useState<Phase>('idle');
    const phaseRef = useRef<Phase>('idle');
    const [lights, setLights] = useState(0);
    const [result, setResult] = useState(0);
    const [best, setBest] = useState<number | null>(null);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const startTime = useRef(0);
    const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    const change = (next: Phase) => { phaseRef.current = next; setPhase(next); };
    useLayoutEffect(() => { if (phase === 'go')
        startTime.current = performance.now(); }, [phase]);
    useEffect(() => { const cancel = () => { if (document.hidden && (phaseRef.current === 'countdown' || phaseRef.current === 'go')) {
        clear();
        setLights(0);
        change('idle');
    } }; document.addEventListener('visibilitychange', cancel); return () => { clear(); document.removeEventListener('visibilitychange', cancel); }; }, []);
    const act = () => {
        const current = phaseRef.current;
        if (current === 'countdown') {
            clear();
            change('early');
            return;
        }
        if (current === 'go') {
            const elapsed = Math.max(0, Math.round(performance.now() - startTime.current));
            setResult(elapsed);
            setBest(b => b === null ? elapsed : Math.min(b, elapsed));
            change('result');
            return;
        }
        clear();
        setLights(0);
        change('countdown');
        for (let i = 1; i <= 5; i++)
            timers.current.push(setTimeout(() => setLights(i), i * 600));
        timers.current.push(setTimeout(() => { setLights(0); change('go'); }, 3800 + Math.random() * 1800));
    };
    const label = phase === 'idle' ? 'Start the lights' : phase === 'countdown' ? 'Wait for lights out…' : phase === 'go' ? 'GO!' : phase === 'early' ? 'Jump start. Try again' : 'Go again';
    return <section id="lights" className="reaction-section section-wrap"><div className="reaction-copy"><p className="eyebrow">03 / A LITTLE COMPETITION</p><h2>Lights out.<br /><span>Your move.</span></h2><p>Five red lights. Wait until they go out.<br />Then tap as fast as you can.</p><span className="reaction-hint">Tap the button, or focus it and press Space.</span></div><div className={`reaction-game phase-${phase}`}><div className="start-lights" aria-label={`${lights} of 5 red lights illuminated`}>{Array.from({ length: 5 }, (_, i) => <span key={i} className={i < lights ? 'lit' : ''}/>)}</div><div className="reaction-readout" aria-live="polite">{phase === 'result' ? <><strong>{(result / 1000).toFixed(3)}</strong><span>SECONDS</span></> : phase === 'early' ? <><strong className="readout-word">Too soon.</strong><span>WAIT FOR ALL FIVE LIGHTS TO GO OUT</span></> : phase === 'go' ? <><strong className="readout-word">GO!</strong><span>LIGHTS OUT</span></> : <><strong>—.———</strong><span>{phase === 'countdown' ? 'HOLD YOUR NERVE' : 'REACTION TIME'}</span></>}</div><button className="reaction-button" onPointerDown={e => { if (e.button === 0) {
        e.preventDefault();
        e.currentTarget.focus();
        act();
    } }} onKeyDown={e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
        e.preventDefault();
        act();
    } }} onClick={e => { if (e.detail === 0)
        act(); }}>{label}<span aria-hidden="true">↗</span></button><p className="session-best">{best === null ? 'Your best time this visit will appear here.' : `Best this visit: ${(best / 1000).toFixed(3)} s`}</p></div></section>;
}
