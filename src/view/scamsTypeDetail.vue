<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { scamsTypeList } from '../utils/const';

const route = useRoute();
const scamType = ref(scamsTypeList.find(scam => scam.title === route.query.title));

// 监听路由变化，自动滚动到顶部
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

onMounted(() => {
    scrollToTop();
});
</script>

<template>
    <div class="main-content">
        <div class="phone-scam-section">
            <div class="scam-icon">
                <img :src="scamType.cardIcon" alt="scam-card-icon" class="card-icon">
            </div>
            <div class="scam-description">
                <h1>{{ scamType.title }}</h1>
                <p>{{ scamType.description }}</p>
            </div>
        </div>

        <div class="how-it-happens">
            <h2 class="section-title">How Does It Happen?</h2>
            <div class="process-container">
                <div class="example-box">
                    <p>Example of a scammer impersonating a delivery company personnel:</p>
                    <div class="audio-player">
                        <audio controls style="width: 100%;">
                            <source src="#" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
                <div class="steps-container">
                    <div class="step" v-for="(step, index) in scamType.howItHappens" :key="index">
                        <div class="step-number">{{ index + 1 }}.</div>
                        <div class="step-content">{{ step }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="how-to-defend">
            <h2 class="section-title">How to Defend?</h2>
            <div class="defense-box">
                <ul>
                    <li v-for="(defense, index) in scamType.defense" :key="index">{{ defense }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Main Content Styles */
.main-content {
    padding: 2rem 15rem;
}

.phone-scam-section {
    width: 900px;
    margin: 0 auto 60px auto;
    display: flex;
    align-items: center;
}

.scam-icon {
    margin-right: 30px;
}

.phone-icon {
    width: 120px;
    height: auto;
}

.scam-description h1 {
    font-size: 50px;
    margin-bottom: 20px;
    background: linear-gradient(to right, #98ff98, #00ffff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
}

.scam-description p {
    font-size: 18px;
    max-width: 600px;
}

.section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 40px;
    background: linear-gradient(to right, #00BFFF, #87CEEB);
    -webkit-background-clip: text;
    color: transparent;
}

/* How It Happens Section */
.how-it-happens {
    margin-bottom: 60px;
}

.process-container {
    display: flex;
    justify-content: space-between;
}

.example-box {
    width: 30%;
    padding: 20px;
    border-radius: 20px;
    background: rgba(0, 100, 100, 0.2);
    position: relative;
    overflow: hidden;
}

.example-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid transparent;
    border-radius: 20px;
    background: linear-gradient(45deg, #00BFFF, #4CFF4C) border-box;
    -webkit-mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
}

.example-box p {
    margin-bottom: 20px;
}

.audio-player {
    width: 100%;
    margin-top: 30px;
}

.steps-container {
    width: 65%;
}

.step {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    background: rgba(0, 100, 100, 0.2);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.step::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid transparent;
    border-radius: 20px;
    background: linear-gradient(45deg, #00BFFF, #4CFF4C) border-box;
    -webkit-mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
}

.step-number {
    font-size: 36px;
    margin-right: 20px;
    color: #00BFFF;
    font-weight: bold;
}

.step-content {
    font-size: 18px;
}

/* How to Defend Section */
.how-to-defend {
    margin-bottom: 60px;
}

.defense-box {
    padding: 30px;
    border-radius: 20px;
    background: rgba(0, 100, 100, 0.2);
    position: relative;
    overflow: hidden;
}

.defense-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid transparent;
    border-radius: 20px;
    background: linear-gradient(45deg, #00BFFF, #4CFF4C) border-box;
    -webkit-mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
}

.defense-box ul {
    list-style-type: none;
    padding-left: 20px;
}

.defense-box ul li {
    margin-bottom: 15px;
    position: relative;
    padding-left: 25px;
}

.defense-box ul li:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #00BFFF;
    font-size: 20px;
}

.card-icon {
    width: 240px;
    height: auto;
}
</style>
