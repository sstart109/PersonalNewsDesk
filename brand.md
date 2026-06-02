# IllumiLib - Brand Identity Guide

> "Every book you own. Ask it anything. Verify every answer."

---

## What IllumiLib Is

IllumiLib is a cloud SaaS that converts physical book pages into AI-queryable documents using enterprise-grade OCR. It exists at the intersection of the ancient and the intelligent - the scholar's candlelit library and the power of modern AI. The brand reflects that intersection at every touchpoint.

IllumiLib is not a tech product that happens to serve readers. It is a scholar's tool that happens to be powered by technology. That distinction must be felt in every design decision.

---

## Brand Essence

**One-line tagline (hero contexts, social, short copy):**
> Illuminate your library.

**Full positioning statement (headlines, landing page, ads):**
> Every book you own. Ask it anything. Verify every answer.

**Use both.** The short tagline fits wordmarks, footers, social bios, and email signatures. The full statement fits hero sections, ad headlines, and anywhere a browser-stopping claim is needed.

---

## Tone of Voice

**Three words:** Authoritative. Warm. Trustworthy.

### Authoritative
IllumiLib speaks with the confidence of a scholar, not the enthusiasm of a startup. It does not over-explain, hedge, or use filler words. Claims are stated plainly and backed by specifics (page numbers, compliance certifications, processing times).

**Do:** "A 1,000-page book. Ready in just minutes."
**Don't:** "Blazing fast OCR that'll transform the way you work with books!"

### Warm
The brand treats readers as intelligent people who love their books. It never condescends, never uses jargon without purpose, and always acknowledges the human relationship between a reader and their library.

**Do:** "I checked. It was right there."
**Don't:** "Leverage AI to extract insights from your physical document corpus."

### Trustworthy
IllumiLib earns trust through specificity and transparency. Every answer has a page number. Every claim has a source. The brand reflects this: it does not make promises it cannot keep, and it always tells the user where to verify.

**Do:** "Every answer comes with a page citation. Check it against the source."
**Don't:** "Get accurate answers from your books instantly."

### What to Avoid
- Startup energy: exclamation marks, emojis, hype words ("revolutionary", "game-changing", "unlock")
- Cold tech language: "leverage", "utilize", "seamless", "robust", "scalable solution"
- Vague superlatives: "the best", "world-class", "cutting-edge"
- Casualness that undermines authority: "Hey there!", "Super easy!", "You're all set!"

---

## Target Audience

IllumiLib serves all serious readers equally. No segment is ranked above another:

- **Theological researchers and clergy** - large personal libraries, dense academic texts, Greek, Hebrew, and other non-Latin language sources
- **Academics and scholars** - research collections, citation-heavy workflows, multi-language sources
- **Legal and healthcare professionals** - compliance-sensitive environments, reference libraries, need for verifiable sourcing
- **Institutional buyers** - universities, seminaries, law firms, hospital libraries

Write as if addressing one intelligent person who takes their books seriously. The message should feel equally at home in a seminary library, a law office, or a university reading room.

---

## Logo & Wordmark

**Treatment:**
```
Illumi  +  lib (in gold)
```

The wordmark is the only logo treatment. There is no standalone icon or logomark. The word itself carries the identity.

**Typeset in:** Playfair Display, bold (700), tracking-wide
**"Illumi":** `text-beam` (`#FFF9F0`) on dark backgrounds; `text-brown-deep` (`#2C1810`) on light backgrounds
**"lib":** Always `text-gold` (`#C9A84C`) - in every context, on every background

**Never:**
- Separate "Illumi" and "lib" onto two lines
- Change the capitalisation (not "illumilib", not "ILLUMILIB", not "IllumiLib" with capital L)
- Recolour "lib" - gold is non-negotiable
- Add a tagline to the wordmark itself - keep it clean
- Use any font other than Playfair Display for the wordmark

---

## Colour Palette

### Primary Palette

