require('dotenv').config();
const mysql = require('mysql2');

// Build connection config
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'ecommerce_db'
};

// Add SSL if DB_SSL is set to 'true' (for external MySQL services like PlanetScale)
if (process.env.DB_SSL === 'true') {
    dbConfig.ssl = {
        rejectUnauthorized: false
    };
}

const db = mysql.createConnection(dbConfig);

// Test connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        // Don't exit - let the app continue (might be starting before DB is ready)
        return;
    }
    console.log('✅ Connected to database successfully.');
});

module.exports = db;