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

let db;
try {
    db = mysql.createConnection(dbConfig);
    
    // Test connection (non-blocking)
    db.connect((err) => {
        if (err) {
            console.error('⚠️ Database connection failed:', err.message);
            console.error('⚠️ App will continue but database operations may fail');
            console.error('⚠️ Make sure DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME are set correctly');
        } else {
            console.log('✅ Connected to database successfully.');
        }
    });
    
    // Handle connection errors
    db.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('⚠️ Database connection lost. Reconnecting...');
        } else {
            console.error('⚠️ Database error:', err);
        }
    });
} catch (error) {
    console.error('⚠️ Failed to create database connection:', error.message);
    // Create a dummy connection object to prevent crashes
    db = {
        query: (sql, params, callback) => {
            if (callback) {
                callback(new Error('Database not connected'), null);
            }
        }
    };
}

module.exports = db;