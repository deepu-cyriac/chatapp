
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Header from './Header';

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const App = () => {
  const [messages, setMessages] = useState(["Hello And Welcome"]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("message", msg => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      setMessages([...messages, msg]);
    });
  };

  // On Change
  const onChange = e => {
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };
  return (
    <div class="text-center">
      <Header />
      {messages.length > 0 &&
        messages.map(msg => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
        <div class="form-group fixed-bottom">
      <input value={message} name="message" onChange={e => onChange(e)} class="form-control border-10"/>
      <button onClick={() => onClick()} type="button" class="btn btn-success">Send Message</button>
      </div>
    </div>
  );
};

export default App;
