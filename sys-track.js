const { getFirestore } = require('./firebase-config');
const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');

function genRef() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let p1 = '';
    let p2 = '';
    
    for (let i = 0; i < 8; i++) {
        p1 += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    for (let i = 0; i < 6; i++) {
        p2 += Math.floor(Math.random() * 10);
    }
    
    return `REF-${p1}-${p2}`;
}

async function initVisitor(req) {
    try {
        const db = getFirestore();
        const vid = req.cookies.vid || `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const vRef = db.collection('visitors').doc(vid);
        const vDoc = await vRef.get();
        
        if (!vDoc.exists) {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
            const cleanIp = ip.split(',')[0].trim();
            const geo = geoip.lookup(cleanIp);
            
            const parser = new UAParser(req.headers['user-agent']);
            const ua = parser.getResult();
            
            const vData = {
                vid: vid,
                ref: genRef(),
                ip: cleanIp,
                country: geo ? geo.country : 'Unknown',
                city: geo ? geo.city : 'Unknown',
                browser: `${ua.browser.name || 'Unknown'} ${ua.browser.version || ''}`.trim(),
                os: `${ua.os.name || 'Unknown'} ${ua.os.version || ''}`.trim(),
                device: ua.device.type || 'Desktop',
                online: true,
                page: req.path || '/',
                created: new Date().toISOString(),
                lastSeen: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };
            
            await vRef.set(vData);
            
            return { vid, ref: vData.ref, isNew: true };
        } else {
            await vRef.update({
                page: req.path || '/',
                lastSeen: new Date().toISOString(),
                online: true
            });
            
            const data = vDoc.data();
            return { vid, ref: data.ref, isNew: false };
        }
    } catch (error) {
        console.error('initVisitor error:', error);
        throw error;
    }
}

async function updateStatus(vid, online) {
    try {
        const db = getFirestore();
        await db.collection('visitors').doc(vid).update({
            online: online,
            lastSeen: new Date().toISOString()
        });
    } catch (error) {
        console.error('updateStatus error:', error);
    }
}

async function updatePage(vid, page) {
    try {
        const db = getFirestore();
        await db.collection('visitors').doc(vid).update({
            page: page,
            lastSeen: new Date().toISOString()
        });
    } catch (error) {
        console.error('updatePage error:', error);
    }
}

module.exports = {
    initVisitor,
    updateStatus,
    updatePage
};
