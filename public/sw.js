// Haikyu!! Manga Service Worker
// Pages (HTML): network-first, so a new deploy is picked up right away and the
// page never points at hashed JS/CSS bundles that no longer exist.
// Static assets (hashed bundles, images): cache-first.
const CACHE_NAME = 'haikyuu-cache-v2';
const PRECACHE_URLS = [
  '/manifest.webmanifest',
  '/favicon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

const isStaticAsset = (url) =>
  url.pathname.startsWith('/assets/') || /\.(png|jpe?g|webp|avif|svg|ico|css|js|woff2?)$/.test(url.pathname);

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // HTML pages: network-first, fall back to a cached copy only when offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return res;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match('/')))
    );
    return;
  }

  if (!isStaticAsset(url)) return; // JSON data etc. go straight to the network

  // Static assets: cache-first, then network (and store it).
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached ||
      fetch(event.request).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return res;
      })
    )
  );
});
