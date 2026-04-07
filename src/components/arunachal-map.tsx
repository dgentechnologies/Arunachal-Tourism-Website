"use client";

import { useState } from "react";
import {
  X, Calendar, MapPin, Utensils, Camera, Users,
  ChevronRight, Mountain, Layers, Navigation2, Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { locations, type Location } from "@/lib/guides-data";

/* ─────────────────────────────────────────────────────────────────────────
   MAP DIMENSIONS  (matches public/images/image.png coordinate system)
   lon 91.5°–97.5°E  →  x = (lon − 91.5) / 6 × 800
   lat 26.5°–29.5°N  →  y = (29.5 − lat) / 3 × 384
───────────────────────────────────────────────────────────────────────── */
const W = 800;
const H = 384;

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
   MAP PIN — circular badge with navigation arrow and label
───────────────────────────────────────────────────────────────────────── */
function Pin({ loc, isActive, onClick }: { loc: Location; isActive: boolean; onClick: () => void }) {
  const r = isActive ? 16 : 12;
  const name = loc.name.toUpperCase();
  const labelWidth = Math.max(name.length * 7.2 + 24, 56);

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
        <circle r="30" fill={loc.color} fillOpacity="0.15" className="animate-ping" />
      )}

      {/* Outer halo */}
      <circle
        r={r + 7}
        fill={loc.color}
        fillOpacity="0.20"
        className="transition-all duration-200"
      />

      {/* Main circle */}
      <circle
        r={r}
        fill={loc.color}
        stroke="white"
        strokeWidth="2"
        className="transition-all duration-200"
        style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.40))" }}
      />

      {/* Navigation arrow icon (pointing up) */}
      <path
        d="M 0,-5.5 L 4,2.5 L 0,-1 L -4,2.5 Z"
        fill="white"
        style={{ pointerEvents: "none" }}
      />

      {/* Label background */}
      <rect
        x={-labelWidth / 2}
        y={r + 6}
        width={labelWidth}
        height={17}
        rx="4"
        fill="white"
        fillOpacity="0.96"
        stroke={loc.color}
        strokeWidth="1.2"
        style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.18))" }}
      />

      {/* Label text */}
      <text
        x="0"
        y={r + 18}
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.2"
        fill="#1e293b"
        style={{ fontFamily: "system-ui, sans-serif", pointerEvents: "none", userSelect: "none" }}
      >
        {name}
      </text>
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN MAP COMPONENT — full-viewport with image background
───────────────────────────────────────────────────────────────────────── */
export default function ArunachalMap() {
  const [active, setActive] = useState<Location | null>(null);
  const [activeControl, setActiveControl] = useState<"layers" | "routes" | "compass">("layers");

  function handlePin(loc: Location) {
    setActive((prev) => (prev?.id === loc.id ? null : loc));
  }

  return (
    <div
      className="relative w-full"
      style={{ height: "calc(100vh - 70px)", minHeight: 520, background: "#D4E8E6" }}
    >
      {/* ── SVG MAP (image background + interactive pins) ── */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Interactive map of Arunachal Pradesh"
      >
        {/* Actual Arunachal Pradesh map image */}
        <image
          href="/images/image.png"
          x="0"
          y="0"
          width={W}
          height={H}
          preserveAspectRatio="xMidYMid meet"
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

      {/* ── LEFT CONTROL PANEL ── */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-1.5 flex flex-col gap-0.5 border border-border/40">
        <button
          onClick={() => setActiveControl("layers")}
          className={`p-3 rounded-xl transition-all duration-150 ${
            activeControl === "layers"
              ? "bg-primary text-white shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
          aria-label="Map layers"
        >
          <Layers className="h-5 w-5" />
        </button>

        <div className="h-px bg-border/60 mx-1" />

        <button
          onClick={() => setActiveControl("routes")}
          className={`p-3 rounded-xl transition-all duration-150 ${
            activeControl === "routes"
              ? "bg-primary text-white shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
          aria-label="Routes"
        >
          <Navigation2 className="h-5 w-5" />
        </button>

        <div className="h-px bg-border/60 mx-1" />

        <button
          onClick={() => setActiveControl("compass")}
          className={`p-3 rounded-xl transition-all duration-150 ${
            activeControl === "compass"
              ? "bg-primary text-white shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
          aria-label="Compass"
        >
          <Compass className="h-5 w-5" />
        </button>
      </div>

      {/* ── TOP-RIGHT BADGE ── */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow text-[11px] font-bold text-slate-600 tracking-widest uppercase">
        Arunachal Pradesh
      </div>

      {/* ── FOOTER TEXT ── */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10 pointer-events-none">
        <span className="text-[11px] tracking-[0.2em] text-slate-500/80 uppercase font-medium">
          Arunachal Interactive Map © 2024
        </span>
      </div>

      {/* ── FLOATING DETAIL DRAWER ── */}
      {active && (
        <DetailDrawer loc={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}
