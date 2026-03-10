const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // اسم المستخدم بتاع MySQL
    password: '',           // الباسورد بتاع MySQL (سيبها فاضي لو على XAMPP/WAMP)
    database: 'ecommerce_db' // اسم قاعدة البيانات
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;