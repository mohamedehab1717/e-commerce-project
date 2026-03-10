// db.js – ملف الاتصال بقاعدة البيانات

const mysql = require('mysql2');

// إنشاء الاتصال بقاعدة البيانات باستخدام متغيرات البيئة
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // السيرفر/Host من Render أو أي خدمة MySQL أونلاين
  user: process.env.DB_USER,     // اسم المستخدم
  password: process.env.DB_PASS, // كلمة المرور
  database: process.env.DB_NAME  // اسم قاعدة البيانات
});

// اختبار الاتصال
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('✅ Connected to database successfully.');
});

// تصدير الاتصال ليستخدم في ملفات المشروع الأخرى
module.exports = db;