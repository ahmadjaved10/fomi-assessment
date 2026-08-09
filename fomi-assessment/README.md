# Fomi Frontend Assessment

Two routes in one Next.js app:

- `/` — **Part A**: pixel-close implementation of the provided mockup (prompt panel, history
  strip, results grid, mocked generation API).
- `/workspace` — **Part B**: original workspace redesign, "Studio" (see `PRODUCT_THINKING.md`
  for the write-up).

## Stack

Next.js 14 (App Router) · JavaScript · Tailwind CSS · Vercel

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 for Part A and http://localhost:3000/workspace for Part B.

## Build for production (do this before deploying, to catch errors early)

```bash
npm run build
npm start
```

## Project structure

```
app/
  page.js                → Part A page
  workspace/page.js       → Part B page
  api/generate/route.js   → mocked generation endpoint (dummy backend)
  layout.js, globals.css
components/
  TopNav.js, HistoryStrip.js, GeneratePanel.js, ResultsGrid.js
lib/
  mockData.js             → seeds, styles, models, default prompt
PRODUCT_THINKING.md       → Part B deliverable #2
```

## Deploying (GitHub → Vercel)

1. **Create a repo and push:**
   ```bash
   git init
   git add .
   git commit -m "Fomi frontend assessment: Part A + Part B"
   git branch -M main
   git remote add origin https://github.com/<your-username>/fomi-assessment.git
   git push -u origin main
   ```
2. **Deploy on Vercel:**
   - Go to vercel.com → **Add New… → Project**.
   - Import the GitHub repo you just pushed.
   - Framework preset: Vercel auto-detects **Next.js** — leave build command as
     `next build` and output as default.
   - Click **Deploy**. Vercel gives you a live `.vercel.app` URL in ~1–2 minutes.
   - Every future `git push` to `main` auto-redeploys.
3. Put the live URL and the GitHub repo link in your submission.

## Notes on the mocked backend

`app/api/generate/route.js` is a real Next.js Route Handler (not a static mock file) — it
validates the prompt, simulates model latency, and returns a deterministic set of image URLs
seeded from a hash of the prompt, so the same prompt always returns the same "results." This
demonstrates realistic frontend architecture (loading states, error states, async data) without
needing an actual model provider, per the assessment's "Dummy Backend" requirement.
