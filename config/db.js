require('dotenv').config();
const { Pool } = require('pg');

let db;

try {

    db = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    db.connect()
        .then(() => {
            console.log('✅ Connected to PostgreSQL database.');
        })
        .catch((err) => {
            console.error('⚠️ Database connection failed:', err.message);
        });

} catch (error) {
    console.error('⚠️ Failed to create database connection:', error.message);

    db = {
        query: async () => {
            throw new Error('Database not connected');
        }
    };
}

module.exports = db;