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
    "title": "Dam Ngoc Tu | IAG Global Investor Relations & Finance",
    "description": "Explore Dam Ngoc Tu's financial intelligence and global investor-relations work with Invade Agro Global, connecting agricultural operations, capital and investors.",
    "image": "architecture"
  },
  {
    "file": "about.html",
    "path": "/about.html",
    "kind": "ProfilePage",
    "label": "Profile",
    "title": "Dam Ngoc Tu | Financial Intelligence & IAG Leadership",
    "description": "Discover Dam Ngoc Tu's investor-relations role at Invade Agro Global, his financial approach and the importance of informed capital dialogue across agriculture.",
    "image": "architecture"
  },
  {
    "file": "expertise.html",
    "path": "/expertise.html",
    "kind": "WebPage",
    "label": "Investor Relations",
    "title": "Investor Relations & Capital Strategy | Dam Ngoc Tu",
    "description": "Explore Dam Ngoc Tu's work with IAG across investor engagement, capital strategy, agricultural business economics, due diligence and stakeholder relations.",
    "image": "market"
  },
  {
    "file": "insights.html",
    "path": "/insights.html",
    "kind": "CollectionPage",
    "label": "Perspectives",
    "title": "Financial & Investor Relations Insights | Dam Ngoc Tu",
    "description": "Editorial perspectives on finance, working capital, investor confidence and agricultural growth in the context of Invade Agro Global's operations.",
    "image": "data"
  },
  {
    "file": "contact.html",
    "path": "/contact.html",
    "kind": "ContactPage",
    "label": "Contact",
    "title": "IAG Investor Relations Enquiries | Dam Ngoc Tu",
    "description": "Connect with Dam Ngoc Tu's investor-relations office regarding Invade Agro Global, institutional dialogue, cross-border coordination and strategic partnerships.",
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
,
{
  "file": "journal/working-capital-agriculture.html",
  "path": "/journal/working-capital-agriculture.html",
  "kind": "WebPage",
  "label": "Working Capital in Agriculture",
  "title": "Working Capital in Agriculture | Investor Relations Insights",
  "description": "Explore inventory, receivables, cash conversion and financing discipline in agricultural businesses, with investor-relations context for IAG.",
  "image": "market",
  "article": true,
  "articleTitle": "Why working capital tells the real story of agricultural growth",
  "category": "Capital Discipline"
},
{
  "file": "journal/investment-readiness-agri-business.html",
  "path": "/journal/investment-readiness-agri-business.html",
  "kind": "WebPage",
  "label": "Investment Readiness",
  "title": "Investor Readiness for Agribusiness | Dam Ngoc Tu Insights",
  "description": "A practical investor-readiness guide covering operating evidence, governance, diligence materials, risk and financial narratives in agribusiness.",
  "image": "architecture",
  "article": true,
  "articleTitle": "What makes an agricultural business genuinely investor-ready?",
  "category": "Investor Relations"
},
{
  "file": "journal/cross-border-investor-trust.html",
  "path": "/journal/cross-border-investor-trust.html",
  "kind": "WebPage",
  "label": "Cross-Border Investor Trust",
  "title": "Cross-Border Investor Trust & Disclosure | Investor Relations",
  "description": "Explore cross-border investor dialogue, disclosure, stakeholder alignment, regulatory context and governance in international agribusiness.",
  "image": "data",
  "article": true,
  "articleTitle": "Building investor trust when capital crosses borders",
  "category": "Global Engagement"
},
{
  "file": "journal/capital-allocation-agri-value-chain.html",
  "path": "/journal/capital-allocation-agri-value-chain.html",
  "kind": "WebPage",
  "label": "Capital Allocation",
  "title": "Capital Allocation in Agricultural Value Chains | Insights",
  "description": "Understand how capital needs, investment horizons, operating risk and governance differ across agriculture distribution, commodities and technology.",
  "image": "architecture",
  "article": true,
  "articleTitle": "Capital allocation across an integrated agricultural value chain",
  "category": "Capital Discipline"
},
{
  "file": "journal/risk-disclosure-investor-confidence.html",
  "path": "/journal/risk-disclosure-investor-confidence.html",
  "kind": "WebPage",
  "label": "Risk Disclosure",
  "title": "Risk Disclosure & Investor Confidence | Dam Ngoc Tu Insights",
  "description": "Understand how transparent risk disclosure supports serious investor relations in agriculture, from seasonality and currencies to governance and operating evidence.",
  "image": "data",
  "article": true,
  "articleTitle": "Why risk transparency strengthens investor confidence",
  "category": "Investor Relations"
},
{
  "file": "journal/agricultural-data-investor-diligence.html",
  "path": "/journal/agricultural-data-investor-diligence.html",
  "kind": "WebPage",
  "label": "Agricultural Intelligence",
  "title": "Agricultural Intelligence & Investor Diligence | Dam Ngoc Tu",
  "description": "A detailed perspective on agricultural intelligence, data governance, adoption economics, evidence and how investors can evaluate technology in agribusiness.",
  "image": "data",
  "article": true,
  "articleTitle": "What makes agricultural intelligence credible to investors?",
  "category": "Capital Discipline"
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
 if(page.article)primary.mainEntity={'@id':url+'#article'};
 const graph=[website,organization,person,primary];
 if(page.article)graph.push({'@type':'BlogPosting','@id':url+'#article',headline:page.articleTitle,description:page.description,articleSection:page.category,inLanguage:'en',mainEntityOfPage:{'@id':pageId},publisher:{'@id':websiteId},about:[{'@type':'Thing',name:'Investor relations'},{'@type':'Thing',name:'Agricultural finance'}]});
 if(page.path!=='/'){
  const bc=url+'#breadcrumb';
  primary.breadcrumb={'@id':bc};
  graph.push({'@type':'BreadcrumbList','@id':bc,itemListElement:[
   {'@type':'ListItem',position:1,name:'Home',item:BASE+'/'},
   ...(page.article?[{'@type':'ListItem',position:2,name:'Perspectives',item:BASE+'/insights.html'},{'@type':'ListItem',position:3,name:page.label,item:url}]:[{'@type':'ListItem',position:2,name:page.label,item:url}])
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
