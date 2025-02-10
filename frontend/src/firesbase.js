// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2ed43.firebaseapp.com",
  projectId: "mern-blog-2ed43",
  storageBucket: "mern-blog-2ed43.firebasestorage.app",
  messagingSenderId: "791873725385",
  appId: "1:791873725385:web:b60d7c8a53600d26b93e18",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);