import React, { useState, useEffect } from "react";
import "./scamsTypeDetail.css";
import { scamsTypeList } from "../utils/const";

const ScamsTypeDetail = ({ onNavigate, params }) => {
  const title = params?.title || "";
  const [scamType, setScamType] = useState(
    scamsTypeList.find(scam => scam.title === title) || scamsTypeList[0]
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="scams-type-detail">
      <div className="back-button" onClick={() => onNavigate("scamsType")}>
        ← Back to Scam Types
      </div>
      
      <div className="main-content">
        <div className="phone-scam-section">
          <div className="scam-icon">
            <img src={scamType.cardIcon} alt={`${scamType.title} icon`} className="card-icon" />
          </div>
          <div className="scam-description">
            <h1 style={{ textAlign: 'left' }}>{scamType.title}</h1>
            <p>{scamType.description}</p>
          </div>
        </div>
        <h2 className="section-title">How Does It Happen?</h2>
        <div className="process-container">
          <div className="example-box">
            <p>Example of a scammer impersonating a delivery company personnel:</p>
            <div className="audio-player">
              <audio controls>
                <source src="#" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          <div className="steps-container">
            {scamType.howItHappens && scamType.howItHappens.map((step, index) => (
              <div className="step" key={index}>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">{step}</div>
              </div>
            ))}
          </div>
        </div>
        <h2 className="section-title">How to Defend?</h2>
        <div className="defense-box">
          <ul>
            {scamType.defense && scamType.defense.map((defense, index) => (
              <li key={index}>{defense}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScamsTypeDetail;