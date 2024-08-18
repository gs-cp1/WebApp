// app.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered with scope:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 1000 * 60 * 5); // Check every 5 minutes

        // Listen for updates
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          newWorker.onstatechange = () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update available, show the refresh button
                document.getElementById('refreshButton').style.display = 'block';
              }
            }
          };
        };

        // Handle refresh button click
        document.getElementById('refreshButton').addEventListener('click', () => {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
            window.location.reload();
          }
        });

      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}

