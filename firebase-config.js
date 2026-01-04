require('dotenv').config();

// Simple Firebase configuration using Web API credentials
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAg2ZpcdDQMu0Yq4PVNmMnEoODB1E3hAt0",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "bcare2.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "bcare2",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "bcare2.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "470894470466",
  appId: process.env.FIREBASE_APP_ID || "1:470894470466:web:43f8d0435fc61b78d914db",
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://bcare2.firebaseio.com"
};

let initialized = false;

function initializeFirebase() {
    if (!initialized) {
        try {
            console.log('[Firebase] Initializing with config');
            console.log('[Firebase] Project ID:', firebaseConfig.projectId);
            initialized = true;
            console.log('[Firebase] Successfully initialized');
        } catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }
    }
    return firebaseConfig;
}

function getFirestore() {
    if (!initialized) {
        initializeFirebase();
    }
    return firebaseConfig;
}

// Export for use in server
const admin = {
    apps: [],
    firestore: () => firebaseConfig,
    database: () => firebaseConfig
};

module.exports = {
    initializeFirebase,
    getFirestore,
    admin,
    firebaseConfig
};
