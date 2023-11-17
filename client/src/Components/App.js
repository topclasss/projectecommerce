import React from 'react';
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import GlobalStyle from "./Reused/GlobalStyles";
import LoginPage from './routes/LoginPage/LoginPage';
import RegisterPage from './routes/RegisterPage/RegisterPage';



const App = () => {
    return (
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
        </Routes>
        <Link to="/login">Login Page</Link>
        <br />
        <Link to="/">Home</Link>
      </BrowserRouter>
    );
  };
  
  export default App;