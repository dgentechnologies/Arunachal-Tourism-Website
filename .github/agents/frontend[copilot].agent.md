# Arunachal Explore — Frontend Agent
# Location: .github/agents/arunachal-explore-frontend.md

> **Reviewer:** ChatGPT 5.4  
> **Live URL:** https://apt-website-v1.vercel.app  
> **AI Models:** `gemini-3.1-flash-lite-preview` · `gemini-3.1-flash-live-preview`  
> **Scope:** Frontend only — Next.js 15 App Router, React 19, Tailwind CSS, ShadCN UI, components, i18n, PWA, design system

---

## 1. Frontend Mission

Replace a WordPress static site (no search, no booking, no offline, English-only) with a modern, accessible, multilingual, offline-capable travel platform rooted in Arunachal Pradesh's visual and cultural identity.

**Principles:**
- **Authentic** — Topographic Poetry design language (DESIGN.md), not generic SaaS
- **Performance-first** — travelers on 3G; every kb matters
- **Offline-resilient** — permit pages and emergency contacts work without internet
- **Multilingual by default** — EN / HI / BN / AS via existing `language-context.tsx`

---

## 2. Design System (Verified from globals.css + tailwind.config.ts)

### 2.1 Color Tokens

```css
/* globals.css :root — use these exact values */
--primary:    hsl(176, 100%, 21%);  /* #006a62  deep turquoise */
--secondary:  hsl(46, 97%, 60%);   /* #fccc38  saffron */
--accent:     hsl(176, 68%, 56%);  /* #40e0d0  light turquoise */
--background: hsl(10, 33%, 98%);   /* #fcf9f8  warm off-white */
--foreground: hsl(0, 5%, 11%);     /* #1c1b1b  near-black */
--muted:      hsl(10, 20%, 96%);   /* #f6f3f2  surface-low */
--border:     hsl(0, 5%, 88%);     /* dividers  */

/* Extended surface tiers */
--surface:          #fcf9f8;
--surface-low:      #f6f3f2;
--surface-lowest:   #ffffff;
--surface-highest:  #ede9e7;
--primary-container: #40e0d0;
--secondary-fixed:  #ffdf90;
```

### 2.2 Typography

```css
/* tailwind.config.ts fontFamily (verified) */
headline: ['Space Grotesk', 'sans-serif']     /* h1–h4, display, card titles */
body:     ['Manrope', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'sans-serif']
code:     ['monospace']

/* Loaded in app/layout.tsx via Google Fonts */
```

### 2.3 Spacing & Radius

```
xl:   3rem   (mega cards, hero sections, CTA banners)
lg:   1.5rem (standard cards, modals)
md:   1.5rem (same as lg — design uses xl on one corner, md on others)
sm:   0.5rem (chips, badges, inputs)
full: 9999px (pills, tags)
```

### 2.4 Shadows (tailwind.config.ts)

```
soft:    0 8px 40px 0 rgba(0,106,98,0.08)
float:   0 16px 60px 0 rgba(0,106,98,0.12)
glow:    0 4px 24px 0 rgba(64,224,208,0.25)
ambient: 0 0 40px -10px rgba(28,27,27,0.06)
```

### 2.5 DESIGN.md Rules (enforced on all components)

- **No 1px solid borders between sections** — use background color tier shifts (`surface` → `surface-low`)
- **Ghost borders only:** `box-shadow: inset 0 0 0 1px rgba(202,196,192,0.15)` via `.ghost-border`
- **Cards:** `xl` (3rem) on one corner + `md` (1.5rem) on others = `.organic-card` class in globals.css
- **No pure black shadows** — tint with primary color
- **Glassmorphism nav:** `backdrop-filter: blur(24px)` — `.glass-nav` class exists in globals.css
- **Scroll animations:** Elements use `.reveal` / `.reveal-left` / `.reveal-right` classes — `ScrollReveal` component handles IntersectionObserver

---

## 3. Existing Component Inventory

### 3.1 ShadCN UI Components (src/components/ui/ — verified)

```
accordion, alert, alert-dialog, avatar, badge, button, calendar,
card, carousel, chart, checkbox, collapsible, dialog, dropdown-menu,
form, input, label, menubar, popover, progress, radio-group,
scroll-area, select, separator, sheet, sidebar, skeleton, slider,
switch, table, tabs, textarea, toast, toaster, tooltip
```

**Rule: Never modify files in `src/components/ui/` directly.** Extend via wrapper components.

### 3.2 App-Level Components (src/components/ — verified)

```
nav.tsx                    Full responsive navbar with mega-menu + locale switcher
footer.tsx                 Footer with quick links, social, address
hero-carousel.tsx          Auto-advancing full-screen hero with slide indicators
scrollytelling-section.tsx Scroll-driven 4-chapter parallax section
destinations-carousel.tsx  Horizontal scroll carousel with organic-card shapes
arunachal-map.tsx          Full-screen interactive SVG map with pin drawer
review-form.tsx            Star-rating review dialog (Dialog + Form + toast)
scroll-reveal.tsx          IntersectionObserver wrapper — variants: up/left/right/scale
animated-testimonials.tsx  Card-flip testimonials with prev/next controls
```

