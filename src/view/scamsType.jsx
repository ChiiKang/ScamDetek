import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/scamsType.css'

const ScamsType = () => {
  const [isHiddenCardsVisible, setIsHiddenCardsVisible] = useState(false);
  const navigate = useNavigate();

  const scamCardList = [
    {
      title: 'Phishing Scam',
      description: 'Pretending to be a trusted source to steal personal info or money.',
      cardIcon: 'src/assets/img/Phishing Scam.png'
    },
    {
      title: 'Online Shopping Scam',
      description: 'Selling fake products or taking money without delivering items.',
      cardIcon: 'src/assets/img/Online Shopping Scam.png'
    },
    {
      title: 'Romance Scam',
      description: 'Pretending to be in love to trick victims into sending money.',
      cardIcon: 'src/assets/img/Romance Scam.png'
    },
    {
      title: 'Job Scam',
      description: 'Promising high-paying jobs to collect fees or personal info.',
      cardIcon: 'src/assets/img/Job Scam.png'
    },
    {
      title: 'Investment Scam',
      description: 'Offering fake high-return investments to steal money.',
      cardIcon: 'src/assets/img/Investment Scam.png'
    },
    {
      title: 'Phone Scam',
      description: 'Calling as officials or companies to get money or personal info.',
      cardIcon: 'src/assets/img/Phone Scam.png'
    },
    {
      title: 'Social Media Scam',
      description: 'Posting fake links or info to steal data or spread malware.',
      cardIcon: 'src/assets/img/SocialMediaScam.png'
    },
    {
      title: 'Parcel Scam',
      description: 'Claiming a package is waiting but needs a fee or info to collect.',
      cardIcon: 'src/assets/img/Parcel Scam.png'
    },
  ];

  const showMoreScamCardList = [
    {
      title: 'Lottery Scam',
      description: 'Claiming a prize win but asking for a fee to claim it.',
      cardIcon: 'src/assets/img/Lottery Scam.png'
    },
    {
      title: 'QR Scams (Quishing)',
      description: 'Scanning fake QR codes that lead to your personal information being exposed.',
      cardIcon: 'src/assets/img/QR Scams (Quishing).png'
    },
    {
      title: 'Car Accident Scam',
      description: 'Causing a minor accident to extort money.',
      cardIcon: 'src/assets/img/Car Accident Scam.png'
    },
    {
      title: 'Home Purchasel Scam',
      description: 'Advertising fake properties to collect deposits.',
      cardIcon: 'src/assets/img/Home Purchasel Scam.png'
    },
  ];

  const toggleHiddenCards = () => {
    setIsHiddenCardsVisible(!isHiddenCardsVisible);
  };

  const goToScamsTypeDetail = (title) => {
    navigate(`/scamsTypeDetail?title=${encodeURIComponent(title)}`);
  };

  // 监听路由变化，自动滚动到顶部
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
      <h1>Scams to Watch Out For</h1>
      <p className="subtitle">Stay informed of the latest scam tactics in Malaysia.</p>

      {/* grid布局一行4个 */}
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
                <svg t="1743783688267" className="arrow-icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" pId="9151" width="200" height="200">
                  <path
                    d="M323.114667 178.346667l426.624 298.325333a42.666667 42.666667 0 0 1 0 69.930667l-426.624 298.538666A42.666667 42.666667 0 0 1 256 810.24V213.333333a42.666667 42.666667 0 0 1 67.114667-34.986666z"
                    fill="#ffffff" pId="9152"></path>
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
                  <svg t="1743783688267" className="arrow-icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" pId="9151" width="200" height="200">
                    <path
                      d="M323.114667 178.346667l426.624 298.325333a42.666667 42.666667 0 0 1 0 69.930667l-426.624 298.538666A42.666667 42.666667 0 0 1 256 810.24V213.333333a42.666667 42.666667 0 0 1 67.114667-34.986666z"
                      fill="#ffffff" pId="9152"></path>
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
