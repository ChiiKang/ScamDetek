import React, { useState } from "react";
import "../App.css";
import ReactMarkdown from "react-markdown";
const AIChatbot = () => {
  const [inputMessage, setInputMessage] = useState("");
  


  //new conversation window
  const [conversations, setConversations] = useState([{
    id: Date.now(),
    title: "New Chat",
    createdAt: new Date(),
    messages: [],
  }]);
  const [activeId, setActiveId] = useState(conversations[0].id);
  const activeConversation = conversations.find((c) => c.id === activeId);
  const [predefinedClicked, setPredefinedClicked] = useState(false);
  const updateActiveMessages = (newMessages) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeId ? { ...conv, messages: newMessages } : conv
      )
    );
  };

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      createdAt: new Date(),
      messages: [],
    };
    setConversations([newChat, ...conversations]);
    setActiveId(newChat.id);
    setInputMessage(""); // 清除输入框
    setPredefinedClicked(false);
  };
  //

  const predefinedQuestion = "💬 What are the recent banking scams in Malaysia?";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    if (activeConversation.title === "New Chat") {
      const firstWords = inputMessage.slice(0, 20);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeId ? { ...conv, title: firstWords } : conv
        )
      );
    }

    // Add user message
    const newMessages = [...(activeConversation?.messages || []), { type: "user", content: inputMessage }];
    setConversations((prev) =>
    prev.map((conv) =>
      conv.id === activeId ? { ...conv, messages: newMessages } : conv
    ));

    // // Simulate bot response
    // setTimeout(() => {
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     {
    //       type: "bot",
    //       content:
    //         "I'm analyzing your query about scams. Common scams include SMS phishing, fake bank websites, and phone call scams. Always verify communications through official channels and never share your OTP or banking credentials.",
    //     },
    //   ]);
    // }, 1000);

    // truely answer
    fetch("http://localhost:8000/api/ask-gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: inputMessage })
    })
      .then(res => res.json())
      .then(data => {
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeId
              ? {
                  ...conv,
                  messages: [
                    ...(conv.messages || []),
                    {
                      type: "bot",
                      content: data.answer || "Sorry, I couldn't get an answer.",
                    },
                  ],
                }
              : conv
          )
        );
      })
      .catch(err => {
        console.error("API error:", err);
        updateActiveMessages([
          ...(activeConversation?.messages || []),
          {
            type: "bot",
            content: "Something went wrong. Please try again later.",
          },
        ]);
      });


    setInputMessage("");
  };

  const handleQuestionClick = () => {
    setPredefinedClicked(true); 
    // Add predefined question to messages
    updateActiveMessages([
      ...(activeConversation?.messages || []),
      { type: "user", content: predefinedQuestion },
    ]);

    // Simulate bot response
    setTimeout(() => {
      updateActiveMessages([
        ...(activeConversation?.messages || []),
        {
          type: "bot",
          content: `### Recent banking scams in Malaysia
    
    Scam methods include:
    
    - **SMS phishing** pretending to be banks
    - **Fake bank websites** collecting login info
    - **Phone call frauds** asking for OTPs
    
    ### Prevention Tips
    
    - 🔒 Never click on suspicious links  
    - 📞 Always verify with official bank contact  
    - ❌ Never share your OTP or credentials`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chat-sidebar">
          <h3 className="sidebar-title">Chat History</h3>

          <div><button className="new-chat-btn" onClick={handleNewChat}>
              + New Chat
          </button></div>

          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`chat-history-item ${conv.id === activeId ? "active" : ""}`}
              onClick={() => setActiveId(conv.id)}
            >
              <div className="history-title">{conv.title}</div>
              <div className="history-time">
              Time:{conv.createdAt.toLocaleTimeString('en-GB', { hour12: false })}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-main">
          <div className="chat-header">
            <h3 className="chat-title">AI Assistant</h3>
            <p className="chat-subtitle">
              Welcome to our chatbot!
            </p>
          </div>

          <div className="chat-messages">
            {activeConversation?.messages.map((message, index) =>
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
                    {/* {message.content.split("\n").map((line, i) =>
                      line.startsWith("-") || line.startsWith("•") ? (
                        <div key={i} style={{ marginLeft: "15px" }}>
                          {line}
                        </div>
                      ) : (
                        <div key={i}>{line}</div>
                      )
                    )} */}
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                
                </div>
              ) : (
                <div className="user-message" key={index}>
                  <div className="message-content"><ReactMarkdown>{message.content}</ReactMarkdown></div>
                </div>
              )
            )}

            {/* Predefined question */}
            {activeConversation?.messages.length === 0 && !predefinedClicked && (
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
