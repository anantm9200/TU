# TU responsive layout fix — 29 October 2026

User screenshot: at wide desktop width, FAQ section heading starts at the left while the question list begins much lower in a separately centered block, leaving excessive empty space and a visually disconnected two-column composition.

## Changes
- Five FAQ sections across Home, Profile, Perspectives, Contact and Privacy now have `faq-layout`: heading/explanation and accordion are grid siblings on desktop, and stack on tablet/mobile.
- Compact section padding and section-intro alignment tightened; card numerals no longer create oversized internal blank areas.
- Navigation collapses at 1120px instead of 700px; overlay supports keyboard/escape and scroll.
- Responsive grid min-width safeguards, comparison-table cell labels for narrow screens, improved footer structure and touch-friendly sizes.
- Preserve deep green/gold palette, imagery, animations, copy, SEO, and established 3%/1.5% horizontal gutters.

## Test plan
CI Playwright test is intended for viewports 320–1920px across all six pages, with overflow and FAQ alignment assertions, interaction checks and captured screenshots. External images/fonts are disabled for deterministic structural checks; review production media separately.

## Browser QA iteration
The first complete Chromium run found Contact page overflow at 768px (827px content). Its form and adjacent copy were still rendered side-by-side. The layout now stacks these at <=1024px and ensures form fields use fluid, non-overflowing columns. Re-run all ten widths before promoting to main.

## QA pass, 60 combinations
The second GitHub Actions run (https://github.com/anantm9200/TU/actions/runs/40935993106) completed successfully after the 768px form fix. The follow-up smoke test increases viewport coverage to 320–2560px, explicitly testing the 2048px supplied screenshot width and a 2560px large monitor.

## Screenshot review notes
The 60-combination run generated screenshots; FAQ desktop and mobile compositions were inspected. The accordion question text fell back to a serif face when external Google Fonts were unavailable, so an explicit sans-serif fallback was added. Mobile hero copy previously began low in the viewport when the background image failed to load; mobile-only hero centering improves composition while preserving the desktop immersive hero.

## Capital Journal regression extension
The responsive QA suite now visits 10 indexable pages (six main pages and four editorial articles) across 17 widths and tests article-specific structures, category filtering, search empty state and the investor briefing checklist.
