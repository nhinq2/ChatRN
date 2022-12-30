// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {initializeFirestore, CACHE_SIZE_UNLIMITED} from 'firebase/firestore';
import {Platform} from 'react-native';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBgAQbhrrUbfWqCqZox6-IY3isppBxU0H4',
  authDomain: 'chatrn-f60d0.firebaseapp.com',
  projectId: 'chatrn-f60d0',
  storageBucket: 'chatrn-f60d0.appspot.com',
  messagingSenderId: '866607858248',
  appId: '1:866607858248:web:661063a9a5f3f36b0c0e7d',
  measurementId: 'G-07ZSGS2ELT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalForceLongPolling: Platform.OS === 'android',
});
//let db = getFirestore(app)
const auth = getAuth(app);
export {db, auth};
