import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext); // Access isLoggedIn
  const navigate = useNavigate();

  const totalCost = (cart || []).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { redirectTo: "/checkout" } }); // Redirect to login
    } else {
      navigate("/checkout"); // Proceed to checkout
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/products">Continue Shopping!</Link>
        </p>
      ) : (
        <>
          <ul className="cartitems">
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.img1} alt={item.pname} />{" "}
                {/* Ensure you use the correct property */}
                <div className="qrbtn">
                  <h3>{item.pname}</h3>{" "}
                  {/* Make sure pname is used here if that's the name property */}
                  <p>Rs. {item.price}</p>
                  <label>
                    Quantity:
                    <input
                      className="quantity"
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value, 10);
                        if (!isNaN(quantity)) {
                          updateQuantity(item.id, quantity);
                        }
                      }}
                    />
                  </label>
                  <button
                    className="removebutton"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Total Items: {cart.length}</p>
            <p>Total Cost: Rs.{totalCost.toFixed(2)}</p>
            <button className="checkoutbtn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;