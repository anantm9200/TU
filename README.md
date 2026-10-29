# Dam Ngoc Tu — Global Investor Relations

A premium static multi-page executive presence for **Dam Ngoc Tu**, Global Director for Investor Relations at Invade Agro Global, as described in the commissioning brief.

## Pages
- Home, Profile, Investor Relations, Perspectives, Contact, Privacy, 404.
- Immersive green/yellow gradient visuals, finance photography and animated curved paths.
- Responsive navigation, progressive reveal and interactive investor relations stages.
- Fully server-rendered HTML for crawlability. No runtime build step required.

## Deploy
Import this repository into Vercel as an **Other** framework / static project, root directory repository root. No install/build command needed. The `api/contact.js` Vercel function uses the email API provider Resend; configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` before testing live delivery. Never indicate a submitted message has been delivered without a success response.

## Domain and claims
The project is configured for `https://damngoctu.com` as the intended domain based on the commissioning context. Point DNS and add it to Vercel before launch. The exact executive title is supplied by the commissioner; detailed employment history, deals, investor names, achievements, endorsements and personal quotations have deliberately not been invented. Editorial perspectives are original, unauthored website copy.

## QA
Check all routes and nav/footer links; test keyboard and mobile navigation, interactive stage controls, form validation and failure behaviour, layout at 320/375/768/1440px, and social cards after DNS is connected. Test actual form email delivery only after Vercel environment variables are set. External photography relies on Unsplash availability.
