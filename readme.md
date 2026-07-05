# 🚀 Enterprise CRM System

A modern **Enterprise CRM (Customer Relationship Management)** application built using the **MERN Stack**. It helps businesses manage leads, customers, and sales efficiently with secure authentication and an intuitive dashboard.

---

## 🌐 Live Demo

### Frontend
👉 https://codec1.onrender.com

### Backend API
👉 https://enterprise-crm-backend-aubv.onrender.com

---

## ✨ Features

- 🔐 Secure User Authentication (JWT)
- 👤 Admin Login
- ➕ Add New Leads
- 📝 Edit Existing Leads
- 🗑️ Delete Leads
- 📋 View All Leads
- 📊 Dashboard Overview
- 🔎 Search Leads
- 🚪 Logout Functionality
- ☁️ MongoDB Atlas Integration
- 🌍 Fully Deployed Online

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt

### Deployment
- Render (Frontend)
- Render (Backend)
- MongoDB Atlas

---

## 📂 Project Structure

```
Enterprise-CRM/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 📸 Screenshots

### Login Page

> Add your screenshot here

```
screenshots/login.png
```

---

### Dashboard

> Add your screenshot here

```
screenshots/dashboard.png
```

---

### Lead Management

> Add your screenshot here

```
screenshots/leads.png
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/IshanBhasme/CODEC1.git
```

---

### Backend Setup

```bash
cd server
npm install
npm start
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📌 API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Lead Management

```
GET    /api/leads
POST   /api/leads
PUT    /api/leads/:id
DELETE /api/leads/:id
```

---

## 🚀 Future Improvements

- 📧 Email Notifications
- 📈 Sales Analytics
- 📅 Activity Timeline
- 👥 Multiple User Roles
- 📤 Export Leads to Excel
- 📱 Mobile Responsive Enhancements

---

## 👨‍💻 Author

**Ishan Bhasme**

GitHub: https://github.com/IshanBhasme

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.