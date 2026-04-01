import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SendOTP.css";

const SendOTP = () => {

  const [email,setEmail] = useState("");
  const [msg,setMsg] = useState("");

  const navigate = useNavigate();

  const handleSend = () => {
    if(!email){
      setMsg("Enter email ❌");
      return;
    }

    setMsg("OTP sent ✅");

    setTimeout(()=>{
      navigate("/verify-otp");
    },1000);
  };

  return (
    <div className="send-wrapper">

      <div className="send-container">

        {/* LEFT */}
        <div className="send-left">
          <h2>Login with OTP</h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button onClick={handleSend}>
            Send OTP
          </button>

          <p className="success-msg">{msg}</p>

          <p className="back" onClick={()=>navigate("/")}>
            Back to Login
          </p>
        </div>

        {/* RIGHT */}
        <div className="send-right">
          <div className="send-card">
            <h2>Secure Login 🔐</h2>
            <p>We will send OTP to your email</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SendOTP;