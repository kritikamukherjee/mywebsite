/**
 * CUSTOM JAVASCRIPT
 * 1. Form Validation & Phone Masking
 * 2. Memory Game Logic
 * 3. Theme Toggle (Dark/Light Mode)
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. FORM ELEMENTS & VALIDATION ---
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const phoneInput = document.getElementById('phone');
    const inputsToValidate = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    if (form) {
        form.setAttribute('novalidate', 'true');
        // Start with button disabled
        if (submitBtn) submitBtn.disabled = true;
    }

    /**
     * Phone Masking: Formats to +370 6XX XXXXX
     * Also converts leading '8' to '370'
     */
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            // Convert Lithuanian old format (8...) to international (370...)
            if (value.startsWith('8')) {
                value = '370' + value.substring(1);
            }

            let formattedValue = "";
            if (value.length > 0) {
                formattedValue = '+' + value.substring(0, 3); // +370
                if (value.length > 3) {
                    formattedValue += ' ' + value.substring(3, 6); // Space after prefix
                }
                if (value.length > 6) {
                    formattedValue += ' ' + value.substring(6, 11); // Space before last 5 digits
                }
            }

            e.target.value = formattedValue;
            validateFullForm(); // Check if form is now valid
        });
    }

    /**
     * Checks all fields and toggles Submit button state
     */
    function validateFullForm() {
        if (!form || !submitBtn) return;

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = phoneInput.value.replace(/\D/g, '');
        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation Criteria
        const isNameValid = firstName.length >= 2;
        const isLastNameValid = lastName.length >= 2;
        const isEmailValid = emailRegex.test(email);
        const isPhoneValid = phone.length === 11; // 370 + 8 digits
        const isAddressValid = address.length >= 5;

        const isFormValid = isNameValid && isLastNameValid && isEmailValid && isPhoneValid && isAddressValid;

        // Enable/Disable button
        submitBtn.disabled = !isFormValid;
        
        return isFormValid;
    }

    // Attach real-time listener to all fields
    inputsToValidate.forEach(input => {
        input.addEventListener('input', validateFullForm);
    });

    /**
     * Handle Final Submission
     */
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateFullForm()) return; // Extra safety

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = phoneInput.value;
            const address = document.getElementById('address').value;

            // Average Calculation
            const r1 = parseInt(document.getElementById('rate1')?.value) || 0;
            const r2 = parseInt(document.getElementById('rate2')?.value) || 0;
            const r3 = parseInt(document.getElementById('rate3')?.value) || 0;
            const average = ((r1 + r2 + r3) / 3).toFixed(1);

            // Display Success Results
            const outputDiv = document.getElementById('formDataOutput');
            if (outputDiv) {
                outputDiv.innerHTML = `
                    <div style="padding: 15px; border: 1px solid #28a745; border-radius: 5px; background-color: rgba(40, 167, 69, 0.1);">
                        <strong>✅ Form Submitted Successfully!</strong><br><br>
                        <strong>Name:</strong> ${firstName} ${lastName}<br>
                        <strong>Email:</strong> ${email}<br>
                        <strong>Phone:</strong> ${phone}<br>
                        <strong>Address:</strong> ${address}<br>
                        <strong>Rating:</strong> ${average}/10
                    </div>
                `;
                outputDiv.classList.remove('d-none');
            }

            // Update color-coded average summary
            const avgOutput = document.getElementById('averageOutput');
            if (avgOutput) {
                let color = 'green';
                if (average < 4) color = 'red';
                else if (average < 7) color = 'orange';
                
                avgOutput.style.color = color;
                avgOutput.innerHTML = `<strong>Result:</strong> ${firstName} ${lastName} scored ${average}/10`;
            }

            alert('✅ Form submitted successfully!');
        });
    }

    // --- 2. MEMORY GAME ---
    const icons = ['🚀', '🧠', '💻', '🎨', '⚡', '🌈', '🍕', '🐱', '🔥', '💎', '🎮', '🎸'];
    let flippedCards = [];
    let moves = 0;
    let matches = 0;
    let isGameActive = false;

    window