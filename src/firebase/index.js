// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyB6cuqboAH44Xf8cOV7Kt536fd8tbPgdTs",
  authDomain: "hair-style-69f4c.firebaseapp.com",
  projectId: "hair-style-69f4c",
  storageBucket: "hair-style-69f4c.appspot.com",
  messagingSenderId: "645636374980",
  appId: "1:645636374980:web:afadf6e5f0e42388802491",
  measurementId: "G-YJCY03RQV1"
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
