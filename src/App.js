import {BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Component/Navbar';
import Contact from './Pages/Contact';
import AboutPage from './Pages/AboutPage';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AccountConfirm from './Pages/Confirm';
import DashBoard from './Pages/DashBoard';
import Logout from './Component/logout';
import './App.css'



function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const tokenHandler = () => {
    if (localStorage.getItem('token') !== null) {
      setAuthenticated(true);
    }
  }

  useEffect(() => {
    tokenHandler();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar authenticated={authenticated}/>
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route path="/about"  element={<AboutPage />} />
          <Route path="/contact"  element={<Contact/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login"  element={<LoginPage />} />
          <Route path="/dashboard"  element={<DashBoard/>} />
          <Route path="/logout"  element={<Logout/>} />
          <Route path="/confirm" element={<AccountConfirm />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;