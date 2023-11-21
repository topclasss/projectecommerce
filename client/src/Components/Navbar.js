import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./Reused/CustomerContext ";

const Navbar = ({ onNavigate }) => {
  const { customer, logout } = useUser();
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 30px",
    transition: "padding 0.2s",
  };

  const dropdownStyle = {
    display: isDropdownVisible ? "block" : "none",
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#333",
    padding: "15px",
    textAlign: "center",
  };

  const handleCategoryHover = () => {
    setDropdownVisible(true);
  };

  const handleCategoryLeave = () => {
    setDropdownVisible(false);
  };

  const handleCategoryClick = (categoryId) => {
    setDropdownVisible(false);
    navigate(`/store/${categoryId}`);
    onNavigate();
  };

  return (
    <nav style={navbarStyle}>
      <div style={{ color: "lightgrey", marginLeft: "10px" }}>TechTrove</div>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <span
        style={{ cursor: "pointer", position: "relative" }}
        onMouseEnter={handleCategoryHover}
        onMouseLeave={handleCategoryLeave}
      >
        Categories
        <div id="categoryDropdown" style={dropdownStyle}>
          <div
            style={{ ...linkStyle, padding: "15px" }}
            onClick={() => handleCategoryClick("Fitness")}
          >
            Fitness
          </div>
          <div
            style={{ ...linkStyle, padding: "15px" }}
            onClick={() => handleCategoryClick("Medical")}
          >
            Medical
          </div>
          <div
            style={{ ...linkStyle, padding: "15px" }}
            onClick={() => handleCategoryClick("Entertainment")}
          >
            Entertainment
          </div>
          <div
            style={{ ...linkStyle, padding: "15px" }}
            onClick={() => handleCategoryClick("Lifestyle")}
          >
            Lifestyle
          </div>
        </div>
      </span>

      <Link to="/cart" style={linkStyle}>
        Cart{" "}
        {customer && customer.cart.length > 0 && `(${customer.cart.length})`}
      </Link>

      {customer ? (
        <>
          <div style={{ color: "lightgrey", marginRight: "10px" }}>
            Hi, {customer.firstName}
          </div>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={linkStyle}>
          <button>Login</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
