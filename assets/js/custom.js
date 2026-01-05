// ========================================
// FORM VALIDATION - COMPLETE AND STRICT
// ========================================

// Ensure we intercept BOTH form submit AND button click
document.addEventListener('DOMContentLoaded', function() {
  
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  
  // Disable browser's default validation
  if (form) {
    form.setAttribute('novalidate', 'true');
  }
  
  // Function to validate and submit
  function validateAndSubmit(e) {
    // ALWAYS prevent default
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('🔍 Validation started');
    
    // Clear ALL previous errors and success messages
    document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');
    document.querySelectorAll('#contactForm input').forEach(input => input.style.borderColor = '');
    document.getElementById('formDataOutput').classList.add('d-none');
    document.getElementById('averageOutput').innerHTML = '';
    
    let isValid = true;
    let errorMessages = [];
    
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    
    console.log('📝 Form values:', { 
      firstName: `"${firstName}" (${firstName.length} chars)`, 
      lastName: `"${lastName}" (${lastName.length} chars)`, 
      email: `"${email}"`, 
      phone: `"${phone}"`, 
      address: `"${address}" (${address.length} chars)`
    });
    
    // Validate First Name - STRICT
    if (firstName.length === 0) {
      showError('firstName', 'First name is required');
      errorMessages.push('First name is empty');
      isValid = false;
    } else if (firstName.length < 2) {
      showError('firstName', 'First name must be at least 2 characters');
      errorMessages.push(`First name too short (${firstName.length}/2 characters)`);
      isValid = false;
    }
    
    // Validate Last Name - STRICT
    if (lastName.length === 0) {
      showError('lastName', 'Last name is required');
      errorMessages.push('Last name is empty');
      isValid = false;
    } else if (lastName.length < 2) {
      showError('lastName', 'Last name must be at least 2 characters');
      errorMessages.push(`Last name too short (${lastName.length}/2 characters)`);
      isValid = false;
    }
    
    // Validate Email - STRICT
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length === 0) {
      showError('email', 'Email is required');
      errorMessages.push('Email is empty');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError('email', 'Please enter a valid email address (e.g., user@example.com)');
      errorMessages.push('Email format is invalid');
      isValid = false;
    }
    
    // Validate Lithuanian Phone Number - STRICT
    const lithuanianPhoneRegex = /^(\+370|370|8)[0-9]{8}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (phone.length === 0) {
      showError('phone', 'Phone number is required');
      errorMessages.push('Phone is empty');
      isValid = false;
    } else if (!lithuanianPhoneRegex.test(cleanPhone)) {
      showError('phone', 'Must be Lithuanian format: +370 6xx xxxxx or 8xxxxxxxx');
      errorMessages.push('Phone format is invalid');
      isValid = false;
    }
    
    // Validate Address - STRICT
    if (address.length === 0) {
      showError('address', 'Address is required');
      errorMessages.push('Address is empty');
      isValid = false;
    } else if (address.length < 5) {
      showError('address', 'Address must be at least 5 characters');
      errorMessages.push(`Address too short (${address.length}/5 characters)`);
      isValid = false;
    }
    
    console.log('✅ Validation result:', isValid ? 'PASS ✅' : 'FAIL ❌');
    
    // CRITICAL: STOP HERE if form is invalid
    if (!isValid) {
      const errorList = errorMessages.join('\n• ');
      alert('❌ FORM VALIDATION FAILED!\n\nPlease fix these errors:\n• ' + errorList);
      console.log('🛑 Form submission BLOCKED - Errors:', errorMessages);
      return false; // Prevent any further processing
    }
    
    // ========================================
    // ONLY EXECUTE IF ALL VALIDATIONS PASSED
    // ========================================
    
    console.log('✅ All validations passed - processing form');
    
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
    console.log('🎉 Form submission completed successfully');
    
    return false; // Prevent any default form submission
  }
  
  // Attach to BOTH form submit AND button click
  if (form) {
    form.addEventListener('submit', validateAndSubmit);
  }
  
  if (submitBtn) {
    submitBtn.addEventListener('click', validateAndSubmit);
  }
  
  console.log('✅ Form validation handlers attached');
});
    // ========================================
    // ONLY EXECUTE IF ALL VALIDATIONS PASSED
    // ========================================
    
    console.log('✅ All validations passed - processing form');
    
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
    console.log('🎉 Form submission completed successfully');
    
    return false; // Prevent any default form submission
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