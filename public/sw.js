const CACHE='forja-068';
const FILES=['./','./index.html','./design-v4.css?v=068','./identity.css?v=068','./iphone.css?v=068','./app-shell.css?v=068','./app-v4.js?v=068','./core.js?v=068','./media.js?v=068','./ui.js?v=068','./content.js?v=068','./content/aura-frases.json','./widget-core.js?v=068','./Forja.js?v=068','./widgets.html','./content/personagens-aura.json','./manifest.webmanifest','./assets/forja-icon-180.png','./assets/forja-icon-192.png','./assets/forja-icon-512.png','./assets/fonts/barlow-700.ttf','./assets/fonts/barlow-800.ttf','./assets/fonts/manrope-400.ttf','./assets/fonts/manrope-600.ttf','./assets/fonts/manrope-700.ttf','./assets/rock-lee.png','./assets/midoriya.png','./update.js?v=068','./widget-snapshot.js?v=068'];
// Optional public art downloads must not block installation of an update.
const OPTIONAL=['./assets/rock-lee-aura-05.png','./assets/rock-lee-aura-06.png','./assets/might-guy-01.png','./assets/naruto-01.png','./assets/minato-01.png','./assets/all-might-01.png','./assets/edward-elric-01.png','./assets/killua-01.png','./assets/midoriya-training.png','./assets/lee-training.png'];
const MEDIA='forja-public-media';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
 await Promise.all((await caches.keys()).filter(k=>k.startsWith('forja-')&&k!==CACHE&&k!==MEDIA).map(k=>caches.delete(k)));
 await self.clients.claim();
 // Recover old app shells on screens whose records are saved immediately.
 // Never interrupt diary, challenge editor, or an inspiration draft.
 const scope=new URL(self.registration.scope);
 for(const client of await self.clients.matchAll({type:'window'})){const url=new URL(client.url);if(url.origin!==scope.origin||![scope.pathname,scope.pathname+'index.html'].includes(url.pathname)||!['','#hoje','#conquistas','#configuracoes'].includes(url.hash)||url.searchParams.get('v')==='068')continue;url.searchParams.set('v','068');try{await client.navigate(url.href);}catch(_){}}
})()));
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(e.request.method!=='GET'||url.origin!==self.location.origin)return;
 if(url.pathname.endsWith('/version.json')){e.respondWith(fetch(e.request,{cache:'no-store'}));return;}
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.open(CACHE).then(c=>c.match('./index.html'))));return;}
 e.respondWith((async()=>{const shell=await caches.open(CACHE),cached=await shell.match(e.request);if(cached)return cached;
 if(/\/assets\/[^/]+\.(png|jpg|webp)$/.test(url.pathname)){const media=await caches.open(MEDIA),stored=await media.match(e.request);if(stored)return stored;const response=await fetch(e.request);if(response.ok){try{await media.put(e.request,response.clone());const keys=await media.keys();for(const key of keys.slice(0,Math.max(0,keys.length-12)))await media.delete(key);}catch(_){}}return response;}return fetch(e.request);})());
});
