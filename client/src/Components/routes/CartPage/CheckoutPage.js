import React, { useState, useContext } from "react"
import { CustomerContext } from '../../Reused/CustomerContext ';
import { ProductContext } from "../../Reused/ProductContext";
import {useNavigate} from 'react-router-dom'

const CheckoutPage = () => {
    // retrieve user information and removeToCart function from context
    const { customer, removeToCart, completePurchase } = useContext(CustomerContext);
    const {products} = useContext(ProductContext)
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
    
    // this is not supposed to be here
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
  
    // this is not supposed to be here
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



    console.log(Number(customer.cart[0]._id));
    console.log(products[0]._id);

    const cartProductsDetails = []
    customer.cart.forEach(cartProduct => {
      const productDetails = products.find((dbProduct)=> {
        return dbProduct._id === Number(cartProduct._id)
      })
      cartProductsDetails.push(productDetails)
    });
    console.log(cartProductsDetails);




    // checkoutpage component
    return (
    <div style={checkoutContainerStyle}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <p>Name: <br/>{customer.firstName} {customer.lastName}</p>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={inputStyle}
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
            style={inputStyle}
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
            style={inputStyle}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        <br />
        <ol>
          {cartProductsDetails.map(product => {
            return <li key={product._id}>
              <p>-------------</p>
              <p>name:{product.name.slice(0, 20)}</p>
              <p>price: {product.price}</p>
              <img style={{width: "100px"}}src={product.imageSrc}></img>
            </li>
          })}
        </ol>
        <button type="submit" style={buttonStyle}>
          Submit Order
        </button>
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

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const inputStyle = {
  margin: "8px 0",
  padding: "8px",
  width: "100%",
  boxSizing: "border-box",
  maxWidth: '250px'
};

const buttonStyle = {
  backgroundColor: "#333",
  color: "white",
  padding: "10px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "none",
};

export default CheckoutPage;