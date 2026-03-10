const apiUrl = "http://localhost:7000/products"; // Backend
let cart = [];

document.addEventListener('DOMContentLoaded', () => {

    async function fetchProducts() {
        const res = await fetch(apiUrl);
        const products = await res.json();
        const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';

        products.forEach(p => {
            const div = document.createElement('div');
            div.className = 'product-card';
            div.innerHTML = `
                ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">` : ''}
                <h3>${p.name}</h3>
                <p>${p.description || ''}</p>
                <p>Price: $${p.price}</p>
                <p>Stock: ${p.stock}</p>
                <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
            `;
            productsContainer.appendChild(div);
        });
    }

    // Add product to cart
    window.addToCart = (id, name, price) => {
        const existing = cart.find(item => item.product_id === id);
        if (existing) existing.quantity += 1;
        else cart.push({ product_id: id, name, price, quantity: 1 });
        renderCart();
    }

    function renderCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} x ${item.quantity} = $${item.price * item.quantity}`;
            cartItems.appendChild(li);
        });
        document.getElementById('cart-count').textContent = `Cart: ${cart.length}`;
    }

    // Checkout Modal Logic
    const checkoutBtn = document.getElementById('checkout-btn');
    const modal = document.getElementById('checkout-modal');
    const closeModal = document.getElementById('close-modal');
    const checkoutForm = document.getElementById('checkout-form');
    const phoneInput = document.getElementById('checkout-phone');
    const phoneError = document.getElementById('phone-error');

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return alert("Cart is empty!");
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first to checkout.");
            window.location.href = "login.html";
            return;
        }
        modal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal on click outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Handle Form Submission and Validation
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validation logic
        const phone = phoneInput.value.trim();
        const street = document.getElementById('checkout-street').value.trim();
        const district = document.getElementById('checkout-district').value.trim();
        const city = document.getElementById('checkout-city').value.trim();
        const postalCode = document.getElementById('checkout-postal').value.trim();

        // Phone regex: Allows optional +, numbers, spaces, and dashes
        const phoneRegex = /^\+?[0-9\s\-]{8,20}$/;

        if (!phoneRegex.test(phone)) {
            phoneError.textContent = "Please enter a valid phone number.";
            phoneInput.style.borderColor = "#ef4444";
            return;
        } else {
            phoneError.textContent = "";
            phoneInput.style.borderColor = "var(--border)";
        }

        const token = localStorage.getItem('token');
        if (!token) return alert("Session expired. Please login again.");

        // Submit Order
        const submitBtn = document.getElementById('submit-order-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Processing...";
        submitBtn.disabled = true;

        try {
            const res = await fetch("http://localhost:7000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: cart,
                    phone,
                    street,
                    district,
                    city,
                    postalCode
                })
            });

            const data = await res.json();
            if (data.error) {
                alert("Error: " + data.error);
            } else {
                alert("Order placed successfully! ID: " + data.orderId);
                cart = [];
                renderCart();
                checkoutForm.reset();
                modal.classList.add('hidden');
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Initialize
    fetchProducts();
});