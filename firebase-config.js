require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCumuEb5pKVwDGJDxU7YvPJs55q-YDHPHU",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "twtheeq-8785a.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "twtheeq-8785a",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "twtheeq-8785a.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "1015417316604",
  appId: process.env.FIREBASE_APP_ID || "1:1015417316604:web:aa39dea41379dd1b372379",
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://twtheeq-8785a.firebaseio.com"
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
