// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH5i0Qs5GZPSc0JiAD1OCKm8p_RGe4q1k",
  authDomain: "nextjsfirestorealgolia2.firebaseapp.com",
  projectId: "nextjsfirestorealgolia2",
  storageBucket: "nextjsfirestorealgolia2.appspot.com",
  messagingSenderId: "486057053357",
  appId: "1:486057053357:web:75eb796f676a07400b8a24",
  measurementId: "G-349Z0N1J62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db=getFirestore(app)