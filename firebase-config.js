require('dotenv').config();
const admin = require('firebase-admin');

let db;

function initializeFirebase() {
    if (admin.apps.length === 0) {
        try {
            // Check if we have individual environment variables (Vercel/Render)
            if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
                console.log('[Firebase] Initializing with environment variables');
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
                console.log('[Firebase] Successfully initialized with env variables');
            }
            // Fallback to JSON service account key (old method)
            else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
                console.log('[Firebase] Initializing with FIREBASE_SERVICE_ACCOUNT_KEY');
                const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
                
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id}.firebaseio.com`
                });
                console.log('[Firebase] Successfully initialized with service account key');
            }
            // Try to load service account file (local development)
            else {
                try {
                    const fs = require('fs');
                    const path = require('path');
                    const serviceAccountPath = path.join(__dirname, 'service-account.json');
                    
                    if (fs.existsSync(serviceAccountPath)) {
                        console.log('[Firebase] Loading from service-account.json');
                        delete require.cache[require.resolve(serviceAccountPath)];
                        const serviceAccount = require(serviceAccountPath);
                        console.log('[Firebase] Service account loaded, project:', serviceAccount.project_id);
                        admin.initializeApp({
                            credential: admin.credential.cert(serviceAccount),
                            databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
                        });
                        console.log('[Firebase] Successfully initialized from file');
                    } else {
                        throw new Error('Firebase credentials not found in environment variables or service-account.json file');
                    }
                } catch (fileError) {
                    throw new Error('Firebase credentials not found. Please set environment variables: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL');
                }
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
