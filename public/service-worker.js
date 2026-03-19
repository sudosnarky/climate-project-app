/*
  Safety service worker:
  - prevents 404 for /service-worker.js
  - unregisters itself so stale registrations are cleaned up
*/
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => self.clients.matchAll()).then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    })
  );
});
