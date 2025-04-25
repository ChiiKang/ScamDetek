import React, { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import ScamDetection from "./components/ScamDetection";
import AIChatbot from "./components/AIChatbot";
import KnowledgeHub from "./components/KnowledgeHub";
import ScamsType from "./components/ScamsType";
import ReportScams from "./components/ReportScams";
import ScamTypeDetail from "./components/ScamTypeDetail";
import AccessGate from "./components/AccessGate";
import GlobalDashboard from "./components/GlobalDashboard"; // Import GlobalDashboard

const App = () => {
  const [hasAccess, setHasAccess] = useState(() => {
    return localStorage.getItem("hasAccess") === "true";
  });

  const handleAccessGranted = () => {
    localStorage.setItem("hasAccess", "true");
    setHasAccess(true);
  };

  const [currentPage, setCurrentPage] = useState("home");
  const [pageParams, setPageParams] = useState(null);

  const handleNavigation = (page, params = null) => {
    setCurrentPage(page);
    setPageParams(params);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigation} />;
      case "detection":
        return <ScamDetection tab={pageParams && pageParams.tab} />;
      case "chatbot":
        return <AIChatbot />;
      case "knowledge":
        return <KnowledgeHub onNavigate={handleNavigation} />;
      case "scamsType":
        return <ScamsType onNavigate={handleNavigation} />;
      case "scamTypeDetail":
        return <ScamTypeDetail onNavigate={handleNavigation} params={pageParams} />;
      case "reportScams":
        return <ReportScams onNavigate={handleNavigation} />;
      case "dashboard":
        // Only show GlobalDashboard when the page is "dashboard"
        return <GlobalDashboard />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  // Gate check before rendering anything else
  if (!hasAccess) {
    return <AccessGate onAccessGranted={handleAccessGranted} />;
  }

  return (
    <div className={currentPage === "home" ? "black-background" : "app"}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container" onClick={() => handleNavigation("home")}>
          <img src="/logo.png" alt="ScamDetek Logo" className="logo" />
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
            className={`nav-link ${currentPage === "detection" ? "active" : ""}`}
            onClick={() => handleNavigation("detection")}
          >
            Scam Detection
          </button>
          <button
            className={`nav-link ${currentPage === "knowledge" ? "active" : ""}`}
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
          {/* Dashboard link */}
          <button
            className={`nav-link ${currentPage === "dashboard" ? "active" : ""}`}
            onClick={() => handleNavigation("dashboard")}
          >
            Dashboard
          </button>
        </div>

        <div className="social-links">
          <a href="#" className="social-link">
            {/* SVG icons */}
          </a>
          <a href="#" className="social-link">
            {/* SVG icons */}
          </a>
          <a href="#" className="social-link">
            {/* SVG icons */}
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {renderPage()}

        {/* Copyright Section */}
        <div className="copyright-section">
          <p className="copyright">©2025 ScamDetek. All rights reserved.</p>
          <p className="tagline">Protect yourself from online scam.</p>
        </div>
      </main>

      {/* Chatbot Icon - fixed at bottom right */}
      {currentPage !== "chatbot" && (
        <div className="chatbot-icon" onClick={() => handleNavigation("chatbot")}>
          <div className="chat-bubble">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;