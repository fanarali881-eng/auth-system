require('dotenv').config();
const admin = require('firebase-admin');

let db;

function initializeFirebase() {
    if (admin.apps.length === 0) {
        try {
            // Check if we have individual environment variables (Vercel/Render)
            if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
                const serviceAccount = {
                    type: "service_account",
                    project_id: process.env.FIREBASE_PROJECT_ID,
                    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                    client_email: process.env.FIREBASE_CLIENT_EMAIL
                };
                
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
                });
            }
            // Fallback to JSON service account key (old method)
            else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
                const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
                
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id}.firebaseio.com`
                });
            }
            else {
                throw new Error('Firebase credentials not found in environment variables');
            }
            
            db = admin.firestore();
            
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
