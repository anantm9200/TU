# Performance assessment — not a benchmark

**Measured lab LCP:** unavailable — site domain could not be accessed for a production Lighthouse run. 
**Measured field INP / CLS / LCP:** unavailable — no CrUX, RUM, GA4 or Search Console access supplied.

## Source-level observations
- Static HTML exposes important content and metadata without hydration.
- Existing background imagery is externally hosted. Availability, cache headers and decoded resource sizes are not under this repository's direct control.
- Google Fonts are referenced externally using a CSS import. The head includes provider preconnects.
- Scrolling, gradient motion and interactive widgets are implemented in JavaScript/CSS; reduced-motion support exists.
- High-priority preload of the existing page-specific hero image is added without changing its visual treatment.
- No new client-side SEO library or tracking script was added.

## Required next measurements
Use mobile and desktop Lighthouse on every representative page once deployed. Record actual LCP (target ≤2.5s), INP (≤200ms), CLS (≤0.1), JS main-thread time, responsive screenshots, initial image requests and HTTP cache behavior. Resolve any duplicate hero downloads if network traces reveal preload mismatch. Real user results must be reported separately from lab scores.

## Vercel deployment status
Authenticated Vercel inspection confirms a READY deployment from TU main but no attached intended custom domain and SSO protection on the Vercel aliases. This is not a substitute for public Lighthouse or field performance measurements.