### 3.3 Component Gaps (need to build)

```
/components/booking/
  BookingWidget.tsx        Date picker + guest count + availability check (DB1)
  PermitGate.tsx           Warns/blocks if permit not verified before booking
  PaymentForm.tsx          Razorpay (INR) / Stripe (foreign) UI
  BookingConfirmation.tsx  Success state with booking ID

/components/permits/
  PermitChecker.tsx        Interactive AI pre-check (uses permit-plan-completeness-check flow)
  DocumentChecklist.tsx    Interactive checklist with check/uncheck state
  CheckpointMap.tsx        ILP checkpoints on Google Maps iframe

/components/festivals/
  FestivalCountdown.tsx    Next upcoming festival from DB3 with live countdown timer

/components/shared/
  OfflineBanner.tsx        Fixed banner when navigator.onLine === false
  LiveNotice.tsx           Renders DB3/notices[active=true] — replaces hardcoded COVID notice

/components/account/
  PermitTracker.tsx        ILP/PAP status from DB2 with expiry countdown
  TripDashboard.tsx        Saved trips from DB2/users/{id}/trips
  BookingHistory.tsx       Bookings from DB2 with status badges
```

---

## 4. Page-Level Patterns

### 4.1 Server Component (default for all data-fetching pages)

```typescript
// DO NOT add "use client" to pages that only fetch and render
// Use ISR for DB3 content:
export const revalidate = 3600;

// Loading state — required sibling file:
// app/[route]/loading.tsx → skeleton UI

// Error state — required sibling file:
// app/[route]/error.tsx → "use client" + ErrorBoundary pattern
```

### 4.2 Client Component (only when needed)

```typescript
"use client";
// Only add this directive when the component needs:
// - useState, useEffect, useRef, or other hooks
// - Event handlers (onClick, onChange, onSubmit)
// - Browser APIs (localStorage, navigator, window)
// - Firebase Auth state (useAuth())
// - Framer Motion animations in interactive contexts
```

### 4.3 Verified Client Components in Repo

```
nav.tsx, hero-carousel.tsx, scrollytelling-section.tsx
destinations-carousel.tsx, arunachal-map.tsx
review-form.tsx, animated-testimonials.tsx
scroll-reveal.tsx (uses IntersectionObserver)
All /adventures/* pages (Framer Motion)
/permit/page.tsx (React Hook Form + Genkit action)
/itinerary/page.tsx (AI chat + state)
/account/page.tsx (Firebase Auth gated)
```

---

## 5. i18n System (Verified)

```typescript
// src/lib/language-context.tsx — full implementation, 200+ translation keys
// Provider: LanguageProvider wraps app in src/components/providers.tsx
// Hook: useLanguage() → { language, setLanguage, t }
// Locales: "en" | "hi" | "bn" | "as"
// Persistence: localStorage "arunachal-language"

// MANDATORY RULE for any new UI string:
// Step 1: Add key to Translations interface
// Step 2: Add string to all 4 locale objects (en, hi, bn, as)
// Step 3: Use t('yourKey') in JSX
// NEVER hardcode English strings directly in JSX
```

---

## 6. Firebase Client Integration

```typescript
// src/lib/firebase.ts — client-only (verified in repo)
// ONLY import this file in components with "use client" or client-only modules

export function getFirebaseAuth()    { return getAuth(getFirebaseApp()) }
export function getFirebaseDb()      { return getFirestore(getFirebaseApp()) }
export function getFirebaseStorage() { return getStorage(getFirebaseApp()) }

// Three named Firestore instances to add:
export const dbEnterprise = getFirestore(app, process.env.NEXT_PUBLIC_FIRESTORE_DB_ENTERPRISE!);
export const dbUsers      = getFirestore(app, process.env.NEXT_PUBLIC_FIRESTORE_DB_USERS!);
export const dbCms        = getFirestore(app, process.env.NEXT_PUBLIC_FIRESTORE_DB_CMS!);

// NEVER import firebase-admin in frontend files
// firebase-admin belongs only in /api/* routes and Server Actions
```

---

## 7. AI Integration on the Frontend

```typescript
// Existing pattern (verified in /permit/page.tsx and /itinerary/page.tsx):
// Server Actions defined in src/ai/flows/*.ts
// Client components call them directly — Next.js handles serialization

// Models available (use exactly these strings):
// 'googleai/gemini-3.1-flash-lite-preview'  — standard responses
// 'googleai/gemini-3.1-flash-live-preview'  — streaming / live chat

// Loading pattern (verified from /permit/page.tsx):
const [isReviewing, setIsReviewing] = useState(false);
// Show Loader2 spinner from lucide-react during AI calls
// Handle 429 quota errors specifically — show "API Quota Exceeded" toast
// Use maxDuration = 60 export on pages with AI calls (Vercel timeout)
```

---

## 8. Existing Utility Classes (globals.css)

