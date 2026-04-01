import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollTop = 0;
      }
    }, 0);
  }, []);

  // REQUIRED
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [mobile,setMobile] = useState("");
  const [dob,setDob] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");
  const [country,setCountry] = useState("");
  const [preferredLanguage,setPreferredLanguage] = useState("");

  // OPTIONAL
  const [organization,setOrganization] = useState("");
  const [skills,setSkills] = useState("");
  const [fieldOfStudy,setFieldOfStudy] = useState("");
  const [highestQualification,setHighestQualification] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword ||
        !mobile || !dob || !city || !state || !country || !preferredLanguage) {
      setMessage("Please fill all required fields ❌");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    const user = {
      firstName,lastName,email,password,
      mobile,dob,city,state,country,preferredLanguage,
      organization,skills,fieldOfStudy,highestQualification
    };

    localStorage.setItem("user", JSON.stringify(user));

    setMessage("Registration Successful ✅");

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">

        {/* LEFT SIDE */}
        <form ref={formRef} className="signup-left" onSubmit={handleRegister}>
          <h2>Register</h2>

          <div className="form-group">
            <label>First Name *</label>
            <input value={firstName} onChange={e=>setFirstName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input value={lastName} onChange={e=>setLastName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
            <input type="tel" value={mobile} onChange={e=>setMobile(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Date of Birth *</label>
            <input type="date" value={dob} onChange={e=>setDob(e.target.value)} />
          </div>

          <div className="form-group">
            <label>City *</label>
            <input value={city} onChange={e=>setCity(e.target.value)} />
          </div>

          <div className="form-group">
            <label>State *</label>
            <input value={state} onChange={e=>setState(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Country *</label>
            <input value={country} onChange={e=>setCountry(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Preferred Language *</label>
            <input value={preferredLanguage} onChange={e=>setPreferredLanguage(e.target.value)} />
          </div>

          {/* OPTIONAL */}
          <div className="form-group">
            <label>Organization</label>
            <input value={organization} onChange={e=>setOrganization(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input value={skills} onChange={e=>setSkills(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Field Of Study</label>
            <input value={fieldOfStudy} onChange={e=>setFieldOfStudy(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Highest Qualification</label>
            <input value={highestQualification} onChange={e=>setHighestQualification(e.target.value)} />
          </div>

          <button type="submit" className="submit-btn">Register</button>

          <p className="msg">{message}</p>
        </form>

        {/* RIGHT SIDE */}
        <div className="signup-right">
          <div className="register-card">
            <h2>Welcome 🎉</h2>
            <p>Already have account?</p>

            <button onClick={()=>navigate("/")}>
              Login
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;