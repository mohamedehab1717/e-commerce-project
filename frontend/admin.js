const apiUrl = "http://localhost:7000/products";
let token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {

    if(!token) token = prompt("Enter your Admin JWT token:");

    async function fetchProducts() {
        const res = await fetch(apiUrl);
        const products = await res.json();
        const ul = document.getElementById('products');
        ul.innerHTML = '';

        products.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${p.name}</strong> - $${p.price} - Stock: ${p.stock}
                <button onclick="deleteProduct(${p.id})">Delete</button>
                <button onclick="editProduct(${p.id})">Edit</button>
            `;
            ul.appendChild(li);
        });
    }

    // إضافة منتج جديد
    document.getElementById('add-btn').addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        const image = document.getElementById('image').value;
        const stock = parseInt(document.getElementById('stock').value);

        if(!name || !price || !stock) return alert("Name, Price, Stock required!");

        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, description, price, image, stock })
        });

        const data = await res.json();
        if(data.error) alert(data.error);
        else {
            alert("Product added successfully!");
            fetchProducts();
        }
    });

    window.deleteProduct = async (id) => {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if(data.error) alert(data.error);
        else fetchProducts();
    }

    window.editProduct = async (id) => {
        const name = prompt("New name:");
        const description = prompt("New description:");
        const price = parseFloat(prompt("New price:"));
        const image = prompt("New image URL:");
        const stock = parseInt(prompt("New stock:"));

        const res = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, description, price, image, stock })
        });

        const data = await res.json();
        if(data.error) alert(data.error);
        else fetchProducts();
    }

    fetchProducts();
});