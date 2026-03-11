const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server.');

    const products = [
        {
            name: "Wireless ANC Headphones",
            description: "Premium over-ear noise-cancelling headphones.",
            price: 299.99,
            image: "file:///C:/Users/moham/.gemini/antigravity/brain/c8c33a32-9c89-42b0-9e1e-1b5a429ec7ed/product_wireless_headphones_1773179102933.png",
            stock: 50
        },
        {
            name: "Smartwatch Pro",
            description: "Modern smartwatch with fitness tracking.",
            price: 199.50,
            image: "file:///C:/Users/moham/.gemini/antigravity/brain/c8c33a32-9c89-42b0-9e1e-1b5a429ec7ed/product_smartwatch_1773179146317.png",
            stock: 120
        },
        {
            name: "Mechanical Keyboard",
            description: "RGB gaming keyboard with tactile switches.",
            price: 149.00,
            image: "file:///C:/Users/moham/.gemini/antigravity/brain/c8c33a32-9c89-42b0-9e1e-1b5a429ec7ed/product_mechanical_keyboard_1773179170367.png",
            stock: 75
        },
        {
            name: "Pro Gaming Mouse",
            description: "Ergonomic wireless mouse with RGB.",
            price: 89.99,
            image: "file:///C:/Users/moham/.gemini/antigravity/brain/c8c33a32-9c89-42b0-9e1e-1b5a429ec7ed/product_gaming_mouse_1773179184234.png",
            stock: 200
        },
        {
            name: "Flagship Smartphone",
            description: "The latest smartphone with edge-to-edge display.",
            price: 999.00,
            image: "file:///C:/Users/moham/.gemini/antigravity/brain/c8c33a32-9c89-42b0-9e1e-1b5a429ec7ed/product_smartphone_1773179196183.png",
            stock: 45
        },
        {
            name: "4K Gaming Monitor",
            description: "27-inch 144Hz bezel-less monitor.",
            price: 450.00,
            image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
            stock: 30
        },
        {
            name: "VR Headset",
            description: "Next-gen virtual reality experience.",
            price: 399.00,
            image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop",
            stock: 15
        },
        {
            name: "True Wireless Earbuds",
            description: "Compact earbuds with great battery life.",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
            stock: 150
        },
        {
            name: "External SSD 1TB",
            description: "Ultra-fast portable NVMe solid state drive.",
            price: 110.00,
            image: "https://images.unsplash.com/photo-1597848212624-a19eb35e265c?q=80&w=800&auto=format&fit=crop",
            stock: 80
        },
        {
            name: "Streaming Microphone",
            description: "USB condenser mic for podcasts and streaming.",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=800&auto=format&fit=crop",
            stock: 60
        }
    ];

    const sql = `INSERT INTO products (name, description, price, image, stock) VALUES ?`;
    const values = products.map(p => [p.name, p.description, p.price, p.image, p.stock]);

    db.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log(`Successfully inserted ${result.affectedRows} products.`);
        db.end();
    });
});
