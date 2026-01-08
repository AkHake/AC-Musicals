import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaCartShopping } from "react-icons/fa6";
import "../styles/Header.css";
import { GiMusicSpell } from "react-icons/gi";
import Swal from "sweetalert2";

const Header = () => {
  const { cart } = useContext(CartContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  // Confirmation before logout
  // const handleLogout = () => {
  //   const confirmLogout = window.confirm("Are you sure you want to logout?");
  //   if (confirmLogout) {
  //     logout(); // Call logout function if confirmed
  //   }
  // };

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
        logout(); // Call logout function if confirmed
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        );
      }
    });
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        AC Musicals <GiMusicSpell />
      </Link>
      <nav>
        <Link to="/products">Products</Link>
        {/* <Link to="/admin-dashboard">Dashboard</Link> */}
        {/* {!isLoggedIn && <Link to="/register">Register</Link>} */}
        {/* {!isLoggedIn && <Link to="/login">Login</Link>} */}
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
        <Link to="/cart">
          Cart <FaCartShopping /> ({cart.length})
        </Link>
        {/* <Link to="/footer">About Us</Link> */}
      </nav>
    </header>
  );
};

export default Header;
