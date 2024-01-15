// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyB2RV64JSaTN_aZLzhZ7hEYIummno7X_N0',
  authDomain: 'acquired-racer-394518.firebaseapp.com',
  projectId: 'acquired-racer-394518',
  storageBucket: 'acquired-racer-394518.appspot.com',
  messagingSenderId: '898098190059',
  appId: '1:898098190059:web:dc165363e4ffecc00750ae',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const messaging = getMessaging();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });
export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      'BPtFHRJr-p1xhNlThj1mQ54q86aBIveBXyw7K30MrONT9SP0Pd-VZnwplY7WrOrVO7XuSrZWLZiBu7luNQvVJQg',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
