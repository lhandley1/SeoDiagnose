# 🔍 SeoDiagnose - SEO Tag Analyzer 
# (Built with Replit AI Agent 🧠)

SeoDiagnose is a simple "vibe coded", powerful web app that checks and scores SEO tags on any website. Just paste a URL, and you'll get a full analysis with colorful cards, scores, previews, and tips to improve your SEO! 🎯

---

## 🚀 What It Does

- ✅ Analyze SEO tags (like title, meta, Open Graph, Twitter)
- 📊 Score them by category: Content, Technical, Social, Performance
- 🖼️ Show previews for Google, Facebook & Twitter
- 💡 Give clear, actionable recommendations
- 📁 Let you export your SEO report as JSON

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod for validation
- Wouter (lightweight routing)
- TanStack Query for data handling
- Radix UI for components

### 🔧 Backend
- Node.js + Express.js
- TypeScript (ESM)
- Cheerio for web scraping
- Drizzle ORM + PostgreSQL (via Neon)
- Built with Vite, tsx, and esbuild

---

## 📈 SEO Scoring System

- 4 Categories:
  - 📄 Content SEO
  - 🛠️ Technical SEO
  - 📢 Social Media Tags
  - 🚀 Performance
- Each scored out of 10 → Total score out of 100
- Color-coded feedback:
  - 🔴 1–3: Poor
  - 🟠 4–5: Needs work
  - 🔵 6–7: Decent
  - 🟢 8–10: Great

---

## 📦 How It Works

1. Enter a URL 🔗
2. Client validates it ✅
3. Server fetches the page 🌍
4. HTML is parsed and analyzed 🧠
5. Tags are grouped into categories 📂
6. Score is calculated and returned 📊
7. Results shown in cards with color + icons 🎨

---

## 🖼️ Design & Experience

- Mobile-first, fully responsive layout 📱
- Clean card-based interface with expandable sections 📁
- Smooth animations & clear typography ✍️
- Dark mode supported 🌙

---

## 🧪 Recently Updated (June 30, 2025)

- 🔁 Full UI/UX redesign
- 📊 New 100-point SEO scoring system
- ⚡ Added performance checks (page size + server response)
- 🖼️ Improved social previews
- 🌙 Dark mode enabled

---

## 🏗️ Deployment Info

- Built using Vite (frontend) & esbuild (backend)
- Dev mode: `npm run dev` (uses tsx)
- Production: `npm run build && npm start`
- PostgreSQL hosted on Neon
- Needs `DATABASE_URL` environment variable

---

🧠 **SeoDiagnose is proudly built using the Replit AI Agent.**  
Perfect for devs, marketers, and SEO enthusiasts who want quick insights and clean results!
