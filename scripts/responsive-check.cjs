#!/usr/bin/env node
'use strict';
const {chromium}=require('playwright');
const fs=require('fs');
const widths=[320,344,360,375,390,414,540,768,820,900,1024,1120,1280,1440,1920,2048,2560];
const pages=['/','/about.html','/expertise.html','/insights.html','/contact.html','/privacy.html'];
const site='http://127.0.0.1:4173',fails=[],checks=[];
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 fs.mkdirSync('qa-screenshots',{recursive:true});
 try{
  for(const width of widths){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',deviceScaleFactor:1});
   await context.route('**/*',route=>{
    const url=route.request().url();
    return url.startsWith(site)||url.startsWith('data:')?route.continue():route.abort();
   });
   for(const url of pages){
    const page=await context.newPage(),runtime=[];
    page.on('pageerror',err=>runtime.push(String(err.message)));
    try{
     const response=await page.goto(site+url,{waitUntil:'domcontentloaded',timeout:15000});
     if(response.status()!==200)fails.push(width+' '+url+' HTTP '+response.status());
     const layout=await page.evaluate(()=>{
      const faq=document.querySelector('.faq-layout');
      const title=faq?.querySelector('.section-intro')?.getBoundingClientRect();
      const list=faq?.querySelector('.faq-list')?.getBoundingClientRect();
      const main=document.querySelector('main');
      return {
       scroll:document.documentElement.scrollWidth,
       body:document.body.scrollWidth,
       main:main?.scrollWidth||0,
       faq:faq&&title&&list?{ty:Math.round(title.top),ly:Math.round(list.top),right:Math.round(title.right),left:Math.round(list.left)}:null
      };
     });
     if(Math.max(layout.scroll,layout.body,layout.main)>width+3)fails.push(width+' '+url+' overflow '+JSON.stringify(layout));
     if(layout.faq){
      if(width>900){
       if(Math.abs(layout.faq.ty-layout.faq.ly)>14)fails.push(width+' '+url+' detached FAQ vertical alignment '+JSON.stringify(layout.faq));
       if(layout.faq.left<layout.faq.right-4)fails.push(width+' '+url+' overlapping FAQ columns');
      }else if(layout.faq.ly<layout.faq.ty)fails.push(width+' '+url+' FAQ order wrong');
     }
     if([375,1024,1440,2048].includes(width)){
       if(layout.faq){
        const target=page.locator('.faq-layout details').first();
        await target.locator('summary').click();
        if(!await target.evaluate(x=>x.open))fails.push(width+' '+url+' FAQ did not open');
        await page.locator('.faq-layout').screenshot({path:'qa-screenshots/'+(url==='/'?'home':url.slice(1).replace('.html',''))+'-faq-'+width+'.png',animations:'disabled'});
       }
       if(width<=1120){
        const menu=page.locator('.menu-toggle');
        await menu.click();
        if(await menu.getAttribute('aria-expanded')!=='true')fails.push(width+' '+url+' mobile menu did not expand');
        if(!(await page.locator('.nav').isVisible()))fails.push(width+' '+url+' mobile navigation hidden');
        await page.keyboard.press('Escape');
        if(await menu.getAttribute('aria-expanded')!=='false')fails.push(width+' '+url+' Escape did not close mobile navigation');
       }
       if(url==='/expertise.html'){
        await page.locator('[data-iag-sector="trade"]').click();
        if(!(await page.locator('#tu-lens-output').innerText()).includes('Trading discipline'))fails.push(width+' expertise: IAG Capital Lens broken');
       }
       if(url==='/'){
        await page.locator('[data-ready]').first().check();
        if(!(await page.locator('#ready-count').innerText()).includes('1'))fails.push(width+' homepage: readiness interaction broken');
        await page.evaluate(()=>window.scrollTo(0,0));
        await page.screenshot({path:'qa-screenshots/home-top-'+width+'.png',animations:'disabled'});
       }
     }
     for(const err of runtime)fails.push(width+' '+url+' JS runtime '+err);
     checks.push(width+' '+url);
    }catch(e){fails.push(width+' '+url+' browser error '+String(e.message||e).slice(0,250))}
    finally{await page.close()}
   }
   await context.close();
  }
 }finally{await browser.close()}
 console.log('Checked '+checks.length+'/'+(pages.length*widths.length)+' route/viewport combinations at '+widths.join(',')+'px');
 if(fails.length){console.error('RESPONSIVE FAILURES:\n'+fails.join('\n'));process.exitCode=1}
 else console.log('PASS: no page overflow or FAQ misalignment; tested navigation, FAQ, readiness and capital lens interactions.');
})().catch(err=>{console.error(err);process.exitCode=1});
