// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpOpD607lxELT2nTvPD68E2isqlLTza0g",
  authDomain: "mobile8-4f638.firebaseapp.com",
  projectId: "mobile8-4f638",
  storageBucket: "mobile8-4f638.firebasestorage.app",
  messagingSenderId: "656851481738",
  appId: "1:656851481738:web:8b95ef2268c91ee048e973",
  measurementId: "G-X7HLZTRKRS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export{
  firestore
}