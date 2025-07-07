// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2seqrC_JuTGe7ccvd3FSk6aOebxUmqyU",
  authDomain: "dafna-caspi.firebaseapp.com",
  projectId: "dafna-caspi",
  storageBucket: "dafna-caspi.firebasestorage.app",
  messagingSenderId: "940099451051",
  appId: "1:940099451051:web:aff964a59b3e6b59fddfee",
  measurementId: "G-NCZTZYDJ24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);