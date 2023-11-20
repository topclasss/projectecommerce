import React, { useState } from 'react';
import { useUser } from '../../Reused/CustomerContext ';
import { Link } from 'react-router-dom';


const CartPage = () => {
    // Get user information and functions from UserProvider
    const { customer, logout, login } = useUser();
 

    const handleRemoveItem = async (productId) => {
     
    };

    return (
      <div style={cartContainerStyle}>
        <h2>Shopping Cart</h2>
        {customer && customer.cart && customer.cart.length > 0 ? (
          <div>
            {customer.cart.map((item) => (
              <div key={item._id} style={cartItemStyle}>
                <p>Product Name: {item._id}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveItem(item._id)}>Remove Item</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div style={cartLinksStyle}>
          <Link to="/store">Continue Shopping</Link>
          <br />
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    );
  };
 
  export default CartPage;
 
  const cartContainerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    color: 'black',
    textAlign: 'center',
  };
 
  const cartItemStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
  };
 
  const cartLinksStyle = {
    marginTop: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'black',
  };
