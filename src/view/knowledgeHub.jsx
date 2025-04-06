import { useNavigate } from 'react-router-dom';
import '../styles/knowledgeHub.css';

const KnowledgeHub = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <div className="hero">
        <h1 className="hero-title">Enhance Your Scam Awareness</h1>

        <div className="cards-container">
          <div className="card" onClick={() => handleCardClick('/scamsType')}>
            <h2 className="card-title">Scam Type</h2>
            <p className="card-desc">Understand the different types of online scams</p>
          </div>

          <div className="card" onClick={() => handleCardClick('/reportScams')}>
            <h2 className="card-title">Reporting Steps</h2>
            <p className="card-desc">Get the scam reporting tutorial and flowchart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
