import React, { useState } from "react";
import { useUser } from "../../Reused/CustomerContext ";
import { Link } from "react-router-dom";
import {handleRemoveFromCart} from "../../handlesCart/handleRemoveFromCart"
import { ProductContext } from "../../Reused/ProductContext";
import {useContext} from "react" 

const CartPage = () => {
  // Get user information and functions from UserProvider
  const { customer, logout, removeToCart } = useUser();
  const { products } = useContext(ProductContext);

  const [errorMessage, setErrorMessage] = useState(null)

  //ADD setError
  const handleRemoveItem = async (productId) => {
    await handleRemoveFromCart(productId, removeToCart, customer._id, setErrorMessage);
    removeToCart(productId);
  };

  return (
    <div style={cartContainerStyle}>
      <h2>Shopping Cart</h2>
      {customer ? (
        customer.cart && customer.cart.length > 0 ? (
       
          <div>
         
             {customer.cart.map ((item) => {
               const findProduct = products.find((product) => {
               return product._id === Number(item._id) });
              return ( 
               <div key={item._id} style={cartItemStyle}>
                <img src={findProduct.imageSrc} alt={item._id} />
                <p>Product Name: {findProduct.name}</p> 
                <p>Quantity: {item.quantity}</p>
                <button style={removeButtonStyle} onClick={() => handleRemoveItem(item._id)}>
                  Remove Item
                </button>
                
                { (!errorMessage) ? (
                  <p></p>
                ):( <p>{errorMessage} </p>)}

              </div>
             )
            })
            }
        
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

//To ADD
const removeButtonStyle = {
  backgroundColor: "black", 
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "10px",
};