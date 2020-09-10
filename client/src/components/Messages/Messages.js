import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Messages.css";
import Message from "../Message/Message.js";

const Messages = ({ messages, Name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} Name={Name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
