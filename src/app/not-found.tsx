"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowLeft, Compass, Map, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ─── Tribal SVG motifs (Apatani, Nyishi, Adi geometric patterns) ─── */
function TribalDiamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <polygon points="30,2 58,30 30,58 2,30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="30,10 50,30 30,50 10,30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="30" r="4" fill="currentColor" opacity="0.8" />
      <line x1="30" y1="10" x2="30" y2="18" stroke="currentColor" strokeWidth="1" />
      <line x1="50" y1="30" x2="42" y2="30" stroke="currentColor" strokeWidth="1" />
      <line x1="30" y1="50" x2="30" y2="42" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="30" x2="18" y2="30" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function TribalWeave({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 20" className={className} aria-hidden="true">
      <pattern id="tribal-weave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M0,10 L5,0 L10,10 L15,0 L20,10" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M0,10 L5,20 L10,10 L15,20 L20,10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </pattern>
      <rect width="80" height="20" fill="url(#tribal-weave)" />
    </svg>
  )
}

function TribalCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="26" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="40" cy="40" r="6" fill="currentColor" opacity="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 40 + 16 * Math.cos(rad)
        const y1 = 40 + 16 * Math.sin(rad)
        const x2 = 40 + 36 * Math.cos(rad)
        const y2 = 40 + 36 * Math.sin(rad)
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.5" />
      })}
    </svg>
  )
}

function MountainSilhouette() {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
      {/* Far mountains */}
      <path d="M0,200 L0,140 L80,80 L160,120 L260,60 L360,100 L440,50 L520,90 L600,40 L680,85 L760,55 L840,95 L920,45 L1000,80 L1080,70 L1160,110 L1200,95 L1200,200 Z"
        fill="currentColor" opacity="0.15" />
      {/* Mid mountains */}
      <path d="M0,200 L0,160 L100,100 L200,140 L320,90 L420,130 L520,80 L620,120 L720,70 L820,110 L920,60 L1020,95 L1100,75 L1200,110 L1200,200 Z"
        fill="currentColor" opacity="0.25" />
      {/* Near mountains */}
      <path d="M0,200 L0,180 L80,130 L180,170 L300,110 L400,150 L500,105 L600,145 L700,100 L800,140 L900,95 L1000,130 L1100,115 L1200,145 L1200,200 Z"
        fill="currentColor" opacity="0.4" />
      {/* Foreground tree line */}
      <path d="M0,200 L0,188 L30,175 L60,188 L90,172 L120,185 L150,170 L180,183 L210,168 L240,180 L270,165 L300,178 L330,162 L360,175 L390,160 L420,173 L450,158 L480,171 L510,156 L540,169 L570,155 L600,168 L630,154 L660,167 L690,153 L720,166 L750,152 L780,165 L810,151 L840,164 L870,150 L900,163 L930,149 L960,162 L990,148 L1020,161 L1050,147 L1080,160 L1110,146 L1140,159 L1170,145 L1200,158 L1200,200 Z"
        fill="currentColor" opacity="0.6" />
    </svg>
  )
}

function FloatingParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div
      className="absolute bottom-0 rounded-full opacity-0"
      style={{
        left: `${x}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(64,224,208,0.6) 0%, transparent 70%)`,
        animation: `tribal-float ${6 + delay}s ${delay}s ease-in-out infinite`,
      }}
    />
  )
}

/* ─── Animated tribal border lines ──────────────────────────────── */
function TribalBorderPattern() {
  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-md mx-auto">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #006a62, transparent)" }} />
      <TribalDiamond className="w-5 h-5 text-primary shrink-0" />
      <div className="w-8 h-px bg-secondary shrink-0" />
      <TribalDiamond className="w-5 h-5 text-secondary shrink-0" />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #006a62, transparent)" }} />
    </div>
  )
}

