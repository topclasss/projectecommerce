import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { useUser } from './Reused/CustomerContext ';


const Navbar = ({ onNavigate }) => {
    const { customer, logout } = useUser();
    const navigate = useNavigate();
    // set state to false so nav is not always open
    const [isDropdownVisible, setDropdownVisible] = useState(false);
  
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: '10px',
        backgroundColor: '#333',
        color: 'white',
      };
    
      const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        margin: '0 10px',
        transition: 'padding 0.2s',
      };
    
      const dropdownStyle = {
        display: isDropdownVisible ? 'block' : 'none',
        position: 'absolute',
        top: '100%',
        left: '50%', 
        transform: 'translateX(-50%)', 
        backgroundColor: '#333',
        padding: '15px',
      };
  
      // mouse hover over the categories to show the dropdown
    const handleCategoryHover = () => {
      setDropdownVisible(true);
    };
   // mouse leave from the categories to hide the dropdown
    const handleCategoryLeave = () => {
      setDropdownVisible(false);
    };
  
     // navigate to the selected category, and trigger a re-render
    const handleCategoryClick = (categoryId) => {
      setDropdownVisible(false);
      navigate(`/store/${categoryId}`);

      // need to trigger this so it RE renders each time you click a category
      onNavigate();
    };
  
    // render navbar
    return (
        <nav style={navbarStyle}>
          <Link to="/store" style={linkStyle}>
            Home
          </Link>
          <span
            style={{ cursor: 'pointer', position: 'relative' }}
            onMouseEnter={handleCategoryHover}
            onMouseLeave={handleCategoryLeave}
          >
            Categories
            <div id="categoryDropdown" style={dropdownStyle}>
              <div
                style={{ ...linkStyle, padding: '15px' }}
                onClick={() => handleCategoryClick('Fitness')}
              >
                Fitness
              </div>
              <div
                style={{ ...linkStyle, padding: '15px' }}
                onClick={() => handleCategoryClick('Medical')}
              >
                Medical
              </div>
              <div
                style={{ ...linkStyle, padding: '15px' }}
                onClick={() => handleCategoryClick('Entertainment')}
              >
                Entertainment
              </div>
              <div
                style={{ ...linkStyle, padding: '15px' }}
                onClick={() => handleCategoryClick('Lifestyle')}
              >
                Lifestyle
              </div>
            </div>
          </span>

          
      <Link to="/cart" style={linkStyle}>
        Cart
      </Link>
    
          {customer ? (
            <>
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