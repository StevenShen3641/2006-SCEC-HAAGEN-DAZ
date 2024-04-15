// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClNB1IDpVq2Je5AjYpKDN0m3yXEp7BrQA",
  authDomain: "sc2006-ae3ed.firebaseapp.com",
  projectId: "sc2006-ae3ed",
  storageBucket: "sc2006-ae3ed.appspot.com",
  messagingSenderId: "512923148167",
  appId: "1:512923148167:web:ab5de4c0aab1926a79bd22",
  measurementId: "G-YW4XHYT9N1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);