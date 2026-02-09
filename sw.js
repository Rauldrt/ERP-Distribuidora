const CACHE_NAME = 'lacteos-v2-flat'; // Cambié nombre para forzar actualización
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png', 
  './icon-512.png'
];

// Instalación: Cacheamos lo esencial
self.addEventListener('install', event => {
  self.skipWaiting(); // Fuerza al SW a activarse de inmediato
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Intentando cachear archivos...');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('❌ FALLÓ LA INSTALACIÓN DEL SW:', err);
        // Si falla, es probable que un archivo de la lista no exista (ej: nombre mal escrito)
      })
  );
});

// Activación: Tomamos control inmediato
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Intercepción de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
