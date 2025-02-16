import React, { useState } from "react";
import "./ChatbotModal.css";
import logo from "./chatboticon.png";

function ChatbotModal() {
  const [messages, setMessages] = useState([]);  // ✅ Correctly initialize messages
  const [input, setInput] = useState("");       // ✅ Correctly initialize input

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost/chatbot-project/backend/chatgpt.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatbot-modal">
      <header>
        <div className="chat-header">
          <img src={logo} alt="Chatbot Icon" />
          <span>Chatbot Assistance</span>
          <button className="close-button">X</button>
        </div>
      </header>

      {/* Chat Content */}
      <div className="chat-content">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.sender === "bot" && <img src={logo} alt="Chatbot" className="chatbot-reply-logo" />}
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Message Box */}
      <div className="chat-footer">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="chat-form">
          <input
            type="text"
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Message..."
            className="message-input"
            required
          />
          <button type="submit" className="material-symbol-rounded">➤</button>
        </form>
      </div>
    </div>
  );
}

export default ChatbotModal;
