import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { products } from "../data/mockData";
import { CartContext } from "../context/CartContext";
// import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../styles/ProductListing.css";
import axios from "axios";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { addToCart, notification } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setFilter(category);
    }
  }, [location.search]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/product/all"
        );
        console.log(response.data); // Log the data to ensure id is valid
        setProducts(response.data); // Set the fetched products to state
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFilter(category);

    navigate(`?category=${category}`, { replace: true });
  };

  const handleMinPriceChange = (e) => {
    const value = Math.max(0, Number(e.target.value)); // No negative
    setMinPrice(value || "");
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(0, Number(e.target.value)); // No negative
    setMaxPrice(value || "");
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter ? product.category === filter : true;
    const matchesPrice =
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice);
    return matchesCategory && matchesPrice;
  });

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-listing">
      <h2>Products</h2>
      <div className="filters">
        <label>
          Category:
          <select
            className="category"
            value={filter}
            onChange={handleCategoryChange}
          >
            <option className="opt" value="">
              All
            </option>
            <option className="opt" value="percussion">
              Percussion
            </option>
            <option className="opt" value="string">
              String
            </option>
            <option className="opt" value="keyboard">
              Keyboard
            </option>
            <option className="opt" value="bass">
              Brass/Wind
            </option>
          </select>
        </label>
        <label>
          Minimum Price:
          <input
            className="minprice"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </label>
        <label>
          Maximum Price:
          <input
            className="maxprice"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </label>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => {
          return (
            <div key={product.productid} className="product-card">
              <Link
                to={`/products/${product.productid}`}
                className="product-card-link"
              >
                <img src={product.img1} alt={product.pname} />
                <h3>{product.pname}</h3>
                <p>Rs. {product.price}</p>
              </Link>
             
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          );
        })}
      </div>
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
