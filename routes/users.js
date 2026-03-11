const express = require('express');
const router = express.Router();
const db = require('../config/db'); // تأكد انك عامل ملف db.js للاتصال بالـMySQL
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key للـJWT
const JWT_SECRET = "YOUR_SECRET_KEY"; // ممكن تغيّرها لأي حاجة قوية

// ------------------ Register ------------------
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // تحقق لو الإيميل موجود مسبقاً
        const checkSql = "SELECT * FROM users WHERE email = ?";
        db.query(checkSql, [email], async (err, results) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: "Database error" });
            }
            if(results.length > 0) {
                return res.status(400).json({ error: "Email already exists" });
            }

            // تشفير الباسورد
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertSql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')";
            db.query(insertSql, [name, email, hashedPassword], (err, result) => {
                if(err) {
                    console.error(err);
                    return res.status(500).json({ error: "Database error" });
                }
                res.status(201).json({ message: "User registered successfully" });
            });
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// ------------------ Login ------------------
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        if(results.length === 0) return res.status(400).json({ error: "User not found" });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ error: "Incorrect password" });

        // عمل JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    });
});

module.exports = router;