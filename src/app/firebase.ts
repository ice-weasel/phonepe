// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4Tv2lkw7bW4GmX8Q4idViVvU6FlqG2OI",
  authDomain: "phonepe-trial.firebaseapp.com",
  projectId: "phonepe-trial",
  storageBucket: "phonepe-trial.appspot.com",
  messagingSenderId: "491225175602",
  appId: "1:491225175602:web:fdbdd9bad6c5a807fe0e2b",
  measurementId: "G-0CXRZVLTKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);