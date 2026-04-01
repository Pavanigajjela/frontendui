import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {

  const [email,setEmail] = useState("");
  const [msg,setMsg] = useState("");

  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();

    if(!email){
      setMsg("Enter email ❌");
      return;
    }

    setMsg("OTP sent for reset ✅");

    setTimeout(()=>{
      navigate("/verify-otp", { state: { from: "forgot" } });
    },1000);
  };

  return (
    <div className="forgot-wrapper">

      <div className="forgot-container">

        {/* LEFT */}
        <div className="forgot-left">

          <h2>Forgot Password</h2>

          <form onSubmit={handleSend}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <button type="submit">Send OTP</button>
          </form>

          <p className="success-msg">{msg}</p>

          <p className="back-login" onClick={()=>navigate("/")}>
            Back to Login
          </p>

          
        </div>

        {/* RIGHT */}
        <div className="forgot-right">

          <div className="forgot-card">
            <h2>Reset Password 🔒</h2>
            <p>We will send OTP to your email</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;