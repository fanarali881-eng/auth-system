require('dotenv').config();
const admin = require('firebase-admin');

let db;

function initializeFirebase() {
    if (admin.apps.length === 0) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
            });
            
            db = admin.firestore();
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }
    } else {
        db = admin.firestore();
    }
    
    return db;
}

function getFirestore() {
    if (!db) {
        return initializeFirebase();
    }
    return db;
}

module.exports = {
    initializeFirebase,
    getFirestore,
    admin
};
