const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

/* ===============================
   GET all products
   أي مستخدم يقدر يشوف كل المنتجات
=============================== */
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

/* ===============================
   GET single product by ID
   أي مستخدم يقدر يشوف المنتج
=============================== */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Product not found" });
        res.json(results[0]);
    });
});

/* ===============================
   POST add new product (Admin only)
=============================== */
router.post('/', authenticateToken, isAdmin, (req, res) => {
    const { name, description, price, image, stock } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).json({ error: "Name, price and stock are required" });
    }

    const sql = `
        INSERT INTO products (name, description, price, image, stock)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, description, price, image, stock], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        res.status(201).json({
            message: "Product added successfully",
            productId: results.insertId
        });
    });
});

/* ===============================
   PUT update product (Admin only)
=============================== */
router.put('/:id', authenticateToken, isAdmin, (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, stock } = req.body;

    const sql = `
        UPDATE products
        SET name=?, description=?, price=?, image=?, stock=?
        WHERE id=?
    `;

    db.query(sql, [name, description, price, image, stock, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product updated successfully" });
    });
});

/* ===============================
   DELETE product (Admin only)
=============================== */
router.delete('/:id', authenticateToken, isAdmin, (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    });
});

module.exports = router;