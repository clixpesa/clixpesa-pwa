// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
//import { getAnalytics } from 'firebase/analytics';
//get values from .env file
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_KEY, //process.env.FB_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_DOMAIN, //process.env.FB_DOMAIN,
  projectId: 'clixpesa-48d7e',
  storageBucket: 'clixpesa-48d7e.appspot.com',
  messagingSenderId: '122542045439',
  appId: '1:122542045439:web:f56ca3373494111d7cb4ca',
  measurementId: 'G-V46LT1K4XV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const functions = getFunctions(app);
export const firestore = getFirestore(app);
//connectFunctionsEmulator(functions, '127.0.0.1', 5001);
//const analytics = getAnalytics(app);
