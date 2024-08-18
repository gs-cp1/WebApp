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

 self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate the new service worker immediately
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

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'app-cache') {
            return caches.delete(cacheName); // Clean up old caches
          }
        })
      );
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
