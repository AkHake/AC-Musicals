import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import "../styles/registration.css";
import "../styles/Registration.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Login function from AuthContext
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }

    // Simulate successful registration
    login(); // Mark user as logged in
    const redirectTo = location.state?.redirectTo || "/"; // Default to Home if no redirect target
    navigate(redirectTo);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already registered? <Link to="/login"><u>Login</u></Link>
      </p>
    </div>
  );
};

export default Register;