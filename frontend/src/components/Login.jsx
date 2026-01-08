import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Login function
  const navigate = useNavigate();
  const location = useLocation();

  // Fixed admin credentials
  const ADMIN_CREDENTIALS = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if the credentials match the admin credentials
    if (
      formData.email === ADMIN_CREDENTIALS.email &&
      formData.password === ADMIN_CREDENTIALS.password
    ) {
      // Simulate admin login
      login({ firstname: "Admin", email: ADMIN_CREDENTIALS.email, token: "admin-token" });
      navigate("/admin-dashboard"); // Redirect to Admin Dashboard
      return;
    }

    // Regular user login process
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      console.log("Full API response:", data);

      // Extract user details from the nested structure
      const { firstname, email } = data.data.user; // Accessing nested user data
      const { authtoken } = data; // Accessing the token at the top level

      // Login successful: Pass user details to AuthContext
      login({ firstname, email, token: authtoken });

      // Log the login details
      console.log("User login details:", {
        firstname,
        email,
        token: authtoken,
      });

      // Redirect to the page the user attempted to access or home
      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Not registered? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;
