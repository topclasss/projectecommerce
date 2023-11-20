import React, { createContext, useContext, useState } from 'react';


export const CustomerContext = createContext();

// Component to provide user context to its children
export const UserProvider = ({ children }) => {
// User state, set to null = logged out
  const [customer, setCustomer] = useState(null);

// update the customer information when a user logs in
  const login = (customerInfo) => {
    setCustomer(customerInfo);
  };
// clear the customer information when a user logs out
  const logout = () => {
    setCustomer(null);
  };

//Add to cart

const addToCart = (productId) => {
const isProductInTheCart =  customer.cart.find((product) => {
   return (product._id === productId)
  })
  if (isProductInTheCart) {
    isProductInTheCart.quantity += 1
     const newCart = [...customer.cart]
     setCustomer({...customer, cart:newCart })
  }
  else {
    const newCart = [...customer.cart, {_id: productId, quantity:1}]
    setCustomer({...customer, cart:newCart })
  }
}


//Remove to cart

 const removeToCart = (productId) => {
  const isProductInTheCart =  customer.cart.find((product) => {
     return (product._id === productId)
    })
    if (isProductInTheCart && isProductInTheCart.quantity > 1) {
      isProductInTheCart.quantity -= 1
       const newCart = [...customer.cart]
       setCustomer({...customer, cart:newCart })
    }
    else  {
      if (isProductInTheCart && isProductInTheCart.quantity === 1) {
      const remaningProduct =  customer.cart.filter((product) => {
        return (product._id !== productId)
      })
      setCustomer({...customer, cart: remaningProduct })
    }
    }
   } 
  




// Provide the CustomerContext to its children
  return (
    <CustomerContext.Provider value={{ customer, login, logout, addToCart, removeToCart }}>
      {children}
    </CustomerContext.Provider>
  );
};

// a custom hook to use the context
export const useUser = () => {
  const context = useContext(CustomerContext);
  // If the hook is not used within a UserProvider throw an error!
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};