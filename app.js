if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered with scope:', registration.scope);

        // Check for updates and handle them
        registration.onupdatefound = () => {
          const newWorker = registration.installing;

          newWorker.onstatechange = () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update available
                console.log('New update available. Reloading...');
                window.location.reload(); // Refresh the page to update
              }
            }
          };
        };

        // Optional: Force update check every 5 minutes
        setInterval(() => {
          registration.update();
        }, 1000 * 60 * .01);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}
