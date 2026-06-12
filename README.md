# 🌿 Eco-Sphere

**Eco-Sphere** is a community-driven web platform for waste reporting and smart waste management, focused on Bali, Indonesia. Citizens can scan and report waste with the help of AI, find the nearest waste banks, join community cleanups, and earn points — while corporate partners track their environmental (CSR) impact through a dedicated dashboard.

> ⚠️ This is a front-end project. All data is currently static/illustrative (there is no backend database yet), except the **Scan Waste** feature, which calls the Google Gemini API for real image analysis.

---

## ✨ Features

### For citizens
- **Scan Waste (AI Analysis)** — Upload a photo or use the device camera; Google Gemini detects the waste **category** (Organic / Plastic-Inorganic / Hazardous) and estimates its **volume**. If the image is not actual waste, it returns an educational note and asks for a new image.
- **Smart recommendations** — Based on the result:
  - **Large volume** → add the spot to the Smart Waste Map, or organize a community cleanup.
  - **Small volume** → "Clean It Yourself": go to the nearest **waste bank** (filtered by category, with real Google Maps directions) or follow **DIY processing tips** (home composting, recycling, hazardous handling).
- **Automatic location** — Geolocation + reverse geocoding fill in the nearest location automatically.
- **Points & gamification** — Submitting a report shows an animated points pop-up; badges, daily missions, and a leaderboard keep users engaged.
- **Smart Waste Map** — An interactive Leaflet map of reports, landfills (TPA), and waste banks, with a heatmap layer and "find nearest waste bank".

### For corporate partners
- **CSR Dashboard** — A 5-section dashboard (Overview, Regions, Waste Data, Ecosystem, Insights) to manage environmental initiatives and track real-world impact: KPIs, charts, a site map, partner directory, and predictive insights.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 3.4 |
| Icons | lucide-react |
| Maps | Leaflet + leaflet.heat (loaded from CDN) |
| AI | Google Gemini (`@google/generative-ai`) |
| Charts | Custom SVG (no chart library) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- A **Google Gemini API key** (free tier works) — get one at https://aistudio.google.com/apikey

### Installation

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd eco-sphere

# 2. Install dependencies
npm install

# 3. Set up your environment variable
cp .env.example .env
# then open .env and paste your Gemini API key:
#   VITE_GEMINI_API_KEY=your_key_here

# 4. Run the dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build     # output goes to /dist
npm run preview   # preview the production build locally
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key used by the Scan Waste / AI analysis feature. |

> **Security note:** Because of the `VITE_` prefix, this key is bundled into the client build and is visible to anyone using the site. Restrict the key in Google Cloud Console (HTTP referrer + API restrictions), or proxy Gemini calls through a backend. **Never commit your real `.env`** — it is git-ignored on purpose.

---

## 🌐 Deploying to Vercel

1. Push the repo to GitHub (make sure `.env` is **not** committed).
2. Import the project on [vercel.com](https://vercel.com).
3. Under **Settings → Environment Variables**, add `VITE_GEMINI_API_KEY` with your key.
4. Deploy. Vercel serves over HTTPS, which is required for the camera feature.

---

## 📁 Project Structure

```
eco-sphere/
├─ public/assets/        # logos, icons, images, fonts
├─ src/
│  ├─ pages/             # route pages
│  │  ├─ Home.jsx
│  │  ├─ WasteReport.jsx     # Scan Waste (AI analysis)
│  │  ├─ WasteMap.jsx        # Smart Waste Map (Leaflet)
│  │  ├─ Leaderboard.jsx
│  │  ├─ Gamification.jsx
│  │  ├─ CSRDashboard.jsx    # CSR partner dashboard shell
│  │  ├─ ContactUs.jsx
│  │  └─ Profile.jsx
│  ├─ components/
│  │  ├─ layout/         # Navbar, Footer, Layout
│  │  ├─ home/           # Home page sections
│  │  └─ csr/            # CSR dashboard tabs + SVG charts + data
│  ├─ data/              # static demo data (reports, map, game)
│  ├─ hooks/             # useReveal, useHeroSlider
│  └─ styles/index.css   # Tailwind + custom utilities (glass, animations)
├─ App.jsx               # routes
├─ main.jsx              # entry point
├─ tailwind.config.js    # design tokens (colors, fonts)
└─ .env.example          # env template
```

---

## 🧭 How It Works

### 1. Routing & layout
`App.jsx` defines all routes inside a shared `Layout`. The layout conditionally shows the **navbar** and **footer**: the CSR Dashboard hides both (it has its own sidebar), and the full-screen Waste Map hides the footer.

### 2. Scan Waste flow
1. The user uploads a photo or captures one with the camera.
2. The image is sent to **Google Gemini** with a structured prompt; the model returns JSON with `isWaste`, `category`, `volume`, and a short note.
3. The UI shows a scanner animation while waiting, then renders the result.
4. Based on category + volume, the app shows the right action (map, community cleanup, nearest waste bank, or DIY tips) and awards points.

### 3. Maps
The Smart Waste Map and the CSR "Regions" tab use **Leaflet**, loaded from a CDN at runtime, with status-colored markers and (on the main map) a heatmap layer.

### 4. Charts
All charts in the CSR Dashboard are **hand-built SVG components** (area/line, donut, stacked bar, grouped bar, multi-line) — no charting library is required.

### 5. Design system
Colors and fonts are defined in `tailwind.config.js` (a teal/Bali-green palette + Poppins and a display font). Custom CSS in `index.css` adds glassmorphism, reveal-on-scroll, and animation utilities.

---

## ⚠️ Known Limitations

- **No backend.** Reports, leaderboard scores, points, and dashboard figures are not persisted — they reset on refresh. Submitting a report shows the points animation but does not save anything.
- **Gemini free tier** allows a limited number of requests per day; if exceeded you'll see a friendly "usage limit reached" message until the daily quota resets.
- **Maps and AI need an internet connection** (Leaflet and Gemini are loaded/called remotely).

---

## 📄 License

This project was built for educational / competition purposes. Add a license here if you intend to distribute it.