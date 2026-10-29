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
