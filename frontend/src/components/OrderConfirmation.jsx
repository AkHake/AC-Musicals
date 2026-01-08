import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const { shippingInfo, cart } = state || {};

  if (!shippingInfo || !cart) return <p>Error: Missing order details.</p>;

  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation!</h2>
      <p className="thanks">Thank you for your order, {shippingInfo.name}!</p>
      <p className="addr">We will ship your items to: {shippingInfo.address}</p>
      <p className="order">Order Summary:</p>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.pname} - (x{item.quantity}) - Rs. {item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p className="total-cost">Total Cost: Rs. {totalCost.toFixed(2)}</p>
      <div className="backhome">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
