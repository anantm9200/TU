# Internal links and architecture

Global navigation and footer expose all five main content destinations and the privacy link. Search-accessible anchors link from the homepage to services, profiles, perspectives and contact. Each indexable URL is at most one navigation hop from the homepage. All page headlines are visible in static HTML.

The perspectives hub uses `#trust`, `#crossborder`, `#readiness`, `#disclosure`, `#governance` and `#continuity` for six subtopics. These are **not separate canonical documents** and should not be listed individually as XML sitemap URLs. Internal topic links and cards should continue pointing to existing anchors. Adding unique article pages is a separate editorial project because it would alter current page content/structure.

Automated QA checks local `href`/`src` paths, duplicate HTML IDs and same-page fragments. Crawl deployed URLs to detect HTTP status and redirect issues that source analysis cannot catch.

## Capital Journal live expansion (29 October 2026)

Four substantive articles now have independent canonical URLs, linked from the homepage, a searchable/category-filtered section on /insights.html, the related-reading sections on individual articles, and the XML sitemap:

- /journal/working-capital-agriculture.html
- /journal/investment-readiness-agri-business.html
- /journal/cross-border-investor-trust.html
- /journal/capital-allocation-agri-value-chain.html

The six older editorial snippets remain anchored on the insights page; do not infer they have distinct canonical URLs. All new posts contain on-page section navigation and link back to the journal hub. Each page has a stable entity graph, breadcrumb, canonical and BlogPosting structured data, with no invented author credentials.
