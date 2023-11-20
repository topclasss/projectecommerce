import React from 'react';
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import GlobalStyle from "./Reused/GlobalStyles";
import LoginPage from './routes/LoginPage/LoginPage';
import RegisterPage from './routes/RegisterPage/RegisterPage';
import StorePage from "./routes/StorePage/StorePage";
import ByCategoryPage from "./routes/StorePage/ByCategoryPage"
import DetailsPage from "./routes/StorePage/DetailsPage"
import { UserProvider, useUser } from './Reused/CustomerContext ';
import CartPage from './routes/CartPage/CartPage';


const Navbar = () => {
  const { customer, logout } = useUser();


  if (customer) {
    // Customer is logged in, show Logout button
    return (
      <>
        <button onClick={logout}>Logout</button>
      </>
    );
  }


  // Customer is not logged in, show Login button
  return (
    <>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </>
  );
};


const App = () => {
    return (
      <BrowserRouter>
        <GlobalStyle />
        <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/store" element={<StorePage/>} />
          <Route path="/store/:categoryId" element={<ByCategoryPage/>} />
          <Route path="/product/:productId" element={<DetailsPage/>} />
          <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Link to="/store">Home</Link>
          <br/>
          <Link to="/cart">Cart Page</Link>
          <br/>
          <Navbar />
          </UserProvider>
      </BrowserRouter>
    );
  };
 
  export default App;