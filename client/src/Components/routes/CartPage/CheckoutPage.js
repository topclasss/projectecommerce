import React, { useState } from "react";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    country: "",
    address: "",
    postalCode: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling form submission (e.g., sending data to the server)
    console.log("Form submitted:", formData);
  };

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
        {/* Add more fields as needed */}
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;

const checkoutContainerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  color: "black",
  textAlign: "center",
};
