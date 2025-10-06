// src/components/GroceryChat.jsx
import React, { useState, useContext } from "react";
import "../compStyles/GroceryChat.css"; 
import { userContext } from '../App';

function GroceryChat() {
  const { userID } = useContext(userContext);
  const [messages, setMessages] = useState([
    { role: "system", content: "Hi! 👋 Ask me anything about our grocery store." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userID, message: input }),
      });

      const data = await res.json();
      console.log(data.response);
      const botMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: " + err.message },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="messages">
          {messages.map((m, idx) => (
  <div
    key={idx}
    className={`message ${m.role === "user" ? "user" : "assistant"}`}
  >
    {m.content.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </div>
))}

        </div>
        <div className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about products..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default GroceryChat;
