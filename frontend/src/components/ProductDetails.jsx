import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/mockData";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import axios from "axios";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  // console.log(productId); // This should log the product ID correctly
  const { addToCart, notification } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/product/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { redirectTo: `/products/${productId}` } });
    } else {
      addToCart(product);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div key={product.id} className="product-details">
      <img src={product.img1} alt={product.pname || 'Product Image'} />
      <h1><strong>Product:</strong> {product.pname}</h1>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.desc}</p>
      <p><strong>Price:</strong> Rs. {product.price}</p>
      <p className="product-quantity"><strong>Available Quantity:</strong> {product.quantity}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;