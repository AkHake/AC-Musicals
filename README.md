# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



-------------------
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