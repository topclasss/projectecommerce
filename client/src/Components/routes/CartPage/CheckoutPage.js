import React, { useState, useContext } from "react"
import { CustomerContext } from '../../Reused/CustomerContext ';
import {useNavigate} from 'react-router-dom'

const CheckoutPage = () => {
    // retrieve user information and removeToCart function from context
    const { customer, removeToCart, completePurchase } = useContext(CustomerContext);
    const navigate = useNavigate()
    // form data
    const [formData, setFormData] = useState({
      country: "",
      address: "",
      postalCode: "",
      provinceState: "",
    });
  
    // handle change in the form
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
     // handle remove item from cart
    const handleRemoveFromCart = async (productId, customerId) => {
      try {
        const url = '/remove-from-cart';
        const body = { customerId, productId };
  
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if (!response.ok) {
          throw new Error(`Remove product from cart failed`);
        }
  
        const result = await response.json();
        if (result.status === 200) {
          removeToCart(productId);
          console.log("result", result.status);
        } else {

        }
      } catch (error) {
        console.error(`Error during removing from cart:`, error);
        throw error; 
      }
    };
  
    // handle removal of all items from the cart checkout
    const handleRemoveAllFromCart = async () => {
      const removalPromises = customer.cart.map((item) =>
        handleRemoveFromCart(item._id, customer._id)
      );
  
      try {
        await Promise.all(removalPromises);
      } catch (error) {
        console.error("Error removing items from cart:", error);
        throw error; 
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // relevant data from formData
      const { address, postalCode, provinceState, country } = formData;
  
      // check if any of required fields is empty
      if (!address || !postalCode || !provinceState || !country) {
        console.error("Please fill in all required fields");
        return;
      }
  
      if (!customer) {
        console.error("User is not logged in");
        return;
      }
  
      //data needed for the order
      const orderData = {
        customerId: customer._id,
        country: formData.country,
        address: formData.address,
        postalCode: formData.postalCode,
        provinceState: formData.provinceState,
      };
  
      try {
        // POST request
        const response = await fetch("/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
  
        const responseData = await response.json();
        console.log(responseData);
  
        // window.alert("Order confirmed!");
        completePurchase(responseData.data)

        navigate(`/order-details/${responseData.data._id}`)

      // await handleRemoveAllFromCart();

      // redirect to "/" after a delay
      // setTimeout(() => {
      //   window.location.replace("/");
      // }, 1000); 
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

    // checkoutpage component
    return (
      <div style={checkoutContainerStyle}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Postal Code:
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Province/State:
            <input
              type="text"
              name="provinceState"
              value={formData.provinceState}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Submit Order</button>
        </form>
      </div>
    );
  };
  
  const checkoutContainerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    color: "black",
    textAlign: "center",
  };
  
  export default CheckoutPage;