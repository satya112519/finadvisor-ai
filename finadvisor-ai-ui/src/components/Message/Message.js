import React from "react";
import ReactEmoji from "react-emoji";
import ProfileIcon from "../../icons/profile.png";
import RobotIcon from "../../icons/robot.png";
import Button from "@mui/material/Button";

import "./Message.css";

const Message = ({ message: { text, user, buttons }, clickSendMessage }) => {
  let isSentByCurrentUser = false;
  let isSentByAdmin = false;

  const handleClick = (text) => {
    clickSendMessage(text);
  };

  const renderButtons = (buttons) => {
    const rows = [];
    for (let i = 0; i < buttons.length; i += 2) {
      const rowButtons = buttons.slice(i, i + 2);
      rows.push(
        <div key={i}>
          {rowButtons.map((button, index) => (
            <Button
              key={index}
              variant="contained"
              className="actions-button"
              value={button}
              onClick={() => handleClick(button)}
            >
              {button}
            </Button>
          ))}
        </div>
      );
    }
    return rows;
  };

  if (user === "admin") {
    isSentByAdmin = true;
  } else {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundOrange">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
      <div className="profile-box user">
        <img className="profile-icon" src={ProfileIcon} alt="img" />
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="profile-box robot">
        <img
          className="profile-icon"
          src={isSentByAdmin ? RobotIcon : ProfileIcon}
          alt="img"
        />
      </div>
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        <div style={{ paddingBottom: "3px" }}>
          {buttons ? renderButtons(buttons) : <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Message;
