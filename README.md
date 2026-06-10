# Waste Analysis page refactor

Page language: **English**. Design: **glassmorphism + soft teal gradients**.
Functionality is unchanged from the previous version — only the visual layer was reworked.

Files changed: `src/pages/WasteReport.jsx`, `src/styles/index.css`,
`src/components/layout/Navbar.jsx`, `tailwind.config.js`.

## Design (new this round) — glassmorphism
- New utility classes added to `src/styles/index.css` (plain CSS, no token changes):
  `.glass`, `.glass-soft`, `.glass-dark` (frosted panels with `backdrop-filter`),
  `.mesh-bg` + `.mesh-orb` (soft animated mesh-gradient background), `.ring-glow`
  (teal glow on selected cards), `.lift` (hover lift), `.scan-ring` (conic shimmer
  during AI analysis). All respect `prefers-reduced-motion`.
- The form sits on a frosted-glass panel over a teal mesh-gradient with floating
  blur orbs. Hero uses layered teal gradients, a glass "Powered by AI" badge, and
  the Animal Chariot display title.
- Step indicator, AI result cards, and action cards are glass pills/cards with
  gradient icon chips (teal / blue / amber depending on category & volume).
- Buttons use a `primary → primary-light` gradient with a subtle hover lift.
- Colors are all from the existing palette (`primary`, `primary-light`,
  `primary-dark`, `secondary`, `info`, `success`, `warning`, `bali-*`).

## Behavior (unchanged, recap)
- **Upload**: drag & drop + click, validation, hover "Replace photo".
- **Automatic location**: geolocation + reverse-geocode on load, with status states.
- **AI (Gemini `gemini-2.5-flash`)**: returns `isWaste`, `category`, `volume`, `note`.
- **Not-waste detection**: if the image isn't real waste, the AI returns an
  educational note (e.g. "This image is educational material, not waste, which if
  printed could be classified as inorganic paper waste."), the recommendations and
  submit footer are hidden, and the user is prompted to upload a different image.
- **Conditional flow**: Large volume → Smart Waste Map / Community; Small volume →
  Clean It Yourself → nearest waste bank (by category + distance) + DIY tips.

## Navbar / tailwind.config (earlier rounds)
- Navbar CTA renamed to **"Waste Analysis"** (desktop + mobile).
- Palette/fonts/`hero-overlay` moved from the v4 `@theme {}` block into
  `tailwind.config.js` so they work under Tailwind v3.4; `bg-linear-to-b` →
  `bg-gradient-to-b`.

---

## Security note
Your `.env` contains a live-looking `VITE_GEMINI_API_KEY`. Anything prefixed with
`VITE_` is bundled into client-side JavaScript and visible to anyone using the site,
and it was committed to git. Rotate that key and call Gemini through a backend/proxy
rather than from the browser. (`.env` is intentionally **not** in this zip.)