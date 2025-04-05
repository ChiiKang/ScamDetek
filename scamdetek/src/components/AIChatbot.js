import React, { useState } from "react";
import "../App.css";

const AIChatbot = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Welcome! I'm your AI assistant for scam detection and prevention. How can I help you today?",
    },
  ]);

  const predefinedQuestion = "What are the recent banking scams in Malaysia?";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages([...messages, { type: "user", content: inputMessage }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          content:
            "I'm analyzing your query about scams. Common scams include SMS phishing, fake bank websites, and phone call scams. Always verify communications through official channels and never share your OTP or banking credentials.",
        },
      ]);
    }, 1000);

    setInputMessage("");
  };

  const handleQuestionClick = () => {
    // Add predefined question to messages
    setMessages([...messages, { type: "user", content: predefinedQuestion }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          content: `Recent banking scams in Malaysia include SMS phishing attempts, fake bank websites, and phone call scams. Here are some key prevention tips:
          
- Never click on suspicious links
- Verify bank communications through official channels
- Don't share OTP or banking credentials`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chat-sidebar">
          <h3 className="sidebar-title">Chat History</h3>
          <div className="chat-history-item active">
            <div className="history-title">Banking Scams</div>
            <div className="history-time">Today, 2:30 PM</div>
          </div>
          <div className="chat-history-item">
            <div className="history-title">Phishing Prevention</div>
          </div>
          <div className="chat-history-item">
            <div className="history-title">Suspicious URL</div>
          </div>
        </div>

        <div className="chat-main">
          <div className="chat-header">
            <h3 className="chat-title">AI Assistant</h3>
            <p className="chat-subtitle">
              I'm here to help you detect and prevent scams
            </p>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) =>
              message.type === "bot" ? (
                <div className="bot-message" key={index}>
                  <div className="bot-avatar">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        fill="black"
                      />
                      <path d="M11 10H10V14H14V13H11V10Z" fill="white" />
                    </svg>
                  </div>
                  <div className="message-content">
                    {message.content.split("\n").map((line, i) =>
                      line.startsWith("-") || line.startsWith("•") ? (
                        <div key={i} style={{ marginLeft: "15px" }}>
                          {line}
                        </div>
                      ) : (
                        <div key={i}>{line}</div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="user-message" key={index}>
                  <div className="message-content">{message.content}</div>
                </div>
              )
            )}

            {/* Predefined question */}
            {messages.length <= 1 && (
              <div className="question-bubble" onClick={handleQuestionClick}>
                {predefinedQuestion}
              </div>
            )}
          </div>

          <form className="chat-input-container" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="send-button">
              Send
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: "5px" }}
              >
                <path
                  d="M22 2L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
