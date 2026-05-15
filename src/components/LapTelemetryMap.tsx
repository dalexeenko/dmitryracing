"use client";

import { useEffect, useRef } from "react";

import type { FeatureCollection, LineString } from "geojson";

export default function LapTelemetryMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    let map: import("maplibre-gl").Map | undefined;

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      await import("maplibre-gl/dist/maplibre-gl.css");

      if (cancelled || !ref.current) return;

      const res = await fetch("/data/laps/portimao-reference.geojson");
      const data = (await res.json()) as FeatureCollection;

      const g = data.features[0]?.geometry;
      const coords = g && g.type === "LineString" ? (g as LineString).coordinates : undefined;
      if (!coords?.length) return;

      let minLon = Infinity,
        minLat = Infinity,
        maxLon = -Infinity,
        maxLat = -Infinity;
      for (const [lon, lat] of coords) {
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      }

      map = new maplibregl.Map({
        container: ref.current,
        style: "https://demotiles.maplibre.org/style.json",
        bounds: [
          [minLon, minLat],
          [maxLon, maxLat],
        ],
        fitBoundsOptions: { padding: 48, maxZoom: 14 },
        attributionControl: true,
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

      const addLap = () => {
        if (!map) return;
        map.addSource("lap", {
          type: "geojson",
          data,
        });
        map.addLayer({
          id: "lap-line",
          type: "line",
          source: "lap",
          paint: {
            "line-color": "#e53935",
            "line-width": 4,
            "line-opacity": 0.95,
          },
        });
      };

      if (map.loaded()) addLap();
      else map.once("load", addLap);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="h-[min(420px,55vh)] w-full overflow-hidden rounded-xl ring-1 ring-white/10"
      role="region"
      aria-label="Lap trace map"
    />
  );
}
