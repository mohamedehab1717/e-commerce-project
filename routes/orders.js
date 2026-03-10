const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

/* ===============================
   POST إنشاء طلب جديد
   أي مستخدم مسجل يقدر يعمل طلب
=============================== */
router.post('/', authenticateToken, (req, res) => {
    const { items, phone, street, district, city, postalCode } = req.body; // items = [{ product_id, quantity }]

    if (!items || items.length === 0) return res.status(400).json({ error: "No items to order" });

    // Basic backend validation
    if (!phone || !street || !district || !city) {
        return res.status(400).json({ error: "Please provide complete shipping and contact details." });
    }

    // حساب السعر الكلي
    let total_price = 0;
    items.forEach(item => {
        total_price += item.price * item.quantity;
    });

    // إنشاء الطلب
    db.query('INSERT INTO orders (user_id, total_price, phone_number, address_street, address_district, address_city, address_postal) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [req.user.id, total_price, phone, street, district, city, postalCode || null], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            const orderId = results.insertId;

            // إضافة العناصر
            items.forEach(item => {
                db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)',
                    [orderId, item.product_id, item.quantity, item.price]);
            });

            res.json({ message: "Order placed successfully", orderId });
        });
});

/* ===============================
   GET عرض جميع الطلبات للمستخدم الحالي
=============================== */
router.get('/', authenticateToken, (req, res) => {
    db.query('SELECT * FROM orders WHERE user_id=?', [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;