| Name | Hex | Tailwind Token | Use |
|---|---|---|---|
| Parchment | `#F5E6C8` | `bg-parchment` | Page background, primary sections |
| Cream | `#FDF6E3` | `bg-cream` | Alternate sections, card backgrounds |
| Shelf | `#1A0F0A` | `bg-shelf` | Footer, dark hero overlays, NavBar on scroll |
| Gold | `#C9A84C` | `text-gold` / `bg-gold` | All accents, CTAs, icons, wordmark "lib" |
| Brown Deep | `#2C1810` | `text-brown-deep` | All headings, primary body text |
| Beam | `#FFF9F0` | `text-beam` | Light text on dark backgrounds |
| Text Muted | `#6B4C3B` | `text-text-muted` | Secondary body copy, captions, labels |
| Border | `#D4B896` | `border-border` | All borders, dividers, card outlines |

### Secondary Palette

| Name | Hex | Tailwind Token | Use |
|---|---|---|---|
| Gold Hover | `#B8943E` | `bg-gold-hover` | CTA button hover state only |
| Gold Light | `#E8C97A` | - | Subtle gold accents, shimmer effects |

### Colour Rules - Non-Negotiable

1. **No white backgrounds.** Use parchment or cream. White reads as generic tech; parchment reads as scholarship.
2. **No blue, purple, grey, or green anywhere.** These colours destroy the brand immediately.
3. **Gold is the only accent colour.** No other accent is permitted - not even a warm orange or a deep red.
4. **Section alternation pattern:** parchment -> cream -> parchment -> cream -> shelf (footer/dark CTA). Never two identical adjacent sections.
5. **Error states:** Use deep red (`#8B1A1A` or similar warm red) sparingly and only for genuine errors. Never use red as a design accent.
6. **Success states:** Use gold or a muted warm green (`#4A6741`) - never bright green.

### Dark Mode

Dark mode is allowed across IllumiLib products when it stays inside the warm scholarly palette. Use shelf-black and brown-deep surfaces with beam text, gold accents, and warm brown borders. Avoid cool charcoal, blue-black, neon accents, or grey UI chrome.

---

## Typography

### Typeface System

| Role | Font | Weights |
|---|---|---|
| Headings | Playfair Display | 400, 500, 600, 700, 800, 900 |
| Body, UI, labels | Lora | 400, 500, 600, 700 |

**Both fonts are serif. This is intentional and non-negotiable.** The all-serif approach defines the brand's scholarly character. There is no sans-serif fallback in the design system.

Import via `next/font/google`:
```typescript
import { Playfair_Display, Lora } from 'next/font/google'
```

CSS variables: `--font-playfair`, `--font-lora`
Tailwind usage: `font-[family-name:var(--font-playfair)]`, `font-[family-name:var(--font-lora)]`

### Typography Rules

- **Every heading (h1-h6):** Playfair Display, always
- **Every piece of body copy, UI label, button text, caption, nav link, footer text:** Lora, always
- **Never use Inter, Roboto, Arial, system-ui, or any sans-serif font** - not even in utility contexts
- **Never use monospace fonts for code snippets in user-facing UI** - use Lora italic instead

### Typographic Scale (Reference)

| Use | Size | Weight | Font |
|---|---|---|---|
| Hero headline | `text-5xl` / `text-6xl` | Bold (700) | Playfair Display |
| Section heading (h2) | `text-3xl` / `text-4xl` | Bold (700) | Playfair Display |
| Card heading (h3) | `text-xl` / `text-2xl` | Bold (700) | Playfair Display |
| Subheading (h4) | `text-lg` | Semibold (600) | Playfair Display |
| Section label (eyebrow) | `text-sm`, uppercase, `tracking-widest` | Normal (400) | Lora |
| Body copy | `text-base` / `text-sm` | Normal (400) | Lora |
| Captions | `text-sm` | Normal (400) | Lora |
| Fine print | `text-xs` | Normal (400) | Lora |
| Button text | `text-sm` / `text-base` | Semibold (600) | Lora |

### Eyebrow Labels
Section eyebrow labels (the small uppercase text above a heading) are always:
- Lora, `text-gold`, `text-sm`, `uppercase`, `tracking-widest`
- Example: `"How It Works"`, `"Processing Speed"`, `"Simple, Honest Pricing"`

