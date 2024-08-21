// Example JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
   const message = document.createElement('p');
   message.textContent = 'This message is added by regular JavaScript!';
   document.body.appendChild(message);
   
});

// Disable text selection
document.body.style.userSelect = 'none';

// Enable text selection (if needed)
// document.body.style.userSelect = 'auto';