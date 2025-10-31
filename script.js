    // DOM Elements
        const authForms = document.getElementById('authForms');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const showLoginBtn = document.getElementById('showLogin');
        const showRegisterBtn = document.getElementById('showRegister');
        const switchToLogin = document.getElementById('switchToLogin');
        const switchToRegister = document.getElementById('switchToRegister');
        const forgotPasswordLink = document.getElementById('showForgotPassword');
        const forgotPasswordModal = document.getElementById('forgotPasswordModal');
        const codeVerificationModal = document.getElementById('codeVerificationModal');
        const newPasswordModal = document.getElementById('newPasswordModal');
        const closeModalButtons = document.querySelectorAll('.close-modal');
        const profilePhotoPreview = document.getElementById('profilePhotoPreview');
        const profilePhotoInput = document.getElementById('profilePhoto');
        const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
        const passwordStrengthBar = document.getElementById('passwordStrengthBar');
        const registerPasswordInput = document.getElementById('registerPassword');
        const codeInputs = document.querySelectorAll('.code-input');
        const codeTimer = document.getElementById('codeTimer');
        const verifyCodeBtn = document.getElementById('verifyCodeBtn');

        // Show Login Form
        function showLogin() {
            authForms.style.transform = 'translateX(0)';
        }

        // Show Register Form
        function showRegister() {
            authForms.style.transform = 'translateX(-50%)';
        }

        // Show Modal
        function showModal(modal) {
            modal.style.display = 'flex';
        }

        // Hide Modal
        function hideModal(modal) {
            modal.style.display = 'none';
        }

        // Check Password Strength
        function checkPasswordStrength(password) {
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength += 25;
            
            // Lowercase check
            if (/[a-z]/.test(password)) strength += 25;
            
            // Uppercase check
            if (/[A-Z]/.test(password)) strength += 25;
            
            // Number/Special character check
            if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
            
            return strength;
        }

        // Update Password Strength Bar
        function updatePasswordStrength(password) {
            const strength = checkPasswordStrength(password);
            const strengthBar = document.getElementById('passwordStrengthBar');
            
            strengthBar.style.width = `${strength}%`;
            
            if (strength < 50) {
                strengthBar.style.backgroundColor = '#ef4444'; // Red
            } else if (strength < 75) {
                strengthBar.style.backgroundColor = '#f59e0b'; // Yellow
            } else {
                strengthBar.style.backgroundColor = '#10b981'; // Green
            }
        }

        // Update New Password Strength Bar
        function updateNewPasswordStrength(password) {
            const strength = checkPasswordStrength(password);
            const strengthBar = document.getElementById('newPasswordStrengthBar');
            
            strengthBar.style.width = `${strength}%`;
            
            if (strength < 50) {
                strengthBar.style.backgroundColor = '#ef4444'; // Red
            } else if (strength < 75) {
                strengthBar.style.backgroundColor = '#f59e0b'; // Yellow
            } else {
                strengthBar.style.backgroundColor = '#10b981'; // Green
            }
        }

        // Start Code Timer
        function startCodeTimer(duration, display) {
            let timer = duration, minutes, seconds;
            const interval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = "Code expires in: " + minutes + ":" + seconds;

                if (--timer < 0) {
                    clearInterval(interval);
                    display.textContent = "Code expired";
                    display.classList.add('expiring');
                    verifyCodeBtn.disabled = true;
                }
                
                if (timer < 60) {
                    display.classList.add('expiring');
                }
            }, 1000);
        }

        // Handle Code Input Navigation
        function handleCodeInput(e) {
            const input = e.target;
            const index = parseInt(input.getAttribute('data-index'));
            
            // Move to next input if current input is filled
            if (input.value.length === 1 && index < 5) {
                codeInputs[index + 1].focus();
            }
            
            // Move to previous input if backspace is pressed and current input is empty
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                codeInputs[index - 1].focus();
            }
        }

        // Event Listeners
        showLoginBtn.addEventListener('click', showLogin);
        showRegisterBtn.addEventListener('click', showRegister);
        switchToLogin.addEventListener('click', showLogin);
        switchToRegister.addEventListener('click', showRegister);

        // Forgot Password Flow
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(forgotPasswordModal);
        });

        // Close Modals
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                hideModal(forgotPasswordModal);
                hideModal(codeVerificationModal);
                hideModal(newPasswordModal);
            });
        });

        // Profile Photo Upload
        uploadPhotoBtn.addEventListener('click', () => {
            profilePhotoInput.click();
        });

        profilePhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePhotoPreview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
                };
                reader.readAsDataURL(file);
            }
        });

        // Password Strength Indicator
        registerPasswordInput.addEventListener('input', (e) => {
            updatePasswordStrength(e.target.value);
        });

        // Code Input Navigation
        codeInputs.forEach(input => {
            input.addEventListener('input', handleCodeInput);
            input.addEventListener('keydown', handleCodeInput);
        });

        // Form Submissions
        document.getElementById('loginFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality would be implemented here!');
            // In a real app, you would send login data to your backend
        });

        document.getElementById('registerFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (checkPasswordStrength(password) < 75) {
                alert('Password is too weak. Please use a stronger password.');
                return;
            }
            
            alert('Registration successful! You can now login.');
            showLogin();
            // In a real app, you would send registration data to your backend
        });

        document.getElementById('forgotPasswordForm').addEventListener('submit', (e) => {
            e.preventDefault();
            hideModal(forgotPasswordModal);
            showModal(codeVerificationModal);
            
            // Start 5-minute timer
            startCodeTimer(300, codeTimer);
            
            // In a real app, you would send the email to your backend to generate and send a code
        });

        verifyCodeBtn.addEventListener('click', () => {
            hideModal(codeVerificationModal);
            showModal(newPasswordModal);
            
            // In a real app, you would verify the code with your backend first
        });

        document.getElementById('newPasswordForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;
            
            if (newPassword !== confirmNewPassword) {
                alert('Passwords do not match! Please try again.');
                return;
            }
            
            if (checkPasswordStrength(newPassword) < 75) {
                alert('Password is too weak. Please use a stronger password.');
                return;
            }
            
            alert('Password updated successfully!');
            hideModal(newPasswordModal);
            showLogin();
            
            // In a real app, you would send the new password to your backend
        });

        // New Password Strength Indicator
        document.getElementById('newPassword').addEventListener('input', (e) => {
            updateNewPasswordStrength(e.target.value);
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === forgotPasswordModal) {
                hideModal(forgotPasswordModal);
            }
            if (e.target === codeVerificationModal) {
                hideModal(codeVerificationModal);
            }
            if (e.target === newPasswordModal) {
                hideModal(newPasswordModal);
            }
        });