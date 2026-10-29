# Internal links and architecture

Global navigation and footer expose all five main content destinations and the privacy link. Search-accessible anchors link from the homepage to services, profiles, perspectives and contact. Each indexable URL is at most one navigation hop from the homepage. All page headlines are visible in static HTML.

The perspectives hub uses `#trust`, `#crossborder`, `#readiness`, `#disclosure`, `#governance` and `#continuity` for six subtopics. These are **not separate canonical documents** and should not be listed individually as XML sitemap URLs. Internal topic links and cards should continue pointing to existing anchors. Adding unique article pages is a separate editorial project because it would alter current page content/structure.

Automated QA checks local `href`/`src` paths, duplicate HTML IDs and same-page fragments. Crawl deployed URLs to detect HTTP status and redirect issues that source analysis cannot catch.
