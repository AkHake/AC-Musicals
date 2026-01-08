# 🎸 AC Musicals – E-Commerce Web Application

AC Musicals is a full-stack e-commerce web application for musical instruments built using React, Node.js, Express, and MongoDB.
It provides a smooth shopping experience for users and a powerful dashboard for admins to manage products.

## 🚀 Features
### 👤 User Side

User Registration & Login
Authentication-based navigation
Browse musical instruments
View detailed product information
Add products to cart
Cart quantity management
Checkout with Cash on Delivery (COD)
Login redirection before checkout
Logout confirmation popup
Responsive UI

### 👨‍💼 Admin Side
Secure Admin Dashboard
Add new products
Edit existing products
Delete products
View all products in a structured table
MongoDB-based persistent storage

## 🧑‍💻 Tech Stack
### Frontend
React
React Router DOM
Axios
Context API (Auth & Cart)
CSS (Custom Styling)
React Icons

### Backend
Node.js
Express.js
MongoDB
Mongoose
CORS

## 🔐 Authentication Flow

Users must log in before proceeding to checkout

If not logged in:
Redirected to Login page

After login → redirected back to Checkout

Register option available from Login page

Navbar updates dynamically after login/logout

Logout requires confirmation popup

## ⚙️ Installation & Setup
1️⃣ Clone the Repository
`git clone https://github.com/your-username/ac-musicals.git`
`cd ac-musicals`

2️⃣ Install Frontend Dependencies
`npm install`

3️⃣ Start React App
`npm start`

4️⃣ Frontend runs at:
`http://localhost:3000`

🖥️ Backend Setup
1️⃣ Navigate to Backend Folder
`cd backend`

2️⃣ Install Backend Dependencies
`npm install`

3️⃣ Start Backend Server
`nodemon server.js`

4️⃣ Backend runs at:
`http://localhost:5001`


### 🗄️ MongoDB Configuration

Ensure MongoDB is running locally or update your connection string:

mongoose.connect("mongodb://localhost:27017/acmusicals", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

🔗 API Endpoints (Sample)
Method	Endpoint	Description
GET	/api/product/all	Fetch all products
GET	/api/product/:id	Fetch single product
POST	/api/product/add	Add product
PUT	/api/product/update/:id	Update product
DELETE	/api/product/delete/:id	Delete product

## 🎨 UI Theme
Dark-themed UI
Consistent styling across Login, Registration, and Admin Dashboard
Modern navbar with icons
Responsive design for mobile and desktop

## 📌 Future Enhancements
Order tracking system
Email notifications for order confirmations
Online payment gateway integration

## 🧑‍🎓 Author
Akanksha
🎓 MCA Student
💻 Full Stack Developer
🎵 Music & Tech Enthusiast

⭐ If You Like This Project
Give it a ⭐ on GitHub and feel free to fork or contribute!