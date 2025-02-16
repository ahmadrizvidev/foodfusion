// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAaXkhgNCJFOz3S4FvVOBL-QSApjvp-lhk",
    authDomain: "foodking-9d9f6.firebaseapp.com",
    projectId: "foodking-9d9f6",
    storageBucket: "foodking-9d9f6.firebasestorage.app",
    messagingSenderId: "986420369140",
    appId: "1:986420369140:web:d8996f23ef6da18f69b0a1"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
