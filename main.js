console.log("hello");

NotificationRequest().then(ServiceWorkerRegister());

function NotificationRequest(){
  if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
    });
  }else{
    console.log('Notifications not supported');
  }
}

function ServiceWorkerRegister(){
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
}

function ButtonFunction(){
  var image_display = document.getElementsByClassName('ImageDisplay')
  image_display[0].innerHTML = "<img src=\"image.jpg\" alt=\"failed\">"
}