import React from "react";
import "../App.css";

const HomePage = ({ onNavigate }) => {
  return (
    <div className="home-wrapper">
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <div className="gradient-text">Protect Your Digital World</div>
            <div className="gradient-text">from Online Scams</div>
          </h1>

          <p className="hero-description">
            AI-powered tools to detect and protect against online scams, ensuring your safety across{" "}
            <span className="highlight">emails</span>, <span className="highlight">URLs</span>, and <span className="highlight">SMS messages</span>.
          </p>

          <button className="get-started-btn" onClick={() => onNavigate("detection")}>
            Get started
          </button>
        </div>

        <div className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="offer-section">
        <h2 className="section-title">
          <span className="gradient-text">What We</span>{" "}
          <span className="gradient-text">Offer</span>
        </h2>
        <p className="offer-description">
          We offer an AI-powered platform to protect you from online scams in{" "}
          <span className="highlight">emails</span>, <span className="highlight">SMS</span>, and malicious{" "}
          <span className="highlight">URLs</span>. Our tools help identify fraud, provide{" "}
          <span className="highlight">educational resources</span>, and offer{" "}
          <span className="highlight">AI chatbot</span> and{" "}
          <span className="highlight">interactive learning</span> to keep you safe in Malaysia's digital world.
        </p>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-chart">
          <h3>Majority of scams are delivered via phone calls or instant messaging apps</h3>
          <div className="chart-container">
            <div className="chart-item">
              <span className="chart-label">Email</span>
              <div className="chart-bar" style={{ width: "38%" }}>38%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">Post on social media</span>
              <div className="chart-bar" style={{ width: "44%" }}>44%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">SMS messages</span>
              <div className="chart-bar" style={{ width: "62%" }}>62%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">Instant messaging applications</span>
              <div className="chart-bar" style={{ width: "81%" }}>81%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">Phone call</span>
              <div className="chart-bar" style={{ width: "81%" }}>81%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">Online communities or Forums</span>
              <div className="chart-bar" style={{ width: "16%" }}>16%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">Online marketplaces</span>
              <div className="chart-bar" style={{ width: "22%" }}>22%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">Interact in person</span>
              <div className="chart-bar" style={{ width: "18%" }}>18%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">Dating sites or apps</span>
              <div className="chart-bar" style={{ width: "12%" }}>12%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">Postal services</span>
              <div className="chart-bar" style={{ width: "10%" }}>10%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">Live video streaming platforms</span>
              <div className="chart-bar" style={{ width: "7%" }}>7%</div>
            </div>
            <div className="chart-item">
              <span className="chart-label">None of the above</span>
              <div className="chart-bar" style={{ width: "12%" }}>12%</div>
            </div>
          </div>
        </div>

        <div className="stats-info">
          <h2 className="section-title">
            Why You <span className="gradient-text">Need Us</span>
          </h2>
          <div className="stats-details">
            <p>
              In 2024, Malaysians lost <span className="highlight">$12.8 billion</span> in scams,
              equivalent to 3% of the country's gross domestic product.
            </p>
            <p>
              Approximately <span className="highlight">74%</span> of respondents said they
              were targeted by scammers at least once a month.
            </p>
            <p className="warning-text">
              Don't wait until you're the next victim!
            </p>
          </div>
        </div>
      </section>

      {/* Let's Start Section */}
      <section className="start-section">
        <h2 className="section-title">
          Let's <span className="gradient-text">Start !</span>
        </h2>
        <div className="detection-options">
          <div className="detection-card" onClick={() => onNavigate("detection")}>
            <h3>Email Scam</h3>
            <p>Paste Email content to analyze</p>
          </div>
          <div className="detection-card" onClick={() => onNavigate("detection")}>
            <h3>SMS Scam</h3>
            <p>Paste SMS content to analyze</p>
          </div>
          <div className="detection-card" onClick={() => onNavigate("detection")}>
            <h3>URL Scam</h3>
            <p>Paste URL content to analyze</p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default HomePage;
