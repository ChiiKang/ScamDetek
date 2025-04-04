export const scamsTypeList = [
    {
        title: "Phishing Scam",
        description: "Fraudsters impersonate officials or companies, using threats or manipulation to obtain personal details or money.",
        cardIcon: "src/assets/img/Phishing Scam.png",
        howItHappens: [
            "You receive unsolicited emails, SMS, or messages that appear to be from legitimate organizations (banks, government agencies, or companies).",
            "The message contains clickable links that direct you to a fake login page or prompt you to enter personal information.",
            "Once you enter your details, scammers use them to access your accounts or steal your money."
        ],
        defense: [
            "Be cautious of unsolicited messages, especially those claiming to be from banks or government agencies.",
            "Never click on suspicious links or provide personal information.",
            "Always verify the sender's identity before taking any action."
        ]
    },
    {
        title: "Online Shopping Scam",
        description: "Selling fake or non-existent products through fraudulent websites, often leading to no delivery or counterfeit goods.",
        cardIcon: "src/assets/img/Online Shopping Scam.png",
        howItHappens: [
            "You find an online store or social media page offering deals that seem too good to be true.",
            "You make a purchase, either through bank transfer or online payment.",
            "The product never arrives, or you receive counterfeit goods, and the seller disappears."
        ],
        defense: [
            "Shop only from reputable and well-established online stores.",
            "Check for customer reviews and verify the website's authenticity.",
            "Avoid deals that seem too good to be true."
        ]
    },
    {
        title: "Romance Scam",
        description: "Scammers pretend to be romantically interested, building relationships online to eventually ask for money.",
        cardIcon: "src/assets/img/Romance Scam.png",
        howItHappens: [
            "You meet someone online through a dating app or social media.",
            "They build a romantic relationship with you and share emotional stories.",
            "They ask for financial help, claiming emergencies or travel issues, and continue asking for money until you realize it's a scam."
        ],
        defense: [
            "Be cautious of people who express intense feelings very quickly online.",
            "Never send money to someone you have never met in person.",
            "Conduct a reverse image search to check if their profile photo is stolen."
        ]
    },
    {
        title: "Job Scam",
        description: "Offering fake job opportunities with high salaries, tricking job seekers into paying fees or sharing personal information.",
        cardIcon: "src/assets/img/Job Scam.png",
        howItHappens: [
            "You receive a job offer via email, SMS, or a job portal, promising high pay and flexible work.",
            "The recruiter requests upfront fees for training, registration, or documents.",
            "After payment, the 'company' disappears, or the promised job never materializes."
        ],
        defense: [
            "Be skeptical of job offers that require upfront payments or personal details.",
            "Verify the company through official websites or trusted job portals.",
            "Report suspicious job offers to the authorities."
        ]
    },
    {
        title: "Investment Scam",
        description: "Promising high returns through fake investment opportunities, convincing victims to invest large sums.",
        cardIcon: "src/assets/img/Investment Scam.png",
        howItHappens: [
            "You see an investment opportunity with guaranteed high returns on social media or through friends.",
            "You are encouraged to invest quickly to secure a spot.",
            "Early returns are paid to build trust, but eventually, the returns stop, and the scammer vanishes."
        ],
        defense: [
            "Avoid investment schemes that promise high returns with no risk.",
            "Verify the investment company's license with official financial authorities.",
            "Do not rush into investment decisions without thorough research."
        ]
    },
    {
        title: "Phone Scam",
        description: "Fraudsters pretend to be from government agencies or companies, threatening or manipulating victims over the phone to get personal details or money.",
        cardIcon: "src/assets/img/Phone Scam.png",
        howItHappens: [
            "You receive a call from someone claiming to be from a government agency or the police, threatening legal action.",
            "You are told to transfer money to a 'safe' account to avoid arrest.",
            "Once you send the money, the scammer cuts off contact."
        ],
        defense: [
            "Hang up on suspicious calls claiming to be from authorities.",
            "Do not disclose personal or financial information over the phone.",
            "Use official contact numbers to verify the call if you are unsure."
        ]
    },
    {
        title: "Social Media Scam",
        description: "Posting fake links or information on social media to trick users into revealing personal data or clicking malicious links.",
        cardIcon: "src/assets/img/Social Media Scam.png",
        howItHappens: [
            "You see a post or message claiming a limited-time offer or giveaway.",
            "You click on the link, which either steals your data or asks for a small fee to claim the prize.",
            "After payment, the scammer disappears or your data gets compromised."
        ],
        defense: [
            "Be cautious about sharing personal information on social media.",
            "Report fake accounts and suspicious posts immediately.",
            "Avoid clicking on unverified links shared by strangers."
        ]
    },
    {
        title: "Parcel Scam",
        description: "Claiming a package is waiting for collection, but requires payment of a fake fee or personal information.",
        cardIcon: "src/assets/img/Parcel Scam.png",
        howItHappens: [
            "You receive a message stating you have an undelivered parcel that requires payment.",
            "You are asked to pay customs or clearance fees via an online link.",
            "Once paid, the scammers disappear, and no parcel arrives."
        ],
        defense: [
            "Verify the courier service's contact details through official channels.",
            "Do not pay fees or provide personal information without confirming the package.",
            "Be wary of messages about undelivered parcels you were not expecting."
        ]
    },
    {
        title: "Lottery Scam",
        description: "Claiming that the victim has won a prize, but requires a processing fee to claim it.",
        cardIcon: "src/assets/img/Lottery Scam.png",
        howItHappens: [
            "You receive a message claiming you have won a lottery or prize.",
            "You are asked to pay taxes or fees before claiming your prize.",
            "After payment, you realize the prize doesn't exist, and the scammer vanishes."
        ],
        defense: [
            "Remember that legitimate lotteries do not require payment to claim a prize.",
            "Verify the sender's information through official channels.",
            "Report unsolicited winning notifications to authorities."
        ]
    },
    {
        title: "QR Scams (Quishing)",
        description: "Fraudsters create fake QR codes that redirect users to malicious websites to steal personal data or perform phishing attacks.",
        cardIcon: "src/assets/img/QR Scams (Quishing).png",
        howItHappens: [
            "You scan a QR code from an unverified source, such as posters or messages.",
            "The code redirects you to a fake website or prompts you to enter personal details.",
            "Your data is stolen or your device is infected with malware."
        ],
        defense: [
            "Avoid scanning QR codes from unfamiliar or suspicious sources.",
            "Check the URL before entering any personal information.",
            "Use QR code scanning apps that verify the destination link."
        ]
    },
    {
        title: "Car Accident Scam",
        description: "Staging a minor accident intentionally to extort money from the victim.",
        cardIcon: "src/assets/img/Car Accident Scam.png",
        howItHappens: [
            "A car deliberately bumps into yours, and the driver claims damage.",
            "They demand instant compensation or threaten police involvement.",
            "After paying, you realize the damage was staged."
        ],
        defense: [
            "Take photos and record the incident before discussing compensation.",
            "Call the police to report the accident rather than settling on the spot.",
            "Be cautious if the other party insists on quick cash compensation."
        ]
    },
    {
        title: "Home Purchasel Scam",
        description: "Advertising fake property deals at attractive prices to collect deposits from potential buyers or renters.",
        cardIcon: "src/assets/img/Home Purchasel Scam.png",
        howItHappens: [
            "You find an attractive property listing online at a great price.",
            "You are asked to make a deposit or rental payment before viewing.",
            "After payment, the agent or landlord disappears, and the property was never available."
        ],
        defense: [
            "Inspect the property in person before making any payment.",
            "Verify the owner's identity and ownership documents.",
            "Be cautious of deals that seem unusually cheap."
        ]
    }
];
