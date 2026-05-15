"use client";

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

const LapTelemetryMap = lazy(() => import("./LapTelemetryMap"));

function MapFallback() {
  return (
    <div
      className="h-[min(420px,55vh)] w-full animate-pulse rounded-xl bg-white/[0.04] ring-1 ring-white/10"
      aria-hidden
    />
  );
}

/** Load WebGL map only when scrolled into view — lighter initial page and more stable in CI/Lighthouse. */
export default function TelemetryMapGate() {
  const wrap = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const root = wrap.current;
    if (!root || show) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [show]);

  return (
    <div ref={wrap}>
      {show ? (
        <Suspense fallback={<MapFallback />}>
          <LapTelemetryMap />
        </Suspense>
      ) : (
        <MapFallback />
      )}
    </div>
  );
}
