
const CACHE = "tienda-v21";
self.addEventListener("install", (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", "./icono-192.png"])).catch(() => {})); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("tienda-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  if (u.pathname.indexOf("/fotos/") === 0) return;
  if (u.pathname.indexOf("/abel/") === 0) return;
  e.respondWith(fetch(e.request).then((r) => { if (r && r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)).catch(() => {}); } return r; })
    .catch(() => caches.match(e.request).then((m) => m || caches.match("./"))));
});
