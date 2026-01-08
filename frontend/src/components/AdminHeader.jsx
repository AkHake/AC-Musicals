import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaCartShopping } from "react-icons/fa6";
import "../styles/Header.css";
import { GiMusicSpell } from "react-icons/gi";
import Swal from "sweetalert2";

const AdminHeader = () => {
  const { cart } = useContext(CartContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        );
        navigate("/login");
      }
    });
  };

  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    } else if (user.email !== "admin@example.com") {
      Swal.fire("Access Denied", "You are not authorized to access this page.", "error");
      navigate("/"); // Redirect non-admin users to home
    } else {
      navigate("/admin-dashboard"); // Admin access
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        AC Musicals <GiMusicSpell />
      </Link>
      <nav>
        <Link to="/products">Products</Link>

        {/* Admin Dashboard link */}
        {isLoggedIn && user.email === "admin@example.com" ? (
          <button onClick={handleDashboardClick}>Admin Dashboard</button>
        ) : (
          <Link to="/cart">
            Cart <FaCartShopping /> ({cart.length})
          </Link>
        )}

        {/* Auth-related links */}
        {isLoggedIn ? (
          <div className="user-section">
            <span className="welcome">Welcome, {user.firstname}!</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default AdminHeader;
