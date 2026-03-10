const express = require('express');
const cors = require('cors'); // لازم عشان حل مشكلة CORS
const app = express();

// Middleware
app.use(cors()); // يسمح لأي origin بالوصول للسيرفر
app.use(express.json()); // عشان نقدر نقرا الـJSON من body

// Routes
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');

app.use('/orders', ordersRoute);
app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use(express.static("frontend"));
// Test Route
app.get("/", (req, res) => {
    res.send("Ecommerce Server Running");
});

// Start Server
const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});