// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaXkhgNCJFOz3S4FvVOBL-QSApjvp-lhk",
    authDomain: "foodking-9d9f6.firebaseapp.com",
    projectId: "foodking-9d9f6",
    storageBucket: "foodking-9d9f6.firebasestorage.app",
    messagingSenderId: "986420369140",
    appId: "1:986420369140:web:d8996f23ef6da18f69b0a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check authentication state and redirect user accordingly
onAuthStateChanged(auth, async (user) => {
    if (user) {
        if (user.email === 'ahmadrizvi.dev@gmail.com') {
            window.location.href = '/admin.html';
        } else {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const addressDocRef = doc(db, "addresses", user.uid);

                const userDoc = await getDoc(userDocRef);
                const addressDoc = await getDoc(addressDocRef);

                if (userDoc.exists()) {
                    if (addressDoc.exists() && addressDoc.data().address) {
                        window.location.href = '/user/profile.html'; // User has an address, go to profile
                    } else {
                        window.location.href = '/user/address.html'; // No address, go to address page
                    }
                } else {
                    console.log("User document not found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }
});

// Register Form Handling
document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Create User in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send OTP (Email Verification)
        await sendEmailVerification(user);

        // Store User in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName,
            email,
            uid: user.uid
        });

        // Redirect to OTP Page
        alert("Verification email sent. Please check your email.");
        window.location.href = "/user/otp.html";
        
    } catch (error) {
        alert(error.message);
    }
});
