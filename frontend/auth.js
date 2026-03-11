const apiUrl = "/users";

document.addEventListener("DOMContentLoaded", () => {

    const regBtn = document.getElementById("reg-btn");
    const loginBtn = document.getElementById("login-btn");

    // ------------------ Register ------------------
    regBtn.addEventListener("click", async () => {
        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value;

        if(!name || !email || !password) return alert("All fields are required!");

        try {
            const res = await fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();
            if(data.error) alert(data.error);
            else alert("Registration successful! You can now login.");

        } catch (err) {
            console.error("Register Error:", err);
            alert("Server error: " + err.message);
        }
    });

    // ------------------ Login ------------------
    loginBtn.addEventListener("click", async () => {
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        if(!email || !password) return alert("Email and password are required!");

        try {
            const res = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if(data.error) {
                alert(data.error);
                console.log("Login error response:", data);
            } else {
                localStorage.setItem("token", data.token);

                // Decode JWT to check role
                const payload = JSON.parse(atob(data.token.split(".")[1]));
                console.log("Login payload:", payload);

                if(payload.role === "admin") window.location.href = "admin.html";
                else window.location.href = "index.html";
            }

        } catch (err) {
            console.error("Login Error:", err);
            alert("Server error: " + err.message);
        }
    });

});