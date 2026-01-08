import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy validation
    if (formData.email === "akanksha.hake123@gmail.com" && formData.password === "asdfg") {
      login(); // Mark user as logged in
      const redirectTo = location.state?.redirectTo || "/checkout"; // Redirect to target or Home
      navigate(redirectTo);
    } else {
      setError("Invalid email or password. Please try again.");
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
        Not registered? <Link to="/register"><u>Create an account</u></Link>
      </p>
    </div>
  );
}

export default Login;
