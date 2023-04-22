import {BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Component/Navbar';
import Contact from './Pages/Contact';
import AboutPage from './Pages/AboutPage';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AccountConfirm from './Pages/Confirm';
import DashBoard from './Pages/DashBoard';
import './App.css'
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';



function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div>
      <Navbar authenticated={authenticated} handleLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route path="/about"  element={<AboutPage />} />
          <Route path="/contact"  element={<Contact/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/login"
            element={<LoginPage handleLogin={handleLogin} />}
          />
          <Route path="/dashboard"  element={<DashBoard/>} />
          <Route path="/logout"  element={<IndexPage/>} />
          <Route path="/confirm" element={<AccountConfirm />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;