import React from 'react';
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import GlobalStyle from "./Reused/GlobalStyles";
import LoginPage from './routes/LoginPage/LoginPage';
import RegisterPage from './routes/RegisterPage/RegisterPage';
import StorePage from "./routes/StorePage/StorePage";
import ByCategoryPage from "./routes/StorePage/ByCategoryPage"
import DetailsPage from "./routes/StorePage/DetailsPage"
import { UserProvider } from './Reused/UserContext';




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
        </Routes>
        <Link to="/login">Login Page</Link>
        <br />
        <Link to="/">Home</Link>
        </UserProvider>
      </BrowserRouter>
    );
  };
  
  export default App;