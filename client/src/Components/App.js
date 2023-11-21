import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import GlobalStyle from "./Reused/GlobalStyles";
import LoginPage from './routes/LoginPage/LoginPage';
import RegisterPage from './routes/RegisterPage/RegisterPage';
import StorePage from "./routes/StorePage/StorePage";
import ByCategoryPage from "./routes/StorePage/ByCategoryPage"
import DetailsPage from "./routes/StorePage/DetailsPage"
import { UserProvider, useUser } from './Reused/CustomerContext ';
import CartPage from './routes/CartPage/CartPage';
import Navbar from './Navbar';
import CheckoutPage from './routes/CartPage/CheckoutPage';

const App = () => {
  const [key, setKey] = useState(0);

  const handleNavigation = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserProvider>
        <Navbar onNavigate={handleNavigation} />
        <Routes key={key}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<StorePage />} />
          <Route path="/store/:categoryId" element={<ByCategoryPage />} />
          <Route path="/product/:productId" element={<DetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage/>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;