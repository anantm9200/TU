#!/usr/bin/env node
/* Local static QA server mirroring Vercel's cleanUrls:true, trailingSlash:false. */
'use strict';
const http=require('http'),fs=require('fs'),path=require('path');
const {PAGES}=require('./seo-config.cjs');
const ROOT=path.resolve(__dirname,'..');
const routes=new Map(PAGES.map(p=>[p.path,p.file]));
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.ico':'image/x-icon'};
const port=Number(process.env.PORT||4173);
const app=http.createServer((req,res)=>{
 let u;
 try{u=new URL(req.url,'http://localhost')}catch{res.writeHead(400);return res.end('Invalid URL')}
 let route;
 try{route=decodeURIComponent(u.pathname)}catch{res.writeHead(400);return res.end('Invalid path')}
 const move=dest=>{res.writeHead(308,{'Location':dest+u.search,'Cache-Control':'no-store'});res.end()};
 if(route==='/index.html'||route==='/index')return move('/');
 if(route.endsWith('.html')&&routes.has(route.slice(0,-5)))return move(route.slice(0,-5));
 if(route!=='/'&&route.endsWith('/')&&routes.has(route.slice(0,-1)))return move(route.slice(0,-1));
 let name=routes.get(route);
 if(!name){
  if(route.includes('..')||route.includes('\\')){res.writeHead(400);return res.end('Invalid path')}
  name='.'+route;
 }
 const absolute=path.resolve(ROOT,name);
 if(!absolute.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.stat(absolute,(err,stat)=>{
  if(err||!stat.isFile()){
   fs.readFile(path.join(ROOT,'404.html'),(error,content)=>{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(content||'Not found')});return;
  }
  res.writeHead(200,{'Content-Type':mime[path.extname(absolute)]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(absolute).pipe(res);
 });
});
app.listen(port,'127.0.0.1',()=>console.log('TU clean URL QA server on '+port));
