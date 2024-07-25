import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import * as api from "../../api";

import "./Chat.css";

const Chat = ({ location }) => {
  const { state } = useLocation();
  const userData = state?.userData || {};
  const full_name = userData.LastName + ", " + userData.FirstName;
  const add =
    userData.Address +
    ", " +
    userData.City +
    ", " +
    userData.Country +
    ", " +
    userData.Zip;
  const [name, setName] = useState(full_name || "Olivia, Sophia");
  const [address, setAddress] = useState(
    add || "49 Featherstone Street, London, UK, EC1Y 8SY"
  );
  const [contact, setContact] = useState(userData.Phone1 || "+44 20 7123 4567");
  const [message, setMessage] = useState("");
  const nextMessage = {
    text: `Type or Select from below`,
    user: "admin",
    buttons: [
      "Personal Budgeting",
      "Portfolio Management",
      "Investments Recommendation",
      "Savings Optimization",
      "Debt Management",
      "Retirement Planning",
      "Expense Tracking",
      "Fraud Detection",
    ],
  };
  const [messages, setMessages] = useState([
    {
      text: `Hey👋 ${name}. How can i help you?!`,
      user: "admin",
      buttons: [
        "Personal Budgeting",
        "Portfolio Management",
        "Investments Recommendation",
        "Savings Optimization",
        "Debt Management",
        "Retirement Planning",
        "Expense Tracking",
        "Fraud Detection",
      ],
    },
  ]);

  const clickSendMessage = async (message) => {
    if (message) {
      const response = await api.processQuery({
        query: message,
        user_id: userData.UserID,
      });
      setMessages([
        ...messages,
        { text: message, user: name },
        response.data,
        nextMessage,
      ]);
    }
    setMessage("");
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message) {
      const response = await api.processQuery({
        query: message,
        user_id: userData.UserID,
      });
      setMessages([...messages, { text: message, user: name }, response.data]);
    }
    setMessage("");
  };

  return (
    <div className="page-wrapper" data-testid="chat-comp">
      <Helmet>
        <title>FinAdvisor AI</title>
      </Helmet>
      <div className="chat-wrapper">
        <div className="list-wrapper">
          <img src="lbglogo.png" alt="logo" width={250} height={100} />
          <h2>{full_name}</h2>
          <h4>{address}</h4>
          <h5>{contact}</h5>
        </div>
        <div className="messages-wrapper">
          <InfoBar name={name} />
          <Messages messages={messages} clickSendMessage={clickSendMessage} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
