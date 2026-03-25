/* ===== Wave Makers - Firebase Configuration ===== */

// TODO: Replace with your actual Firebase project config
// Get this from: Firebase Console > Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
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