---

## Iconography

- **Style:** Outline icons, `strokeWidth={1.5}`, rounded caps and joins
- **Colour:** Always `text-gold` - never brown, never cream
- **Size:** `w-8 h-8` for feature cards; `w-6 h-6` for UI; `w-5 h-5` for inline
- **Source:** Heroicons outline set (or equivalent hand-drawn outline SVGs)
- **No filled icons** - filled icons read as flat/tech; outline reads as scholarly
- **No emoji in production UI** - use the gold six-point asterisk as the universal bullet/accent symbol

### Six-Point Asterisk Symbol
The gold six-point asterisk (Unicode `U+2736`; shown as `*` in this ASCII guide) is IllumiLib's signature bullet point and decorative accent. Use it:
- In feature lists instead of checkmarks
- In trust bars and credential lists
- As a section divider or decorative mark
- Always in `text-gold`

---

## Photography & Imagery

### The Aesthetic: Warm, Candlelit Scholar

All photography must feel as if it belongs in the same world as the hero image - a scholar's private library, warm candlelight, aged paper, genuine intellectual weight. Think Rembrandt lighting applied to the act of reading.

**Qualities to seek in every photograph:**
- Warm colour temperature (amber, honey, deep ochre - never cool blue)
- Soft, directional light (candle, lamp, window with golden-hour sun)
- Physical texture (cloth bindings, leather, worn paper edges, wood grain)
- Depth and shadow - a photograph should have a dark corner and a bright focus point
- Human presence is optional but always scholarly in posture and context
- Genuine wear and age visible - these are loved, used books, not pristine props

**Qualities to reject in every photograph:**
- Cool, blue-toned lighting
- Flat overhead or studio lighting with no shadows
- Pristine, unused-looking books
- White or grey backgrounds
- Minimalist styling - empty space, one object on white
- Stock photo energy - staged smiles, generic office settings

### Product Screenshots and UI Imagery

Screenshots and UI outputs are part of the brand and must be treated accordingly:
- Capture light-mode surfaces on parchment or cream backgrounds, never white.
- Capture dark-mode surfaces on shelf-black or brown-deep backgrounds, never cool charcoal or grey.
- Overlay with a subtle warm vignette if needed to unify with photography.
- Frame screenshots within warm wooden or leather-bordered containers where possible.
- Avoid raw browser chrome unless it is cropped cleanly and colour-matched.
- The goal: a screenshot should feel as if it belongs on the same page as the hero photograph.

### Illustration
If illustration is needed (diagrams, explainers, icons at large scale):
- Style: fine-line pen-and-ink, warm sepia tones
- No flat vector illustration with bold fills and no texture
- No isometric tech diagrams

---

## UI Component Principles

### IllumiLib Capture Desktop App

IllumiLib Capture is a companion utility for the book/OCR workflow, so its UI is denser and more operational than the marketing site or SaaS surfaces. It should still feel unmistakably IllumiLib: serif typography, parchment/gold/shelf colors, sharp rectangular controls, and a quiet scholar-tool tone.

**Window identity:**
- Title bar: Windows-native chrome with IllumiLib icon and title `IllumiLib Capture - Settings`
- Header: wordmark treatment `Illumi` + gold `Lib` + ` Capture`
- Subtitle: `Capture companion for the IllumiLib book and OCR workflow`
- Header actions: text-only `About` link plus a square theme icon button
- Theme icon: sun in light mode, crescent moon in dark mode; stroke icon, gold, no filled pictogram

**Light mode:**

| Role | Hex | Use |
|---|---|---|
| App background | `#F5E6C8` | Main window and header field |
| Alternate field | `#FDF6E3` | Inputs, selects, buttons, theme button |
| Primary text | `#2C1810` | Labels, wordmark `Illumi`, input text |
| Muted text | `#6B4C3B` | Helper copy, checkbox labels |
| Gold accent | `#C9A84C` | Wordmark `Lib`, region values, subtitle, theme icon |
| Border | `#D4B896` | Inputs, dividers, button outlines |
| Active control | `#1A0F0A` | Selected segmented button background |
| Active text | `#FFF9F0` | Text on selected segmented button |

