/*self.addEventListener('install', (event) => {
   event.waitUntil(
     caches.open('app-cache').then((cache) => {
       return cache.addAll([
         '/',
         '/index.html',
         '/style.css',
         '/app.js'
       ]);
     })
   );
 });
 
 self.addEventListener('fetch', (event) => {
   event.respondWith(
     caches.match(event.request).then((response) => {
       return response || fetch(event.request);
     })
   );
 });
 */

 const CACHE_NAME = 'app-cache-v2'; // Use your existing cache name

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Skip waiting to activate the new service worker immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Activate the service worker immediately
});

// Bypass cache and always fetch from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
