# Production indexing checklist

1. Confirm ownership of the intended canonical domain, then add `damngoctu.com` in Vercel project `tu` > Settings > Domains, complete DNS/TLS, and inspect all six public URLs in a normal browser. The Vercel deployment is READY but currently lists only SSO-protected `.vercel.app` aliases.
2. Resolve executive role/title mismatch with officially approved IAG listing; request a truthful employer-linked biography when possible.
3. Confirm `/index.html` redirects to `/` and the content pages return 200 (not a soft 404). Confirm `404.html` corresponds to 404 responses for unknown URLs.
4. Confirm every HTML page serves the committed canonical and JSON-LD in the first response.
5. Verify `https://damngoctu.com/robots.txt`, `https://damngoctu.com/sitemap.xml` and static assets return publicly.
6. Set up domain ownership in Google Search Console and Bing Webmaster Tools. Submit sitemap; inspect coverage, indexing eligibility, page titles and enhancement diagnostics.
7. Check Google Rich Results Test and Schema Markup Validator for `/about.html` and key routes. Rich-result eligibility is not guaranteed.
8. Test social image previews in LinkedIn Post Inspector, Facebook Sharing Debugger and an actual WhatsApp/X share. Prefer a branded PNG/JPEG 1200×630 if SVG is not supported.
9. Verify Vercel contact endpoint has all email environment variables and successfully delivers to approved recipient (never infer from client UI alone).
10. Run Lighthouse/CrUX desktop and mobile; capture LCP, INP, CLS and accessibility issues. Real-user field data may not yet exist.
11. Review Google search generative AI reporting when present. Record dates, tested queries and actual citations; do not claim inclusion otherwise.
12. Set periodic maintenance to keep metadata, sitemap, contact claims and editorial content up to date.

Do not submit standard editorial web pages using Google's restricted Indexing API. IndexNow is optional for supported engines and should only be enabled when the actual deployment and key ownership are verified.
