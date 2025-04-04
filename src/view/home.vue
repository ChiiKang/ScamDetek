<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const link = (path) => {
    router.push(path)
}
</script>

<template>
    <div class="container">
        <div class="hero">
            <h1 class="hero-title">Enhance Your Scam Awareness</h1>

            <div class="cards-container">
                <div class="card" @click="link('/scamsType')">
                    <h2 class="card-title">Scam Type</h2>
                    <p class="card-desc">Understand the different types of online scams</p>
                </div>

                <div class="card" @click="link('/reportScams')">
                    <h2 class="card-title">Reporting Steps</h2>
                    <p class="card-desc">Get the scam reporting tutorial and flowchart</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://via.placeholder.com/1920x1080');
    background-size: cover;
    background-position: center;
}

.hero {
    padding: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 80px);
}

.hero-title {
    font-size: 60px;
    margin-bottom: 120px;
    text-align: center;
    background: linear-gradient(to right, #0dc5e9, #9ee85b);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 10px rgba(13, 197, 233, 0.3);
}

.cards-container {
    display: flex;
    justify-content: center;
    gap: 60px;
    width: 100%;
    cursor: pointer;
}

.card {
    background-color: rgba(20, 20, 20, 0.7);
    border-radius: 20px;
    padding: 30px;
    width: 320px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(70, 70, 70, 0.3);
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(13, 197, 233, 0.2);
}

.card-title {
    font-size: 30px;
    margin-bottom: 20px;
    color: #0dc5e9;
}

.card-desc {
    font-size: 16px;
    line-height: 1.6;
    color: #e0e0e0;
}

.footer {
    text-align: center;
    padding: 20px;
    background-color: rgba(10, 10, 10, 0.8);
    position: absolute;
    bottom: 0;
    width: 100%;
}

.copyright {
    font-size: 14px;
    color: #888;
    margin-bottom: 5px;
}

.tagline {
    font-size: 12px;
    color: #666;
}
</style>
