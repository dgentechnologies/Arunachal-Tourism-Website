"use client";

import { useState, useRef, useEffect } from "react";
import { X, Calendar, MapPin, Utensils, Camera, Users, ChevronRight, Mountain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { locations, type Location } from "./guides-data";

/* ─────────────────────────────────────────────
   SVG viewport: 800 × 520
   Approximate boundary path of Arunachal Pradesh
   lon 91.5°–97.5° → x = (lon-91.5)/6*800
   lat 26.5°–29.5° → y = (29.5-lat)/3*520
───────────────────────────────────────────── */
const MAP_PATH =
  "M 17,301 " +
  "L 27,270 L 45,232 L 62,200 L 85,168 L 110,135 " +
  "L 140,103 L 165,72 L 200,47 L 240,22 L 280,8 " +
  "L 325,2 L 373,0 L 413,8 L 453,22 L 487,48 " +
  "L 520,62 L 553,42 L 593,30 L 640,28 L 680,32 " +
  "L 720,55 L 760,100 L 792,160 L 805,230 " +
  "L 800,295 L 785,355 L 760,398 " +
  "L 720,432 L 680,455 L 640,468 " +
  "L 595,478 L 547,484 L 500,487 " +
  "L 453,486 L 407,483 L 360,479 " +
  "L 313,476 L 267,472 L 227,467 " +
  "L 187,458 L 147,448 L 107,436 " +
  "L 73,424 L 45,408 L 27,378 L 17,348 Z";

/* Grid lines (lat/lon graticule) */
const GRATICULE_LONS = [92, 93, 94, 95, 96, 97];
const GRATICULE_LATS = [27, 28, 29];
const W = 800;
const H = 520;
function lonToX(lon: number) { return ((lon - 91.5) / 6) * W; }
function latToY(lat: number) { return ((29.5 - lat) / 3) * H; }

/* ─── Location detail panel ─── */
interface PanelProps {
  loc: Location;
  onClose: () => void;
}

function DetailPanel({ loc, onClose }: PanelProps) {
  const [tab, setTab] = useState<"places" | "food" | "tribes" | "activities">("places");
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click (desktop)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const tabs: { key: typeof tab; label: string; icon: React.ReactNode }[] = [
    { key: "places", label: "Visit", icon: <Camera className="h-3.5 w-3.5" /> },
    { key: "food", label: "Food", icon: <Utensils className="h-3.5 w-3.5" /> },
    { key: "tribes", label: "Tribes", icon: <Users className="h-3.5 w-3.5" /> },
    { key: "activities", label: "Do", icon: <Mountain className="h-3.5 w-3.5" /> },
  ];

  return (
    <div
      ref={panelRef}
      className="flex flex-col h-full overflow-hidden bg-white rounded-2xl shadow-2xl"
      style={{ borderLeft: `4px solid ${loc.color}` }}
    >
      {/* Header */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={loc.image}
          alt={loc.name}
          className="w-full h-36 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 left-4">
          <Badge
            className="text-white border-0 text-[11px] mb-1"
            style={{ backgroundColor: loc.color }}
          >
            {loc.category}
          </Badge>
          <h2 className="text-white text-xl font-bold font-headline leading-tight">
            {loc.name}
          </h2>
          <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3" />
            {loc.district}
          </p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 px-4 py-2 border-b text-xs text-muted-foreground bg-muted/30">
        <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
        <span>Best time: <strong className="text-foreground">{loc.bestTime}</strong></span>
      </div>

      {/* Desc */}
      <p className="px-4 pt-3 pb-2 text-sm text-muted-foreground leading-relaxed">
        {loc.desc}
      </p>

      {/* Tabs */}
      <div className="flex gap-1 px-4 pb-2">
        {tabs.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              tab === key
                ? "text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            style={tab === key ? { backgroundColor: loc.color } : undefined}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {tab === "places" && (
          <ul className="space-y-2 mt-1">
            {loc.placesToVisit.map((place) => (
              <li key={place} className="flex items-start gap-2 text-sm">
                <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" style={{ color: loc.color }} />
                <span>{place}</span>
              </li>
            ))}
          </ul>
        )}
        {tab === "food" && (
          <ul className="space-y-2 mt-1">
            {loc.foodAndDrinks.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Utensils className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: loc.color }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {tab === "tribes" && (
          <div className="space-y-3 mt-1">
            {loc.tribes.map((tribe) => (
              <div
                key={tribe.name}
                className="rounded-xl p-3 border"
                style={{ borderColor: loc.color + "40", backgroundColor: loc.color + "0a" }}
              >
                <p className="font-semibold text-sm mb-1" style={{ color: loc.color }}>
                  {tribe.name}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{tribe.desc}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "activities" && (
          <ul className="space-y-2 mt-1">
            {loc.activities.map((act) => (
              <li key={act} className="flex items-start gap-2 text-sm">
                <span
                  className="h-2 w-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: loc.color }}
                />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─── Map pin ─── */
function Pin({
  loc,
  isActive,
  onClick,
}: {
  loc: Location;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <g
      transform={`translate(${loc.svgX}, ${loc.svgY})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      role="button"
      aria-label={`Show details for ${loc.name}`}
    >
      {/* Pulse ring */}
      {isActive && (
        <circle r="18" fill={loc.color} fillOpacity="0.20" className="animate-ping" />
      )}
      {/* Outer glow */}
      <circle
        r={isActive ? 14 : 10}
        fill={loc.color}
        fillOpacity="0.25"
        className="transition-all duration-200"
      />
      {/* Pin body */}
      <circle
        r={isActive ? 9 : 7}
        fill={loc.color}
        stroke="white"
        strokeWidth="2"
        className="transition-all duration-200"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))" }}
      />
      {/* Dot */}
      <circle r="2.5" fill="white" />
      {/* Label */}
      <text
        x="0"
        y={isActive ? "-20" : "-16"}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill={loc.color}
        paintOrder="stroke"
        stroke="white"
        strokeWidth="3"
        strokeLinejoin="round"
        className="transition-all duration-200 select-none pointer-events-none"
        style={{ textShadow: "none" }}
      >
        {loc.name}
      </text>
    </g>
  );
}

/* ─── Main map component ─── */
export default function ArunachalMap() {
  const [active, setActive] = useState<Location | null>(null);

  function handlePin(loc: Location) {
    setActive((prev) => (prev?.id === loc.id ? null : loc));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full min-h-[560px]">
      {/* Map area */}
      <div
        className={`relative flex-1 min-h-[400px] lg:min-h-[560px] rounded-2xl overflow-hidden border border-border shadow-lg bg-[#e8f4f8] transition-all duration-300 ${
          active ? "lg:w-[58%]" : "lg:w-full"
        }`}
      >
        {/* Legend */}
        <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground text-[11px]">
            <span aria-hidden="true">🗺 </span>Tap a pin to explore
          </p>
          {locations.map((l) => (
            <div
              key={l.id}
              className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handlePin(l)}
            >
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: l.color }}
              />
              <span className={active?.id === l.id ? "font-bold text-foreground" : ""}>{l.name}</span>
            </div>
          ))}
        </div>

        <svg
          viewBox="-10 -10 820 540"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cde8f0" strokeWidth="0.5" />
            </pattern>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Ocean / background */}
          <rect x="-10" y="-10" width="820" height="540" fill="#daeef7" />
          {/* Grid */}
          <rect x="-10" y="-10" width="820" height="540" fill="url(#grid)" />

          {/* Graticule labels */}
          {GRATICULE_LONS.map((lon) => (
            <text
              key={lon}
              x={lonToX(lon)}
              y={H + 5}
              textAnchor="middle"
              fontSize="8"
              fill="#94a3b8"
            >
              {lon}°E
            </text>
          ))}
          {GRATICULE_LATS.map((lat) => (
            <text
              key={lat}
              x={-8}
              y={latToY(lat) + 3}
              textAnchor="end"
              fontSize="8"
              fill="#94a3b8"
            >
              {lat}°N
            </text>
          ))}

          {/* State boundary fill */}
          <path
            d={MAP_PATH}
            fill="#b8d9b0"
            stroke="#6aaa62"
            strokeWidth="1.5"
            filter="url(#shadow)"
          />

          {/* Terrain texture (subtle stipple overlay) */}
          <path d={MAP_PATH} fill="url(#grid)" fillOpacity="0.18" />

          {/* State label */}
          <text
            x="420"
            y="270"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#2d6a27"
            fillOpacity="0.5"
            letterSpacing="3"
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            ARUNACHAL PRADESH
          </text>

          {/* Border labels */}
          <text x="360" y="-2" textAnchor="middle" fontSize="7.5" fill="#64748b" fontStyle="italic">
            China (Tibet) ↑
          </text>
          <text x="808" y="250" fontSize="7.5" fill="#64748b" fontStyle="italic" transform="rotate(90 808 250)">
            Myanmar →
          </text>
          <text x="0" y="450" fontSize="7.5" fill="#64748b" fontStyle="italic" transform="rotate(-90 0 450)">
            ← Bhutan
          </text>
          <text x="400" y="498" textAnchor="middle" fontSize="7.5" fill="#64748b" fontStyle="italic">
            Assam ↓
          </text>

          {/* Pins */}
          {locations.map((loc) => (
            <Pin
              key={loc.id}
              loc={loc}
              isActive={active?.id === loc.id}
              onClick={() => handlePin(loc)}
            />
          ))}
        </svg>
      </div>

      {/* Detail panel */}
      {active && (
        <div className="lg:w-[42%] w-full animate-in slide-in-from-right-4 duration-300">
          <DetailPanel loc={active} onClose={() => setActive(null)} />
        </div>
      )}

      {/* Empty-state hint (no pin selected) */}
      {!active && (
        <div className="hidden lg:flex flex-col items-center justify-center w-[38%] text-center text-muted-foreground gap-4 rounded-2xl border border-dashed border-border p-8">
          <MapPin className="h-10 w-10 text-primary/40" />
          <div>
            <p className="font-semibold text-foreground">Select a destination</p>
            <p className="text-sm mt-1">
              Click any <span className="text-primary font-medium">pin</span> on the map or a name in the legend to explore places, food, tribes, and activities.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {locations.map((l) => (
              <button
                key={l.id}
                onClick={() => setActive(l)}
                className="text-xs px-2.5 py-1 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: l.color }}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
