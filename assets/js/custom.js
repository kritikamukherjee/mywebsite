// FORM SUBMISSION
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        ratings: [
            parseInt(document.getElementById('rate1').value),
            parseInt(document.getElementById('rate2').value),
            parseInt(document.getElementById('rate3').value)
        ]
    };

    console.log("Form Data Collected:", formData);

    const average = (formData.ratings.reduce((a, b) => a + b, 0) / 3).toFixed(1);

    const outputDiv = document.getElementById('formDataOutput');
    outputDiv.classList.remove('d-none');
    outputDiv.innerHTML = `
        <p><strong>Name:</strong> ${formData.firstName}</p>
        <p><strong>Surname:</strong> ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
    `;

    const avgDiv = document.getElementById('averageOutput');
    let color = 'green';
    if (average < 4) color = 'red';
    else if (average < 7) color = 'orange';

    avgDiv.style.color = color;
    avgDiv.innerHTML = `${formData.firstName} ${formData.lastName}: ${average}`;

    alert("Form submitted successfully!");
});

// MEMORY GAME
const icons = ['🚀', '🧠', '💻', '🎨', '⚡', '🌈', '🍕', '🐱', '🔥', '💎', '🎮', '🎸'];
let flippedCards = [];
let moves = 0;
let matches = 0;
let isGameActive = false;

// ========== NEW: Timer variables ==========
let timerInterval = null;
let startTime = 0;
let elapsedTime = 0;
// ==========================================

function initGame() {
    const board = document.getElementById('game-board');
    const difficulty = document.getElementById('difficulty')?.value || 'easy';
    const totalCards = difficulty === 'easy' ? 12 : 24;
    const cols = difficulty === 'easy' ? 4 : 6;
    
    if (!board) return;
    
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    moves = 0;
    matches = 0;
    flippedCards = [];
    
    // ========== NEW: Reset timer ==========
    stopTimer();
    elapsedTime = 0;
    updateTimerDisplay();
    // ======================================
    
    const movesEl = document.getElementById('moves-count');
    const matchesEl = document.getElementById('matches-count');
    const winMsg = document.getElementById('win-message');
    
    if (movesEl) movesEl.innerText = '0';
    if (matchesEl) matchesEl.innerText = '0';
    if (winMsg) winMsg.classList.add('d-none');

    let gameIcons = [...icons.slice(0, totalCards/2), ...icons.slice(0, totalCards/2)];
    gameIcons.sort(() => Math.random() - 0.5);

    gameIcons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.innerHTML = `<div class="card-back">?</div><div class="card-front">${icon}</div>`;
        card.addEventListener('click', () => {
            if(!isGameActive || flippedCards.length === 2 || card.classList.contains('flipped')) return;
            card.classList.add('flipped');
            flippedCards.push({card, icon});
            if(flippedCards.length === 2) checkMatch();
        });
        board.appendChild(card);
    });
    
    // ========== NEW: Display best results ==========
    displayBestResults();
    // ===============================================
}

function checkMatch() {
    moves++;
    const movesEl = document.getElementById('moves-count');
    if (movesEl) movesEl.innerText = moves;
    
    const [c1, c2] = flippedCards;
    if(c1.icon === c2.icon) {
        matches++;
        const matchesEl = document.getElementById('matches-count');
        if (matchesEl) matchesEl.innerText = matches;
        flippedCards = [];
        
        const totalPairs = document.querySelectorAll('.memory-card').length / 2;
        if(matches === totalPairs) {
            // ========== NEW: Stop timer on win ==========
            stopTimer();
            // ============================================
            
            const winMsg = document.getElementById('win-message');
            if (winMsg) {
                // ========== NEW: Show time in win message ==========
                const difficulty = document.getElementById('difficulty')?.value || 'easy';
                const time = formatTime(elapsedTime);
                winMsg.innerHTML = `<h3>Congratulations! You've matched them all!</h3><p>Moves: ${moves} | Time: ${time}</p>`;
                // ===================================================
                winMsg.classList.remove('d-none');
            }
            
            // ========== NEW: Save best result ==========
            saveBestResult();
            // ===========================================
        }
    } else {
        setTimeout(() => {
            c1.card.classList.remove('flipped');
            c2.card.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// ========== NEW: Timer functions ==========
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay();
    }, 100);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('timer-display');
    if (timerEl) {
        timerEl.innerText = formatTime(elapsedTime);
    }
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
// ==========================================

// ========== NEW: Best results functions ==========
function saveBestResult() {
    const difficulty = document.getElementById('difficulty')?.value || 'easy';
    const bestResults = JSON.parse(localStorage.getItem('memoryGameBest') || '{}');
    
    if (!bestResults[difficulty] || moves < bestResults[difficulty]) {
        bestResults[difficulty] = moves;
        localStorage.setItem('memoryGameBest', JSON.stringify(bestResults));
        displayBestResults();
    }
}

function displayBestResults() {
    const bestResults = JSON.parse(localStorage.getItem('memoryGameBest') || '{}');
    const easyBest = document.getElementById('easy-best');
    const hardBest = document.getElementById('hard-best');
    
    if (easyBest) {
        easyBest.innerText = bestResults.easy ? `${bestResults.easy} moves` : 'N/A';
    }
    if (hardBest) {
        hardBest.innerText = bestResults.hard ? `${bestResults.hard} moves` : 'N/A';
    }
}
// =================================================

// ========== UPDATED: Start game with timer ==========
document.getElementById('startGame')?.addEventListener('click', () => {
    isGameActive = true;
    initGame();
    startTimer(); // NEW: Start timer
});
// ====================================================

// ========== UPDATED: Restart game with timer ==========
document.getElementById('restartGame')?.addEventListener('click', () => {
    initGame();
    if (isGameActive) {
        startTimer(); // NEW: Start timer if game is active
    }
});
// ======================================================

// THEME TOGGLE FUNCTIONALITY - FIXED VERSION (No localStorage)
const toggleSwitch = document.querySelector('#theme-toggle');

if (toggleSwitch) {
    // Set initial theme to light on page load
    document.documentElement.setAttribute('data-theme', 'light');
    toggleSwitch.checked = false;

    // Handle toggle change
    toggleSwitch.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            console.log('Theme switched to dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            console.log('Theme switched to light');
        }
    });
    
    console.log('Theme toggle initialized successfully');
} else {
    console.error('Theme toggle button not found!');
}

// ========== NEW: Load best results on page load ==========
window.addEventListener('load', displayBestResults);
// =========================================================