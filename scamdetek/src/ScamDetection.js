import React, { useState } from "react";
import "./App.css";

const ScamDetection = () => {
  const [activeTab, setActiveTab] = useState("sms");
  const [inputText, setInputText] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setInputText("");
  };

  return (
    <div className="detection-page">
      <div className="detection-container">
        <div className="detection-sidebar">
          <button
            className={`sidebar-button ${
              activeTab === "email" ? "active" : ""
            }`}
            onClick={() => handleTabClick("email")}
          >
            Email Detection
          </button>
          <button
            className={`sidebar-button ${activeTab === "sms" ? "active" : ""}`}
            onClick={() => handleTabClick("sms")}
          >
            SMS Detection
          </button>
          <button
            className={`sidebar-button ${activeTab === "ocr" ? "active" : ""}`}
            onClick={() => handleTabClick("ocr")}
          >
            OCR Text Detection
          </button>
          <button
            className={`sidebar-button ${activeTab === "url" ? "active" : ""}`}
            onClick={() => handleTabClick("url")}
          >
            URL Detection
          </button>
        </div>

        <div className="detection-content">
          <textarea
            className="detection-textarea"
            placeholder={`Please paste ${
              activeTab === "sms"
                ? "SMS"
                : activeTab === "email"
                ? "email"
                : activeTab === "ocr"
                ? "text from image"
                : "URL"
            } content here...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>

          <button className="analyze-button">Start Analyze</button>
        </div>
      </div>
    </div>
  );
};

export default ScamDetection;
