// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAU4hXLXOSRh2ZXK4OUYYfvY7qH2MCBAcA',
  authDomain: 'clixpesa-48d7e.firebaseapp.com',
  projectId: 'clixpesa-48d7e',
  storageBucket: 'clixpesa-48d7e.appspot.com',
  messagingSenderId: '122542045439',
  appId: '1:122542045439:web:f56ca3373494111d7cb4ca',
  measurementId: 'G-V46LT1K4XV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);
