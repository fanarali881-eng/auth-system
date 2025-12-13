const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد EJS كـ template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// خدمة الملفات الثابتة من مجلد public (للصور، CSS، إلخ)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware لمعالجة البيانات
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes للصفحات

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.render('index', {
    title: 'نظام التوثيق الوطني',
    currentPage: 'index'
  });
});

// صفحة تسجيل الدخول
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'تسجيل الدخول - نظام التوثيق الوطني',
    currentPage: 'login'
  });
});

// معالجة تسجيل الدخول (POST) - يوجه إلى صفحة التنبيه
app.post('/login', (req, res) => {
  // هنا يمكن إضافة منطق التحقق من بيانات الدخول
  // بعد تسجيل الدخول الناجح، نوجه إلى صفحة التنبيه
  res.redirect('/update-notice');
});

// صفحة التنبيه (يجب تحديث بياناتك)
app.get('/update-notice', (req, res) => {
  res.render('update-notice', {
    title: 'تنبيه هام - نظام التوثيق الوطني',
    currentPage: 'update-notice'
  });
});

// الخطوة الأولى
app.get('/step1', (req, res) => {
  res.render('step1', {
    title: 'الخطوة الأولى - نظام التوثيق الوطني',
    currentPage: 'step1'
  });
});

// الخطوة الثانية
app.get('/step2', (req, res) => {
  res.render('step2', {
    title: 'الخطوة الثانية - نظام التوثيق الوطني',
    currentPage: 'step2'
  });
});

// الخطوة الثانية - نسخة قطر (step2Q)
app.get('/step2Q', (req, res) => {
  const userType = req.query.type || 'QID'; // افتراضي: قطري/مقيم
  res.render('step2Q', {
    title: 'الخطوة الثانية - نظام التوثيق الوطني',
    currentPage: 'step2Q',
    userType: userType
  });
});

// الخطوة الثالثة - إنشاء كلمة المرور
app.get('/step3', (req, res) => {
  res.render('step3', {
    title: 'إنشاء كلمة المرور - نظام التوثيق الوطني',
    currentPage: 'step3'
  });
});

app.post('/step3', (req, res) => {
  res.send('تم إنشاء كلمة المرور بنجاح!');
});

// معالجة جميع الطلبات الأخرى
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`\n📄 Available pages:`);
  console.log(`   - http://localhost:${PORT}/              (الصفحة الرئيسية)`);
  console.log(`   - http://localhost:${PORT}/login         (تسجيل الدخول)`);
  console.log(`   - http://localhost:${PORT}/update-notice (تنبيه التحديث)`);
  console.log(`   - http://localhost:${PORT}/step1         (الخطوة الأولى)`);
  console.log(`   - http://localhost:${PORT}/step2         (الخطوة الثانية)`);
  console.log(`   - http://localhost:${PORT}/step2Q        (الخطوة الثانية - قطر)`);
  console.log(`\n🎨 Using EJS templates (Dynamic Node.js)`);
  console.log(`\n🔗 Workflow Path:`);
  console.log(`   / → /login → /update-notice → /step1 → /step2`);
  console.log(`   / → تسجيل مستخدم جديد → /step1 → /step2`);
});
