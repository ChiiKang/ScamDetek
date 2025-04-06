import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img src="/src/assets/img/logo.png" alt="logo" className="logo" />
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/scam-detection">Scam Detection</Link>
        <Link to="/knowledge-hub">Knowledge Hub</Link>
        <Link to="/ai-chatbot">AI Chatbot</Link>
      </div>
      <div className="social-icons">
        <a href="#"><span>🔍</span></a>
        <a href="#"><span>📝</span></a>
        <a href="#"><span>🌐</span></a>
        <a href="#"><span>🐦</span></a>
      </div>
    </nav>
  );
}

export default Navbar; 