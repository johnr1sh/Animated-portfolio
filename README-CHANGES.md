# What changed

Drop these files into your existing repo at the same paths (they will overwrite
`public/robots.txt` and `src/app/layout.tsx`; everything else is new).

## public/ (new files)
- `favicon.ico`, `icon-16.png`, `icon-32.png`, `icon-48.png`, `icon-192.png`, `icon-512.png`, `apple-icon.png`
  — full icon set generated from your `logo.png`. This fixes the "icon not showing" issue: the old
  project only had `logo.png`/`logo.svg` in `public/`, but nothing in `layout.tsx` ever told the
  browser to use them as a favicon, so browsers fell back to no icon / a generic one.
- `og-image.png` — 1200×630 Open Graph / Twitter card image (your logo + name on your site's dark
  background), used when the link is shared on social media, Slack, iMessage, etc.
- `site.webmanifest` — PWA manifest referencing the icons (adds "Add to Home Screen" support).
- `sitemap.xml` — single-page sitemap pointing at `https://www.johnrish.site/`.
- `llms.txt` — plain-text summary of the site for AI answer engines (ChatGPT, Claude, Perplexity,
  Google AI Overviews), following the emerging llms.txt convention. This is the GEO piece.
- `robots.txt` (replaces yours) — kept your original crawler rules and added explicit `Allow`
  entries for AI/answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
  plus a `Sitemap:` line pointing to `sitemap.xml`.

## src/app/layout.tsx (replaces yours)
- `metadataBase` + canonical URL set to `https://www.johnrish.site`
- Full `icons` block wired to the new favicon/apple-icon files, plus `manifest`
- Full `openGraph` and `twitter` blocks pointing at `og-image.png` (this is what makes link
  previews look right on Facebook, LinkedIn, X/Twitter, Discord, iMessage, etc.)
- Explicit `robots` directives (index/follow, large image previews, no snippet length limit)
- JSON-LD structured data (`Person` + `WebSite` + `ProfilePage`) injected in `<head>` — this is
  the AEO/GEO piece: it gives search engines and AI systems a machine-readable summary of who you
  are, what you do, and your social/contact links, which is what lets tools like Google's AI
  Overviews or ChatGPT answer questions about you directly.
- Kept your existing title/description text and viewport/theme-color settings.

## Before you push
Everything above assumes the site will live at **https://www.johnrish.site**. If that changes,
search-and-replace `johnrish.site` in `layout.tsx`, `robots.txt`, `sitemap.xml`, and `llms.txt`.

## Note on the other uploaded file
The `devjohn-seo-suite` zip you uploaded is a **WordPress plugin** — it can't be installed into
this Next.js project (there's no WordPress here), so I didn't touch it. Everything above was
built directly for your Next.js site instead. Let me know if that plugin was meant for a
different, WordPress-based site and you want help there separately.
