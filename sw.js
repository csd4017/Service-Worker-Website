var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/main.js'
];

self.addEventListener('install', function(event) {
   console.log("from install")
   // Perform install steps
   event.waitUntil(
     caches.open(CACHE_NAME)
       .then(function(cache) {
         console.log('Opened cache');
         return cache.addAll(urlsToCache);
       })
   );
 });
 
 self.addEventListener('fetch', function(event) {
     event.respondWith(
       caches.match(event.request)
         .then(function(response) {
           // Cache hit - return response
           if (response) {
             return response;
           }
           return fetch(event.request);
         }
       )
     );
   });

console.log("hello from service worker")

var time = 1;

var interval = setInterval(function() { 
   if (time <= 5) { 
      console.log("hello from service for " + time + " time");
      time++;
   }
   else { 
      clearInterval(interval);
   }
}, 5000);