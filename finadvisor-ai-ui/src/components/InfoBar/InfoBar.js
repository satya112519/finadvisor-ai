import React from "react";

import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
import LogoutIcon from '@mui/icons-material/Logout';

import "./InfoBar.css";

const InfoBar = (props) => {
  return (
    <div className="info-bar">
      <div className="leftInnerContainer">
        <img src={onlineIcon} alt="online-img" className="onlineIcon" />
        <h3>FinAdvisor AI</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
        <LogoutIcon sx={{color: "white"}}></LogoutIcon>
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
