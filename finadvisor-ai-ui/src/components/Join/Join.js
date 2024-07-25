import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from '../../api';

import "./Join.css";

const Join = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("olivia_sophia");
  const [psswd, setpsswd] = useState("1234567890");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.validateLogin({"user_id": name});
      const userData = JSON.parse(response.data.data);
      setUser(userData);

      if (userData) {
        setLoginSuccessful(true);
        navigate('/chat', { state: { userData } }); 
      } else {
        setErrorMessage("Invalid login credentials. Please try again.");
        setLoginSuccessful(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      setLoginSuccessful(false);
    }
  }
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
      <img src="lbglogo.png" alt="logo" width={300} height={120} />
        <h1 className="heading">FinAdvisor AI</h1>
        <div>
          <input
            className="joinInput"
            placeholder="UserID"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            className="joinInput mt-20"
            placeholder="Password"
            type="password"
            value={psswd}
            onChange={(event) => setpsswd(event.target.value)}
          />
        </div>
        <button className="button mt-20" type="submit" onClick={handleLogin}>
          LOGIN
        </button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Join;
