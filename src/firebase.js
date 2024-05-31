// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB--bUWbKrdL-K77NcTkZHaJ6LAg1VcJTE",
    authDomain: "info442chatbotforum.firebaseapp.com",
    projectId: "info442chatbotforum",
    storageBucket: "info442chatbotforum.appspot.com",
    messagingSenderId: "248236959084",
    appId: "1:248236959084:web:794a51da6620036ea87f49"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
