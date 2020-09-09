import React from "react";
import { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

let socket;

const Chat = ({ location }) => {
  const [Name, setName] = useState("");
  const [Room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://chat-o.herokuapp.com/";
  useEffect(() => {
    const { Name, Room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(Room);
    setName(Name);

    socket.emit("join", { Name, Room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar Room={Room} />
        <Messages messages={messages} Name={Name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
