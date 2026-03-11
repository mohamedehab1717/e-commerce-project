require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "YOUR_SECRET_KEY"; // نفس اللي استخدمناه في login

// Middleware للتحقق من التوكن
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if(!token) return res.status(401).json({error:"Access denied"});

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json({error:"Invalid token"});
        req.user = user; // تخزين بيانات المستخدم في req.user
        next();
    });
}

// Middleware للتحقق من Admin فقط
function isAdmin(req, res, next){
    if(req.user.role !== 'admin') return res.status(403).json({error:"Admin only"});
    next();
}

module.exports = { authenticateToken, isAdmin };