#!/usr/bin/env node
/* Static-site SEO quality gate. Run: node scripts/seo-audit.cjs */
'use strict';
const fs=require('fs'),path=require('path');
const {BASE,PAGES,graphFor,headFor,ORGANIZATION_URL}=require('./seo-config.cjs');
const root=path.resolve(__dirname,'..'),fail=[],warn=[],get=(r,f)=>fs.readFileSync(path.join(root,f),'utf8');
const idx=new Set(PAGES.map(x=>x.path));
const tags=(s,name)=>[...s.matchAll(new RegExp('<'+name+'\\b[^>]*>','gi'))].map(m=>m[0]);
const attr=(s,name)=>s.match(new RegExp('\\b'+name+'="([^"]*)"'))?.[1]||'';
const meta=(s,key,value)=>tags(s,'meta').filter(t=>attr(t,key)===value);
const one=(list,label,file)=>{if(list.length!==1)fail.push(file+': expected one '+label+'; found '+list.length);return list[0]||''};
const titleSet=new Set,descSet=new Set;let inspected=0;
const sitemap=get(0,'sitemap.xml'),robots=get(0,'robots.txt');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
for(const p of PAGES){
 inspected++;
 const file=p.file,html=get(0,file),head=html.match(/<head>([\s\S]*?)<\/head>/)?.[1]||'';
 const title=one([...html.matchAll(/<title>([^<]*)<\/title>/g)],'title',file)?.[1]||'';
 const description=attr(one(meta(head,'name','description'),'meta description',file),'content');
 const canonical=attr(one(tags(head,'link').filter(x=>attr(x,'rel')==='canonical'),'canonical',file),'href');
 const robotsTag=attr(one(meta(head,'name','robots'),'robots',file),'content');
 const ogTitle=attr(one(meta(head,'property','og:title'),'Open Graph title',file),'content');
 const ogDesc=attr(one(meta(head,'property','og:description'),'Open Graph description',file),'content');
 const ogUrl=attr(one(meta(head,'property','og:url'),'Open Graph URL',file),'content');
 const ogImage=attr(one(meta(head,'property','og:image'),'Open Graph image',file),'content');
 const ogAlt=attr(one(meta(head,'property','og:image:alt'),'Open Graph alt',file),'content');
 const tweet=attr(one(meta(head,'name','twitter:title'),'Twitter title',file),'content');
 const tweetDesc=attr(one(meta(head,'name','twitter:description'),'Twitter description',file),'content');
 const language=attr(one(tags(html,'html'),'html language element',file),'lang');
 if(language!=='en')fail.push(file+': expected lang=en');
 if(!title||titleSet.has(title))fail.push(file+': missing/duplicate title');
 if(!description||descSet.has(description))fail.push(file+': missing/duplicate description');
 titleSet.add(title);descSet.add(description);
 if(canonical!==BASE+p.path||ogUrl!==canonical)fail.push(file+': inconsistent canonical or og:url');
 if(!robotsTag.includes('index')||robotsTag.includes('noindex'))fail.push(file+': incorrect indexing directive');
 if(ogTitle!==title||ogDesc!==description||tweet!==title||tweetDesc!==description)fail.push(file+': social text mismatch');
 if(!ogAlt||!ogImage.startsWith(BASE+'/'))fail.push(file+': social image metadata missing/incorrect');
 if(!fs.existsSync(path.join(root,new URL(ogImage).pathname)))fail.push(file+': social preview file missing');
 if((html.match(/<h1\b/g)||[]).length!==1)fail.push(file+': expected one h1');
 if((html.match(/<main\b/g)||[]).length!==1)fail.push(file+': missing main landmark');
 if(!urls.includes(canonical))fail.push(file+': missing from XML sitemap');
 if(head!==headFor(p))fail.push(file+': metadata differs from generator');
 const scripts=[...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
 if(scripts.length!==1)fail.push(file+': expected exactly one JSON-LD graph');
 else{
  try{
   const g=JSON.parse(scripts[0][1]);const nodes=g['@graph']||[];
   const webpage=nodes.find(x=>x['@id']===canonical+'#webpage');
   const person=nodes.find(x=>x['@type']==='Person');
   const org=nodes.find(x=>x['@type']==='Organization');
   const site=nodes.find(x=>x['@type']==='WebSite');
   if(!person||!org||!site||!webpage)fail.push(file+': incomplete identity graph');
   else{
    if(org.url!==ORGANIZATION_URL||person.worksFor?.['@id']!==org['@id'])fail.push(file+': organization relationship mismatch');
    if(webpage['@type']!==p.kind||webpage.about?.['@id']!==person['@id'])fail.push(file+': page schema mismatch');
    if(p.kind==='ProfilePage'&&webpage.mainEntity?.['@id']!==person['@id'])fail.push(file+': missing ProfilePage mainEntity');
    if(p.path!=='/'&&!nodes.some(x=>x['@type']==='BreadcrumbList'&&x.itemListElement?.length===2))fail.push(file+': missing BreadcrumbList');
   }
  }catch(e){fail.push(file+': invalid JSON-LD '+e.message)}
 }
 const ids=new Set;
 for(const m of html.matchAll(/\bid="([^"]+)"/g)){if(ids.has(m[1]))fail.push(file+': duplicate ID '+m[1]);ids.add(m[1])}
 for(const m of html.matchAll(/\b(?:href|src)="(\/[\w.\-\/#?=&]*)"/g)){
  const link=m[1],target=link.split('#')[0].split('?')[0],local=(target==='/'?'index.html':target.replace(/^\//,''));
  if(!fs.existsSync(path.join(root,local)))fail.push(file+': broken internal file '+link);
  if(link.includes('#') && (target===''||target===p.path) && !ids.has(link.split('#')[1]))fail.push(file+': missing anchor '+link);
 }
}
for(const u of urls)if(!idx.has(u.replace(BASE,'')))fail.push('Sitemap has noncanonical/unlisted URL: '+u);
if(urls.length!==PAGES.length)fail.push('Sitemap URL count mismatch');
if(!robots.includes('Sitemap: '+BASE+'/sitemap.xml'))fail.push('Sitemap missing from robots.txt');
if(!/name="robots" content="noindex/.test(get(0,'404.html')))fail.push('404 page must include explicit noindex');
const js=get(0,'assets/site.js');if(!js.includes('DOMContentLoaded'))warn.push('Interaction entrypoint not detected');
const img=get(0,'assets/og-image.svg');if(!img.includes('1200')||!img.includes('630'))warn.push('Social SVG dimensions need verification');
if(!fs.existsSync(path.join(root,'assets/og-image.png')))warn.push('Social preview is SVG: some social crawlers require PNG/JPEG. Generate a raster asset before launch.');
warn.push('Live domain status, third-party imagery, Google Search Console, field CWV and social crawler output require deployment access.');
console.log('TU SEO audit: '+inspected+' indexable pages; '+fail.length+' error(s), '+warn.length+' note(s).');
warn.forEach(x=>console.warn('NOTE '+x));fail.forEach(x=>console.error('FAIL '+x));
if(fail.length)process.exitCode=1;
