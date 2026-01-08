import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const host = "http://localhost:5001";
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productid: "",
    pname: "",
    desc: "",
    price: "",
    quantity: "",
    img1: "",
    img2: "",
    img3: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${host}/api/product/all`);
        console.log("Fetched products:", response.data); // Debug log
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts([]); // Ensure products is an array on error
      }
    };

    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update a product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProductId) {
        // Update product
        await axios.put(`${host}/api/product/update/${editingProductId}`, formData);
        alert("Product updated successfully!");
      } else {
        // Add product
        await axios.post(`${host}/api/product/add`, formData);
        alert("Product added successfully!");
      }

      // Refresh product list
      const response = await axios.get(`${host}/api/product/all`);
      setProducts(response.data || []);

      // Reset form and editing state
      setFormData({
        productid: "",
        pname: "",
        desc: "",
        price: "",
        quantity: "",
        img1: "",
        img2: "",
        img3: "",
      });
      setEditingProductId(null);
    } catch (error) {
      console.error("Error adding/updating product", error);
      alert("Failed to save the product.");
    }
  };

  // Delete a product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${host}/api/product/delete/${productId}`);
        alert("Product deleted successfully!");

        // Refresh product list
        const response = await axios.get(`${host}/api/product/all`);
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error deleting product", error);
        alert("Failed to delete the product.");
      }
    }
  };

  // Set product details for editing
  const handleEdit = (product) => {
    setFormData(product);
    setEditingProductId(product.productid);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit}>
        <h2>{editingProductId ? "Edit Product" : "Add Product"}</h2>

        <input
          type="number"
          name="productid"
          placeholder="Product ID"
          value={formData.productid}
          onChange={handleChange}
          required
          disabled={!!editingProductId}
        />

        <input
          type="text"
          name="pname"
          placeholder="Product Name"
          value={formData.pname}
          onChange={handleChange}
          required
        />

        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="img1"
          placeholder="Image 1 URL"
          value={formData.img1}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="img2"
          placeholder="Image 2 URL (Optional)"
          value={formData.img2}
          onChange={handleChange}
        />

        <input
          type="url"
          name="img3"
          placeholder="Image 3 URL (Optional)"
          value={formData.img3}
          onChange={handleChange}
        />

        <button type="submit">{editingProductId ? "Update" : "Add"} Product</button>
        {editingProductId && <button onClick={() => setEditingProductId(null)}>Cancel Edit</button>}
      </form>

      {/* Product List */}
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
  {Array.isArray(products) && products.length > 0 ? (
    products.map((product) => (
      <tr key={product.productid}>
        <td>{product.productid}</td>
        <td>{product.pname}</td>
        <td>{product.desc}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
        <td>
          <button onClick={() => handleEdit(product)}>Edit</button>
          <button onClick={() => handleDelete(product.productid)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No products available</td>
    </tr>
  )}
</tbody>

         
      </table>
    </div>
  );
};

export default AdminDashboard;
