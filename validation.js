document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    // 1. Define Strict Regex Rules
    const regexRules = {
        // Name: Only alphabetical letters and spaces (min 1 char to avoid empty spaces passing)
        fullName: {
            pattern: /^[a-zA-Z\s]+$/,
            message: "Name must contain only alphabetical letters and spaces."
        },
        // Address: Only alphanumeric characters and space
        address: {
            pattern: /^[a-zA-Z0-9\s]+$/,
            message: "Address must contain only alphanumeric characters and spaces."
        },
        // Phone: Valid China format (starts with 1, second digit 3-9, plus 9 more digits)
        phone: {
            pattern: /^1[3-9]\d{9}$/,
            message: "Please enter a valid 11-digit China phone number."
        },
        // Email: Exactly one '@', ends with '.cn' or '.com'
        // Logic: Starts with anything but @, has one @, follows with anything but @, ends with .com or .cn
        email: {
            pattern: /^[^@]+@[^@]+\.(com|cn)$/,
            message: "Email must contain exactly one '@' and end with '.com' or '.cn'."
        },
        // Username: At least 6 alphanumeric characters
        username: {
            pattern: /^[a-zA-Z0-9]{6,}$/,
            message: "Username must be at least 6 alphanumeric characters."
        },
        // Password: At least 6 alphanumeric characters
        password: {
            pattern: /^[a-zA-Z0-9]{6,}$/,
            message: "Password must be at least 6 alphanumeric characters."
        }
    };

    // 2. Core Validation Function
    function validateField(inputElement) {
        const fieldName = inputElement.name;
        const value = inputElement.value.trim();
        const rule = regexRules[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`);

        // Check if empty first
        if (value === "") {
            showError(inputElement, errorElement, "This field cannot be empty.");
            return false;
        }

        // Test against regex
        if (!rule.pattern.test(value)) {
            showError(inputElement, errorElement, rule.message);
            return false;
        }

        // If passes
        showSuccess(inputElement, errorElement);
        return true;
    }

    // 3. UI Helpers for Error/Success States
    function showError(input, errorSpan, message) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        errorSpan.textContent = message;
    }

    function showSuccess(input, errorSpan) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        errorSpan.textContent = "";
    }

    // 4. Attach Dynamic Listeners (Validate on blur/input)
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        // Validate as the user types or leaves the field
        input.addEventListener('input', () => {
            // Only validate if they've already triggered an error, or wait for blur
            if (input.classList.contains('is-invalid')) {
                validateField(input);
            }
        });
        
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });

    // 5. Form Submit Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop default submission

        let isFormValid = true;

        // Validate all fields on submit
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            alert("Success! All regex validations passed. (Ready to send data to backend)");
            // In a real app, you would submit the data here
            // form.submit(); or fetch()
        }
    });
});