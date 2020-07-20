console.log("hello")

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
}

var image_display = document.getElementsByClassName('ImageDisplay')

function ButtonFunction(){
  image_display[0].innerHTML = "<img src=\"image.jpg\" alt=\"failed\">"
}

