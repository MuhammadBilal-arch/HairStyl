// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: 'AIzaSyB2RV64JSaTN_aZLzhZ7hEYIummno7X_N0',
    authDomain: 'acquired-racer-394518.firebaseapp.com',
    projectId: 'acquired-racer-394518',
    storageBucket: 'acquired-racer-394518.appspot.com',
    messagingSenderId: '898098190059',
    appId: '1:898098190059:web:dc165363e4ffecc00750ae',
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});