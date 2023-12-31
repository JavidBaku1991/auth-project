// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-81c57.firebaseapp.com",
  projectId: "mern-81c57",
  storageBucket: "mern-81c57.appspot.com",
  messagingSenderId: "526444236678",
  appId: "1:526444236678:web:fb8db8d68414ea6801e607"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);