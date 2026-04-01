import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./VerifyOTP.css";

const VerifyOTP = () => {

  const [otp, setOtp] = useState(["","","","","",""]);
  const [message, setMessage] = useState("");

  const [timer, setTimer] = useState(30);
  const [resend, setResend] = useState(false);

  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setResend(true);
    }
  }, [timer]);

  const handleChange = (value,index) => {
    if(!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(value && index < 5){
      inputs.current[index+1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if(finalOtp === "704275"){
      setMessage("OTP Verified ✅");

      setTimeout(()=>{
        if(from === "forgot"){
          navigate("/reset-password");
        } else {
          navigate("/home");
        }
      },1000);

    } else {
      setMessage("Invalid OTP ❌");
    }
  };

  const handleResend = () => {
    setTimer(30);
    setResend(false);
    setOtp(["","","","","",""]);
    setMessage("New OTP sent ✅");
  };

  return (
    <div className="verify-wrapper">

      <div className="verify-container">

        {/* LEFT */}
        <div className="verify-left">
          <h2>Verify OTP</h2>

          <form onSubmit={handleVerify}>

            <div className="otp-box">
              {otp.map((data,index)=>(
                <input
                  key={index}
                  maxLength="1"
                  value={data}
                  ref={(el)=>inputs.current[index]=el}
                  onChange={(e)=>handleChange(e.target.value,index)}
                />
              ))}
            </div>

            <button type="submit">Verify OTP</button>
          </form>

          {!resend ? (
            <p className="timer">Resend in {timer}s</p>
          ) : (
            <p className="resend" onClick={handleResend}>
              Resend OTP 🔁
            </p>
          )}

          <p className="success-msg">{message}</p>
        </div>

        {/* RIGHT */}
        <div className="verify-right">
          <div className="verify-card">
            <h2>OTP Verification 🔢</h2>
            <p>Enter the 6-digit OTP</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default VerifyOTP;