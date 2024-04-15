// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ28GTveRWcDVzsroaO6LDYGpxYH0vuN8",
  authDomain: "sc2006-ade6a.firebaseapp.com",
  projectId: "sc2006-ade6a",
  storageBucket: "sc2006-ade6a.appspot.com",
  messagingSenderId: "223380858747",
  appId: "1:223380858747:web:105d7ce231d661be567fde",
  measurementId: "G-K8XETM0C0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);