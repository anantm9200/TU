# Technical SEO architecture

The site consists of dependency-free static `.html` files and a Vercel serverless contact endpoint. SEO metadata must be in the **initial HTML**, not injected by JavaScript. Canonical route style: `/` and `/*.html`. Intended base URL: `https://damngoctu.com` (not yet verified live).

## Implemented
- `scripts/seo-config.cjs` centralizes metadata, canonical paths, entity graph, hero-resource hints and sitemap URL membership.
- `scripts/seo-generate.cjs` writes the initial HTML head and sitemap, and supports `--check` for CI.
- `scripts/seo-audit.cjs` checks SEO outputs, unique titles/descriptions, indexability, required social tags, structured data graph, local files/anchors, sitemap and 404 indexing.
- Semantic `WebPage`, `ProfilePage`, `CollectionPage`, `ContactPage` and `BreadcrumbList` plus consistent Person, Organization and WebSite identities.
- Open Graph and X/Twitter description/title/alt metadata; high-priority preload of the existing hero image.
- Explicit noindex for 404 page, canonical `/index.html` redirect and noindex headers for the API namespace.

## Deliberate omissions
- No fake `FAQPage`, testimonials, review scores, offers or article authors/dates.
- No hreflang: site is English only.
- No region-specific address or office schema: not verified for this person.
- No keyword meta, automatic IndexNow claims or unsupported Google Indexing API use.
- Robots allow public pages; `llms.txt` is optional/experimental, not proof of search/AI inclusion.

## Useful commands
`node scripts/seo-generate.cjs`
`node scripts/seo-generate.cjs --check`
`node scripts/seo-audit.cjs`

Run checks again against the **live deployed HTML**, robots.txt and sitemap after DNS and SSL work.
