import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import "./Chat.css";

const Chat = ({ location }) => {
  const [name, setName] = useState("Olivia, Sophia");
  const [address, setAddress] = useState({})
  const [psswd, setpsswd] = useState("");
  const [message, setMessage] = useState("");
  const nextMessage = { "text": `Type or Select from below`, "user": "admin", "buttons": ["Personal Budgeting", "Portfolio Management", "Investments Recommendation", "Savings Optimization", "Debt Management", "Retirement Planning", "Expense Tracking", "Fraud Detection"]}
  const [messages, setMessages] = useState([{ "text": `Hey👋 Olivia, Sophia. How can i help you?!`, "user": "admin", "buttons": ["Personal Budgeting", "Portfolio Management", "Investments Recommendation", "Savings Optimization", "Debt Management", "Retirement Planning", "Expense Tracking", "Fraud Detection"]}]);
  const [users, setUsers] = useState([]);

  const clickSendMessage = (message) => {
    if (message) {
      axios.post(
        'http://localhost:5400/process_query', 
        {
          "query": message,
          "user_id": "olivia_sophia"
        }, 
        {
          headers: {
              'Content-Type': 'application/json',
          }
        }
      )
      .then((response) => {
        // let k = messages
        // k.push({'text': message, 'user': 'SOUTH HILLS'})
        // k.push(response.data)
        setMessages([...messages, {'text': message, 'user': 'Olivia, Sophia'}, response.data, nextMessage]);

      })
      .catch((error) => {
        console.log(error);
      });
      
    }
    setMessage("")
  }

  const sendMessage = (event) => {
    // setMessages([...messages, {'text': message, 'user': 'SOUTH HILLS'}]);
    event.preventDefault();
    if (message) {
      axios.post(
        'http://localhost:5400/process_query', 
        {
          "query": message,
          "user_id": "olivia_sophia"
        }, 
        {
          headers: {
              'Content-Type': 'application/json',
          }
        }
      )
      .then((response) => {
        // let k = messages
        // k.push({'text': message, 'user': 'SOUTH HILLS'})
        // k.push(response.data)
        setMessages([...messages, {'text': message, 'user': 'Olivia, Sophia'}, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
    setMessage("")
    
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>FinAdvisor AI</title>
      </Helmet>
      <div className="chat-wrapper">
        <div className="list-wrapper">
        <img src="lbglogo.png" alt="logo" width={250} height={100} />
          <h2>Olivia, Sophia</h2>
          <h4>49 Featherstone Street, London, UK, EC1Y 8SY</h4>
          <h5>+44 20 7123 4567</h5>

        </div>
        <div className="messages-wrapper">
          <InfoBar name={name} />
          <Messages messages={messages} clickSendMessage={clickSendMessage}/>
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
