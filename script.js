const introTexts = [
    "Hey Angelllll",
    "How are you?",
    "Well...",
    "I have a question.",
    "Are you ready!?!? (I am excited)",
    "I hope you are :0",
    "Alight here we go",
    "3...",
    "2..",
    "1."
];

const securityQuestions = [
    {
        question: "Question: When did we meet properly for the first time?",
        options: ["August 8th", "Feb 14th", "July 4th", "April 1st"],
        correct: 2 
    },
    {
        question: "Security Level 2: Where did we have our first kiss?",
        options: ["Car", "Midnight Divas", "My Place", "Cinema"],
        correct: 3
    },
    {
        question: "Security Level 3: Who loves you more?",
        options: ["Me (The Boyfriend)", "Amila", "Theo James", "Superman"],
        correct: 0
    }
];


const introScreen = document.getElementById('intro-screen');
const introText = document.getElementById('intro-text');
const mainContainer = document.getElementById('main-container');
const questionScreen = document.getElementById('question-screen');
const securityScreen = document.getElementById('security-screen');
const finalReward = document.getElementById('final-reward');

let textIndex = 0;

function playIntro() {
    if (textIndex < introTexts.length) {
        introText.innerText = introTexts[textIndex];
        introText.style.opacity = 1; 

        setTimeout(() => {
            introText.style.opacity = 0;
            textIndex++;
            setTimeout(playIntro, 1000); 
        }, 1700); 
    } else {

        introScreen.style.display = 'none';
        mainContainer.classList.remove('hidden');
    }
}

window.onload = playIntro;


function moveButton() {
    const noBtn = document.getElementById('no-btn');
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function handleYes() {

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    document.getElementById('main-img').src = "Images/WhatsApp Video 2026-02-04 at 12.42.23.gif"; 
    document.getElementById('main-text').innerText = "Yayyyy ILYSM!! Mwhaaaa!  ";
    document.querySelector('.buttons').innerHTML = `
        <button onclick="startSecurity()">A surprise?💋</button>
    `;
}


let currentLevel = 0;

function startSecurity() {
    questionScreen.classList.add('hidden');
    securityScreen.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const qData = securityQuestions[currentLevel];
    document.getElementById('security-question').innerText = qData.question;
    document.getElementById('level-indicator').innerText = `Level ${currentLevel + 1}/3`;
    

    const progress = (currentLevel / 3) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    const optionsDiv = document.getElementById('security-options');
    optionsDiv.innerHTML = ''; 

    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, qData.correct);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        currentLevel++;
        if (currentLevel < securityQuestions.length) {
            loadQuestion(); 
        } else {
            showFinalReward(); 
        }
    } else {
        alert("❌ ACCESS DENIED! Try again, imposter!");
    }
}


function showFinalReward() {
    securityScreen.classList.add('hidden');
    finalReward.classList.remove('hidden');
    

    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

const music = document.getElementById('bg-music');
music.volume = 0.5; 


music.play().catch(error => {
    console.log("Autoplay blocked. Waiting for interaction.");
    document.body.addEventListener('click', () => {
        music.play();
    }, { once: true });
});
}