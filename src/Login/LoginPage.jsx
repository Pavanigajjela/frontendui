import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";  // This should be LoginPage.css, not LandingPage.css

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setMessage("Please fill all fields ❌");
      setIsError(true);
      return;
    }

    // Store user info in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", email.split('@')[0] || "User");
    localStorage.setItem("userEmail", email);
    
    setMessage("Login Successful ✅");
    setIsError(false);
    
    // Update parent component state
    if (setIsLoggedIn) {
      setIsLoggedIn(true);
    }

    setTimeout(() => {
      navigate("/"); // Redirect to landing page
    }, 1500);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* LEFT */}
        <div className="login-left">
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-options">
            <span onClick={() => navigate("/signup")}>Register</span>
            <span onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
          </div>

          <button onClick={handleLogin}>Login</button>

          {message && (
            <p className={isError ? "error-msg" : "success-msg"}>
              {message}
            </p>
          )}

          <p className="otp-text" onClick={() => navigate("/otp")}>
            Login with OTP
          </p>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <div className="login-info-card">
            <h2>Welcome Back 👋</h2>
            <p>Login to continue your journey</p>

            <button onClick={() => navigate("/signup")}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;