/* ─── Main 404 Page ──────────────────────────────────────────────── */
export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState(0)

  /* Staggered entrance phases */
  useEffect(() => {
    setMounted(true)
    const t1 = setTimeout(() => setPhase(1), 100)
    const t2 = setTimeout(() => setPhase(2), 600)
    const t3 = setTimeout(() => setPhase(3), 1100)
    const t4 = setTimeout(() => setPhase(4), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  /* Canvas particle fireflies */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = []
    const COLORS = ["#40e0d0", "#fccc38", "#006a62", "#fff"]
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.5 + 0.2),
        r: Math.random() * 2.5 + 0.5,
        alpha: Math.random(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha * 0.7
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        p.alpha += (Math.random() - 0.5) * 0.04
        p.alpha = Math.max(0.05, Math.min(1, p.alpha))
        if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [mounted])

  const particles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.4,
    x: 5 + i * 8,
    size: 4 + (i % 3) * 3,
  }))

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg, #0a1f1e 0%, #0d2b2a 40%, #112220 70%, #0c1c1b 100%)" }}
    >
      {/* Keyframe injections */}
      <style>{`
        body { overflow: hidden !important; }
        @keyframes tribal-float {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 0.8; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-60vh) scale(0.3); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.08); }
        }
        @keyframes text-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes draw-line {
          from { stroke-dashoffset: 200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes compass-spin {
          0%   { transform: rotate(0deg); }
          15%  { transform: rotate(200deg); }
          25%  { transform: rotate(160deg); }
          40%  { transform: rotate(180deg); }
          100% { transform: rotate(180deg); }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #006a62 0%,
            #40e0d0 25%,
            #fccc38 50%,
            #40e0d0 75%,
            #006a62 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: text-shimmer 4s linear infinite;
        }
        .tribal-ring-outer { animation: spin-slow 20s linear infinite; }
        .tribal-ring-inner { animation: spin-reverse 14s linear infinite; }
        .tribal-pulse     { animation: pulse-glow 3s ease-in-out infinite; }
        .compass-needle   { animation: compass-spin 3s ease-in-out forwards; transform-origin: center; }
      `}</style>

      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
        {/* ── Canvas fireflies ── */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

        {/* ── Floating glow orbs ── */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,106,98,0.18) 0%, transparent 70%)", filter: "blur(40px)", animation: "pulse-glow 6s ease-in-out infinite" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(252,204,56,0.1) 0%, transparent 70%)", filter: "blur(50px)", animation: "pulse-glow 8s ease-in-out infinite 2s" }} />

        {/* ── Mountain silhouette ── */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ color: "#006a62" }}>
          <MountainSilhouette />
        </div>

        {/* ── Floating tribal particles ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}
        </div>

        {/* ── Decorative corner motifs ── */}
        <TribalDiamond className="absolute top-6 left-6 w-10 h-10 text-primary opacity-30 pointer-events-none"
          style={{ animation: "pulse-glow 4s ease-in-out infinite" } as React.CSSProperties} />
        <TribalDiamond className="absolute top-6 right-6 w-10 h-10 text-secondary opacity-30 pointer-events-none"
          style={{ animation: "pulse-glow 4s ease-in-out infinite 1s" } as React.CSSProperties} />
        <TribalDiamond className="absolute bottom-24 left-6 w-8 h-8 text-primary opacity-20 pointer-events-none"
          style={{ animation: "pulse-glow 4s ease-in-out infinite 2s" } as React.CSSProperties} />
        <TribalDiamond className="absolute bottom-24 right-6 w-8 h-8 text-secondary opacity-20 pointer-events-none"
          style={{ animation: "pulse-glow 4s ease-in-out infinite 0.5s" } as React.CSSProperties} />

        {/* ══ MAIN CONTENT ══ */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto w-full gap-3">

          {/* Compass mandala */}
          <div
            className="relative"
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "scale(1)" : "scale(0.7)",
              transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <div className="tribal-ring-outer absolute inset-0 flex items-center justify-center">
              <TribalCircle className="w-20 h-20 text-primary opacity-25" />
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="tribal-pulse w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "radial-gradient(circle, rgba(0,106,98,0.5) 0%, rgba(0,106,98,0.1) 70%)" }}>
                <Compass className="compass-needle w-7 h-7 text-primary-container" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* 404 */}
          <div
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              lineHeight: 1,
            }}
          >
            <span
              className="shimmer-text font-headline font-black select-none pointer-events-none"
              style={{ fontSize: "clamp(3.5rem, 12vw, 6rem)", letterSpacing: "-0.04em" }}
            >
              404
            </span>
          </div>

          {/* Divider */}
          <div style={{ opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.5s ease 0.3s", width: "100%" }}>
            <TribalBorderPattern />
          </div>

          {/* Headline block */}
          <div
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h1 className="font-headline font-bold text-white mb-1"
              style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.75rem)", letterSpacing: "-0.02em" }}>
              Lost in the Hills?
            </h1>
            <p className="text-xs font-body uppercase tracking-[0.2em] mb-2" style={{ color: "#fccc38" }}>
              The Spirits of the Forest Led You Astray
            </p>
            <p className="font-body max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: "1.5" }}>
              This trail doesn&#39;t exist in our maps — but the highlands of Arunachal Pradesh have many wonders waiting to be discovered.
            </p>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-2.5"
            style={{
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <Link href="/">
              <Button
                size="default"
                className="rounded-full gap-2 font-body font-semibold px-6 text-sm"
                style={{
                  background: "linear-gradient(135deg, #006a62, #40e0d0)",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(64,224,208,0.3)",
                  border: "none",
                }}
              >
                <Home className="w-4 h-4" />
                Return Home
              </Button>
            </Link>

            <Link href="/guides">
              <Button
                variant="outline"
                size="default"
                className="rounded-full gap-2 font-body font-semibold px-6 text-sm"
                style={{ borderColor: "rgba(252,204,56,0.5)", color: "#fccc38", background: "rgba(252,204,56,0.08)" }}
              >
                <Map className="w-4 h-4" />
                Explore
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-body transition-colors hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Go Back
            </button>
          </div>

        </div>

        {/* ── Bottom tribal band ── */}
        <div className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, #006a62, #fccc38, #40e0d0, #fccc38, #006a62, transparent)" }} />
      </div>
    </div>
  )
}
