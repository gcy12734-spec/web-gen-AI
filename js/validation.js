document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    const regexRules = {
        fullName: { pattern: /^[a-zA-Z\s]+$/, message: "Name must contain only alphabetical letters and spaces." },
        address: { pattern: /^[a-zA-Z0-9\s]+$/, message: "Address must contain only alphanumeric characters and spaces." },
        phone: { pattern: /^1[3-9]\d{9}$/, message: "Please enter a valid 11-digit China phone number." },
        email: { pattern: /^[^@]+@[^@]+\.(com|cn)$/, message: "Email must contain exactly one '@' and end with '.com' or '.cn'." },
        username: { pattern: /^[a-zA-Z0-9]{6,}$/, message: "Username must be at least 6 alphanumeric characters." },
        password: { pattern: /^[a-zA-Z0-9]{6,}$/, message: "Password must be at least 6 alphanumeric characters." }
    };

    function validateField(inputElement) {
        const fieldName = inputElement.name;
        const value = inputElement.value.trim();
        const rule = regexRules[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`);

        if (value === "") {
            showError(inputElement, errorElement, "This field cannot be empty.");
            return false;
        }
        if (!rule.pattern.test(value)) {
            showError(inputElement, errorElement, rule.message);
            return false;
        }
        showSuccess(inputElement, errorElement);
        return true;
    }

    function showError(input, errorSpan, message) {
        input.classList.remove('is-valid'); input.classList.add('is-invalid'); errorSpan.textContent = message;
    }

    function showSuccess(input, errorSpan) {
        input.classList.remove('is-invalid'); input.classList.add('is-valid'); errorSpan.textContent = "";
    }

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => { if (input.classList.contains('is-invalid')) validateField(input); });
        input.addEventListener('blur', () => validateField(input));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;
        inputs.forEach(input => { if (!validateField(input)) isFormValid = false; });
        if (isFormValid) {
            alert("Success! All regex validations passed. Redirecting to login...");
            window.location.href = 'log-in.html';
        }
    });
});