// ========================================
// FORM VALIDATION - COMPLETE AND STRICT
// ========================================

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorMsg = field.nextElementSibling;
  if (errorMsg && errorMsg.classList.contains('error-msg')) {
    errorMsg.textContent = message;
    errorMsg.style.color = '#dc3545';
    errorMsg.style.fontSize = '0.875rem';
    errorMsg.style.marginTop = '0.25rem';
  }
  field.style.borderColor = '#dc3545';
}

// Reset border color and errors on input
document.querySelectorAll('#contactForm input').forEach(input => {
  input.addEventListener('input', function() {
    this.style.borderColor = '';
    const errorMsg = this.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-msg')) {
      errorMsg.textContent = '';
    }
  });
});

// Main form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  e.stopPropagation();
  
  console.log('Form submission started');
  
  // Clear ALL previous errors
  document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');
  document.querySelectorAll('#contactForm input').forEach(input => input.style.borderColor = '');
  
  let isValid = true;
  
  // Get form values
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  
  console.log('Form values:', { firstName, lastName, email, phone, address });
  
  // Validate First Name
  if (firstName === '') {
    showError('firstName', 'First name is required');
    isValid = false;
    console.log('First name validation failed: empty');
  } else if (firstName.length < 2) {
    showError('firstName', 'First name must be at least 2 characters');
    isValid = false;
    console.log('First name validation failed: too short');
  }
  
  // Validate Last Name
  if (lastName === '') {
    showError('lastName', 'Last name is required');
    isValid = false;
    console.log('Last name validation failed: empty');
  } else if (lastName.length < 2) {
    showError('lastName', 'Last name must be at least 2 characters');
    isValid = false;
    console.log('Last name validation failed: too short');
  }
  
  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    showError('email', 'Email is required');
    isValid = false;
    console.log('Email validation failed: empty');
  } else if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address (e.g., user@example.com)');
    isValid = false;
    console.log('Email validation failed: invalid format');
  }
  
  // Validate Lithuanian Phone Number
  const lithuanianPhoneRegex = /^(\+370|370|8)[0-9]{8}$/;
  const cleanPhone = phone.replace(/\s/g, '');
  if (phone === '') {
    showError('phone', 'Phone number is required');
    isValid = false;
    console.log('Phone validation failed: empty');
  } else if (!lithuanianPhoneRegex.test(cleanPhone)) {
    showError('phone', 'Please enter a valid Lithuanian phone number (e.g., +370 6xx xxxxx or 8xxxxxxxx)');
    isValid = false;
    console.log('Phone validation failed: invalid format');
  }
  
  // Validate Address
  if (address === '') {
    showError('address', 'Address is required');
    isValid = false;
    console.log('Address validation failed: empty');
  } else if (address.length < 5) {
    showError('address', 'Please enter a complete address (minimum 5 characters)');
    isValid = false;
    console.log('Address validation failed: too short');
  }
  
  console.log('Validation result:', isValid);
  
  // CRITICAL: STOP HERE if form is invalid
  if (!isValid) {
    alert('❌ Please correct all errors before submitting the form!');
    console.log('Form submission blocked due to validation errors');
    return false; // Prevent form submission
  }
  
  // ========================================
  // ONLY EXECUTE IF ALL VALIDATIONS PASSED
  // ========================================
  
  console.log('All validations passed - processing form');
  
  const rate1 = document.getElementById('rate1').value;
  const rate2 = document.getElementById('rate2').value;
  const rate3 = document.getElementById('rate3').value;
  const average = ((parseInt(rate1) + parseInt(rate2) + parseInt(rate3)) / 3).toFixed(1);
  
  const output = `
    <strong>✅ Form Submitted Successfully!</strong><br><br>
    <strong>Name:</strong> ${firstName}<br>
    <strong>Surname:</strong> ${lastName}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Phone:</strong> ${phone}<br>
    <strong>Address:</strong> ${address}<br><br>
    <strong>Ratings Average:</strong> ${average}/10
  `;
  
  document.getElementById('formDataOutput').innerHTML = output;
  document.getElementById('formDataOutput').classList.remove('d-none');
  
  // Color code the average
  let color = 'green';
  if (average < 4) color = 'red';
  else if (average < 7) color = 'orange';
  
  const avgDiv = document.getElementById('averageOutput');
  avgDiv.style.color = color;
  avgDiv.innerHTML = `${firstName} ${lastName}: ${average}/10`;
  
  alert('✅ Form submitted successfully!');
  console.log('Form submission completed successfully');
});

// ========================================
// MEMORY GAME
// ========================================

const icons = ['🚀', '🧠', '💻', '🎨', '⚡', '🌈', '🍕', '🐱', '🔥', '💎', '🎮', '🎸'];
let flippedCards = [];
let moves = 0;
let matches = 0;
let isGameActive = false;

function initGame() {
    const board = document.getElementById('game-board');
    const difficulty = document.getElementById('difficulty').value;
    const totalCards = difficulty === 'easy' ? 12 : 24;
    const cols = difficulty === 'easy' ? 4 : 6;
    
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    moves = 0;
    matches = 0;
    flippedCards = [];
    document.getElementById('moves-count').innerText = '0';
    document.getElementById('matches-count').innerText = '0';
    document.getElementById('win-message').classList.add('d-none');

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
}

function checkMatch() {
    moves++;
    document.getElementById('moves-count').innerText = moves;
    const [c1, c2] = flippedCards;
    if(c1.icon === c2.icon) {
        matches++;
        document.getElementById('matches-count').innerText = matches;
        flippedCards = [];
        if(matches === document.querySelectorAll('.memory-card').length / 2) {
            document.getElementById('win-message').classList.remove('d-none');
        }
    } else {
        setTimeout(() => {
            c1.card.classList.remove('flipped');
            c2.card.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

document.getElementById('startGame').addEventListener('click', () => {
    isGameActive = true;
    initGame();
});

document.getElementById('restartGame').addEventListener('click', initGame);

// ========================================
// THEME TOGGLE FUNCTIONALITY
// ========================================

const toggleSwitch = document.querySelector('#theme-toggle');

// Load saved theme preference on page load
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

// Handle toggle change
toggleSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});