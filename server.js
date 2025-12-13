const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// خدمة الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// Routes للصفحات
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/step1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'step1.html'));
});

app.get('/step2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'step2.html'));
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
});
