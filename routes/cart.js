const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// إضافة منتج للكارت
router.post('/', authenticateToken, (req,res)=>{
    const { product_id, quantity } = req.body;
    if(!product_id || !quantity) return res.status(400).json({error:"Product ID & quantity required"});

    // هنخزن الكارت مؤقتًا في جدول orders بحالة pending
    // في مشروع حقيقي ممكن نعمل جدول cart منفصل
    res.json({message:"Cart functionality ready to implement full logic"});
});

module.exports = router;