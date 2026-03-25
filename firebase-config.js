/* ===== Wave Makers - Firebase Configuration ===== */

// TODO: Replace with your actual Firebase project config
// Get this from: Firebase Console > Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmizwbvGB_3Id1nRxu0ts1fqG2MBVpzqY",
  authDomain: "wavemakers-a77b0.firebaseapp.com",
  projectId: "wavemakers-a77b0",
  storageBucket: "wavemakers-a77b0.firebasestorage.app",
  messagingSenderId: "713413840489",
  appId: "1:713413840489:web:c9973080750dd46c0b1cf8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = firebase.firestore();

// Export for use in other files
window.db = db;
window.firebase = firebase;

// Helpful warning if the Firebase config hasn't been replaced.
// Without real values (and matching Firestore rules), form submissions won't be stored.
if (firebaseConfig.apiKey === "YOUR_API_KEY" || firebaseConfig.projectId === "YOUR_PROJECT_ID") {
  console.warn(
    "[Wave Makers] Firebase config placeholders detected. Replace firebase-config.js with your real Firebase project settings to enable Firestore writes."
  );
}
