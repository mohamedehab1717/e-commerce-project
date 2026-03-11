require('dotenv').config();
const db = require('./config/db');

const products = [
    {
        name: "Wireless ANC Headphones",
        description: "Premium over-ear noise-cancelling headphones.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
        stock: 50
    },
    {
        name: "Smartwatch Pro",
        description: "Modern smartwatch with fitness tracking.",
        price: 199.50,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
        stock: 120
    },
    {
        name: "Mechanical Keyboard",
        description: "RGB gaming keyboard with tactile switches.",
        price: 149.00,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
        stock: 75
    },
    {
        name: "Pro Gaming Mouse",
        description: "Ergonomic wireless mouse with RGB.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
        stock: 200
    },
    {
        name: "Flagship Smartphone",
        description: "The latest smartphone with edge-to-edge display.",
        price: 999.00,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
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

async function seedProducts() {
    try {
        for (const p of products) {
            await db.query(
                `INSERT INTO products (name, description, price, image_url, stock) VALUES ($1, $2, $3, $4, $5)`,
                [p.name, p.description, p.price, p.image, p.stock]
            );
        }
        console.log(`✅ Successfully inserted ${products.length} products.`);
        process.exit(0);
    } catch (err) {
        console.error('⚠️ Error inserting products:', err);
        process.exit(1);
    }
}
seedProducts();