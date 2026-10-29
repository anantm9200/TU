# Baseline technical SEO audit — TU

**Source:** `anantm9200/TU` main, snapshot `a654f855d3ea9929c677e7c5111ce7fd00558a8b` (29 October 2026). **Scope:** six canonical public pages, a 404 page, robots.txt, sitemap.xml, `llms.txt`, Vercel configuration, assets, static JavaScript and CSS. **Method:** source-code inspection plus attempted public domain retrieval; no analytics or field measurements supplied. **Production status:** requests to `https://damngoctu.com/` and its discovery files could not be completed, so live HTTP codes and indexing are **unverified**.

## Verified in repository
- Six unique static titles, descriptions, self-referencing absolute canonicals and a six-URL sitemap already existed.
- Initial homepage was marked `ProfilePage` but had no `mainEntity`; all other pages, including About and Contact, used generic `WebPage` JSON-LD.
- No stable cross-page `@id` references for Person / WebSite / Organization; no breadcrumb structured data.
- Open Graph image used SVG; no `og:image:alt`, Twitter title/description or explicit image MIME information.
- Original 404 page had no `noindex` robots directive.
- Original site had no automated metadata, JSON-LD, sitemap or internal-link regression gate.
- Six original editorial pieces share the perspectives URL rather than having their own canonical article URLs. Do not falsely assert six independent indexable articles.
- Original contact form depends on Vercel/Resend environment variables; actual delivery not tested.
- Images are decorative CSS backgrounds from Unsplash; network availability, CLS/LCP impact and cache status unverified.

## Critical external dependencies
- Intended `damngoctu.com` domain was not reachable in public checking; do not interpret source tags as indexed pages.
- Executive title supplied in the brief is `Global Director, Investor Relations`. Indexed excerpts of IAG's decision-maker directory have used `Deputy Director, Investor Relations – Global`. Current live directory snapshots are inconsistent; **the organisation should confirm the official public title** before presenting a verified biography. Do not substitute unrelated people sharing the same name.
- Need confirmed domain ownership, canonical host, live Vercel project, Google Search Console/Bing access and verified corporate identity data. No unverified phone, office or investment transactions are asserted.

## Severity / action
| Severity | Finding | Action |
|---|---|---|
| P0 | Production host not independently reachable | Confirm domain, DNS, SSL and Vercel deployment; then recrawl |
| P0 | Title consistency unresolved | Confirm designation against current official IAG materials |
| P1 | Incomplete identity/page schema | Implement coherent graph and correct page types |
| P1 | 404 missing noindex | Add noindex and exclude from sitemap |
| P1 | Social metadata incomplete | Expand OG/Twitter metadata; test previews after deployment |
| P1 | No automated SEO QA | Add reproducible generator/audit and CI |
| P2 | SVG OG preview may fail in social crawlers | Replace with PNG/JPEG after real preview tests |
| P2 | Six essays on one URL | Consider individually edited/canonical article pages with real editorial stewardship, later |
| P2 | Real-world CWV unknown | Run CrUX / Lighthouse after live deployment |

No ranking changes, schema enhancements, indexed URLs or Core Web Vitals measurements are claimed from this source-only review.

## Additional Vercel deployment inspection (29 October 2026)
- Authenticated Vercel project `tu` (`prj_Wt72k9xxTp7TK9x3GnXSDWyuHiHc`) exists and its latest production deployment is `READY` at commit `a654f855d3ea9929c677e7c5111ce7fd00558a8b`.
- Production Vercel aliases include `tu-delta.vercel.app`, `tu-anant-icl.vercel.app` and `tu-git-main-anant-icl.vercel.app`.
- **No `damngoctu.com` custom domain** is listed on that project, despite all metadata referring to that host.
- Vercel project settings show `ssoProtection.enabled: true`, `deploymentType: all_except_custom_domains`; thus default Vercel aliases can require authentication, and public search crawlers may not reach the content.
- Vercel project `live:false` is not the same as the production deployment's `READY` state. Publicly accessible production indexing remains **unverified**.
- Once the custom domain is connected, access protection should be assessed for the intended public custom domain while preserving private preview access. Do not disable protections without site-owner authorisation.
