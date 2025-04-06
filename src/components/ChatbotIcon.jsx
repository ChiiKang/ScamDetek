import '../styles/ChatbotIcon.css';

function ChatbotIcon() {
  return (
    <div className="chatbot-icon">
      <div className="chat-bubble">💬</div>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#0dc5e9" fillOpacity="0.2" />
        <path
          d="M28 22C28 24.2091 26.2091 26 24 26H16C13.7909 26 12 24.2091 12 22V18C12 15.7909 13.7909 14 16 14H24C26.2091 14 28 15.7909 28 18V22Z"
          fill="#0dc5e9"
        />
        <circle cx="16" cy="20" r="1.5" fill="white" />
        <circle cx="20" cy="20" r="1.5" fill="white" />
        <circle cx="24" cy="20" r="1.5" fill="white" />
      </svg>
    </div>
  );
}

export default ChatbotIcon; 