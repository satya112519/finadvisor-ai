import React, { useState } from "react";
import "./Input.css";
import SendIcon from "@mui/icons-material/Send";

const Input = ({ message, setMessage, sendMessage }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <form className="form">
        <input
          type="text"
          className="input"
          placeholder="Type a message.."
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyPress={(event) => event?.key === "Enter" && sendMessage(event)}
          data-testid="question"
        />
        {/* <button className="mic-button" onClick={(event) => sendMessage(event)} onDoubleClick={SpeechRecognition.startListening}><i className="fa fa-microphone fa-2x"></i></button> */}

        <button
          className="send-button"
          data-testid="send-button"
          onClick={(event) => sendMessage(event)}
        >
          <SendIcon></SendIcon>
        </button>
      </form>
    </>
  );
};

export default Input;
