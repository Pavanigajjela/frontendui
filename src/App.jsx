import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './LandingPage';
import LoginPage from "./Login/LoginPage";
import Signup from "./Signup/Signup";
import SendOTP from "./OTP/SendOTP";
import VerifyOTP from "./OTP/VerifyOTP";
import ForgotPassword from "./Login/ForgotPassword";
import ResetPassword from "./Reset/ResetPassword";
import Dashboard from "./Dashboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on app load
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    const cursor = document.querySelector(".cursor");
    const moveCursor = (e) => {
      if(cursor){
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="cursor"></div>
      <Routes>
        {/* Landing Page - Always accessible */}
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/otp" element={<SendOTP />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected User Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;