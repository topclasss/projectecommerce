import React, { useState } from "react";
import { useUser } from "../../Reused/CustomerContext ";
import { Link } from "react-router-dom";
import {handleRemoveFromCart} from "../../handlesCart/handleRemoveFromCart"

const CartPage = () => {
  // Get user information and functions from UserProvider
  const { customer, logout, removeToCart } = useUser();

  const handleRemoveItem = async (productId) => {
    await handleRemoveFromCart(productId, removeToCart, customer._id);
    removeToCart(productId);
  };

  return (
    <div style={cartContainerStyle}>
      <h2>Shopping Cart</h2>
      {customer ? (
        customer.cart && customer.cart.length > 0 ? (
          <div>
            {customer.cart.map((item) => (
              <div key={item._id} style={cartItemStyle}>
                <p>Product Name: {item._id}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveItem(item._id)}>
                  Remove Item
                </button>
              </div>
            ))}
            <div style={checkoutButtonStyle}>
              <Link
                to="/checkout"
                style={{ color: "#111", textDecoration: "none" }}
              >
                Checkout
              </Link>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )
      ) : (
        <div>
          <p>
            Please <Link to="/login">Login</Link> to view your cart.
          </p>
        </div>
      )}
      <div style={cartLinksStyle}>
        <Link to="/">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default CartPage;

const cartContainerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  color: "black",
  textAlign: "center",
  textDecoration: "none",
};

const cartItemStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px",
  textDecoration: "none",
};

const cartLinksStyle = {
  marginTop: "20px",
  textDecoration: "none",
  fontWeight: "bold",
  color: "black",
};

const checkoutButtonStyle = {
  marginTop: "20px",
  textDecoration: "none",
  backgroundColor: "grey",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
};
