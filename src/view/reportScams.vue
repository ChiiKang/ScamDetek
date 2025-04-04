<script setup>
import { ref } from 'vue';

// 创建一个数组来管理每个步骤的展开状态
const activeSteps = ref([false, false, false, false]);

// 切换步骤的展开状态
const toggleStep = (index) => {
    activeSteps.value[index] = !activeSteps.value[index];
};
</script>

<template>
    <main>
        <section class="hero">
            <h1>Report Scams Effectively<br>Protect Your Rights</h1>
        </section>

        <section class="steps-container">
            <div class="steps-wrapper">
                <div class="step" :class="{ active: activeSteps[0] }">
                    <div class="step-circle">
                        <div class="step-number">1</div>
                        <div class="connection-line-1" v-if="true"></div>
                    </div>
                    <div class="step-content">
                        <button class="step-button" @click="toggleStep(0)">
                            Gather Evidence
                            <span class="dropdown-icon"></span>
                        </button>
                        <div class="step-content-expanded">
                            <ul>
                                <li>Screenshots and Photos: Capture any suspicious messages, emails, or online transactions.</li>
                                <li>Documents: Include receipts, transaction records, or any written communication.</li>
                                <li>Phone Call Records: Save any call logs or recordings (if legally permitted).</li>
                                <li>Bank Statements: Highlight any suspicious transactions.</li>
                                <li>URLs: Copy links related to fraudulent websites or QR codes.</li>
                                <li>Social Media Posts: Save any content that seems fraudulent.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="step" :class="{ active: activeSteps[1] }">
                    <div class="step-circle">
                        <div class="step-number">2</div>
                        <div class="connection-line-2" v-if="true"></div>
                    </div>
                    <div class="step-content">
                        <button class="step-button" @click="toggleStep(1)">
                            Report to the Relevant Authority
                            <span class="dropdown-icon"></span>
                        </button>
                        <div class="step-content-expanded">
                            <p>File a report with the appropriate agencies:</p>
                            <ul>
                                <li>Local police department for crime reports</li>
                                <li>Federal Trade Commission (FTC) for consumer fraud</li>
                                <li>Internet Crime Complaint Center (IC3) for online scams</li>
                                <li>Your country's specific fraud reporting authority</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="step" :class="{ active: activeSteps[2] }">
                    <div class="step-circle">
                        <div class="step-number">3</div>
                        <div class="connection-line-3" v-if="true"></div>
                    </div>
                    <div class="step-content">
                        <button class="step-button" @click="toggleStep(2)">
                            Contact Your Bank or Financial Institution
                            <span class="dropdown-icon"></span>
                        </button>
                        <div class="step-content-expanded">
                            <p>Take immediate action to protect your accounts:</p>
                            <ul>
                                <li>Report fraudulent transactions and request charge reversals</li>
                                <li>Change your account passwords and PINs</li>
                                <li>Request new credit/debit cards if your information was compromised</li>
                                <li>Consider placing a fraud alert or credit freeze</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="step" :class="{ active: activeSteps[3] }">
                    <div class="step-circle">
                        <div class="step-number">4</div>
                    </div>
                    <div class="step-content">
                        <button class="step-button" @click="toggleStep(3)">
                            Monitor Your Finances and Online Activity
                            <span class="dropdown-icon"></span>
                        </button>
                        <div class="step-content-expanded">
                            <p>Remain vigilant after reporting:</p>
                            <ul>
                                <li>Check your account statements and credit reports regularly</li>
                                <li>Set up fraud alerts and transaction notifications</li>
                                <li>Use strong, unique passwords and enable two-factor authentication</li>
                                <li>Consider using identity theft protection services</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
/* Hero Section */
.hero {
            text-align: center;
            padding: 80px 0;
        }

        .hero h1 {
            font-size: 48px;
            margin-bottom: 20px;
            background: linear-gradient(90deg, #0ff, #0080ff, #00ff80);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            line-height: 1.2;
        }

        /* Steps Section */
        .steps-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 0;
            position: relative;
        }

        .steps-wrapper {
            position: relative;
            padding: 20px 0;
        }

        .steps-wrapper::before {
            display: none;
        }

        .step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 80px;
            position: relative;
        }

        .step:last-child {
            margin-bottom: 0;
        }

        .step-circle {
            position: relative;
            z-index: 2;
            margin-right: 40px;
        }

        .step-number {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: rgba(20, 20, 20, 0.8);
            border: 2px solid transparent;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 52px;
            font-weight: bold;
            color: #0ff;
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
            z-index: 2;
        }

        .step-number::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border-radius: 50%;
            background: linear-gradient(45deg, #0ff, #0080ff, #00ff80);
            z-index: -1;
        }

        .step-number::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 50%;
            background: rgba(20, 20, 20, 0.8);
            z-index: -1;
        }

        .step-content {
            margin-top: 10px;
            flex: 1;
        }

        .step-button {
            background-color: rgba(30, 30, 30, 0.8);
            border: 1px solid #333;
            color: white;
            padding: 15px 25px;
            width: 100%;
            border-radius: 30px;
            font-size: 18px;
            text-align: left;
            cursor: pointer;
            position: relative;
            transition: all 0.3s;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .step-button:hover {
            background-color: rgba(40, 40, 40, 0.8);
            border-color: #0ff;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
        }

        .dropdown-icon {
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 10px solid white;
            transition: transform 0.3s ease;
            margin-left: 10px;
        }

        .step-content-expanded {
            margin-top: 15px;
            padding: 20px;
            background-color: rgba(30, 30, 30, 0.5);
            border-radius: 10px;
            display: none;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }

        .step-content-expanded li {
            margin-bottom: 15px;
            list-style-type: disc;
            margin-left: 20px;
        }

        .step-content-expanded li:last-child {
            margin-bottom: 0;
        }

        .step.active .step-content-expanded {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }

        .connection-line-1 {
            position: absolute;
            left: 50%;
            top: 100%;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, #0ff, #0080ff, #00ff80);
            transform: translateX(-50%);
            z-index: 1;
            min-height: 80px;
            transition: height 0.3s ease;
        }

        .step.active .connection-line-1 {
            height: calc(100% + 280px);
        }
        .connection-line-2 {
            position: absolute;
            left: 50%;
            top: 100%;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, #0ff, #0080ff, #00ff80);
            transform: translateX(-50%);
            z-index: 1;
            min-height: 80px;
            transition: height 0.3s ease;
        }

        .step.active .connection-line-2 {
            height: calc(100% + 205px);
        }
        .connection-line-3 {
            position: absolute;
            left: 50%;
            top: 100%;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, #0ff, #0080ff, #00ff80);
            transform: translateX(-50%);
            z-index: 1;
            min-height: 80px;
            transition: height 0.3s ease;
        }

        .step.active .connection-line-3 {
            height: calc(100% + 205px);
        }
</style>

