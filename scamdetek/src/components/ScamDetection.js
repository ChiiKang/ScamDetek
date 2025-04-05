import React, { useState } from "react";
import apiService from "../services/apiService";

const ScamDetection = () => {
  const [activeTab, setActiveTab] = useState("sms");
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setInputText("");
    setAnalysisResult(null);
    setError(null);
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
      // Use the apiService to analyze the content
      const result = await apiService.analyzeContent(inputText, activeTab);
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

  const getStatusIndicator = () => {
    if (!analysisResult) return null;

    const riskColor = getRiskColor(analysisResult.risk_level);

    return (
      <div
        className="ml-2.5 py-1 px-3 rounded-full font-bold text-sm inline-block"
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
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-10">
          <div className="w-10 h-10 border-4 border-transparent border-l-[#4FD1C5] rounded-full animate-spin mb-4"></div>
          <p className="text-white text-opacity-80">
            Analyzing your content...
          </p>
        </div>
      );
    }

    if (!analysisResult) {
      return null; // Show nothing on the right until analysis is started
    }

    return (
      <div className="w-full md:w-1/2 bg-opacity-30 bg-[#282828] rounded-lg overflow-hidden border border-opacity-20 border-[#4FD1C5] max-h-[650px] overflow-y-auto">
        <div className="bg-[#141414] bg-opacity-70 sticky top-0 z-10 p-4 border-b border-opacity-20 border-[#4FD1C5]">
          <h3 className="text-lg text-white flex items-center m-0">
            Analysis Results {getStatusIndicator()}
          </h3>
        </div>

        <div className="p-5 bg-[#141414] bg-opacity-40 border-b border-opacity-10 border-[#4FD1C5]">
          <div className="flex justify-between mb-2 font-medium text-white text-opacity-90">
            <span>Risk Score: {analysisResult.risk_percentage}%</span>
            <span className="text-white text-opacity-60 text-sm">
              ML Confidence: {analysisResult.ml_confidence}
            </span>
          </div>
          <div className="h-6 bg-[#282828] bg-opacity-70 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${analysisResult.risk_percentage}%`,
                backgroundColor: getRiskColor(analysisResult.risk_level),
              }}
            ></div>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-6">
            <h4 className="text-[#4FD1C5] mb-4 text-base font-normal mt-0">
              Warning Signs
            </h4>
            <ul className="list-none p-0 m-0 space-y-2">
              {Object.entries(analysisResult.flags).map(([key, value]) => {
                // Skip false flags
                if (!value) return null;

                // Format the flag key for display
                const formattedKey = key
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <li
                    key={key}
                    className="flex items-center gap-2.5 p-3 bg-[#3e2929] bg-opacity-10 rounded-md border-l-4 border-[#ff6b6b] text-sm text-white text-opacity-90"
                  >
                    <span className="text-base">⚠️</span>
                    <span>{formattedKey}</span>
                  </li>
                );
              })}

              {/* Show message when no warning signs are detected */}
              {analysisResult.flags &&
                Object.values(analysisResult.flags).every((v) => !v) && (
                  <li className="p-3 text-gray-400 italic text-center">
                    No warning signs detected
                  </li>
                )}
            </ul>
          </div>

          <div>
            <h4 className="text-[#4FD1C5] mb-4 text-base font-normal mt-0">
              Detected Traits
            </h4>
            <div className="flex flex-col gap-2.5">
              {Object.entries(analysisResult.metadata).map(([key, value]) => {
                // Skip null or undefined values
                if (value === null || value === undefined) return null;

                // Format the key for display
                const formattedKey = key
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                // Format the value based on its type
                let formattedValue;
                if (Array.isArray(value)) {
                  formattedValue =
                    value.length > 0 ? (
                      <ul className="list-disc ml-5 mt-1.5 p-0 text-white text-opacity-80">
                        {value.map((item, index) => (
                          <li key={index} className="mb-1">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "None"
                    );
                } else {
                  formattedValue =
                    typeof value === "boolean" ? (value ? "Yes" : "No") : value;
                }

                return (
                  <div
                    key={key}
                    className="p-2.5 bg-[#1e3a4a] bg-opacity-10 rounded-md border-l-4 border-[#4FD1C5] text-sm"
                  >
                    <span className="font-semibold text-[#4FD1C5] mr-1.5">
                      {formattedKey}:
                    </span>
                    <span className="text-white text-opacity-90">
                      {formattedValue}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="flex bg-[#282828] bg-opacity-30 rounded-[20px] overflow-hidden min-h-[700px]">
        {/* Sidebar with soft transitions */}
        <div className="w-[200px] flex flex-col bg-gradient-to-b from-[rgba(40,40,40,0.5)] to-[rgba(79,209,197,0.2)] flex-shrink-0 py-5">
          <button
            className={`text-left px-5 py-4 border-none cursor-pointer transition-all duration-300 ease-in-out ${
              activeTab === "email"
                ? "bg-[#4FD1C5] text-black font-medium"
                : "text-[#4FD1C5] hover:bg-[rgba(79,209,197,0.1)]"
            }`}
            onClick={() => handleTabClick("email")}
          >
            Email Detection
          </button>
          <button
            className={`text-left px-5 py-4 border-none cursor-pointer transition-all duration-300 ease-in-out ${
              activeTab === "sms"
                ? "bg-[#4FD1C5] text-black font-medium"
                : "text-[#4FD1C5] hover:bg-[rgba(79,209,197,0.1)]"
            }`}
            onClick={() => handleTabClick("sms")}
          >
            SMS Detection
          </button>
          <button
            className={`text-left px-5 py-4 border-none cursor-pointer transition-all duration-300 ease-in-out ${
              activeTab === "url"
                ? "bg-[#4FD1C5] text-black font-medium"
                : "text-[#4FD1C5] hover:bg-[rgba(79,209,197,0.1)]"
            }`}
            onClick={() => handleTabClick("url")}
          >
            URL Detection
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 p-7 flex flex-col md:flex-row gap-6">
          {/* Input section */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <textarea
              className="w-full h-[300px] bg-[rgba(30,30,30,0.5)] border border-[rgba(255,255,255,0.1)] rounded-[10px] p-4 text-white resize-none mb-5 text-base focus:outline-none focus:border-[#4FD1C5] transition-colors duration-300 ease-in-out"
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

            <button
              className="self-center px-10 py-3 rounded-[50px] font-bold text-black bg-gradient-to-r from-[#4FD1C5] to-[#68D391] hover:opacity-90 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed border-none text-base transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Start Analyze"}
            </button>

            {error && (
              <div className="bg-[rgba(229,62,62,0.1)] text-[#ff6b6b] p-3 rounded-[10px] border-l-4 border-[#ff6b6b] mb-5 animate-fadeIn">
                {error}
              </div>
            )}
          </div>

          {/* Analysis panel (right side) */}
          {renderAnalysisPanel()}
        </div>
      </div>
    </div>
  );
};

// Helper function to simulate analysis results for demo purposes
// This will be used as a fallback if the API fails
const simulateAnalysisResult = (contentType, content) => {
  const lowerContent = content.toLowerCase();

  // Common suspicious terms to check
  const hasUrgentLanguage =
    /urgent|immediately|warning|alert|now|act now|hurry/i.test(lowerContent);
  const hasFinancialTerms =
    /bank|account|credit|debit|money|payment|transfer|financial/i.test(
      lowerContent
    );
  const hasSensitiveRequests =
    /password|verify|otp|pin|authenticate|login|credentials|confirm/i.test(
      lowerContent
    );
  const hasSuspiciousLinks = /http|www|\.com|\.net|click/i.test(lowerContent);
  const hasThreats =
    /suspend|disable|close|terminate|legal|police|arrest|criminal/i.test(
      lowerContent
    );

  // Calculate base risk score based on content
  let baseRiskScore = 0;
  if (hasUrgentLanguage) baseRiskScore += 20;
  if (hasFinancialTerms) baseRiskScore += 15;
  if (hasSensitiveRequests) baseRiskScore += 25;
  if (hasSuspiciousLinks) baseRiskScore += 20;
  if (hasThreats) baseRiskScore += 20;

  // Add some randomness to make it more realistic
  const randomFactor = Math.floor(Math.random() * 20);
  const riskPercentage = Math.min(100, baseRiskScore + randomFactor);

  // Determine risk level
  let riskLevel = "Low";
  if (riskPercentage > 70) riskLevel = "High";
  else if (riskPercentage > 40) riskLevel = "Medium";

  // Construct the result object
  const result = {
    risk_level: riskLevel,
    risk_percentage: riskPercentage,
    ml_confidence: (0.5 + Math.random() * 0.4).toFixed(2),
    flags: {
      has_threatening_language: hasThreats,
      creates_urgency: hasUrgentLanguage,
      asks_sensitive_info: hasSensitiveRequests,
      suspicious_links: hasSuspiciousLinks,
      grammar_errors: Math.random() > 0.6,
      no_personal_greeting:
        !lowerContent.includes("dear") && contentType === "email",
      url_mismatch:
        contentType === "email" && Math.random() > 0.7 && hasSuspiciousLinks,
    },
    metadata: {
      word_count: content.split(/\s+/).length,
      character_count: content.length,
      link_count: (content.match(/http|www|\.com|\.net/gi) || []).length,
    },
  };

  // Add content-type specific metadata
  if (contentType === "email") {
    result.metadata.subject = content.split("\n")[0].slice(0, 50);
    if (content.includes("@")) {
      result.metadata.sender_domain =
        content.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)?.[1] || "unknown";
    }

    if (hasSensitiveRequests) {
      result.metadata.sensitive_keywords_found = [
        "password",
        "verify",
        "confirm",
      ].filter((word) => lowerContent.includes(word));
    }

    if (hasThreats) {
      result.metadata.threat_keywords_found = [
        "urgent",
        "warning",
        "suspend",
        "legal",
      ].filter((word) => lowerContent.includes(word));
    }
  } else if (contentType === "url") {
    result.metadata.domain =
      content.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+)/i)?.[1] || content;
    result.metadata.uses_https = content.startsWith("https://");
    result.metadata.suspicious_tld =
      /\.(tk|ml|ga|gq|cf|xyz|top|loan|info)$/i.test(content);
  }

  return result;
};

export default ScamDetection;