**Dark mode:**

Dark mode is approved for IllumiLib surfaces when it preserves the same scholarly palette: shelf-black backgrounds, brown-deep fields, beam text, gold accents, and warm brown borders. It should feel candlelit, not generic high-contrast tech.

| Role | Hex | Use |
|---|---|---|
| App background | `#1A0F0A` | Main window and header field |
| Alternate field | `#2C1810` | Inputs, selects, buttons, theme button |
| Header depth | `#0F0805` | Modal/header emphasis and active segmented button |
| Primary text | `#FFF9F0` | Labels, wordmark `Illumi`, input text |
| Muted text | `#D4B896` | Helper copy, checkbox labels |
| Gold accent | `#C9A84C` | Wordmark `Lib`, region values, subtitle, theme icon |
| Gold hover | `#E8C97A` | Hover accent in dark mode |
| Border | `#6B4C3B` | Inputs, dividers, button outlines |

**Layout and controls:**
- Use a compact settings-panel layout, not a landing page composition.
- Labels sit in the left column; values and controls align in predictable rows.
- Controls are square-cornered with thin warm borders; no rounded controls.
- Segmented controls use a dark active fill and light active text.
- Buttons remain quiet outlined controls unless they represent a primary action.
- Numeric inputs are narrow and sized to their expected values.
- Checkbox accent color is gold.
- Capture outline and advance box colors may use bright operational swatches because they are user-selected overlay indicators, not brand accents.
- Horizontal dividers use the warm border color, with stronger gold only under the app header.

### Buttons

**Primary CTA:**
```
bg-gold text-brown-deep hover:bg-gold-hover
font-[family-name:var(--font-lora)] font-semibold
px-8 py-4 text-lg
transition-all duration-200 shadow-lg
```
No border-radius - sharp corners only. Rounded buttons read as friendly/casual; sharp corners read as precise and serious.

**Secondary / Outlined:**
```
border border-gold text-gold hover:bg-gold hover:text-brown-deep
font-[family-name:var(--font-lora)] font-semibold
px-4 py-1.5 text-sm
transition-all duration-200
```

**Never:**
- Rounded corners (`rounded-*`) on buttons
- Blue, grey, or green buttons
- Ghost buttons with non-gold borders

### Cards

```
bg-parchment border border-border p-8
```
No shadow by default - border defines the card. No border-radius. Cards feel like pages in a book, not floating material design elements.

### Dividers

The gold horizontal rule is a signature element:
```
w-24 h-px bg-gold mx-auto
```
Use to close a heading block or separate content within a section.

### Borders & Outlines
Always `border-border` (`#D4B896`). Never grey, never black.

### Spacing Philosophy
Generous vertical padding (`py-16` to `py-24`) between sections. The page should breathe like a well-typeset book - not feel compressed or information-dense.

---

## Animation

### Scroll-Triggered Section Reveals
All major sections use `IntersectionObserver` to trigger a fade-up on enter:
```css
.section-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
.section-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```
Apply `section-reveal` to the inner wrapper; add `visible` class when the element enters the viewport.

### Hero Entrance - Staggered Fade-Up
```css
.animate-fade-up { animation: fadeUp 0.7s ease-out forwards; opacity: 0; }
.animate-fade-up-delay-1 { animation-delay: 0.1s; }
.animate-fade-up-delay-2 { animation-delay: 0.25s; }
.animate-fade-up-delay-3 { animation-delay: 0.4s; }
.animate-fade-up-delay-4 { animation-delay: 0.55s; }
```

### Principles
- **Slow and deliberate** - 0.7s ease-out, not 0.2s snappy
- **Fade + lift** - always translateY upward, never downward or sideways
- **No bounce, no overshoot, no spring physics** - those read as playful/tech; ease-out reads as dignified
- **No parallax** - it distracts from the content
- **No auto-playing carousels or loops** - the brand is calm, not animated

---

## Page Layout Conventions

