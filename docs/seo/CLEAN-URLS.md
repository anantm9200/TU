# TU clean URL migration

Canonical public page paths use no .html extension. Homepage is /, primary pages are /about, /expertise, /insights, /contact and /privacy, and all Capital Journal articles use /journal/<slug>. Trailing slash is disabled on content paths.

The static source files still end in .html, as required for a simple HTML site. The Vercel cleanUrls:true feature serves them from clean URLs and redirects old .html URLs with 308 Permanent Redirect. /index.html and /index redirect to /.

All 12 SEO canonicals, JSON-LD graph and breadcrumbs, OG URLs, llms.txt, internal navigation links and sitemap entries are generated or updated to clean URLs. The SEO CI rejects .html canonical pages, .html sitemap entries and legacy internal links.

For browser regression, scripts/serve-clean.cjs emulates Vercel routing locally, and Playwright visits all 12 extensionless routes across 17 viewport widths. At 375px it checks every .html legacy redirect and all non-root trailing slash redirects.

Live redirect behavior must also be confirmed on Vercel after deployment. Existing external links are preserved through redirects, while search-engine reindexing depends on crawler timing. No visual design or form behavior was intentionally changed.
