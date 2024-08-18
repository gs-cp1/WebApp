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

 if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered with scope:', registration.scope);

        // Check if a new service worker is available
        registration.onupdatefound = () => {
          const newWorker = registration.installing;

          newWorker.onstatechange = () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update available
                console.log('New update available');

                // Option 1: Automatically reload the page
                if (confirm("A new version of this app is available. Reload to update?")) {
                  window.location.reload();
                }

                // Option 2: Notify the user (without automatically reloading)
                // You could display a custom notification or banner here
                // Example: displayUpdateBanner();
              } else {
                // No previous service worker, so this is the first install
                console.log('Content is now available offline!');
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}
