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

// Frontend path
const frontendPath = path.join(__dirname, 'frontend');

// Default route to login page (MUST come before express.static)
app.get("/", (req, res) => {
    try {
        res.sendFile(path.join(frontendPath, 'login.html'));
    } catch (err) {
        console.error('Error serving login page:', err);
        res.status(500).send('Error loading page');
    }
});

// Serve frontend static files (after the root route)
app.use(express.static(frontendPath));

// Catch-all for frontend routes (must be last, before error handler)
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
        console.error('Error serving page:', err);
        res.status(500).send('Error loading page');
    }
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start Server
const PORT = process.env.PORT || 7000;

try {
    app.listen(PORT, () => {
        console.log(`✅ Server started successfully on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
} catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
}