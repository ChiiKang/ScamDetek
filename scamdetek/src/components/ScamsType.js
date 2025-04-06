import React, { useState, useEffect } from "react";
import "./scamsType.css";

const ScamsType = ({ onNavigate }) => {
  const [isHiddenCardsVisible, setIsHiddenCardsVisible] = useState(false);

  const scamCardList = [
    {
      title: 'Phishing Scam',
      description: 'Pretending to be a trusted source to steal personal info or money.',
      cardIcon: '/assets/img/phishing-scam.png'
    },
    {
      title: 'Online Shopping Scam',
      description: 'Selling fake products or taking money without delivering items.',
      cardIcon: '/assets/img/online-shopping-scam.png'
    },
    {
      title: 'Romance Scam',
      description: 'Pretending to be in love to trick victims into sending money.',
      cardIcon: '/assets/img/romance-scam.png'
    },
    {
      title: 'Job Scam',
      description: 'Promising high-paying jobs to collect fees or personal info.',
      cardIcon: '/assets/img/job-scam.png'
    },
    {
      title: 'Investment Scam',
      description: 'Offering fake high-return investments to steal money.',
      cardIcon: '/assets/img/investment-scam.png'
    },
    {
      title: 'Phone Scam',
      description: 'Calling as officials or companies to get money or personal info.',
      cardIcon: '/assets/img/phone-scam.png'
    },
    {
      title: 'Social Media Scam',
      description: 'Posting fake links or info to steal data or spread malware.',
      cardIcon: '/assets/img/social-media-scam.png'
    },
    {
      title: 'Parcel Scam',
      description: 'Claiming a package is waiting but needs a fee or info to collect.',
      cardIcon: '/assets/img/parcel-scam.png'
    },
  ];

  const showMoreScamCardList = [
    {
      title: 'Lottery Scam',
      description: 'Claiming a prize win but asking for a fee to claim it.',
      cardIcon: '/assets/img/lottery-scam.png'
    },
    {
      title: 'QR Scams (Quishing)',
      description: 'Scanning fake QR codes that lead to your personal information being exposed.',
      cardIcon: '/assets/img/qr-scam.png'
    },
    {
      title: 'Car Accident Scam',
      description: 'Causing a minor accident to extort money.',
      cardIcon: '/assets/img/car-accident-scam.png'
    },
    {
      title: 'Home Purchase Scam',
      description: 'Advertising fake properties to collect deposits.',
      cardIcon: '/assets/img/home-purchase-scam.png'
    },
  ];

  const toggleHiddenCards = () => {
    setIsHiddenCardsVisible(!isHiddenCardsVisible);
  };

  const goToScamsTypeDetail = (title) => {
    onNavigate("scamsTypeDetail", { title });
  };

  // Scroll to top when component mounts
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <main>
      <div className="back-button" onClick={() => onNavigate("knowledge")}>
        ← Back to Knowledge Hub
      </div>
      
      <h1>Scams to Watch Out For</h1>
      <p className="subtitle">Stay informed of the latest scam tactics in Malaysia.</p>

      {/* Grid layout with 4 cards per row */}
      <div className="scam-grid">
        {scamCardList.map((scam) => (
          <div 
            className="scam-card" 
            key={scam.title}
            onClick={() => goToScamsTypeDetail(scam.title)}
          >
            {/* Initial 8 cards */}
            <img src={scam.cardIcon} alt="scam-card-icon" className="card-icon" />
            <h3 className="card-title">{scam.title}</h3>
            <p className="card-description">{scam.description}</p>
            <button className="learn-more">
              Learn More 
              <span className="learn-more-arrow">
                <svg className="arrow-icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                  <path
                    d="M323.114667 178.346667l426.624 298.325333a42.666667 42.666667 0 0 1 0 69.930667l-426.624 298.538666A42.666667 42.666667 0 0 1 256 810.24V213.333333a42.666667 42.666667 0 0 1 67.114667-34.986666z"
                    fill="#ffffff"></path>
                </svg>
              </span>
            </button>
          </div>
        ))}
      </div>

      {!isHiddenCardsVisible && (
        <div className="show-more-container">
          <button className="show-more" onClick={toggleHiddenCards}>
            Show More
          </button>
        </div>
      )}

      {isHiddenCardsVisible && (
        <div className="scam-grid">
          {/* Additional 4 cards (initially hidden) */}
          {showMoreScamCardList.map((scam) => (
            <div 
              className="scam-card" 
              key={scam.title}
              onClick={() => goToScamsTypeDetail(scam.title)}
            >
              <img src={scam.cardIcon} alt="scam-card-icon" className="card-icon" />
              <h3 className="card-title">{scam.title}</h3>
              <p className="card-description">{scam.description}</p>
              <button className="learn-more">
                Learn More 
                <span className="learn-more-arrow">
                  <svg className="arrow-icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                    <path
                      d="M323.114667 178.346667l426.624 298.325333a42.666667 42.666667 0 0 1 0 69.930667l-426.624 298.538666A42.666667 42.666667 0 0 1 256 810.24V213.333333a42.666667 42.666667 0 0 1 67.114667-34.986666z"
                      fill="#ffffff"></path>
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ScamsType;