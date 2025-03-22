// Minimal service worker that doesn't perform any caching
// but still enables PWA installation

// Install event - just activate immediately
self.addEventListener('install', event => {
  // Activate immediately
  self.skipWaiting();
  console.log('Service worker installed');
});

// Activate event - take control immediately
self.addEventListener('activate', event => {
  // Take control of clients immediately
  self.clients.claim();
  console.log('Service worker activated');
});

// Fetch event - pass through to network, no caching
self.addEventListener('fetch', event => {
  // We don't do any caching, just let the browser handle the request normally
  // This is the minimum required to make the PWA installable
  console.log('Fetch intercepted for:', event.request.url);
});
