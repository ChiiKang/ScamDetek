import React, { useState } from "react";
import "./reportScams.css";

const ReportScams = ({ onNavigate }) => {
  const [activeSteps, setActiveSteps] = useState([false, false, false, false]);

  const toggleStep = (index) => {
    const newActiveSteps = [...activeSteps];
    newActiveSteps[index] = !newActiveSteps[index];
    setActiveSteps(newActiveSteps);
  };

  return (
    <main className="report-scams">
      <div className="back-button" onClick={() => onNavigate("knowledge")}>
        ← Back to Knowledge Hub
      </div>
      
      <section className="hero">
        <h1>Report Scams Effectively<br />Protect Your Rights</h1>
      </section>

      <section className="steps-container">
        <div className="steps-wrapper">
          <div className={`step ${activeSteps[0] ? 'active' : ''}`}>
            <div className="step-circle">
              <div className="step-number">1</div>
              <div className="connection-line-1"></div>
            </div>
            <div className="step-content">
              <button className="step-button" onClick={() => toggleStep(0)}>
                Gather Evidence
                <span className="dropdown-icon"></span>
              </button>
              <div className="step-content-expanded">
                <ul>
                  <li>Screenshots and Photos: Capture any suspicious messages, emails, or online transactions.</li>
                  <li>Documents: Include receipts, transaction records, or any written communication.</li>
                  <li>Phone Call Records: Save any call logs or recordings (if legally permitted).</li>
                  <li>Bank Statements: Highlight any suspicious transactions.</li>
                  <li>URLs: Copy links related to fraudulent websites or QR codes.</li>
                  <li>Social Media Posts: Save any content that seems fraudulent.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`step ${activeSteps[1] ? 'active' : ''}`}>
            <div className="step-circle">
              <div className="step-number">2</div>
              <div className="connection-line-2"></div>
            </div>
            <div className="step-content">
              <button className="step-button" onClick={() => toggleStep(1)}>
                Report to the Relevant Authority
                <span className="dropdown-icon"></span>
              </button>
              <div className="step-content-expanded"> 
                <ul>
                  <li>Local police department for crime reports</li>
                  <li>Federal Trade Commission (FTC) for consumer fraud</li>
                  <li>Internet Crime Complaint Center (IC3) for online scams</li>
                  <li>Your country's specific fraud reporting authority</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`step ${activeSteps[2] ? 'active' : ''}`}>
            <div className="step-circle">
              <div className="step-number">3</div>
              <div className="connection-line-3"></div>
            </div>
            <div className="step-content">
              <button className="step-button" onClick={() => toggleStep(2)}>
                Contact Your Bank or Financial Institution
                <span className="dropdown-icon"></span>
              </button>
              <div className="step-content-expanded">
                <ul>
                  <li>Report fraudulent transactions and request charge reversals</li>
                  <li>Change your account passwords and PINs</li>
                  <li>Request new credit/debit cards if your information was compromised</li>
                  <li>Consider placing a fraud alert or credit freeze</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`step ${activeSteps[3] ? 'active' : ''}`}>
            <div className="step-circle">
              <div className="step-number">4</div>
            </div>
            <div className="step-content">
              <button className="step-button" onClick={() => toggleStep(3)}>
                Monitor Your Finances and Online Activity
                <span className="dropdown-icon"></span>
              </button>
              <div className="step-content-expanded">
                <ul>
                  <li>Check your account statements and credit reports regularly</li>
                  <li>Set up fraud alerts and transaction notifications</li>
                  <li>Use strong, unique passwords and enable two-factor authentication</li>
                  <li>Consider using identity theft protection services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReportScams;