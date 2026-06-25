# Faiza Ghous — Portfolio

Personal portfolio of **Faiza Ghous**, Climate Scientist & Disaster Risk Reduction Specialist at NDMA Pakistan.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Animation | Canvas wind-flow (MapSection) |
| Icons | Lucide React |
| Contact Form | Web3Forms |
| Visitor Logging | Google Sheets (Apps Script webhook) |
| Fonts | Syne (display) + DM Sans (body) |
| Hosting | Netlify |

---

## Features

- Dark / light theme toggle — defaults to dark, persisted in `localStorage`
- Fixed canvas wind-flow animation background (multi-scale turbulence)
- 4 project detail pages with image lightbox
- Training & Conferences section with media placeholders
- Gallery section — 6 categories (achievements, capacity building, climate modelling training, community building, green talks, media appearances)
- Certificates & Awards section — 6 PDFs with in-page viewer
- Skills section with categorized progress bars
- Web3Forms contact form
- Visitor logging to Google Sheets

---

## Projects

| # | Project |
|---|---|
| 1 | CCOP Dashboard |
| 2 | Multi-Model Ensemble CMIP6 |
| 3 | Impact-based Forecasting — Islamabad |
| 4 | Seismic Events in Active Tectonic Areas |

---

## Local Development

```bash
npm install
npm run dev
```

---

## Key Files

| File | Purpose |
|---|---|
| `src/data/projectsData.js` | 4 project objects |
| `src/data/skillsData.js` | Skills with categories |
| `src/components/MapSection.jsx` | Canvas wind animation |
| `src/components/GallerySection.jsx` | Photo & video gallery |
| `src/components/CertificatesSection.jsx` | PDF certificates viewer |
| `src/components/PublicationsSection.jsx` | Training & Conferences |
| `src/hooks/useVisitorLog.js` | Visitor logging |
| `public/_redirects` | Netlify SPA routing |
