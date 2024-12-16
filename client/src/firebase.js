// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-48ffb.firebaseapp.com",
    projectId: "mern-estate-48ffb",
    storageBucket: "mern-estate-48ffb.firebasestorage.app",
    messagingSenderId: "169496942407",
    appId: "1:169496942407:web:3445b2973ef8c436931e62"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);