import { useState } from 'react';
import '../styles/reportScams.scss'

const ReportScams = () => {
  const [activeSteps, setActiveSteps] = useState([false, false, false, false]);

  const toggleStep = (index) => {
    const newActiveSteps = [...activeSteps];
    newActiveSteps[index] = !newActiveSteps[index];
    setActiveSteps(newActiveSteps);
  };

  return (
    <main className="report-scams">
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
                <div className="step-button-text">
                  Have you experienced any of the following <span className="highlight">suspicious scenarios</span>?
                </div>
                <span className="dropdown-icon"></span>
              </button>
              <div className="step-content-expanded">
                <div className="scam-type-grid">
                  <div className="scam-type-card">
                    <i className="fas fa-user-lock"></i>
                    <p>I gave out my username and password.</p>
                  </div>
                  <div className="scam-type-card">
                    <i className="fas fa-credit-card"></i>
                    <p>I gave out my credit card details.</p>
                  </div>
                  <div className="scam-type-card">
                    <i className="fas fa-mobile-alt"></i>
                    <p>I gave out my OTP/TAC/MSOS.</p>
                  </div>
                  <div className="scam-type-card">
                    <i className="fas fa-user-shield"></i>
                    <p>Someone accessed my phone without authorization.</p>
                  </div>
                  <div className="scam-type-card">
                    <i className="fas fa-home"></i>
                    <p>I gave out my house address.</p>
                  </div>
                  <div className="scam-type-card">
                    <i className="fas fa-id-card"></i>
                    <p>I gave out my mother's maiden name.</p>
                  </div>
                  <div className="scam-type-card">
                    <i className="fas fa-lock"></i>
                    <p>I gave away my security phrase.</p>
                  </div>
                  <div className="scam-type-card">
                    <i className="fas fa-qrcode"></i>
                    <p>I scanned a suspicious QR code</p>
                  </div>
                </div>
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
                <div className="step-button-text">
                  If YES, change your<span className="highlight">password</span>immediately and report to the<span className="highlight">Appropriate Authority</span>.
                </div>
                <span className="dropdown-icon"></span>
              </button>
              <div className="step-content-expanded">
                <div className="authority-cards">
                  <div className="authority-card">
                    <h3>Royal Malaysia Police (PDRM)</h3>
                    <p>Recommended for: All types of scams, especially those involving threats, impersonation of government officials.</p>
                    <div className="contact-info">
                      <div>
                        <i className="fas fa-globe"></i>
                        <span>Report Online: <a href="#" className="highlight">Online PDRM Report</a></span>
                      </div>
                      <div>
                        <i className="fas fa-phone"></i>
                        <span>Hotline: <strong className="highlight">999</strong> (emergency) or <strong>03-2266 2222</strong> (general inquiries)</span>
                      </div>
                    </div>
                  </div>

                  <div className="authority-card">
                    <h3>CyberSecurity Malaysia (CSM) - Cyber999 Help Centre</h3>
                    <p>Recommended for: Online scams, cyber fraud, phishing, social media scams, and malicious URLs.</p>
                    <div className="contact-info">
                      <div>
                        <i className="fas fa-globe"></i>
                        <span>Report Online: <a href="#" className="highlight">Cyber999 Report Form</a></span>
                      </div>
                      <div>
                        <i className="fas fa-envelope"></i>
                        <span>Email: <a href="mailto:cyber999@cybersecurity.my" className="highlight">cyber999@cybersecurity.my</a></span>
                      </div>
                      <div>
                        <i className="fas fa-phone"></i>
                        <span>Hotline: <strong className="highlight">+603 - 8800 7999</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="authority-card">
                    <h3>National Scam Response Center (NSRC)</h3>
                    <p>Recommended for: Financial scams and fraud involving bank transactions or investment (e.g., Investment Scam, Job Scam, Money Mule Scam).</p>
                    <div className="contact-info">
                      <div>
                        <i className="fas fa-phone"></i>
                        <span>Hotline: <strong className="highlight">997</strong></span>
                      </div>
                      <div>
                        <i className="fas fa-clock"></i>
                        <span>Availability: 24/7 service for reporting financial scams.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`step ${activeSteps[2] ? 'active' : ''}`}>
            <div className="step-circle">
              <div className="step-number">3</div>
            </div>
            <div className="step-content">
              <button className="step-button" onClick={() => toggleStep(2)}>
                <div className="step-button-text">
                  Then make a <span className="highlight">police report</span> immediately.
                </div>
                <span className="dropdown-icon"></span>
              </button>
              <div className="step-content-expanded">
                <div className="map-container">
                  <div className="map-header">
                    <i className="fas fa-map-marker-alt"></i>
                    <h3>Find the closest police station</h3>
                  </div>
                  <a href="https://www.google.com/maps/search/Nearest+Police+Station" target="_blank" className="map-button">
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ReportScams
