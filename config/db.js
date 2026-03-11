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

// Only create connection if we have database config
if (dbConfig.host && dbConfig.user && dbConfig.database) {
    try {
        db = mysql.createConnection(dbConfig);
        
        // Test connection (non-blocking - don't wait for it)
        db.connect((err) => {
            if (err) {
                console.error('⚠️ Database connection failed:', err.message);
                console.error('⚠️ App will continue but database operations may fail');
            } else {
                console.log('✅ Connected to database successfully.');
            }
        });
        
        // Handle connection errors
        db.on('error', (err) => {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('⚠️ Database connection lost.');
            } else {
                console.error('⚠️ Database error:', err.message);
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
} else {
    console.warn('⚠️ Database configuration incomplete. Database operations will fail.');
    console.warn('⚠️ Set DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME environment variables.');
    // Create a dummy connection object
    db = {
        query: (sql, params, callback) => {
            if (callback) {
                callback(new Error('Database not configured'), null);
            }
        }
    };
}

module.exports = db;