import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scamsTypeList } from '../utils/const';
import '../styles/scamsTypeDetail.scss';

const ScamsTypeDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title');

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
            <p>{scamType.exampleDesc}</p>
             { scamType.exampleSource.indexOf('youtube') !== -1 ? 
             <iframe width="400" height="300" src="https://www.youtube.com/embed/dt8fJEd0vEM" title="Scammer LHDN..tp sayang..die cpat koyak.." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> : 
             <img src={scamType.exampleSource} alt={`${scamType.title} example`} className='example-img' /> }
          </div>
          <div className="steps-container">
            {scamType.howItHappens.map((step, index) => (
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
            {scamType.defense.map((defense, index) => (
              <li key={index}>{defense}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScamsTypeDetail; 