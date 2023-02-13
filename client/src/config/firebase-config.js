// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTh04RfrdOI6CAfTsHCWBOuYt7_6Vb5OI",
  authDomain: "yazz-6fd00.firebaseapp.com",
  projectId: "yazz-6fd00",
  storageBucket: "yazz-6fd00.appspot.com",
  messagingSenderId: "312875491671",
  appId: "1:312875491671:web:4b7add8c2666af89a19e12",
  measurementId: "G-RC8KSPLGED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);


