import React, { useState } from "react";
import "./Input.css";
import { useSpeechRecognition } from 'react-speech-recognition';
import SendIcon from '@mui/icons-material/Send';


const Input = ({ message, setMessage, sendMessage }) => {
  const [loading, setLoading] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <>
      <form className="form">
        <input
          type="text"
          className="input"
          placeholder="Type a message.."
          value={message + transcript}
          onChange={(event) => {
            setMessage(event.target.value)
          }}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        {/* <button className="mic-button" onClick={(event) => sendMessage(event)} onDoubleClick={SpeechRecognition.startListening}><i className="fa fa-microphone fa-2x"></i></button> */}

        <button className="send-button" onClick={(event) => sendMessage(event)}>
          <SendIcon></SendIcon>
        </button>
      </form>

      <p>{transcript}</p>
    </>

  );
};

export default Input;
