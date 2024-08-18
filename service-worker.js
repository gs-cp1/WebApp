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

 const CACHE_NAME = 'app-cache-v2'; // Update the cache name to force a new cache

self.addEventListener('install', (event) => {
  // Skip the waiting phase and activate the new service worker immediately
  self.skipWaiting();
  
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
  // Delete old caches that don't match the current version
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

  // Claim any clients immediately, so the updated service worker takes control
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
