/*if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/service-worker.js')
       .then(registration => {
         console.log('ServiceWorker registered with scope:', registration.scope);
       })
       .catch(error => {
         console.error('ServiceWorker registration failed:', error);
       });
   });
 }
 */

// app.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered with scope:', registration.scope);

        // Check for updates to the service worker
        registration.onupdatefound = () => {
          const newWorker = registration.installing;

          newWorker.onstatechange = () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update available, automatically reload the page
                window.location.reload();
              }
            }
          };
        };

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 1000 * 60 * 0.1); // Check every 5 minutes
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}
