import React, { useState } from "react";
import "./ScamDetection.css";
import ReactTooltip from "react-tooltip";

const ScamDetection = () => {
  const [activeTab, setActiveTab] = useState("sms");
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [sender, setSender] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setInputText("");
    setAnalysisResult(null);
    setError(null);
    setSender("");
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError("Please enter some content to analyze");
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Call the Python backend API
      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: inputText,
          content_type: activeTab,
          sender: sender,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Analysis failed");
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze content. Please try again.");

      // Only use simulation in development mode
      if (process.env.NODE_ENV === "development") {
        console.log("API failed, falling back to simulation");
        setAnalysisResult(simulateAnalysisResult(activeTab, inputText));
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper function to get risk color
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "High":
        return "#ff6b6b"; // Red that matches your theme
      case "Medium":
        return "#ffd166"; // Amber/yellow that fits dark theme
      case "Low":
        return "#4FD1C5"; // Your theme's teal color
      default:
        return "#4FD1C5"; // Default to your theme color
    }
  };

  const formatKey = (key) =>
    key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const senderFlagDescriptions = {
    is_valid_format: "Checks if the sender uses a valid email or phone format.",
    suspicious_tld: "Warns about risky domains like .ru, .tk, or .xyz.",
    spoofing_brand: "Detects brand names like PayPal or Amazon in the domain.",
    free_provider_impersonating_brand:
      "Free email pretending to be a legit brand.",
    too_many_subdomains:
      "Looks for long domains that might hide real identity.",
  };

  const getStatusIndicator = () => {
    if (!analysisResult) return null;

    const riskColor = getRiskColor(analysisResult.risk_level);

    return (
      <div
        className="status-indicator"
        style={{
          backgroundColor: riskColor,
          color: analysisResult.risk_level === "Low" ? "black" : "white",
        }}
      >
        {analysisResult.risk_level} Risk
      </div>
    );
  };

  // Render the analysis panel (right side)
  const renderAnalysisPanel = () => {
    if (isAnalyzing) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing your content...</p>
        </div>
      );
    }

    if (!analysisResult) {
      // Placeholder content when there's no analysis
      return (
        <div className="placeholder-content">
          <div className="placeholder-icon">🔍</div>
          <h3 className="placeholder-title">Ready to Analyze</h3>
          <p className="placeholder-text">
            Enter your{" "}
            {activeTab === "sms"
              ? "SMS message"
              : activeTab === "email"
              ? "email content"
              : "URL"}{" "}
            on the left and click "Start Analyze" to detect potential scams.
          </p>
          <div style={{ marginTop: "32px", opacity: 0.7 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#ff6b6b",
                  marginRight: "8px",
                }}
              ></span>
              <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                High Risk
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#ffd166",
                  marginRight: "8px",
                }}
              ></span>
              <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                Medium Risk
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#4FD1C5",
                  marginRight: "8px",
                }}
              ></span>
              <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                Low Risk
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="analysis-results">
        <div className="results-header">
          <h3>Analysis Results {getStatusIndicator()}</h3>
        </div>

        <div className="risk-meter-container">
          <div className="risk-meter-label">
            <span>Risk Score: {analysisResult.risk_percentage}%</span>
            <span className="ml-confidence">
              ML Confidence: {analysisResult.ml_confidence}
            </span>
          </div>
          <div className="risk-meter">
            <div
              className="risk-meter-fill"
              style={{
                width: `${analysisResult.risk_percentage}%`,
                backgroundColor: getRiskColor(analysisResult.risk_level),
              }}
            ></div>
          </div>
        </div>

        <div className="results-content">
          <div className="results-columns">
            <div className="flags-column">
              <h4>Warning Signs</h4>
              <ul className="flags-list">
                {Object.entries(analysisResult.flags).map(([key, value]) => {
                  if (!value) return null;

                  const formattedKey = formatKey(key);
                  const explanation =
                    analysisResult.explanations?.[key] ||
                    "This may indicate scam behavior.";

                  return (
                    <li key={key} className="flag-item" data-tip={explanation}>
                      <span className="flag-indicator">⚠️</span>
                      <span>{formattedKey}</span>
                    </li>
                  );
                })}
              </ul>
              <ReactTooltip place="top" type="dark" effect="solid" />
            </div>
            <div className="metadata-column">
              <h4>Detected Traits</h4>
              <div className="metadata-list">
                {Object.entries(analysisResult.metadata).map(([key, value]) => {
                  if (
                    key === "sender_analysis" ||
                    value === null ||
                    value === undefined
                  )
                    return null;

                  const formattedKey = key
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                  let formattedValue;

                  if (Array.isArray(value)) {
                    formattedValue =
                      value.length > 0 ? (
                        <ul className="metadata-array">
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        "None"
                      );
                  } else if (typeof value === "object") {
                    formattedValue = (
                      <table className="metadata-table">
                        <thead>
                          <tr>
                            <th>Trait</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(value).map(
                            ([subKey, subVal], index) => (
                              <tr key={index}>
                                <td>
                                  {subKey
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                                </td>
                                <td>
                                  {subVal === true
                                    ? "✅ Yes"
                                    : subVal === false
                                    ? "❌ No"
                                    : String(subVal)}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    );
                  } else {
                    formattedValue =
                      typeof value === "boolean"
                        ? value
                          ? "Yes"
                          : "No"
                        : value;
                  }

                  return (
                    <div key={key} className="metadata-item">
                      <span className="metadata-key">{formattedKey}:</span>
                      <span className="metadata-value">{formattedValue}</span>
                    </div>
                  );
                })}
              </div>
              <div className="sender_analysis">
                <h4>Sender Analysis</h4>
                {analysisResult.metadata?.sender_analysis && (
                  <div className="sender-analysis-column">
                    <ul className="sender-analysis-list">
                      {Object.entries(
                        analysisResult.metadata.sender_analysis
                      ).map(([key, value], index) => {
                        if (key === "is_short_code") return null;
                        if (key === "is_valid_format") return null;

                        const formattedKey = key
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ");

                        if (key === "phone_type") {
                          return (
                            <li key={index} className="sender-analysis-item">
                              <span className="sender-analysis-key">
                                {formattedKey}
                              </span>
                              <span
                                className="sender-analysis-status"
                                style={{ color: "#4FD1C5" }}
                              >
                                {value}
                              </span>
                            </li>
                          );
                        }

                        const isFlagged =
                          key === "is_valid_format" ? !value : value;
                        const statusIcon = isFlagged ? "⚠️" : "✅";
                        const statusText = isFlagged ? "Suspicious" : "Safe";
                        const statusColor = isFlagged ? "#ffc107" : "#4CAF50";

                        return (
                          <li
                            key={index}
                            className="sender-analysis-item"
                            data-tip={senderFlagDescriptions[key] || ""}
                          >
                            <span className="sender-analysis-key">
                              {formattedKey}
                            </span>
                            <span
                              className="sender-analysis-status"
                              style={{ color: statusColor }}
                            >
                              {statusIcon} {statusText}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <ReactTooltip effect="solid" place="top" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="detection-page">
      <div className="detection-container">
        {/* Sidebar */}
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
            className={`sidebar-button ${activeTab === "url" ? "active" : ""}`}
            onClick={() => handleTabClick("url")}
          >
            URL Detection
          </button>
        </div>

        {/* Main content */}
        <div className="detection-content">
          {/* Input section */}
          <div className="input-section">
            <input
              type="text"
              className="sender-input"
              placeholder={
                activeTab === "sms"
                  ? "Enter sender phone number"
                  : activeTab === "email"
                  ? "Enter sender email address"
                  : "Sender information (optional)"
              }
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />

            <textarea
              className="detection-textarea"
              placeholder={`Please paste ${
                activeTab === "sms"
                  ? "SMS"
                  : activeTab === "email"
                  ? "email"
                  : "URL"
              } content here...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>

            <div className="analyze-button-container">
              <button
                className="analyze-button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Start Analyze"}
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}
          </div>

          {/* Analysis panel (right side) */}
          {renderAnalysisPanel()}
        </div>
      </div>
    </div>
  );
};

export default ScamDetection;
