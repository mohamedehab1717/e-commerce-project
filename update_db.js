require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommerce_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server.');

    // Add new columns to orders table
    const sql = `
        ALTER TABLE orders
        ADD COLUMN phone_number VARCHAR(20) DEFAULT NULL,
        ADD COLUMN address_street VARCHAR(255) DEFAULT NULL,
        ADD COLUMN address_district VARCHAR(100) DEFAULT NULL,
        ADD COLUMN address_city VARCHAR(100) DEFAULT NULL,
        ADD COLUMN address_postal VARCHAR(20) DEFAULT NULL;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_FIELDNAME') {
                console.log('Columns already exist.');
            } else {
                throw err;
            }
        } else {
            console.log('Successfully updated orders table schema.');
        }
        db.end();
    });
});