```css
/* Use these — they already exist */
.reveal            /* fade-up scroll reveal */
.reveal-left       /* fade-left scroll reveal */
.reveal-right      /* fade-right scroll reveal */
.reveal-scale      /* scale-in scroll reveal */
.is-visible        /* added by IntersectionObserver — triggers animation */

.organic-card      /* rounded tl=3rem, others=1.5rem */
.organic-card-alt  /* rounded tr=3rem, others=1.5rem */
.ghost-border      /* box-shadow inset at 15% opacity */
.ambient-shadow    /* floating element shadow */
.shimmer-hover     /* card hover shimmer effect */
.glass-nav         /* backdrop-blur glassmorphism */
.tribal-pattern    /* subtle diamond SVG background */
.cta-gradient      /* primary → primary-container gradient */
.scrollbar-hide    /* hide scrollbar cross-browser */
```

---

## 9. Booking UI — What Needs Wiring

**Current state verified in repo:**
- `/hotels/[id]/book/page.tsx` — complete form UI, but calls `setSubmitted(true)` only
- `/transport/[id]/book/page.tsx` — complete form UI, but calls `setSubmitted(true)` only

**Required changes:**
```typescript
// Replace: setSubmitted(true)
// With:
const idToken = await getFirebaseAuth().currentUser?.getIdToken();
const res = await fetch('/api/booking/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${idToken}`,
  },
  body: JSON.stringify({
    type: 'hotel',              // or 'vehicle'
    listingId: hotel.id,
    checkIn: form.checkIn,
    checkOut: form.checkOut,
    guests: Number(form.guests),
    guestDetails: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone },
    specialRequests: form.requests,
    totalAmount: total,
  }),
});
const { bookingId } = await res.json();
setBookingId(bookingId);
setSubmitted(true);
```

---

## 10. Image Rules

```typescript
// Always use next/image — never <img> for content images
import Image from 'next/image';

// Required props:
<Image
  src={url}
  alt="Descriptive alt text about the scene, not just the name"
  fill             // for aspect-ratio containers with position:relative
  // OR:
  width={800}
  height={600}     // explicit dimensions for non-fill usage
  className="object-cover"
  priority         // ONLY on above-the-fold LCP images
  data-ai-hint="brief scene description"  // existing convention in repo
/>

// Remote patterns already configured in next.config.ts:
// placehold.co, images.unsplash.com, picsum.photos
```

---

## 11. PWA Requirements

```json
// /public/manifest.json (needs creating)
{
  "name": "Arunachal Explore",
  "short_name": "ArunExplore",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#006a62",
  "background_color": "#fcf9f8",
  "shortcuts": [
    { "name": "Apply ILP", "url": "/permit/ilp" },
    { "name": "Emergency", "url": "/safety" },
    { "name": "Plan Trip",  "url": "/itinerary" }
  ]
}
```

```javascript
// /public/sw.js (needs creating)
// Cache strategy:
// cache-first:            /safety, /permit, /permit/ilp, /permit/foreign
// network-only:           /api/booking/*, /api/payment/*
// stale-while-revalidate: /guides/*, /adventures/*, /itinerary/*
```

---

## 12. Accessibility Requirements

```
WCAG 2.1 AA minimum:
- All <Image> tags: descriptive alt (scene, not just name)
- Color contrast: 4.5:1 body, 3:1 large text
- Focus ring: focus-visible:ring-2 focus-visible:ring-primary on all interactive
- Icon buttons: aria-label always present
- Modals: focus trap (ShadCN Dialog handles this)
- Skip link: add to layout.tsx → <a href="#main-content" className="sr-only focus:not-sr-only">
- Language: <html lang={locale}> — currently "en" in layout.tsx, update for i18n routing
- Reduced motion: check prefers-reduced-motion before running Framer Motion animations
```

---

## 13. Banned Patterns

| Old arunachaltourism.com Pattern | Banned In This Codebase |
|----------------------------------|------------------------|
| Static JPEG district map + `<area>` coords | Already replaced by `ArunachalMap` SVG |
| Duplicate Facebook SDK widget twice on homepage | Max 1 social section per page |
| GIF hit counter | Use `@vercel/analytics` |
| COVID notice hardcoded in HTML | Use `<LiveNotice>` from DB3/notices |
| PDF direct links, no reader | react-pdf viewer + download button |
| Text-only accommodation list | `PropertyCard` with image, stars, price, CTA |
| Events page showing "No Events" | `FestivalCountdown` from DB3 |
| English-only strings in JSX | `t('key')` from `useLanguage()` always |

---

## 14. CI Compliance Rules

Every component/page must satisfy all three CI checks:

```bash
npm run lint      # ESLint: next/core-web-vitals + next/typescript
npm run typecheck # tsc --noEmit — no implicit any
npm run build     # next build — must produce zero errors
```

**Specific frontend rules for CI:**
1. No `any` types — define TypeScript interfaces for all Firestore document shapes
2. No unused imports — ESLint will catch these
3. `next/image` for all images — ESLint catches raw `<img>` tags
4. `"use client"` must be the first line when present — no code before it
5. `export const revalidate = 3600` on all pages reading from DB3
6. `export const maxDuration = 60` on pages with Genkit AI calls

---

*Arunachal Explore · Frontend Agent*  
*Live: https://apt-website-v1.vercel.app · Reviewed by: ChatGPT 5.4*