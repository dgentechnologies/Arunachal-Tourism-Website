# Design System Specification: Arunachal Pradesh Tourism

## 1. Overview & Creative North Star
**The Creative North Star: "Topographic Poetry"**

This design system transcends the "travel portal" aesthetic to become a digital extension of Arunachal Pradesh’s landscape and soul. We are moving away from the rigid, boxy layouts of standard web design in favor of **Organic Brutalism**. This approach combines the structural integrity of tribal "no-nails" Adi architecture with the fluid, rhythmic lines of the Himalayan topography.

By leveraging intentional asymmetry, expansive negative space, and tonal depth, we create a "High-End Editorial" experience. The UI should feel less like a software interface and more like a curated, immersive journey through a cloud-forest—serene, sustainable, and deeply rooted in heritage.

---

## 2. Color & Tonal Architecture
The palette is a sophisticated interplay between the crystalline `Primary Turquoise` of the rivers and the `Secondary Saffron` of sunrise over the peaks. 

### The "No-Line" Rule
To honor the seamless "no-nails" construction of Adi architecture, **1px solid borders are strictly prohibited** for sectioning. Structural boundaries must be defined exclusively through:
*   **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
*   **Tonal Transitions:** Using subtle shifts in the surface-container tiers to define content blocks.

### Surface Hierarchy & Nesting
Treat the UI as a physical landscape with varying elevations. 
*   **Base:** Use `surface` (#fcf9f8) for the main canvas.
*   **Sub-sections:** Use `surface-container-low` (#f6f3f2) to group related content.
*   **Feature Cards:** Use `surface-container-lowest` (#ffffff) to provide a soft "lift" against the background.
*   **Nesting:** High-priority modules should use the highest tier (`surface-container-highest`) only as a backdrop for high-contrast `on-surface` text.

### Glass & Gradient Signature
For floating elements (navigation bars, overlays), use **Glassmorphism**. Apply `surface` at 70% opacity with a `24px` backdrop-blur. 
To add "soul," use a subtle linear gradient from `primary` (#006a62) to `primary-container` (#40e0d0) for Hero CTA backgrounds, mimicking the light hitting a glacial lake.

---

## 3. Typography
The typography system balances the precision of modern geometry with the warmth of traditional patterns.

*   **Display & Headline (Space Grotesk):** This is our "Traditional Geometric" voice. The high x-height and open apertures feel modern, while the quirky terminals nod to tribal weaving patterns. Use `display-lg` for immersive headlines with tight letter-spacing (-0.02em) to create an editorial impact.
*   **Title & Body (Manrope):** A high-performance sans-serif that remains legible at all altitudes. 
*   **Hierarchy as Identity:** Use a dramatic scale difference between `display-lg` (3.5rem) and `body-lg` (1rem). This "High-Contrast" scale signals premium editorial quality.

---

## 4. Elevation & Depth
Depth is achieved through "Tonal Layering" rather than mechanical shadows.

*   **The Layering Principle:** A card does not need a shadow to be "up." Placing a `surface-container-lowest` card on a `surface-container-low` background provides enough contrast to signify hierarchy while maintaining a sustainable, "flat-pack" architectural feel.
*   **Ambient Shadows:** If a floating component (like a modal) requires separation, use a shadow with a blur of `40px`, spread of `-10px`, and an opacity of `6%` using the `on-surface` color. This mimics natural light through mountain mist.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
*   **Primary:** Roundedness `full` (pill-shaped). Background: `primary` (#006a62). Text: `on-primary`. No shadows.
*   **Secondary:** Roundedness `full`. Background: `secondary-container` (#fccc38). Text: `on-secondary-container`.
*   **Tertiary:** Transparent background. Text: `primary`. Hover state: `primary-container` at 20% opacity with an organic, slightly asymmetrical "blob" shape background.

### Cards & Content Modules
*   **The Divider Rule:** Forbid the use of `<hr>` or divider lines. Use **vertical white space** (32px or 48px from the spacing scale) to separate sections.
*   **Shapes:** Apply `xl` (3rem) roundedness to one corner and `md` (1.5rem) to the others to create an "organic topography" feel that breaks the standard grid.

### Custom Cultural Icons
*   Icons are not generic. They are inspired by the **Mithun** (strength) and **Hornbill** (grace). 
*   Line work should be consistent with the `outline` token thickness, featuring open paths and geometric terminations.

### Interactive Inputs
*   **Input Fields:** Use a `surface-container-low` background. On focus, transition the background to `surface-container-lowest` and add a `2px` "Ghost Border" in `primary`.
*   **Chips:** Selection chips should use the `secondary-fixed` (#ffdf90) for a "Sun-drenched" highlight effect.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Align text to the left but allow images to bleed off the right edge of the screen to suggest the vastness of the Arunachal landscape.
*   **Use Generous White Space:** If a section feels crowded, double the padding. Serenity is a core brand pillar.
*   **Layer Text over Imagery:** Use `surface-dim` overlays on high-end photography to ensure `display` typography is legible while remaining immersive.

### Don't:
*   **Don't use 90-degree corners:** Except for the screen edge itself, every container should have a minimum of `sm` (0.5rem) roundedness to maintain the "organic" feel.
*   **Don't use pure black shadows:** Shadows must always be a low-opacity tint of the surface or primary colors.
*   **Don't use standard grids for everything:** Occasionally break the grid by overlapping a small image (with `lg` roundedness) over a text block to create depth.

---

## 7. Interaction & Motion
*   **Surface Transitions:** When moving between pages, use "Soft Fades" (300ms) rather than sliding animations. 
*   **The "Mist" Effect:** Elements should fade in while slightly scaling up (from 98% to 100%) to mimic objects emerging from mountain mist.