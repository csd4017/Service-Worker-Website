var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/main.js'
];
var cacheWhitelist = [];

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
 
 self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

 self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log("Hit from cache");
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
  });

self.addEventListener('push', function(event) {
  const title = 'You have a message';
  const body = 'A push message';
  const icon = 'notification.svg';
  const tag = 'simple-push-examble';
  event.waitUntil(
    self.registration.showNotification(title,
      {
        body: body,
        icon: icon,
        tag: tag
      }
    )
  )
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