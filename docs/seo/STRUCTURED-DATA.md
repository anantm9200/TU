# Structured data map

- Every page: `WebSite`, `Organization`, `Person`, route-appropriate `WebPage` entity, all in one `@graph` with stable cross-page `@id` references.
- `/`: `WebPage`; the home page has multiple sections, not a personal author-profile-only page.
- `/about.html`: `ProfilePage` with `mainEntity` pointing to the named Person.
- `/expertise.html`: `WebPage`; content describes a mandate, not a purchasable financial product or a proven service offering.
- `/insights.html`: `CollectionPage`; the editorial pieces are on one URL and are not attributed to the executive as previously published authored articles.
- `/contact.html`: `ContactPage`.
- `/privacy.html`: `WebPage`.
- Non-home pages: `BreadcrumbList` representing Home > current page. The site already exposes Home and page names through its navigation.
- `404.html`: no JSON-LD, `noindex,follow`.

Identity detail: Person's title follows the commissioning brief; validate public IAG role wording before launch. Organization URL points to `https://www.invadeagro.com` and no other corporate data is inferred. The structured data was syntax-checked locally at source level; **Google Rich Results Test and Schema Validator require a public deployment and independent review**. Schema does not guarantee rich results or AI citations.
