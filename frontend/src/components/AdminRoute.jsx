import React from "react";
import "./App.css";
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import ProductListing from "./components/ProductListing";
import ProductDetails from "./components/ProductDetails";
import Register from "./components/Registeration";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import NotFound from "./components/NotFound";
import { CartProvider } from "./context/CartContext";
import "./styles/App.css";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
// import AdminDashboard from "./components/AdminDashboard";
// import Login from "./components/Login";
import Home from "./components/Home";
// import Products from "./components/Products";
// import Cart from "./components/Cart";
// import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <Router>
      <AdminHeader />
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/products" element={<Products />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
