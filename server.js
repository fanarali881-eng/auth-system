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
app.get('/', (req, res) => {
  res.render('index', {
    title: 'نظام التوثيق الوطني',
    currentPage: 'index'
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'تسجيل الدخول - نظام التوثيق الوطني',
    currentPage: 'login'
  });
});

app.get('/step1', (req, res) => {
  res.render('step1', {
    title: 'الخطوة الأولى - نظام التوثيق الوطني',
    currentPage: 'step1'
  });
});

app.get('/step2', (req, res) => {
  res.render('step2', {
    title: 'الخطوة الثانية - نظام التوثيق الوطني',
    currentPage: 'step2'
  });
});

// معالجة جميع الطلبات الأخرى
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📄 Available pages:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/login`);
  console.log(`   - http://localhost:${PORT}/step1`);
  console.log(`   - http://localhost:${PORT}/step2`);
  console.log(`\n🎨 Using EJS templates (Dynamic Node.js)`);
});
