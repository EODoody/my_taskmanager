import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt from 'jwt-decode';


import Navbar from './Pages/Navbar';
import Contact from './Pages/Contact';
import AboutPage from './Pages/AboutPage';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AccountConfirm from './Pages/Confirm';
import DashBoard from './Pages/DashBoard';
import './App.css';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';
import ProjectsPage from './Pages/ProjectsPage';
import ProjectsList from './ProjectsComponents/ProjectsList';



function App() {

  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));
  

  const checkTokenExpiration = async() => { 
    const currentTime = Date.now() / 1000;
    const tokenDecoded = jwt(localStorage.getItem("token"));
    const tokenExpiration = tokenDecoded.exp;
    localStorage.setItem("time",tokenExpiration - currentTime);

    if (currentTime >= tokenExpiration) {
      // Token has expired, log user out
      handleLogout();
    } else {
      
      try {
        // Token is still valid, refresh it
        const response = await fetch('http://localhost:80/my-taskmanager/api/refresh-token', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (response.ok) {
          const data = await response.json();
          const newToken = data;
          // Update the stored token in localStorage
          localStorage.setItem('token', newToken);
          
        } else {
          throw new Error("error");
        }
      } catch (error) {
        // Handle error
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
    checkTokenExpiration();
    const refreshInterval = setInterval(() => {
      checkTokenExpiration();
    }, 1200000); // 20 minutes in milliseconds
    return () => clearInterval(refreshInterval);
  });

  const handleLogin = () => {
    setAuthenticated(true);
    
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    
  };


  const PrivateRoute = ({ children }) => {
    return authenticated ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };
  

  return (
    <BrowserRouter>
      <div>
        <Navbar authenticated={authenticated} handleLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/login"
            element={
              authenticated ? (
                <Navigate to="/dashboard" replace={true} />
              ) : (
                <LoginPage handleLogin={handleLogin} />
              )
            }
          />
          <Route path="/logout" element={<IndexPage />} />
          <Route path="/confirm" element={<AccountConfirm />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                  <DashBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                  <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                  <ProjectsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects-list"
            element={
            <PrivateRoute>
              <ProjectsList />
            </PrivateRoute>
          }
        />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;