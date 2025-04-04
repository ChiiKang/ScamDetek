<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const link = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="wrapper">
    <nav class="navbar">
      <img src="./assets/img/logo.png" alt="logo" class="logo">
      <div class="menu">
        <span>Home</span>
        <span>Scam Detection</span>
        <span>Knowledge Hub</span>
        <span>AI Chatbot</span>
      </div>
      <div class="social-icons">
        <span href="#"><i class="fab fa-github">🔍</i></span>
        <span href="#"><i class="fab fa-discord">📝</i></span>
        <span href="#"><i class="fab fa-reddit">🌐</i></span>
        <span href="#"><i class="fab fa-twitter">🐦</i></span>
      </div>
    </nav>
    <router-view></router-view>
    <footer>
      <p>©2025 ScamDetek. All rights reserved.</p>
      <p>Protect yourself from online scam.</p>
    </footer>
    <div class="chatbot-icon">
            <div class="chat-bubble">💬</div>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#0dc5e9" fill-opacity="0.2" />
                <path
                    d="M28 22C28 24.2091 26.2091 26 24 26H16C13.7909 26 12 24.2091 12 22V18C12 15.7909 13.7909 14 16 14H24C26.2091 14 28 15.7909 28 18V22Z"
                    fill="#0dc5e9" />
                <circle cx="16" cy="20" r="1.5" fill="white" />
                <circle cx="20" cy="20" r="1.5" fill="white" />
                <circle cx="24" cy="20" r="1.5" fill="white" />
            </svg>
        </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding-top: 107px;
}

.navbar {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px;
  position: fixed;
  width: 100%;
  height: 107px;
  background-color: #0a0a0a;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.logo {
  width: 124px;
}

.menu {
  display: flex;
  gap: 40px;
}

.menu span {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
  cursor: pointer;
}

.menu span:hover {
  color: #0dc5e9;
}

.social-icons {
  display: flex;
  gap: 20px;
}

.social-icons a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #0dc5e9;
}
/* Footer Styles */
footer {
    text-align: center;
    padding: 2rem;
    color: #ccc;
    font-size: 0.9rem;
}

footer p {
    margin: 0.3rem 0;
}
.chatbot-icon {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: rgba(13, 197, 233, 0.2);
    border-radius: 50%;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 100;
}

.chat-bubble {
    position: absolute;
    top: -20px;
    right: -10px;
    background-color: #0dc5e9;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
@media (max-width: 768px) {
    .navbar {
        padding: 20px;
        flex-direction: column;
        gap: 20px;
    }

    .menu,
    .social-icons {
        gap: 15px;
    }

    .hero {
        padding: 20px;
        height: auto;
    }

    .hero-title {
        font-size: 36px;
        margin-bottom: 60px;
    }

    .cards-container {
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }

    .card {
        width: 90%;
    }
}
</style>
