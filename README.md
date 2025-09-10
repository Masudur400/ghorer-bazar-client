# 🛒 Ghorer Bazar - Online Grocery Store

**Ghorer Bazar** is a full-stack **E-Commerce Web Application** where users can browse grocery items, add them to cart, place orders, and track purchases. Admins can manage products, users, and orders through a secure dashboard.

---

## 🚀 Features

### 👤 User Features
- Register and login securely.
- Browse grocery products by category.
- Search and filter products easily.
- Add to cart & checkout functionality.
- Place orders and track order status.
- View order history.

### 🔒 Admin Features
- Manage (add, edit, delete) products.
- Manage categories and inventory.
- Manage user accounts & roles.
- Process and update order status.
- View sales reports and analytics.

---

## 🛠️ Tech Stack
 - JavaScript
 - React
- Node.js
- Express.js
- MongoDB
- Firebase

---

* live link : https://ghorer-bazar.web.app/
* client site github : https://github.com/Masudur400/ghorer-bazar-client
* server site github : https://github.com/Masudur400/ghorer-bazar-server

 ---

 
 # Run Locally
 * npm i 
 * npm run dev

---

# impotent for server
{
    "version": 2,
    "builds": [
      {
        "src": "index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "index.js",
        "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
      }
    ]
  }
