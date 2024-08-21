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


// Card dragging
const card = document.getElementById("card");

card.onpointerdown = function(event) {
    // Capture the pointer
    card.setPointerCapture(event.pointerId);

    let shiftX = event.clientX - card.getBoundingClientRect().left;
    let shiftY = event.clientY - card.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        card.style.left = pageX - shiftX + 'px';
        card.style.top = pageY - shiftY + 'px';
    }

    moveAt(event.pageX, event.pageY);

    function onPointerMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('pointermove', onPointerMove);

    card.onpointerup = function() {
        document.removeEventListener('pointermove', onPointerMove);
        card.releasePointerCapture(event.pointerId); // Release the pointer
        card.onpointerup = null;
    };
};

card.ondragstart = function() {
    return false;
};