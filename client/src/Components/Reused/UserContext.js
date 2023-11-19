import React, { createContext, useContext, useState } from 'react';


const UserContext = createContext();

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
// Provide the UserContext to its children
  return (
    <UserContext.Provider value={{ customer, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// a custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  // If the hook is not used within a UserProvider throw an error!
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};