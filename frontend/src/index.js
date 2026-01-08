import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/AuthContext'; // Import AuthContext Provider
// import CartProvider from './context/CartContext'; // Import CartContext Provider (if applicable)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* <CartProvider> Wrap in CartProvider if your app uses CartContext */}
        <App />
      {/* </CartProvider> */}
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
