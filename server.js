require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');

app.use('/orders', ordersRoute);
app.use('/products', productsRoute);
app.use('/users', usersRoute);

// Serve frontend static files
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

// Default route to login page
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, 'login.html'));
});

// Catch-all for frontend routes (exclude API routes and static files)
app.get("*", (req, res) => {
    // Skip API routes - they should have been handled above
    if (req.path.startsWith('/users') || 
        req.path.startsWith('/products') || 
        req.path.startsWith('/orders')) {
        return res.status(404).json({ error: 'Route not found' });
    }
    // Serve frontend HTML files
    try {
        res.sendFile(path.join(frontendPath, 'login.html'));
    } catch (err) {
        res.status(500).send('Error loading page');
    }
});

// Start Server
const PORT = process.env.PORT || 7000; // Render سيضع PORT تلقائيًا
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});