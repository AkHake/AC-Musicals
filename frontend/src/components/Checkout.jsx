import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default COD
  
  //Card Payment
  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [error, setError] = useState("");
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePhoneInputChange = (e) => {
    const { value } = e.target;
    // Only allow digits
    if (/^\d*$/.test(value)) {
      setShippingInfo({ ...shippingInfo, phone: value });
    }
  };

  // Card Input
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };
  
  //Check Card details
  const validateCardDetails = () => {
    const { cardName, cardNumber, expiry, cvv } = cardDetails;
    if (!cardName || !cardNumber || !expiry || !cvv) {
      setError("All card details are required for online payment.");
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      setError("Card number must be 16 digits.");
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      setError("CVV must be 3 digits.");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Expiry date must be in MM/YY format.");
      return false;
    }
    return true;
  };

  const validatePhoneNumber = (phone) => {
    // Regex to match 10-digit phone number starting with 7, 8, or 9
    const phoneRegex = /^[789]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, phone } = shippingInfo;

    if (!name || !address || !phone) {
      setError("All fields are required!");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setError(
        "Please enter a valid phone number (10 digits, starting with 7, 8, or 9)."
      );
      return;
    }

    // if (paymentMethod === "Online" && !validateCardDetails()) {
    //   return; // No submission if card details are invalid
    // }

    navigate("/order-confirmation", { state: { shippingInfo, cart, paymentMethod } });
  };

    //   navigate("/order-confirmation", { state: { shippingInfo, cart, paymentMethod, cardDetails } });
    // };
  

  return (
    <div className="copage">
      <div className="checkout">
        <h2>Checkout</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={shippingInfo.phone}
              onChange={handlePhoneInputChange}
            />
          </label>
          <label>
            Payment Method:
            <select
              name="paymentMethod"
              value={paymentMethod}
              // onChange={handlePaymentChange}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="COD">Cash On Delivery</option>
              {/* <option value="Online">Online Payment</option> */}
            </select>
          </label>
          {/* Card Details */}
          {/* {paymentMethod === "Online" && (
            <div className="card-details">
              <h3>Card Details</h3>
              <label>
                Cardholder Name:
                <input
                  type="text"
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleCardInputChange}
                />
              </label>
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  maxLength="16"
                  onChange={handleCardInputChange}
                />
              </label>
              <label>
                Expiry Date (MM/YY):
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  placeholder="MM/YY"
                  onChange={handleCardInputChange}
                />
              </label>
              <label>
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  maxLength="3"
                  onChange={handleCardInputChange}
                />
              </label>
            </div>
          )} */}
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
