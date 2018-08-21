// Cache name and version
const CACHE_NAME = 'v1_diego_hurtado_pwa';

// Cache files
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];

// Install and save cache
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(error => {
                console.log('No se ha registrado la cache', error)
            })
    );
});

// Activate to app without conexion
self.addEventListener('activate', e => {
    const CACHE_WHITE_LIST = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (CACHE_WHITE_LIST.indexOf(cacheName) === -1) {
                            // Delete elements isn't necessary
                            return caches.delete(cacheName);
                        }
                    }
                ));
            })
            .then(() => {
                // Activate cache
                self.clients.claim();
            })
    );
});

// Fetch
self.addEventListener('fetch', e => {
   e.respondWith(
       caches.match(e.request)
           .then(response => {
               if (response) {
                   // Data from cache
                   return response;
               }

               return fetch(e.request);
           })
   );
});