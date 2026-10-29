/* Single source of truth for static SEO metadata. Domain is intended, NOT verified live. */
'use strict';
const BASE="https://damngoctu.com";
const SITE_NAME='Dam Ngoc Tu';
const EXECUTIVE_TITLE='Global Director, Investor Relations'; // Commissioning brief; reconcile with IAG public directory before launch.
const ORGANIZATION_URL='https://www.invadeagro.com';
const SOCIAL_IMAGE='/assets/og-image.svg'; // TODO: production-verified 1200x630 raster preview image.
const PAGES=[
  {
    "file": "index.html",
    "path": "/",
    "kind": "WebPage",
    "label": "Home",
    "title": "Dam Ngoc Tu | Global Investor Relations & Strategic Capital",
    "description": "Dam Ngoc Tu is Global Director for Investor Relations at Invade Agro Global. Explore investor engagement, cross-border capital dialogue and long-term value stewardship.",
    "image": "architecture"
  },
  {
    "file": "about.html",
    "path": "/about.html",
    "kind": "ProfilePage",
    "label": "Profile",
    "title": "About Dam Ngoc Tu | Global Investor Relations Director",
    "description": "Explore Dam Ngoc Tu's global investor relations mandate, approach to investor confidence and international stakeholder dialogue.",
    "image": "architecture"
  },
  {
    "file": "expertise.html",
    "path": "/expertise.html",
    "kind": "WebPage",
    "label": "Investor Relations",
    "title": "Investor Relations Expertise | Dam Ngoc Tu",
    "description": "Investor relations, investment readiness, stakeholder coordination, diligence and international investor communication.",
    "image": "market"
  },
  {
    "file": "insights.html",
    "path": "/insights.html",
    "kind": "CollectionPage",
    "label": "Perspectives",
    "title": "Investor Relations Perspectives | Dam Ngoc Tu",
    "description": "Original editorial perspectives on investor trust, international capital dialogue, investment readiness, disclosure and governance.",
    "image": "data"
  },
  {
    "file": "contact.html",
    "path": "/contact.html",
    "kind": "ContactPage",
    "label": "Contact",
    "title": "Contact Dam Ngoc Tu | Investor Relations Enquiries",
    "description": "Contact the office of Dam Ngoc Tu about investor relations, strategic partnerships and international stakeholder engagement.",
    "image": "architecture"
  },
  {
    "file": "privacy.html",
    "path": "/privacy.html",
    "kind": "WebPage",
    "label": "Privacy",
    "title": "Privacy Notice | Dam Ngoc Tu",
    "description": "Learn how the Dam Ngoc Tu investor relations website handles enquiries, third-party services, disclosure and privacy questions.",
    "image": "architecture"
  }
];
const HERO_IMAGES={
  "architecture": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=84",
  "market": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=84",
  "data": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=84"
};
function graphFor(page){
 const url=BASE+page.path,personId=BASE+'/#person',websiteId=BASE+'/#website',orgId=BASE+'/#invade-agro-global',pageId=url+'#webpage';
 const person={'@type':'Person','@id':personId,name:SITE_NAME,url:BASE+'/',jobTitle:EXECUTIVE_TITLE,worksFor:{'@id':orgId},knowsAbout:['Investor relations','International stakeholder engagement','Investment readiness','Cross-border communication','Investor reporting']};
 const organization={'@type':'Organization','@id':orgId,name:'Invade Agro Global',url:ORGANIZATION_URL};
 const website={'@type':'WebSite','@id':websiteId,name:SITE_NAME,url:BASE+'/',inLanguage:'en',publisher:{'@id':personId}};
 const primary={'@type':page.kind,'@id':pageId,name:page.title,url,inLanguage:'en',description:page.description,isPartOf:{'@id':websiteId},about:{'@id':personId}};
 if(page.kind==='ProfilePage')primary.mainEntity={'@id':personId};
 if(page.kind==='ContactPage')primary.mainEntity={'@id':personId};
 const graph=[website,organization,person,primary];
 if(page.path!=='/'){
  const bc=url+'#breadcrumb';
  primary.breadcrumb={'@id':bc};
  graph.push({'@type':'BreadcrumbList','@id':bc,itemListElement:[
   {'@type':'ListItem',position:1,name:'Home',item:BASE+'/'},
   {'@type':'ListItem',position:2,name:page.label,item:url}
  ]});
 }
 return {'@context':'https://schema.org','@graph':graph};
}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
function headFor(page){
 const url=BASE+page.path;
 const title=esc(page.title),description=esc(page.description);
 const og=BASE+SOCIAL_IMAGE;
 const graphic=HERO_IMAGES[page.image];
 return [
 '<meta charset="utf-8">',
 '<meta name="viewport" content="width=device-width,initial-scale=1">',
 '<meta name="theme-color" content="#082e23">',
 '<meta name="color-scheme" content="light">',
 '<title>'+title+'</title>',
 '<meta name="description" content="'+description+'">',
 '<meta name="robots" content="index,follow,max-image-preview:large">',
 '<link rel="canonical" href="'+url+'">',
 '<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">',
 '<meta property="og:type" content="website">',
 '<meta property="og:site_name" content="'+SITE_NAME+'">',
 '<meta property="og:locale" content="en_US">',
 '<meta property="og:title" content="'+title+'">',
 '<meta property="og:description" content="'+description+'">',
 '<meta property="og:url" content="'+url+'">',
 '<meta property="og:image" content="'+og+'">',
 '<meta property="og:image:secure_url" content="'+og+'">',
 '<meta property="og:image:type" content="image/svg+xml">',
 '<meta property="og:image:width" content="1200">',
 '<meta property="og:image:height" content="630">',
 '<meta property="og:image:alt" content="Dam Ngoc Tu — Global Investor Relations, Invade Agro Global">',
 '<meta name="twitter:card" content="summary_large_image">',
 '<meta name="twitter:title" content="'+title+'">',
 '<meta name="twitter:description" content="'+description+'">',
 '<meta name="twitter:image" content="'+og+'">',
 '<meta name="twitter:image:alt" content="Dam Ngoc Tu — Global Investor Relations">',
 '<link rel="preconnect" href="https://fonts.googleapis.com">',
 '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
 '<link rel="preconnect" href="https://images.unsplash.com">',
 '<link rel="preload" as="image" fetchpriority="high" href="'+esc(graphic)+'">',
 '<link rel="stylesheet" href="/assets/site.css">',
 '<script src="/assets/site.js" defer></script>',
 '<script type="application/ld+json">'+JSON.stringify(graphFor(page)).replace(/</g,'\\u003c')+'</script>'
 ].join('');
}
function sitemap(){return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+PAGES.map(p=>'  <url><loc>'+BASE+p.path+'</loc></url>').join('\n')+'\n</urlset>\n';}
module.exports={BASE,SITE_NAME,EXECUTIVE_TITLE,ORGANIZATION_URL,SOCIAL_IMAGE,PAGES,HERO_IMAGES,headFor,graphFor,sitemap};
