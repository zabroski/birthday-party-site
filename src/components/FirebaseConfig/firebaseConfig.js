// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzTPUf-QQWZAHmiJAkNHmOd5L8JHQaqr0",
  authDomain: "bithday-party-site.firebaseapp.com",
  projectId: "bithday-party-site",
  storageBucket: "bithday-party-site.firebasestorage.app",
  messagingSenderId: "642928033871",
  appId: "1:642928033871:web:ac33461c26c1731a66aa3a",
  measurementId: "G-3SET0P1HBF",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
