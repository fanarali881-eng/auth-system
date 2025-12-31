# نشر المشروع على Render - دليل الإعداد

## متغيرات البيئة المطلوبة

عند نشر المشروع على Render، يجب إضافة المتغيرات التالية في إعدادات البيئة:

### 1. FIREBASE_PROJECT_ID
```
twtha-34741
```

### 2. FIREBASE_CLIENT_EMAIL
```
firebase-adminsdk-fbsvc@twtha-34741.iam.gserviceaccount.com
```

### 3. FIREBASE_PRIVATE_KEY
```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDbNQckLMswfQa0
HPL258M3L8GXVld98Yhd76cxJwx8hGD/D0jPBApZhaeTh7Nucji7U3NjdGCgVHWw
w6y5eWpN+exA5YVI3Gcz9hinfnbEOPQDicRT8hbzTPyngEoJhETRQK1Qx9Not4uj
rb3DmMLwXoOjDhmM4xp1hBLCnm+Ax3ZWHaSpAyI6NyVj6wPggPqPNrgkQBy1kZ2x
Tcnb15io4cl4vYbpjNq8+pHB3Szkz24/k/6JPrpCNhki+xp67DNncGVT/E9XA1N9
x8o5jOrNZIQ5uRsG4qZ7POcHOp7KsXMIeH2uEhAvBFi/ZxTYWrvH0fJi9XoQeii8
F1fweQMXAgMBAAECggEADCZVm+JaXvjA1QgrERb/caDxxfddYTDF+UfMGk6q4Ehe
9ieyRkqtQtgZnMpks5oAOhcedNKBmIwHplpHdIy6PW5n5PZFidL4Mdim9g/fecb+
WEPb4Bs/2YKfw65IM1wqxEyXMi4hMgw2xEXuUOXw5InDNoJqACAw9sxGVQebDMJY
6FAQELy/MCJd7pU6hX5L+Hol++rVdM91JThBG32KMakq5u/Y99ufdC7g2Mw30Gsr
lVU+sgVNhOGQ1cMT5pIMcLBRPreHzlFKReIADg1GkDyPp2hWkKOTQ9GYFdv7VQVv
c1kWcfQFXpqp48BflBoJX4zq5HGkPSmJHOcYUjy3IQKBgQD+kK4oEl3gl4ZRf492
bkd9Z90P42/IxH4JLt6xqD//6LYhJ4/1q/+bW48z66K7fsF2kOd3tlTkfM0mImbK
7NaZu/Wjqj4IByxsudrFzP9d5xx1UWTvYQ9Uzjr6aa7ZFtnctcST32wsRvXlE68M
HkxDgl9WCgThp04f4huLbpxjRQKBgQDccVQVgwr/Y39RTbk5LzL27blMvUuEXDrA
kGYxBu1tZNDoTUnDsM8K1bZv3sRYQ6vVYT+lqnHWzrbybFXcjCFadKyUcEYymkde
6ibL2gaZsqkqiUvjOTxRv/W3F5sJUe+kHMo2xZwiTdpL0JUwGOGzI9VrCyjNfjiX
WrR8IikkqwKBgQDH5sVcIlAl9dc8WHdIAQGSsOUffPJjLinq/CtUR1M6mnurPW4G
9bIbRaMGmpuHsNorSU766utvIbHXqFwgLiu3Pap/g0iC9V8lYi0x9vDxxHLMjcY9
VHK9ndUin6r2PsOGVhawKFrByld+NB7Z3VD2EoLbBbMfoEnxL5WBwLJ+IQKBgQCs
tLkstWMbXUd1WlBgReNG5E6FmdSdWWjKTxdRF91SFGc7aLn+7/n1wiPRl5T6leH9
JdiooVXY9lEMsuW+Cadj5/8BuMi2gnqiGQ7WLPV42yl/4tsqpT/lyF/o1zym26PF
Tqz6pm1Bzv7U4RDRAt1o7Q0adT69aENMCUtX6aeUSwKBgGjIxkstbmvM+KXNk3A0
q+ZJzaB3DdkoKu+mqxCihWjicCmwL3xfcxhhAlNv4wsGqYH41d9knVUd84Qhob+b
Q6TqpisZ+0f6KM9zhofpP6iblFTUjPeQQJ3A7aUy+U0BDza6oQcXjnnJDZ+Lf7t7
TiiKNZFiI+LoAMEO/ISCtTqy
-----END PRIVATE KEY-----
```

⚠️ **ملاحظة مهمة**: عند نسخ FIREBASE_PRIVATE_KEY، تأكد من نسخه كاملاً بما في ذلك السطور:
- `-----BEGIN PRIVATE KEY-----`
- `-----END PRIVATE KEY-----`

---

## خطوات النشر على Render

### 1. رفع الكود على GitHub
الكود موجود بالفعل على: `https://github.com/fanarali881-eng/auth-system`

### 2. إنشاء حساب على Render
- اذهب إلى: https://render.com
- سجل دخول باستخدام حساب GitHub

### 3. إنشاء Web Service جديد
1. اضغط على **"New +"** ثم اختر **"Web Service"**
2. اربط حساب GitHub الخاص بك
3. اختر ريبو: `fanarali881-eng/auth-system`
4. املأ البيانات التالية:
   - **Name**: `auth-system` (أو أي اسم تريده)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 4. إضافة متغيرات البيئة
في قسم **Environment Variables**، أضف المتغيرات الثلاثة المذكورة أعلاه:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### 5. النشر
اضغط على **"Create Web Service"** وانتظر حتى يكتمل النشر (عادة 2-3 دقائق).

---

## بعد النشر

ستحصل على رابط دائم مثل:
```
https://auth-system-xxxx.onrender.com
```

هذا الرابط سيكون نشطاً بشكل دائم ومجاني!

---

## استكشاف الأخطاء

إذا واجهت مشكلة في النشر:

1. **تحقق من Logs**: في لوحة تحكم Render، اذهب إلى قسم Logs
2. **تأكد من متغيرات البيئة**: تأكد من نسخ FIREBASE_PRIVATE_KEY بشكل صحيح
3. **أعد النشر**: اضغط على "Manual Deploy" في Render

---

## ملاحظات

- ✅ الخطة المجانية في Render كافية لهذا المشروع
- ✅ السيرفر قد يدخل في وضع السكون بعد 15 دقيقة من عدم النشاط (في الخطة المجانية)
- ✅ أول طلب بعد السكون قد يأخذ 30 ثانية للاستيقاظ
- ✅ يمكنك الترقية للخطة المدفوعة لتجنب وضع السكون

---

**تاريخ الإعداد**: 31 ديسمبر 2025