### Section Background Sequence
Every page follows this alternating pattern:
1. `bg-parchment` (primary)
2. `bg-cream` (secondary)
3. `bg-parchment`
4. `bg-cream`
5. `bg-shelf` (footer or final dark CTA)

Never break this alternation. It creates visual rhythm without needing decorative separators.

### Maximum Widths
- Content sections: `max-w-4xl` or `max-w-5xl` or `max-w-6xl` (contextual)
- Text-only sections (FAQs, legal, single-column): `max-w-2xl`
- Always: `mx-auto px-6`

### Navigation
- Transparent over hero images, transitions to `bg-shelf/95 backdrop-blur-sm` on scroll
- Fixed, `z-50`, full width
- Wordmark left, minimal links right - never more than two right-side nav elements for logged-out users
- Mobile: hamburger with full-screen `bg-shelf` drawer

---

## Compliance & Trust Signals

These five credentials are the brand's trust anchors. Use them together, in this order, whenever trust signalling is needed:

1. Fortune 500 OCR Technology
2. HIPAA Compliant
3. SOC 1/2/3 Certified
4. GDPR Ready
5. 200+ Languages Supported

Display with gold six-point asterisk markers on `bg-shelf` background (the TrustBar pattern). Never reduce to fewer than all five without a strong reason.

---

## What This Brand Is Not

To protect brand consistency, the following are explicitly prohibited:

| Prohibited | Why |
|---|---|
| Blue or purple accents | Destroys warm scholarly palette instantly |
| White backgrounds | Reads as generic SaaS, not a scholar's tool |
| Flat/minimal aesthetic | Undermines the warmth and richness of the identity |
| Sans-serif fonts | Breaks the all-serif brand covenant |
| Rounded button corners | Too casual and friendly for this brand |
| Emoji in UI copy | Replaces the six-point asterisk with noise |
| Exclamation marks in headlines | Enthusiasm over authority |
| Third-party UI component libraries | shadcn, Radix, Headless UI introduce foreign visual styles |
| Bright green "success" states | Use gold or warm muted tones instead |
| Stock photography | Generic, staged, non-scholarly images break the aesthetic |

---

## Brand in Code - Quick Reference

```css
/* globals.css @theme block */
--color-parchment:   #F5E6C8;
--color-brown-deep:  #2C1810;
--color-gold:        #C9A84C;
--color-cream:       #FDF6E3;
--color-beam:        #FFF9F0;
--color-shelf:       #1A0F0A;
--color-gold-hover:  #B8943E;
--color-gold-light:  #E8C97A;
--color-text-muted:  #6B4C3B;
--color-border:      #D4B896;

/* IllumiLib dark mode */
--capture-dark-bg:           #1A0F0A;
--capture-dark-bg-alt:       #2C1810;
--capture-dark-header-bg:    #0F0805;
--capture-dark-text:         #FFF9F0;
--capture-dark-text-muted:   #D4B896;
--capture-dark-border:       #6B4C3B;
--capture-dark-gold-hover:   #E8C97A;
```

```typescript
// next/font/google in layout.tsx
import { Playfair_Display, Lora } from 'next/font/google'
// Variables: --font-playfair, --font-lora
// Applied to <html> element
```

```tsx
// Heading - always Playfair
<h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brown-deep">

// Body - always Lora
<p className="font-[family-name:var(--font-lora)] text-text-muted leading-relaxed">

// Wordmark - always this exact treatment
<span className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-wide">
  Illumi<span className="text-gold">lib</span>
</span>

// Primary CTA button
<button className="bg-gold text-brown-deep font-[family-name:var(--font-lora)] font-semibold px-8 py-4 hover:bg-gold-hover transition-all duration-200">

// Section eyebrow label
<p className="font-[family-name:var(--font-lora)] text-gold text-sm uppercase tracking-widest">

// Gold bullet
<span className="text-gold">{"\\u2736"}</span>
```

---

*This document is the authoritative brand reference for IllumiLib and all future products built under the AI Accelerator / IllumiLib identity. When in doubt: ask yourself whether the decision belongs in a candlelit library. If the answer is no, reconsider.*
