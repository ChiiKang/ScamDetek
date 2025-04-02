import React from "react";
import "./App.css";

const HomePage = ({ onNavigate }) => {
  return (
    <div className="home-page">
      {/* First section - hero with title and buttons */}
      <section className="hero-section">
        <h1 className="hero-title">
          <span className="gradient-text">Protect</span> Yourself{" "}
          <span className="gradient-text">from</span>
          <br />
          Online <span className="white-text">Scam</span>
        </h1>

        <p className="hero-description">
          All-in-one AI-powered platform that detects scams in URLs, emails, and
          SMS messages. We aim to reduce cyber fraud, educate users, and build a
          more resilient digital Malaysia.
        </p>

        <div className="button-container">
          <button
            className="gradient-button"
            onClick={() => onNavigate("detection")}
          >
            Get started
          </button>
          <button
            className="outline-button"
            onClick={() => onNavigate("knowledge")}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Second section - feature cards */}
      <section className="features-section">
        <div className="feature-cards">
          <div className="feature-card" onClick={() => onNavigate("knowledge")}>
            <h2 className="card-title">Scam Type</h2>
            <p className="card-description">
              Understand the different types of online scams
            </p>
          </div>

          <div className="feature-card" onClick={() => onNavigate("knowledge")}>
            <h2 className="card-title">Reporting Steps</h2>
            <p className="card-description">
              Get the scam reporting tutorial and flowchart
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
