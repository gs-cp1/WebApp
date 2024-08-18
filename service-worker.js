

const CACHE_NAME = 'app-cache-v2'; // Update cache version

// service-worker.js
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate the new service worker immediately
  event.waitUntil(
    caches.open('app-cache-v2').then((cache) => {
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
          if (cacheName !== 'app-cache-v2') {
            return caches.delete(cacheName); // Clean up old caches
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of the page immediately
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Listen for messages to force update
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting(); // Activate new service worker immediately
  }
});
