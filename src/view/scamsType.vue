<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isHiddenCardsVisible = ref(false);
const router = useRouter();
const scamCardList = ref([
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
        cardIcon: 'src/assets/img/Social Media Scam.png'
    },
    {
        title: 'Parcel Scam',
        description: 'Claiming a package is waiting but needs a fee or info to collect.',
        cardIcon: 'src/assets/img/Parcel Scam.png'
    },
])
const showMoreScamCardList = ref([
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
])

const toggleHiddenCards = () => {
    isHiddenCardsVisible.value = !isHiddenCardsVisible.value;
};

const goToScamsTypeDetail = (title) => {
    router.push({ path: '/scamsTypeDetail', query: { title } });
};
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
    <main>
        <h1>Scams to Watch Out For</h1>
        <p class="subtitle">Stay informed of the latest scam tactics in Malaysia.</p>

        <!-- grid布局一行4个 -->
        <div class="scam-grid">
            <div class="scam-card" v-for="scam in scamCardList" :key="scam.title"
                @click="goToScamsTypeDetail(scam.title)">
                <!-- Initial 8 cards -->
                <img :src="scam.cardIcon" alt="scam-card-icon" class="card-icon">
                <h3 class="card-title">{{ scam.title }}</h3>
                <p class="card-description">{{ scam.description }}</p>
                <button class="learn-more">Learn More <span class="learn-more-arrow">
                        <svg t="1743783688267" class="arrow-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="9151" width="200" height="200">
                            <path
                                d="M323.114667 178.346667l426.624 298.325333a42.666667 42.666667 0 0 1 0 69.930667l-426.624 298.538666A42.666667 42.666667 0 0 1 256 810.24V213.333333a42.666667 42.666667 0 0 1 67.114667-34.986666z"
                                fill="#ffffff" p-id="9152"></path>
                        </svg>
                    </span></button>
            </div>
        </div>

        <div class="show-more-container" v-if="!isHiddenCardsVisible">
            <button class="show-more" @click="toggleHiddenCards">
                Show More
            </button>
        </div>

        <div class="scam-grid" v-else>
            <!-- Additional 4 cards (initially hidden) -->
            <div class="scam-card" v-for="scam in showMoreScamCardList" :key="scam.title"
                @click="goToScamsTypeDetail(scam.title)">
                <img :src="scam.cardIcon" alt="scam-card-icon" class="card-icon">
                <h3 class="card-title">{{ scam.title }}</h3>
                <p class="card-description">{{ scam.description }}</p>
                <button class="learn-more">Learn More <span class="learn-more-arrow">
                        <svg t="1743783688267" class="arrow-icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="9151" width="200" height="200">
                            <path
                                d="M323.114667 178.346667l426.624 298.325333a42.666667 42.666667 0 0 1 0 69.930667l-426.624 298.538666A42.666667 42.666667 0 0 1 256 810.24V213.333333a42.666667 42.666667 0 0 1 67.114667-34.986666z"
                                fill="#ffffff" p-id="9152"></path>
                        </svg>
                    </span></button>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Header Styles */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 6rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.logo img {
    height: 40px;
}

.logo span {
    font-size: 1.3rem;
    font-weight: bold;
    background: linear-gradient(90deg, #00FFFF, #00AAFF);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
}

.social-icons {
    display: flex;
    gap: 1rem;
}

.social-icons a {
    color: #fff;
    font-size: 1.2rem;
    text-decoration: none;
}

/* Main Content Styles */
main {
    padding: 2rem 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
    background: linear-gradient(90deg, #3aa1ff, #00FFFF, #4adfb8);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 4rem;
}

.scam-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
    width: 100%;
    transition: all 0.3s ease;
}

.scam-card {
    background-color: #1a1a1a;
    border-radius: 20px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.scam-card:hover {
    transform: translateY(-5px);
}

.card-icon {
    width: 126px;
    height: 126px;
    margin-bottom: 1rem;
    filter: invert(60%) sepia(93%) saturate(1352%) hue-rotate(152deg) brightness(101%) contrast(101%);
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
    background: linear-gradient(90deg, #3aa1ff, #00FFFF);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.card-description {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
}

.learn-more {
    background-color: transparent;
    color: #fff;
    border: 1px solid #00FFFF;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
}

.learn-more:hover {
    background-color: rgba(0, 255, 255, 0.1);
}

.learn-more-arrow {
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-icon {
    width: 20px;
    height: 20px;
}

.show-more-container {
    margin: 2rem 0;
}

.show-more {
    background-color: transparent;
    color: #fff;
    border: 1px solid #00FFFF;
    padding: 0.8rem 2rem;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.show-more:hover {
    background-color: rgba(0, 255, 255, 0.1);
}

.hidden-cards {
    display: none;
}
</style>
