import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Join.css";

const Join = () => {
  const [name, setName] = useState("olivia_sophia");
  const [psswd, setpsswd] = useState("1234567890");
  var flag = false;

  
  const handleLogin = async (e) => {
    // e.preventdefault();
    // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

    axios.post(
      'http://localhost:5400/login', 
      {
        "user_id": "anudeep_kadavergu"
      }, 
      {
        headers: {
            'Content-Type': 'application/json',
        }
      }
    )
    .then((response) => {
      
    })
    .catch((error) => {
      console.log(error);
    });
  
    return flag
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
        <Link
          onClick={handleLogin}
          to={`/chat`}
        >
          <button className="button mt-20" type="submit">
            LOGIN
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
