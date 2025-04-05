import React, { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import ScamDetection from "./components/ScamDetection";
import AIChatbot from "./components/AIChatbot";


// Import the logo
// Note: You'll need to add your own logo file to the public folder
// or replace this with your actual logo import

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigation} />;
      case "detection":
        return <ScamDetection />;
      case "chatbot":
        return <AIChatbot />;
      case "knowledge":
        // Knowledge Hub would be implemented here
        return (
          <div className="coming-soon">
            <h2>Knowledge Hub</h2>
            <p>This section is coming soon!</p>
          </div>
        );
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div
          className="logo-container"
          onClick={() => handleNavigation("home")}
        >
          <img
            src="/logo.svg"
            alt="ScamDetek Logo"
            className="logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/40x40?text=SD";
            }}
          />
          <span className="logo-text">ScamDetek</span>
        </div>

        <div className="nav-links">
          <button
            className={`nav-link ${currentPage === "home" ? "active" : ""}`}
            onClick={() => handleNavigation("home")}
          >
            Home
          </button>
          <button
            className={`nav-link ${
              currentPage === "detection" ? "active" : ""
            }`}
            onClick={() => handleNavigation("detection")}
          >
            Scam Detection
          </button>
          <button
            className={`nav-link ${
              currentPage === "knowledge" ? "active" : ""
            }`}
            onClick={() => handleNavigation("knowledge")}
          >
            Knowledge Hub
          </button>
          <button
            className={`nav-link ${currentPage === "chatbot" ? "active" : ""}`}
            onClick={() => handleNavigation("chatbot")}
          >
            AI Chatbot
          </button>
        </div>

        <div className="social-links">
          <a href="#" className="social-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#" className="social-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#" className="social-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#" className="social-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 4.01C21 4.5 20.02 4.5 19 5C17.9 3.9 16.5 3.5 15 3.5C11.96 3.5 9.5 5.96 9.5 9C9.5 9.3 9.5 9.6 9.6 9.9C6.73 9.84 4.11 8.39 2 6C1.7 6.6 1.5 7.3 1.5 8C1.5 9.4 2.2 10.6 3.3 11.3C2.5 11.3 1.8 11.1 1 10.8C1 12.96 2.65 14.76 4.8 15.09C4.5 15.2 4.2 15.2 3.9 15.2C3.7 15.2 3.5 15.2 3.3 15.1C3.7 16.9 5.4 18.1 7.3 18.1C5.6 19.2 3.5 19.8 1.3 19.8C1 19.8 0.7 19.8 0.4 19.7C2.3 20.9 4.5 21.5 6.8 21.5C15 21.5 19.5 14.5 19.5 8.5C19.5 8.3 19.5 8.1 19.5 7.9C20.5 7.2 21.3 6.3 22 5.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">{renderPage()}</main>

      {/* Chatbot Icon - fixed at bottom right */}
      {currentPage !== "chatbot" && (
        <div
          className="chatbot-icon"
          onClick={() => handleNavigation("chatbot")}
        >
          <div className="chat-bubble">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="robot-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
                fill="#4FD1C5"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p className="copyright">©2025 ScamDetek. All rights reserved.</p>
        <p className="tagline">Protect yourself from online scam.</p>
      </footer>
    </div>
  );
};

export default App;
