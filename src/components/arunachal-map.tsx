"use client";

import { useState } from "react";
import {
  X, Calendar, MapPin, Utensils, Camera, Users,
  ChevronRight, Mountain, Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { locations, type Location } from "@/lib/guides-data";

/* ─────────────────────────────────────────────────────────────────────────
   MAP DIMENSIONS  (matches public/images/arunachal.svg viewBox 0 0 800 384)
   lon 91.5°–97.5°E  →  x = (lon − 91.5) / 6 × 800
   lat 26.5°–29.5°N  →  y = (29.5 − lat) / 3 × 384
───────────────────────────────────────────────────────────────────────── */
const W = 800;
const H = 384;
function lonToX(lon: number) { return ((lon - 91.5) / 6) * W; }
function latToY(lat: number) { return ((29.5 - lat) / 3) * H; }

/** Convert a #RRGGBB hex color to rgba() with the given 0–1 alpha.
 *  All loc.color values in guides-data are guaranteed #RRGGBB strings. */
function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const GRATICULE_LONS = [92, 93, 94, 95, 96, 97];
const GRATICULE_LATS = [27, 28, 29];

/* ─────────────────────────────────────────────────────────────────────────
   ACCURATE STATE BOUNDARY — simplified (ε=2 px) from public/images/arunachal.svg
   Original: 10 968 pts → 266 pts while preserving shape fidelity
───────────────────────────────────────────────────────────────────────── */
const STATE_BOUNDARY =
  "M 502.7,379.1 L 499.4,372.8 L 503.9,365.5 L 499.2,363.8 L 498.5,356.9 L 495.5,355.5 " +
  "L 502.5,349.2 L 496.9,338.0 L 497.6,330.9 L 504.4,332.7 L 519.1,321.8 L 521.9,323.3 " +
  "L 532.5,318.3 L 533.1,307.5 L 540.2,300.3 L 550.8,305.6 L 579.9,297.2 L 587.8,296.9 " +
  "L 592.3,301.2 L 593.0,297.5 L 609.4,286.3 L 599.0,276.4 L 594.4,276.8 L 591.4,281.8 " +
  "L 591.2,276.8 L 587.9,280.4 L 585.8,278.6 L 591.5,268.3 L 590.2,261.9 L 578.5,254.3 " +
  "L 576.8,251.2 L 579.1,248.6 L 575.7,246.4 L 578.4,243.4 L 573.2,237.8 L 584.9,223.8 " +
  "L 596.8,216.0 L 603.0,204.9 L 553.2,206.1 L 540.9,216.7 L 522.5,221.8 L 512.9,217.8 " +
  "L 504.8,220.3 L 450.8,236.9 L 449.2,240.6 L 442.8,241.3 L 437.4,246.1 L 428.4,245.4 " +
  "L 427.7,248.1 L 397.6,260.4 L 393.6,254.2 L 384.4,257.8 L 375.4,254.0 L 372.6,255.8 " +
  "L 370.4,249.4 L 367.1,249.8 L 363.3,253.6 L 371.3,265.1 L 356.1,271.3 L 343.0,286.7 " +
  "L 333.6,291.3 L 306.9,317.4 L 311.0,320.1 L 311.6,326.8 L 303.6,327.5 L 303.2,330.6 " +
  "L 288.6,340.4 L 265.3,344.6 L 242.7,341.4 L 201.7,347.7 L 183.3,336.0 L 154.2,331.6 " +
  "L 150.4,337.7 L 142.1,341.4 L 123.6,341.5 L 116.9,346.2 L 112.1,344.8 L 89.2,350.9 " +
  "L 77.4,350.5 L 76.8,335.0 L 66.6,325.3 L 66.2,312.6 L 72.3,305.6 L 68.2,299.7 " +
  "L 79.2,296.9 L 70.8,291.5 L 65.5,270.7 L 54.7,273.3 L 44.3,270.4 L 24.8,272.0 " +
  "L 20.8,267.6 L 15.0,270.0 L 4.0,257.7 L 2.8,249.8 L 11.8,239.9 L 14.0,231.8 " +
  "L 12.4,227.0 L 3.9,225.0 L 1.0,219.5 L 17.1,219.2 L 23.5,225.3 L 39.1,225.7 " +
  "L 44.0,235.7 L 51.9,238.7 L 60.8,231.2 L 70.5,232.7 L 91.6,219.1 L 98.9,219.2 " +
  "L 105.9,230.1 L 118.3,224.2 L 124.8,226.7 L 131.1,221.5 L 139.2,224.3 L 145.2,216.6 " +
  "L 154.0,213.6 L 163.5,201.4 L 153.2,191.4 L 156.4,182.8 L 171.8,172.4 L 175.6,176.6 " +
  "L 194.2,164.3 L 199.1,168.6 L 203.6,164.2 L 202.2,158.7 L 228.8,154.6 L 230.5,145.4 " +
  "L 223.9,140.1 L 236.6,131.2 L 239.9,118.3 L 244.9,112.8 L 259.7,107.9 L 263.6,111.0 " +
  "L 265.9,106.9 L 271.7,110.3 L 298.6,106.2 L 304.5,109.0 L 313.9,103.7 L 325.0,108.6 " +
  "L 335.3,94.4 L 334.4,85.5 L 356.2,70.0 L 364.4,52.4 L 374.3,43.7 L 383.7,43.1 " +
  "L 385.8,38.0 L 393.8,33.0 L 411.1,32.7 L 420.7,16.4 L 440.9,31.1 L 443.7,41.5 " +
  "L 453.7,38.9 L 474.2,46.2 L 470.8,40.4 L 484.5,44.4 L 487.7,48.2 L 505.2,49.1 " +
  "L 507.3,56.2 L 531.9,59.2 L 537.1,53.7 L 538.6,45.0 L 545.4,46.5 L 544.2,34.9 " +
  "L 550.8,34.4 L 552.5,28.4 L 557.9,30.0 L 576.9,15.5 L 579.5,18.3 L 590.9,10.8 " +
  "L 601.3,12.0 L 619.0,1.2 L 631.0,14.5 L 632.0,22.1 L 640.2,32.2 L 646.9,32.1 " +
  "L 656.5,25.3 L 660.5,29.3 L 654.1,41.0 L 642.4,42.4 L 632.2,51.3 L 622.6,53.6 " +
  "L 632.1,65.9 L 626.7,72.8 L 629.6,77.1 L 640.7,72.1 L 654.1,59.9 L 666.2,59.2 " +
  "L 678.4,53.5 L 671.9,65.1 L 673.2,69.0 L 677.5,68.3 L 680.0,80.1 L 690.6,94.6 " +
  "L 686.5,102.3 L 671.1,106.8 L 674.0,113.7 L 665.0,120.6 L 661.3,119.7 L 662.1,123.8 " +
  "L 655.0,124.2 L 651.1,127.8 L 657.5,134.3 L 642.6,144.3 L 650.3,148.0 L 657.2,146.9 " +
  "L 661.0,153.7 L 669.1,143.6 L 676.1,143.7 L 685.6,137.6 L 697.1,137.3 L 708.9,143.3 " +
  "L 713.1,150.3 L 728.9,148.2 L 732.6,153.8 L 742.2,157.8 L 755.3,150.5 L 766.3,160.2 " +
  "L 781.0,163.3 L 797.1,173.7 L 787.6,178.8 L 788.7,184.7 L 784.4,190.5 L 793.4,191.5 " +
  "L 793.8,195.7 L 799.0,197.8 L 794.0,202.9 L 795.4,215.2 L 786.2,216.1 L 784.5,210.6 " +
  "L 777.4,213.4 L 756.4,229.1 L 755.0,236.1 L 747.3,234.0 L 740.7,245.3 L 734.2,245.9 " +
  "L 728.0,253.7 L 734.2,266.8 L 729.9,274.3 L 765.6,317.6 L 761.8,323.5 L 756.7,321.1 " +
  "L 752.7,323.7 L 740.9,314.9 L 725.9,311.4 L 723.2,307.3 L 727.5,305.1 L 727.3,300.5 " +
  "L 722.2,299.0 L 715.4,288.9 L 702.8,285.3 L 689.4,286.2 L 688.1,290.6 L 678.2,297.0 " +
  "L 666.9,294.3 L 638.0,298.0 L 610.0,311.5 L 599.6,328.9 L 589.3,334.2 L 580.0,333.9 " +
  "L 569.3,352.1 L 561.7,349.1 L 553.6,361.4 L 544.8,358.3 L 542.3,360.1 L 529.5,376.8 " +
  "L 512.2,383.4 L 502.7,379.1 Z";

/* ─────────────────────────────────────────────────────────────────────────
   DISTRICT ZONE FILLS — atlas political-map palette
───────────────────────────────────────────────────────────────────────── */
const DISTRICT_ZONES = [
  { id: "a", label: "Tawang &\nWest Kameng",      color: "#CDDFF0", stroke: "#9BBBD8", rect: { x: 0,   y: 0,   w: 133,  h: H       }, labelX: 52,  labelY: 275 },
  { id: "b", label: "East Kameng &\nPapum Pare",   color: "#CDEBD4", stroke: "#8FCCA0", rect: { x: 133, y: 0,   w: 134,  h: H       }, labelX: 200, labelY: 255 },
  { id: "c", label: "Kra Daadi &\nUpper Subansiri",color: "#F0E8C8", stroke: "#D4C47A", rect: { x: 267, y: 0,   w: 133,  h: 192     }, labelX: 333, labelY: 100 },
  { id: "d", label: "Lower Subansiri\n& Kamle",    color: "#C8EDE4", stroke: "#78C8B4", rect: { x: 267, y: 192, w: 133,  h: H - 192 }, labelX: 333, labelY: 310 },
  { id: "e", label: "West Siang &\nShi-Yomi",      color: "#F0D0D8", stroke: "#D48898", rect: { x: 400, y: 0,   w: 133,  h: 192     }, labelX: 466, labelY: 90  },
  { id: "f", label: "East Siang &\nLower Siang",   color: "#DDD0F0", stroke: "#A888D4", rect: { x: 400, y: 192, w: 133,  h: H - 192 }, labelX: 466, labelY: 285 },
  { id: "g", label: "Upper Siang &\nDibang Valley",color: "#C8D8F0", stroke: "#7AA4D8", rect: { x: 533, y: 0,   w: 134,  h: 192     }, labelX: 600, labelY: 88  },
  { id: "h", label: "Lower Dibang\n& Lohit",       color: "#F0D8C8", stroke: "#D4A480", rect: { x: 533, y: 192, w: 134,  h: H - 192 }, labelX: 600, labelY: 268 },
  { id: "i", label: "Anjaw",                        color: "#C8F0D8", stroke: "#78D4A0", rect: { x: 667, y: 0,   w: 133,  h: 192     }, labelX: 730, labelY: 90  },
  { id: "j", label: "Changlang,\nTirap & Namsai",  color: "#F0F0C8", stroke: "#C8C870", rect: { x: 667, y: 192, w: 133,  h: H - 192 }, labelX: 712, labelY: 268 },
] as const;

/* ─────────────────────────────────────────────────────────────────────────
   MAJOR RIVER PATHS (approximate, N→S flow)
───────────────────────────────────────────────────────────────────────── */
const RIVERS = [
  { id: "kameng",  d: "M 213,85 C 208,130 215,175 210,220 S 205,280 208,345 L 210,370" },
  { id: "sub",     d: "M 320,35 C 315,90 325,150 318,220 S 312,290 315,360 L 318,380" },
  { id: "siang",   d: "M 468,18 C 462,75 470,145 462,220 S 455,300 460,370 L 462,383" },
  { id: "dibang",  d: "M 560,10 C 554,70 562,140 555,215 S 548,285 552,345 L 555,370" },
  { id: "lohit",   d: "M 653,20 C 648,80 655,155 648,225 S 642,285 645,315 L 648,328" },
];

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
   MAP PIN
───────────────────────────────────────────────────────────────────────── */
function Pin({ loc, isActive, onClick }: { loc: Location; isActive: boolean; onClick: () => void }) {
  return (
    <g
      transform={`translate(${loc.svgX},${loc.svgY})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      role="button"
      aria-label={`Show details for ${loc.name}`}
    >
      {isActive && <circle r="20" fill={loc.color} fillOpacity="0.18" className="animate-ping" />}
      <circle r={isActive ? 14 : 10} fill={loc.color} fillOpacity="0.22" className="transition-all duration-200" />
      <circle
        r={isActive ? 9 : 7}
        fill={loc.color}
        stroke="white"
        strokeWidth="2"
        className="transition-all duration-200"
        style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.4))" }}
      />
      <circle r="2.5" fill="white" />
      <text
        x="0" y={isActive ? "-18" : "-14"}
        textAnchor="middle" fontSize="10" fontWeight="700"
        fill="#1e293b"
        paintOrder="stroke" stroke="white" strokeWidth="3" strokeLinejoin="round"
        className="transition-all duration-200 select-none pointer-events-none"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {loc.name}
      </text>
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   COMPASS ROSE
───────────────────────────────────────────────────────────────────────── */
function CompassRose({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} style={{ pointerEvents: "none" }}>
      <circle r="14" fill="white" fillOpacity="0.88" stroke="#8899AA" strokeWidth="0.8" />
      <polygon points="0,-11 3,-3 0,-6 -3,-3" fill="#2C4A6A" />
      <polygon points="0,-11 -3,-3 0,-6 3,-3" fill="#7A96B2" />
      <polygon points="0,11 3,3 0,6 -3,3" fill="#7A96B2" />
      <polygon points="0,11 -3,3 0,6 3,3" fill="#C8D8E8" />
      <text y="3.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="#2C4A6A"
        style={{ fontFamily: "system-ui, sans-serif" }}>N</text>
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SCALE BAR  (100 km ≈ 135 px at lat 28°N)
───────────────────────────────────────────────────────────────────────── */
function ScaleBar({ x, y }: { x: number; y: number }) {
  const barWidth = 135;
  return (
    <g transform={`translate(${x},${y})`} style={{ pointerEvents: "none" }}>
      <rect x={0} y={0} width={barWidth} height={6} fill="none" stroke="#445566" strokeWidth="0.8" />
      <rect x={0} y={0} width={barWidth / 2} height={6} fill="#445566" />
      <rect x={barWidth / 2} y={0} width={barWidth / 2} height={6} fill="white" stroke="#445566" strokeWidth="0.8" />
      {[0, barWidth / 2, barWidth].map((xv, i) => (
        <text key={i} x={xv} y={-3} textAnchor="middle" fontSize="7" fill="#445566"
          style={{ fontFamily: "system-ui, sans-serif" }}>
          {i === 0 ? "0" : i === 1 ? "50 km" : "100 km"}
        </text>
      ))}
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN MAP COMPONENT — full-viewport, floating drawer overlay
───────────────────────────────────────────────────────────────────────── */
export default function ArunachalMap() {
  const [active, setActive]       = useState<Location | null>(null);
  const [showLegend, setShowLegend] = useState(false);

  function handlePin(loc: Location) {
    setActive((prev) => (prev?.id === loc.id ? null : loc));
  }

  return (
    <div className="flex flex-col gap-4">

      {/* ── Full-viewport map container ── */}
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
        style={{ height: "calc(100vh - 220px)", minHeight: 480, background: "#E8E0CC" }}
      >
        {/* ────────────────────── SVG MAP ────────────────────── */}
        <svg
          viewBox={`-18 -18 ${W + 36} ${H + 36}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Political map of Arunachal Pradesh"
        >
          <defs>
            <pattern id="grat-pat" width="133.3" height="128" patternUnits="userSpaceOnUse">
              <path d="M 133.3 0 L 0 0 0 128" fill="none" stroke="#C0B080" strokeWidth="0.35" strokeDasharray="3,5" />
            </pattern>
            <clipPath id="ap-clip">
              <path d={STATE_BOUNDARY} />
            </clipPath>
            <linearGradient id="highland-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#C4B890" stopOpacity="0.40" />
              <stop offset="35%"  stopColor="#C4B890" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#C4B890" stopOpacity="0" />
            </linearGradient>
            <filter id="state-shadow" x="-6%" y="-6%" width="118%" height="118%">
              <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#6A5840" floodOpacity="0.30" />
            </filter>
            <filter id="river-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Surrounding area */}
          <rect x="-18" y="-18" width={W + 36} height={H + 36} fill="#DDD4BC" />
          <rect x="-18" y="-18" width={W + 36} height="28"      fill="#EEEADA" />
          <rect x="-18" y="-18" width="22"       height={H + 36} fill="#E4EADC" />
          <rect x={W - 8}  y="-18" width="62"   height={H + 36} fill="#E8E0D0" />
          <rect x="-18" y={H - 8} width={W + 36} height="44"    fill="#DCE8D4" />

          {/* Graticule */}
          <rect x="-18" y="-18" width={W + 36} height={H + 36} fill="url(#grat-pat)" />

          {/* District fills */}
          <g clipPath="url(#ap-clip)">
            {DISTRICT_ZONES.map((z) => (
              <rect key={z.id}
                x={z.rect.x} y={z.rect.y} width={z.rect.w} height={z.rect.h}
                fill={z.color}
              />
            ))}
            <rect x="0" y="0" width={W} height={H} fill="url(#highland-grad)" />

            {/* District divider lines */}
            {[133, 267, 400, 533, 667].map((xv) => (
              <line key={`vl-${xv}`} x1={xv} y1={0} x2={xv} y2={H}
                stroke="#6A7A8A" strokeWidth="0.7" strokeDasharray="4,4" />
            ))}
            <line x1={267} y1={192} x2={W} y2={192}
              stroke="#6A7A8A" strokeWidth="0.7" strokeDasharray="4,4" />

            {/* Rivers */}
            {RIVERS.map((r) => (
              <path key={r.id} d={r.d}
                fill="none" stroke="#6AAEC8" strokeWidth="1.6"
                strokeLinecap="round" opacity="0.80" filter="url(#river-glow)" />
            ))}

            {/* Watermark */}
            <text x={W / 2} y={H / 2 + 12}
              textAnchor="middle" fontSize="16" fontWeight="800" letterSpacing="5"
              fill="#2A5A4A" fillOpacity="0.15"
              style={{ fontFamily: "system-ui, sans-serif", userSelect: "none", pointerEvents: "none" }}
            >ARUNACHAL PRADESH</text>
          </g>

          {/* State boundary */}
          <path d={STATE_BOUNDARY} fill="none" stroke="#2C4A6A" strokeWidth="1.8"
            strokeLinejoin="round" filter="url(#state-shadow)" />

          {/* Graticule labels */}
          {GRATICULE_LONS.map((lon) => (
            <text key={lon} x={lonToX(lon)} y={H + 14}
              textAnchor="middle" fontSize="7.5" fill="#6A5840"
              style={{ fontFamily: "system-ui, sans-serif" }}>{lon}°E</text>
          ))}
          {GRATICULE_LATS.map((lat) => (
            <text key={lat} x={-14} y={latToY(lat) + 3}
              textAnchor="end" fontSize="7.5" fill="#6A5840"
              style={{ fontFamily: "system-ui, sans-serif" }}>{lat}°N</text>
          ))}

          {/* Neighbour labels */}
          <text x={360} y={-5} textAnchor="middle" fontSize="8.5" fill="#4A4A6A" fontStyle="italic"
            style={{ fontFamily: "Georgia, serif" }}>China (Tibet) ↑</text>
          <text x={-15} y={288} fontSize="8" fill="#4A6A4A" fontStyle="italic"
            transform="rotate(-90 -15 288)" style={{ fontFamily: "Georgia, serif" }}>← Bhutan</text>
          <text x={408} y={H + 26} textAnchor="middle" fontSize="8.5" fill="#3A6A3A" fontStyle="italic"
            style={{ fontFamily: "Georgia, serif" }}>Assam ↓</text>
          <text x={W + 15} y={215} fontSize="8" fill="#6A4A2A" fontStyle="italic"
            transform={`rotate(90 ${W + 15} 215)`} style={{ fontFamily: "Georgia, serif" }}>Myanmar →</text>

          {/* District labels */}
          <g clipPath="url(#ap-clip)" style={{ pointerEvents: "none" }}>
            {DISTRICT_ZONES.map((z) => {
              const lines = z.label.split("\n");
              return (
                <text key={`lbl-${z.id}`}
                  x={z.labelX} y={z.labelY - (lines.length - 1) * 6}
                  textAnchor="middle" fontSize="7.5" fontWeight="600"
                  fill="#1E2A3A" fillOpacity="0.70"
                  paintOrder="stroke" stroke="rgba(255,255,255,0.85)"
                  strokeWidth="2.5" strokeLinejoin="round"
                  style={{ fontFamily: "system-ui, sans-serif", userSelect: "none" }}
                >
                  {lines.map((line, i) => (
                    <tspan key={i} x={z.labelX} dy={i === 0 ? 0 : 11}>{line}</tspan>
                  ))}
                </text>
              );
            })}
          </g>

          {/* Pins */}
          {locations.map((loc) => (
            <Pin key={loc.id} loc={loc} isActive={active?.id === loc.id}
              onClick={() => handlePin(loc)} />
          ))}

          {/* Compass rose */}
          <CompassRose x={W - 22} y={32} />

          {/* Scale bar */}
          <ScaleBar x={W - 160} y={H + 22} />
        </svg>

        {/* ────────────── FLOATING CONTROLS (top-left) ────────────── */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {/* Legend toggle button */}
          <button
            onClick={() => setShowLegend((v) => !v)}
            className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-border/60
                       rounded-xl px-3 py-2 shadow-md text-xs font-semibold text-foreground
                       hover:bg-white transition-colors"
            aria-label="Toggle legend"
          >
            <Info className="h-3.5 w-3.5 text-primary" />
            Destinations
          </button>

          {/* Expandable legend */}
          {showLegend && (
            <div className="bg-white/97 backdrop-blur-sm border border-border/50 rounded-xl
                            px-3 py-2.5 shadow-lg text-xs text-muted-foreground space-y-1
                            animate-in fade-in slide-in-from-top-2 duration-200">
              {locations.map((l) => (
                <div key={l.id}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity py-0.5"
                  onClick={() => { handlePin(l); setShowLegend(false); }}
                >
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                  <span className={active?.id === l.id ? "font-bold text-foreground" : ""}>{l.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ────────────── MAP TITLE BADGE (top-right) ────────────── */}
        <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-lg
                        px-2.5 py-1 shadow text-[10px] font-bold text-slate-600 tracking-widest uppercase">
          Arunachal Pradesh
        </div>

        {/* ────────────── FLOATING DETAIL DRAWER ────────────── */}
        {active && (
          <DetailDrawer loc={active} onClose={() => setActive(null)} />
        )}
      </div>

      {/* ── Destination quick-select bar ── */}
      <div className="flex flex-wrap gap-2 px-1">
        <span className="text-xs text-muted-foreground font-medium self-center mr-1">Explore:</span>
        {locations.map((l) => (
          <button
            key={l.id}
            onClick={() => setActive((prev) => prev?.id === l.id ? null : l)}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all duration-150
                        border-2 ${
              active?.id === l.id
                ? "text-white shadow-md scale-105"
                : "bg-white text-foreground hover:scale-105 hover:shadow-sm"
            }`}
            style={
              active?.id === l.id
                ? { backgroundColor: l.color, borderColor: l.color }
                : { borderColor: hexAlpha(l.color, 0.38) }
            }
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}
