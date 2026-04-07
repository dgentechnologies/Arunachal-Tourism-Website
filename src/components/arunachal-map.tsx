"use client";

import { useState, useEffect } from "react";
import {
  X, Calendar, MapPin, Utensils, Camera, Users,
  ChevronRight, Mountain, Layers, Navigation2, Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { locations, type Location } from "@/lib/guides-data";

/* ─────────────────────────────────────────────────────────────────────────
   MAP DIMENSIONS  (matches public/images/image.png native resolution)
   Image geographic bounds (calibrated from design):
   lon 90.135°–98.808°E  →  x = (lon − 90.135) / 8.673 × 989
   lat 25.79°–30.18°N   →  y = (30.181 − lat)  / 4.391 × 526
───────────────────────────────────────────────────────────────────────── */
const W = 989;
const H = 526;

/** Convert a #RRGGBB hex color to rgba() with the given 0–1 alpha. */
function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ─────────────────────────────────────────────────────────────────────────
   FLOATING DETAIL DRAWER (overlays the map, slides in from the right)
───────────────────────────────────────────────────────────────────────── */
interface DrawerProps { loc: Location; onClose: () => void; }

function DetailDrawer({ loc, onClose }: DrawerProps) {
  const [tab, setTab] = useState<"places" | "food" | "tribes" | "activities">("places");

  const tabs: { key: typeof tab; label: string; icon: React.ReactNode }[] = [
    { key: "places",     label: "Visit",  icon: <Camera   className="h-3.5 w-3.5" /> },
    { key: "food",       label: "Food",   icon: <Utensils className="h-3.5 w-3.5" /> },
    { key: "tribes",     label: "Tribes", icon: <Users    className="h-3.5 w-3.5" /> },
    { key: "activities", label: "Do",     icon: <Mountain className="h-3.5 w-3.5" /> },
  ];

  return (
    /* Backdrop (click to close) */
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div
        className="absolute inset-0 pointer-events-auto"
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer panel */}
      <div
        className="absolute bottom-0 left-0 right-0 sm:top-0 sm:left-auto sm:right-0 sm:bottom-0 w-full sm:w-[380px] max-h-[70vh] sm:max-h-none pointer-events-auto
                   flex flex-col bg-white/95 backdrop-blur-md shadow-2xl
                   animate-in slide-in-from-bottom-6 sm:slide-in-from-right-6 duration-300 rounded-t-2xl sm:rounded-none"
        style={{ borderTop: `3px solid ${loc.color}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-40 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white
                       rounded-full p-1.5 transition-colors backdrop-blur-sm"
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="absolute bottom-3 left-4 right-12">
            <Badge className="text-white border-0 text-[11px] mb-1.5" style={{ backgroundColor: loc.color }}>
              {loc.category}
            </Badge>
            <h2 className="text-white text-xl font-bold font-headline leading-tight">{loc.name}</h2>
            <p className="text-white/75 text-xs flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" />{loc.district}
            </p>
          </div>
        </div>

        {/* Best time */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b text-xs text-muted-foreground bg-muted/20">
          <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>Best time: <strong className="text-foreground">{loc.bestTime}</strong></span>
        </div>

        {/* Description */}
        <p className="px-4 pt-3 pb-2 text-sm text-muted-foreground leading-relaxed">{loc.desc}</p>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-2">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                tab === key ? "text-white shadow-sm scale-105" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={tab === key ? { backgroundColor: loc.color } : undefined}
            >
              {icon}{label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {tab === "places" && (
            <ul className="space-y-2 mt-1">
              {loc.placesToVisit.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" style={{ color: loc.color }} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
          {tab === "food" && (
            <ul className="space-y-2 mt-1">
              {loc.foodAndDrinks.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Utensils className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: loc.color }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
          {tab === "tribes" && (
            <div className="space-y-3 mt-1">
              {loc.tribes.map((t) => (
                <div key={t.name} className="rounded-xl p-3 border"
                  style={{ borderColor: hexAlpha(loc.color, 0.25), backgroundColor: hexAlpha(loc.color, 0.03) }}>
                  <p className="font-semibold text-sm mb-1" style={{ color: loc.color }}>{t.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "activities" && (
            <ul className="space-y-2 mt-1">
              {loc.activities.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: loc.color }} />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAP PIN — small, refined location markers with elegant labels
───────────────────────────────────────────────────────────────────────── */
function Pin({ loc, isActive, onClick }: { loc: Location; isActive: boolean; onClick: () => void }) {
  const r = isActive ? 12 : 8;
  const name = loc.name.toUpperCase();
  const labelWidth = Math.max(name.length * 6.5 + 16, 50);

  return (
    <g
      transform={`translate(${loc.svgX},${loc.svgY})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      role="button"
      aria-label={`Show details for ${loc.name}`}
    >
      {/* Pulse ring when active */}
      {isActive && (
        <circle r="28" fill={loc.color} fillOpacity="0.2" className="animate-ping" />
      )}

      {/* Outer glow halo */}
      <circle
        r={r + 5}
        fill={loc.color}
        fillOpacity={isActive ? "0.25" : "0.15"}
        className="transition-all duration-300"
      />

      {/* Main pin circle */}
      <circle
        r={r}
        fill={loc.color}
        stroke="white"
        strokeWidth="2"
        className="transition-all duration-300"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))" }}
      />

      {/* Center dot highlight */}
      <circle
        r={r * 0.35}
        fill="white"
        fillOpacity="0.8"
        style={{ pointerEvents: "none" }}
      />

      {/* Label background - only show on hover/active */}
      {isActive && (
        <>
          <rect
            x={-labelWidth / 2}
            y={r + 5}
            width={labelWidth}
            height={16}
            rx="8"
            fill="white"
            fillOpacity="0.98"
            stroke={loc.color}
            strokeWidth="1"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}
            className="transition-all duration-200"
          />

          {/* Label text */}
          <text
            x="0"
            y={r + 16}
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="0.8"
            fill={loc.color}
            style={{ fontFamily: "system-ui, sans-serif", pointerEvents: "none", userSelect: "none" }}
          >
            {name}
          </text>
        </>
      )}
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   LEFT PANEL CONTROLS  (defined outside component to avoid re-creation)
───────────────────────────────────────────────────────────────────────── */
const MAP_CONTROLS = [
  { key: "layers" as const,  icon: <Layers      className="h-5 w-5" />, label: "Map Layers" },
  { key: "routes" as const,  icon: <Navigation2 className="h-5 w-5" />, label: "Routes" },
  { key: "compass" as const, icon: <Compass     className="h-5 w-5" />, label: "Compass" },
] as const;

/* ─────────────────────────────────────────────────────────────────────────
   MAIN MAP COMPONENT — true full-viewport, image covers screen edge-to-edge
───────────────────────────────────────────────────────────────────────── */
export default function ArunachalMap() {
  const [active, setActive] = useState<Location | null>(null);
  const [activeControl, setActiveControl] = useState<"layers" | "routes" | "compass">("layers");
  const [showDestinations, setShowDestinations] = useState(false);

  /* Lock page scroll while the full-screen map is mounted */
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = ""; };
  }, []);

  function handlePin(loc: Location) {
    setActive((prev) => (prev?.id === loc.id ? null : loc));
  }

  return (
    /* Dark fall-back colour shows only if image fails to load */
    <div className="relative w-full h-full" style={{ background: "linear-gradient(135deg, #0a1f2e 0%, #1a2f3e 100%)" }}>

      {/* ── SVG MAP — xMidYMid slice = object-fit: cover, no letterboxing ── */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Interactive map of Arunachal Pradesh"
      >
        {/* Arunachal Pradesh political map image */}
        <image
          href="/images/image.png"
          x="0"
          y="0"
          width={W}
          height={H}
          style={{ filter: "brightness(0.92) contrast(1.08) saturate(1.1)" }}
        />

        {/* Interactive destination pins */}
        {locations.map((loc) => (
          <Pin
            key={loc.id}
            loc={loc}
            isActive={active?.id === loc.id}
            onClick={() => handlePin(loc)}
          />
        ))}
      </svg>

      {/* ── PREMIUM EDGE VIGNETTE — sophisticated depth and focus ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: [
            "linear-gradient(to right,  rgba(0,0,0,0.45) 0%,  transparent 12%, transparent 88%, rgba(0,0,0,0.45) 100%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%,  transparent 10%, transparent 90%, rgba(0,0,0,0.50) 100%)",
          ].join(", "),
        }}
      />

      {/* ── SUBTLE TOP GRADIENT for header integration ── */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[3]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)",
        }}
      />

      {/* ── LEFT CONTROL PANEL — premium glassmorphism ── */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10
                   flex flex-col gap-1.5 p-2.5 rounded-2xl shadow-2xl
                   border border-white/25 backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.3)"
        }}
      >
        {MAP_CONTROLS.map(({ key, icon, label }, idx) => (
          <div key={key}>
            <button
              onClick={() => setActiveControl(key)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                activeControl === key
                  ? "bg-teal-600 text-white shadow-lg scale-105"
                  : "text-white/90 hover:bg-white/25 hover:text-white hover:scale-105"
              }`}
              aria-label={label}
              style={activeControl === key ? { boxShadow: "0 4px 12px rgba(20,184,166,0.4)" } : undefined}
            >
              {icon}
            </button>
            {idx < MAP_CONTROLS.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-1 mt-1.5" />
            )}
          </div>
        ))}
      </div>

      {/* ── DESTINATIONS TOGGLE BUTTON — premium glassmorphism ── */}
      <button
        onClick={() => setShowDestinations(!showDestinations)}
        className="absolute bottom-7 left-6 z-10 flex items-center gap-2.5
                   px-4 py-2.5 rounded-xl border border-white/25 shadow-2xl backdrop-blur-xl
                   transition-all duration-300 hover:scale-105 hover:border-white/40
                   active:scale-95"
        style={{
          background: showDestinations
            ? "linear-gradient(135deg, rgba(20,184,166,0.35) 0%, rgba(20,184,166,0.25) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
          boxShadow: showDestinations
            ? "0 8px 32px rgba(20,184,166,0.3), inset 0 1px 1px rgba(255,255,255,0.3)"
            : "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.3)"
        }}
      >
        <MapPin className="h-4 w-4 text-teal-300 drop-shadow-sm" />
        <span className="text-xs font-semibold tracking-wider text-white/95 uppercase drop-shadow-sm">
          {locations.length} Destinations
        </span>
        <ChevronRight
          className={`h-3.5 w-3.5 text-white/80 transition-transform duration-300 ${
            showDestinations ? 'rotate-90' : ''
          }`}
        />
      </button>

      {/* ── HORIZONTAL DESTINATIONS LIST ── */}
      {showDestinations && (
        <div
          className="absolute bottom-24 left-6 right-6 z-10
                     flex gap-3 p-3 rounded-xl border border-white/25 shadow-2xl backdrop-blur-xl
                     overflow-x-auto animate-in slide-in-from-bottom-4 duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.3)",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.3) rgba(255,255,255,0.1)"
          }}
        >
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => {
                handlePin(loc);
                setShowDestinations(false);
              }}
              className="flex-shrink-0 group relative overflow-hidden rounded-lg
                         transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ width: "180px", height: "120px" }}
            >
              {/* Background image with overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${loc.image})`,
                }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to top, ${loc.color}dd 0%, ${loc.color}88 50%, transparent 100%)`
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <div
                  className="text-xs font-bold uppercase tracking-wide mb-0.5 text-white drop-shadow-lg"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  {loc.name}
                </div>
                <div className="text-[10px] text-white/90 drop-shadow-md flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" />
                  {loc.district}
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronRight className="h-4 w-4 text-white drop-shadow-lg" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── FLOATING DETAIL DRAWER ── */}
      {active && (
        <DetailDrawer loc={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}

