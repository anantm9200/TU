#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path');
const {PAGES,headFor,sitemap}=require('./seo-config.cjs');
const ROOT=path.resolve(__dirname,'..');
const check=process.argv.includes('--check');
let pending=0;
function ensure(rel,expected){
 const dest=path.join(ROOT,rel),previous=fs.existsSync(dest)?fs.readFileSync(dest,'utf8'):'';
 if(previous!==expected){pending++;if(!check)fs.writeFileSync(dest,expected,'utf8');else console.error('Out of sync: '+rel);}
}
for(const p of PAGES){
 const dest=path.join(ROOT,p.file),html=fs.readFileSync(dest,'utf8');
 if(!/<head>[\s\S]*?<\/head>/.test(html))throw Error('Missing head: '+p.file);
 const next=html.replace(/<head>[\s\S]*?<\/head>/,'<head>'+headFor(p)+'</head>');
 ensure(p.file,next);
}
ensure('sitemap.xml',sitemap());
if(check&&pending){console.error(pending+' generated files differ');process.exitCode=1}else console.log(check?'Metadata output is current.':'Metadata refreshed for '+PAGES.length+' pages; '+pending+' file(s) updated.');
