// Choose a cache name
const cacheName = 'caleo-shell-content';
// List the files to precache
const precacheResources = ['/', './dashboard', './static/js/bundle.js',
    './static/js/vendors~main.chunk.js', './static/js/main.chunk.js',
    'https://kit.fontawesome.com/158fc6b93a.js', './favicon.ico', './manifest.json',
    'https://estacionamiento-web-back.herokuapp.com/api/cajon'
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
    console.log('Service worker install event!');
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});