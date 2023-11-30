// firebase.js
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const { firebaseConfig } = require("../../config/firebaseConfig");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Conditionally load Analytics in a browser environment
if (typeof window !== "undefined") {
  const { getAnalytics } = require("firebase/analytics");
  const analytics = getAnalytics(app);
}

// Export Firestore for use in Node.js backend
const db = getFirestore(app);
module.exports = { db };
