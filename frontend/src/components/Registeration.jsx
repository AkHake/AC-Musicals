import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Registration.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s'-]+$/; // Allow letters, spaces, apostrophes, and hyphens
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Valid email pattern
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Minimum 8 characters, 1 uppercase, 1 number, 1 special char

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, confirmPassword } = formData;

    // Validate fields with regex
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      setError("First and Last Name should only contain alphabets");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/auth/createuser", {
        firstname,
        lastname,
        email,
        password,
        phoneno: "1234567890",
      });

      if (response.data.success) {
        alert("Registered successfully!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
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
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
