import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ChatbotIcon from './components/ChatbotIcon'
import KnowledgeHub from './view/knowledgeHub'
import ScamsType from './view/scamsType'
import ScamsTypeDetail from './view/scamsTypeDetail'
import ReportScams from './view/reportScams'
import './App.css'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our website!</p>
    </div>
  )
}

function ScamDetection() {
  return (
    <div>
      <h1>Scam Detection</h1>
      <p>Use our tools to detect potential scam risks.</p>
    </div>
  )
}

function AIChatbot() {
  return (
    <div>
      <h1>AI Chatbot</h1>
      <p>Chat with our AI assistant for help.</p>
    </div>
  )
}

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scam-detection" element={<ScamDetection />} />
        <Route path="/knowledge-hub" element={<KnowledgeHub />} />
        <Route path="/scamsType" element={<ScamsType />} />
        <Route path="/scamsTypeDetail" element={<ScamsTypeDetail />} />
        <Route path="/reportScams" element={<ReportScams />} />
        <Route path="/ai-chatbot" element={<AIChatbot />} />
      </Routes>
      <footer>
        <p>©2025 ScamDetek. All rights reserved.</p>
        <p>Protect yourself from online scam.</p>
      </footer>
      <ChatbotIcon />
    </div>
  )
}

export default App
