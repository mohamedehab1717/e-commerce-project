require('dotenv').config();
const mysql = require('mysql2');

// Build connection config
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommerce_db'
};

// Add SSL if DB_SSL is set to 'true' (for external MySQL services like PlanetScale)
if (process.env.DB_SSL === 'true') {
    dbConfig.ssl = {
        rejectUnauthorized: false
    };
}

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;