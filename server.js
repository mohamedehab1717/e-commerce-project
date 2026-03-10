const express = require('express');
const cors = require('cors'); // لحل مشاكل CORS
const path = require('path'); // للتعامل مع المسارات
const app = express();

// Middleware
app.use(cors()); // يسمح لأي origin بالوصول للسيرفر
app.use(express.json()); // لقراءة JSON من body

// Routes
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');

app.use('/orders', ordersRoute);
app.use('/products', productsRoute);
app.use('/users', usersRoute);

// Serve frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// Test Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "login.html"));
});

// Start Server
const PORT = process.env.PORT || 7000; // Render سيضع PORT تلقائيًا
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});