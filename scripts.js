       // Modal functionality
        const authModal = document.getElementById('authModal');
        const closeButtons = document.querySelectorAll('.close-modal');
        

        // Show auth modal with login form
        document.getElementById('showLogin').addEventListener('click', function() {
            authModal.classList.add('active');
            showAuthForm('login');
        });
        
        // Show auth modal with register form
        document.getElementById('showRegister').addEventListener('click', function() {
            authModal.classList.add('active');
            showAuthForm('register');
            setUserType('buyer');
        });
        
        // Show buyer registration
        function showBuyerRegistration() {
            authModal.classList.add('active');
            showAuthForm('register');
            setUserType('buyer');
        }
        
        // Show seller registration
        function showSellerRegistration() {
            authModal.classList.add('active');
            showAuthForm('register');
            setUserType('seller');
        }
        
        // Close modal
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                authModal.classList.remove('active');
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === authModal) {
                authModal.classList.remove('active');
            }
        });
        
        // Tab switching functionality
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding form
                const tabName = this.getAttribute('data-tab');
                showAuthForm(tabName);
            });
        });
        
        function showAuthForm(formName) {
            document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
            document.getElementById(`${formName}-form`).classList.add('active');
        }
        
        // User type switching
        document.querySelectorAll('.user-type').forEach(type => {
            type.addEventListener('click', function() {
                document.querySelectorAll('.user-type').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const userType = this.getAttribute('data-type');
                setUserType(userType);
            });
        });
        
        function setUserType(type) {
            if (type === 'buyer') {
                document.getElementById('buyer-fields').classList.remove('hidden');
                document.getElementById('seller-fields').classList.add('hidden');
            } else {
                document.getElementById('buyer-fields').classList.add('hidden');
                document.getElementById('seller-fields').classList.remove('hidden');
            }
        }
        
        // Forgot password link
        document.getElementById('forgot-password-link').addEventListener('click', function(e) {
            e.preventDefault();
            showAuthForm('forgot-password');
        });
        
        // Back to login from forgot password
        document.getElementById('back-to-login').addEventListener('click', function(e) {
            e.preventDefault();
            showAuthForm('login');
        });
        
        // Already have an account link
        document.getElementById('already-have-account').addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector('[data-tab="login"]').classList.add('active');
            showAuthForm('login');
        });
        
        // OTP input navigation
        function moveToNext(input, nextIndex) {
            if (input.value.length === 1) {
                const nextInput = document.querySelectorAll('.otp-input')[nextIndex];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
        
   function checkPasswordStrength() {
    const password =
        document.getElementById('register-password')?.value ||
        document.getElementById('new-password')?.value;

    const strengthBar =
        document.getElementById('register-password-strength-bar') ||
        document.getElementById('password-strength-bar');

    const eyeIcon = document.getElementById("toggle-eye");

    if (!password || !strengthBar) return false;

    // Reset bar class
    strengthBar.className = "password-strength-bar";

    let strength = 0;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-=+[\]\\;/]/.test(password);
    const longEnough = password.length >= 8;

    // Count strength
    if (longEnough) strength++;
    if (hasLower && hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;

    // Apply classes + eye color
    if (strength <= 1) {
        strengthBar.classList.add("password-weak");
        if (eyeIcon) eyeIcon.style.color = "#ef4444"; // red
    }
    else if (strength <= 3) {
        strengthBar.classList.add("password-medium");
        if (eyeIcon) eyeIcon.style.color = "#f59e0b"; // amber
    }
    else {
        strengthBar.classList.add("password-strong");
        if (eyeIcon) eyeIcon.style.color = "#10b981"; // green
    }

    // ✅ Return TRUE only when password is fully strong
    return hasLower && hasUpper && hasNumber && hasSpecial && longEnough;
}
function togglePasswordVisibility() {
    const field =
        document.getElementById('register-password') ||
        document.getElementById('new-password');

    const eyeIcon = document.getElementById("toggle-eye");

    if (!field || !eyeIcon) return;

    if (field.type === "password") {
        field.type = "text";
        eyeIcon.textContent = "🙈";
        eyeIcon.style.transform = "rotate(20deg) scale(1.2)";
        setTimeout(() => {
            eyeIcon.style.transform = "rotate(0deg) scale(1)";
        }, 200);
    } else {
        field.type = "password";
        eyeIcon.textContent = "👁️";
        eyeIcon.style.transform = "rotate(-20deg) scale(1.2)";
        setTimeout(() => {
            eyeIcon.style.transform = "rotate(0deg) scale(1)";
        }, 200);
    }
}

        
        // OTP Timer
        let otpTimer;
        function startOTPTimer() {
            let timeLeft = 300; // 5 minutes in seconds
            const timerElement = document.getElementById('otp-timer');
            
            otpTimer = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (timeLeft <= 60) {
                    timerElement.classList.add('expiring');
                }
                
                if (timeLeft <= 0) {
                    clearInterval(otpTimer);
                    alert('OTP has expired. Please request a new one.');
                }
                
                timeLeft--;
            }, 1000);
        }
        
        // Form submission functions
        function search() {
            const query = document.querySelector('.search-container input').value;
            if (query.trim() !== '') {
                alert(`Searching for: ${query}`);
            } else {
                alert('Please enter a search term');
            }
        }
        
   

    
        
       
        
        
        function sendOTP() {
            const email = document.getElementById('forgot-email').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // In a real application, you would send OTP to the user's email
            alert(`OTP sent to ${email}`);
            
            // Show OTP verification form
            showAuthForm('otp-verification');
            
            // Start OTP timer
            startOTPTimer();
        }
        
        function verifyOTP() {
            const otpInputs = document.querySelectorAll('.otp-input');
            let otp = '';
            otpInputs.forEach(input => {
                otp += input.value;
            });
            
            if (otp.length !== 6) {
                alert('Please enter the complete 6-digit OTP');
                return;
            }
            
            // In a real application, you would verify OTP with backend
            if (otp === '123456') { // Mock OTP for demo
                clearInterval(otpTimer);
                alert('OTP verified successfully!');
                
                // Show reset password form
                showAuthForm('reset-password');
            } else {
                alert('Invalid OTP. Please try again.');
            }
        }
        
        function resetPassword() {
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (!newPassword || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
              if (checkPasswordStrength() === false) {
                     alert("Your password is too weak! Use uppercase letters, numbers, special characters, and at least 8 characters.");
                   return;
                      }
            
            // update the password via backend
            alert('Password reset successfully! Please login with your new password.');
            
            // Redirect to login
            document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector('[data-tab="login"]').classList.add('active');
            showAuthForm('login');
        }
        document.getElementById('uploadPhotoBtn').addEventListener('click', function () {
        document.getElementById('profilePhoto').click();
    });document.getElementById('profilePhoto').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'image/jpeg') {
        alert('Only JPG images are allowed.');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert('Image must be less than 10MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const preview = document.getElementById('profilePhotoPreview');
        preview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    };
    reader.readAsDataURL(file);
});

        
// Load existing users separately
let buyers = JSON.parse(localStorage.getItem("buyers")) || [];
let sellers = JSON.parse(localStorage.getItem("sellers")) || [];
let lastRegisteredEmail = '';

// Convert image file to base64
function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject("Image conversion failed");
        reader.readAsDataURL(file);
    });
}

async function register() {
    const userType = document.querySelector('.user-type.active').getAttribute('data-type');
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const username = document.getElementById("User-Name").value;
    const image = document.getElementById("profilePhoto").files[0];

    // ✅ Basic validations
    if (!email || !phone || !password || !confirmPassword || !username) {
        alert('Please fill in all required fields');
        return;
    }
    if (checkPasswordStrength() === false) {
        alert("Your password is too weak!");
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    if (!image) {
        alert('Please upload a profile picture.');
        return;
    }
    if (image.type !== 'image/jpeg') {
        alert('Only JPG images are allowed.');
        return;
    }
    if (image.size > 10 * 1024 * 1024) {
        alert('Image must not exceed 10MB.');
        return;
    }

    // ✅ Check if user exists in BOTH groups
    const existsInBuyers = buyers.some(u => u.email === email);
    const existsInSellers = sellers.some(u => u.email === email);

    if (existsInBuyers || existsInSellers) {
        alert("This email is already registered!");
        return;
    }

    // ✅ EXTRA seller validation
    let sellerInfo = null;
    if (userType === 'seller') {
        const name = document.getElementById('seller-name').value;
        const id = document.getElementById('seller-id').value;
        const category = document.getElementById('seller-category').value;

        if (!name || !id || !category) {
            alert('Please fill in all seller details');
            return;
        }

        sellerInfo = { name, id, category };
    }

    showRegistrationSpinner();

    // Convert image to Base64
    const base64Image = await convertImageToBase64(image);

    setTimeout(() => {
        const newUser = {
            email,
            phone,
            password,
            username,
            profileImage: base64Image,
            createdAt: new Date().toISOString()
        };

        // ✅ Save to correct group
        if (userType === 'buyer') {
            buyers.push(newUser);
            localStorage.setItem("buyers", JSON.stringify(buyers));
        } else if (userType === 'seller') {
            sellers.push({ ...newUser, sellerInfo });
            localStorage.setItem("sellers", JSON.stringify(sellers));
        }

        lastRegisteredEmail = email;
        showSuccessMessage(username);

        setTimeout(() => redirectToLogin(), 5000);

    }, 5000);

    clearRegistrationFields();
}



function showRegistrationSpinner() {
    const spinnerOverlay = document.createElement('div');
    spinnerOverlay.id = 'spinner-overlay';
    spinnerOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        flex-direction: column;
    `;

    spinnerOverlay.innerHTML = `
        <div class="spinner" style="
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        "></div>
        <div style="color: white; font-size: 18px;">Creating your account...</div>
    `;

    document.body.appendChild(spinnerOverlay);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function showSuccessMessage(username) {
    const spinnerOverlay = document.getElementById('spinner-overlay');
    if (spinnerOverlay) spinnerOverlay.remove();

    const successOverlay = document.createElement('div');
    successOverlay.id = 'success-overlay';
    successOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        flex-direction: column;
    `;

    successOverlay.innerHTML = `
        <div class="success-tick" style="
            font-size: 80px;
            color: #4CAF50;
            margin-bottom: 20px;
            animation: glow 1.5s ease-in-out infinite alternate;
        ">✓</div>
        <div style="color: white; font-size: 24px; text-align: center;">
            <div>Congratulations <span style="color: #4CAF50; font-weight: bold;">${username}</span>!</div>
            <div style="font-size: 16px; margin-top: 10px; opacity: 0.8;">Your account has been created successfully</div>
            <div style="font-size: 14px; margin-top: 20px; opacity: 0.6;">Redirecting to login page in 5 seconds...</div>
        </div>
    `;

    document.body.appendChild(successOverlay);

    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
        @keyframes glow {
            from {
                text-shadow: 0 0 10px #4CAF50, 0 0 20px #4CAF50;
            }
            to {
                text-shadow: 0 0 20px #4CAF50, 0 0 30px #4CAF50;
            }
        }
    `;
    document.head.appendChild(glowStyle);
}

function redirectToLogin() {
    const successOverlay = document.getElementById('success-overlay');
    if (successOverlay) successOverlay.remove();
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector('[data-tab="login"]').classList.add('active');
            showAuthForm('login');
    

    showLoginModal();
}

function showLoginModal() {
    const loginModal = document.getElementById('authModal');
    if (loginModal) loginModal.classList.add('active');

    const loginEmail = document.getElementById('login-email');
    if (loginEmail && lastRegisteredEmail) {
        loginEmail.value = lastRegisteredEmail;
    }
}

let currentUser = null;

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    const user = users.find(u => u.email === email);

    if (!user) {
        alert('User not registered. Please sign up first.');
         document.getElementById('login-email').value = '';
         document.getElementById('login-password').value = '';
        
        return;
    }

    if (user.password !== password) {
        alert('Incorrect password.');
         
         document.getElementById('login-password').value = '';
        return;
    }

    currentUser = user;

    // Close auth modal
    const authModal = document.getElementById('authModal');
    if (authModal) authModal.classList.remove('active');

    // Update auth buttons
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.innerHTML = `
        <button class="btn btn-outline" id="logoutBtn">Logout</button>
        ${user.userType === 'seller' ? `
            <button class="btn btn-primary" id="sellerDashboardBtn">Seller Dashboard</button>
        ` : ''}
    `;

    // Attach listeners
    document.getElementById('logoutBtn').addEventListener('click', logout);
    if (user.userType === 'seller') {
        document.getElementById('sellerDashboardBtn').addEventListener('click', showSellerDashboard);
    }

    alert(`Welcome back, ${user.username}!`);
}
function logout() {
    // Show enhanced logout animation
    showEnhancedLogoutAnimation();
    
    // Wait for animation to complete before actually logging out
    setTimeout(() => {
        currentUser = null;

        const authButtons = document.querySelector('.auth-buttons');
        authButtons.innerHTML = `
            <button class="btn btn-outline" id="showLogin">Login</button>
            <button class="btn btn-primary" id="showRegister">Register</button>
        `;

        // Reattach login/register listeners
        document.getElementById('showLogin').addEventListener('click', () => {
            document.getElementById('authModal').classList.add('active');
            showAuthForm('login');
        });

        document.getElementById('showRegister').addEventListener('click', () => {
            document.getElementById('authModal').classList.add('active');
            showAuthForm('register');
            setUserType('buyer');
        });

        // Remove logout overlay after completion
        const logoutOverlay = document.getElementById('logout-overlay');
        if (logoutOverlay) {
            logoutOverlay.remove();
        }
        
    }, 4000); // Match the animation duration
}

function showEnhancedLogoutAnimation() {
    const logoutOverlay = document.createElement('div');
    logoutOverlay.id = 'logout-overlay';
    logoutOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        flex-direction: column;
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        overflow: hidden;
    `;
    
    logoutOverlay.innerHTML = `
        <div class="floating-particles"></div>
        <div class="logout-container" style="position: relative; z-index: 2;">
            <div class="wave-goodbye" style="
                font-size: 80px;
                margin-bottom: 20px;
                animation: wave 2s ease-in-out infinite;
            ">👋</div>
            
            <div class="logout-message" style="
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 15px;
                animation: fadeInUp 1s ease-out;
            ">See you soon!</div>
            
            <div class="logout-reminder" style="
                font-size: 18px;
                margin-bottom: 10px;
                opacity: 0;
                animation: fadeInUp 1s ease-out 0.5s forwards;
            ">Remember, you'll always be able to sell and buy goods</div>
            
            <div class="logout-reminder-2" style="
                font-size: 18px;
                margin-bottom: 30px;
                opacity: 0;
                animation: fadeInUp 1s ease-out 1s forwards;
            ">only when logged in!</div>
            
            <div class="logout-bye" style="
                font-size: 20px;
                opacity: 0;
                animation: fadeInUp 1s ease-out 1.5s forwards;
            ">Bye 😊</div>
            
            <div class="logout-progress" style="
                width: 200px;
                height: 4px;
                background: rgba(255,255,255,0.3);
                border-radius: 2px;
                margin-top: 30px;
                overflow: hidden;
            ">
                <div class="progress-bar" style="
                    width: 0%;
                    height: 100%;
                    background: white;
                    border-radius: 2px;
                    animation: progressFill 4s linear forwards;
                "></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(logoutOverlay);
    
    // Add floating particles
    createFloatingParticles();
    
    // Add animations
    const logoutStyles = document.createElement('style');
    logoutStyles.textContent = `
        @keyframes wave {
            0%, 100% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(-10deg) scale(1.1); }
            50% { transform: rotate(0deg) scale(1.1); }
            75% { transform: rotate(10deg) scale(1.1); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes progressFill {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
            33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
            66% { transform: translateY(10px) translateX(-10px) rotate(240deg); }
        }
        
        .floating-particle {
            position: absolute;
            width: 8px;
            height: 8px;
            background: rgba(255,255,255,0.6);
            border-radius: 50%;
            animation: float 6s infinite ease-in-out;
        }
        
        .wave-goodbye {
            animation: wave 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(logoutStyles);
}

function createFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    const particlesCount = 15;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            width: ${Math.random() * 6 + 4}px;
            height: ${Math.random() * 6 + 4}px;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        container.appendChild(particle);
    }
}
function showSellerDashboard() {
    alert(`Welcome to your Seller Dashboard, ${currentUser.username}!`);
    window.location.href = 'seller.html';

}
function clearRegistrationFields() {
    document.getElementById('register-email').value = '';
    document.getElementById('register-phone').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm-password').value = '';
    document.getElementById('User-Name').value = '';
    document.getElementById('profilePhoto').value = '';
    

    // Clear seller-specific fields if visible
    const sellerFields = document.getElementById('seller-fields');
    if (sellerFields && !sellerFields.classList.contains('hidden')) {
        document.getElementById('seller-name').value = '';
        document.getElementById('seller-id').value = '';
        document.getElementById('seller-category').value = '';
    }
    const buyerfields= document.getElementById('buyer-fields');
    if(buyerfields && !buyerfields.classList.contains('hidden')){
        document.getElementById("buyer-location").value= '';

    }
    // Reset image preview
    const preview = document.getElementById('profilePhotoPreview');
    if (preview) {
        preview.innerHTML = '<span>👤</span>';
    }
}
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showVibeAlert('Please fill in all fields', 'error');
        return;
    }
    // Admin login check
if (email.toLowerCase() === 'admin@gmail.com') {
    if (password !== 'Admin123') {
        // Wrong admin password — vibe alert animation
        const alertDiv = document.createElement('div');
        alertDiv.textContent = '❌ Incorrect Admin password!';
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px; left: 50%;
            transform: translateX(-50%);
            background: #ff4c4c;
            color: white;
            padding: 15px 25px;
            font-size: 18px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideDown 0.6s ease-out;
        `;
        document.body.appendChild(alertDiv);
        document.getElementById('login-password').value = '';

        setTimeout(() => {
            alertDiv.style.transition = 'opacity 0.5s';
            alertDiv.style.opacity = 0;
            setTimeout(() => alertDiv.remove(), 500);
        }, 2000);

        return; // Stop further execution
    }

    // ✅ Correct admin password — proceed with vibe animation
    currentUser = {
        email,
        username: 'Admin',
        userType: 'admin'
    };

    // Close auth modal
    const authModal = document.getElementById('authModal');
    if (authModal) authModal.classList.remove('active');

    showAdminControls(); // Show all admin features

    // Clear login inputs
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';

    // Create welcome overlay
    const overlay = document.createElement('div');
    overlay.id = 'admin-welcome-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        flex-direction: column;
        color: white;
        font-family: 'Arial', sans-serif;
        text-align: center;
    `;

    overlay.innerHTML = `
        <div style="font-size: 32px; margin-bottom: 20px; animation: fadeIn 1s;">👑 Welcome back, Admin!</div>
        <div style="font-size: 20px; margin-bottom: 15px; animation: fadeIn 1s 0.5s;">Pick your Admin name:</div>
        <div style="display:flex; gap: 10px; animation: fadeIn 1s 1s;">
            <button class="vibe-btn">Wess</button>
            <button class="vibe-btn">Mulinge</button>
            <button class="vibe-btn">Biba</button>
        </div>
        <div id="vibe-greeting" style="margin-top: 20px; font-size: 28px; opacity:0; position: relative;"></div>
        <canvas id="confetti-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;"></canvas>
    `;
    document.body.appendChild(overlay);

    // Add animations & button style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
            from { transform: translate(-50%, -50px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        .vibe-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            cursor: pointer;
            font-weight: bold;
            transition: transform 0.2s, background 0.3s;
        }
        .vibe-btn:hover {
            transform: scale(1.1);
            background: linear-gradient(135deg, #67e87c, #45a049);
        }
    `;
    document.head.appendChild(style);

    // Confetti & greeting
    function launchConfettiAroundText(element) {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confettiCount = 150;
        const confetti = [];
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: element.offsetLeft + element.offsetWidth/2,
                y: element.offsetTop + element.offsetHeight/2,
                r: Math.random() * 6 + 4,
                d: Math.random() * confettiCount,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                tilt: Math.random() * 10 - 10,
                tiltAngleIncremental: Math.random() * 0.07 + 0.05,
                tiltAngle: 0,
                vx: Math.random() * 6 - 3,
                vy: Math.random() * -6 - 2
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confetti.forEach(c => {
                ctx.beginPath();
                ctx.lineWidth = c.r / 2;
                ctx.strokeStyle = c.color;
                ctx.moveTo(c.x + c.tilt, c.y);
                ctx.lineTo(c.x + c.tilt + c.vx, c.y + c.vy + c.tilt);
                ctx.stroke();
            });
            update();
        }

        function update() {
            confetti.forEach(c => {
                c.x += c.vx;
                c.y += c.vy + 1;
                c.tilt = Math.sin(c.tiltAngle) * 15;
                c.tiltAngle += c.tiltAngleIncremental;
                if (c.y > canvas.height || c.x < 0 || c.x > canvas.width) {
                    c.x = element.offsetLeft + element.offsetWidth/2;
                    c.y = element.offsetTop + element.offsetHeight/2;
                }
            });
        }

        const interval = setInterval(draw, 16);
        setTimeout(() => {
            clearInterval(interval);
            canvas.remove();
        }, 3000);
    }

    // Handle vibe selection
    overlay.querySelectorAll('.vibe-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.textContent;
            const greeting = document.getElementById('vibe-greeting');
            greeting.textContent = `Oooh, ${name}! Hello! ✨`;
            greeting.style.opacity = 1;
            launchConfettiAroundText(greeting);

            setTimeout(() => {
                overlay.style.transition = 'opacity 0.8s';
                overlay.style.opacity = 0;
                setTimeout(() => overlay.remove(), 800);
            }, 2000);
        });
    });

    return; // Stop normal login flow
}


    // Load users from storage
    const buyers = JSON.parse(localStorage.getItem("buyers")) || [];
    const sellers = JSON.parse(localStorage.getItem("sellers")) || [];

    // Start animation
    showLoginAnimation();

    setTimeout(() => {
        let user = null;
        let role = null;

        // ✅ Check buyers list
        const buyer = buyers.find(u => u.email === email);
        if (buyer) {
            user = buyer;
            role = "buyer";
        }

        // ✅ Check sellers list
        const seller = sellers.find(u => u.email === email);
        if (seller) {
            user = seller;
            role = "seller";
        }

       

        // ✅ Wrong password
        if (user.password !== password) {
            hideLoginAnimation();
            showVibeAlert('Incorrect password.', 'error');
            document.getElementById('login-password').value = '';
            return;
        }

        // ✅ Add userType to the object before sending forward
        user.userType = role;

        // Success animation + login operations
        completeLogin(user);

    }, 3000);
}


function showLoginAnimation() {
    const loginOverlay = document.createElement('div');
    loginOverlay.id = 'login-overlay';
    loginOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        flex-direction: column;
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        overflow: hidden;
    `;
    
    loginOverlay.innerHTML = `
        <div class="login-particles"></div>
        <div class="login-container" style="position: relative; z-index: 2;">
            <div class="portal-spinner">
                <div class="portal-ring"></div>
                <div class="portal-core"></div>
                <div class="portal-orbits">
                    <div class="orbit orbit-1"></div>
                    <div class="orbit orbit-2"></div>
                    <div class="orbit orbit-3"></div>
                </div>
            </div>
            
            <div class="login-text" style="
                font-size: 22px;
                font-weight: bold;
                margin-top: 30px;
                animation: textGlow 2s ease-in-out infinite alternate;
            ">Accessing Your Portal...</div>
            
            <div class="login-subtext" style="
                font-size: 16px;
                margin-top: 10px;
                opacity: 0.8;
            ">Welcome back to ReMarket!</div>
            
            <div class="login-progress" style="
                width: 250px;
                height: 6px;
                background: rgba(255,255,255,0.2);
                border-radius: 3px;
                margin-top: 25px;
                overflow: hidden;
            ">
                <div class="progress-fill" style="
                    width: 0%;
                    height: 100%;
                    background: linear-gradient(90deg, #4CAF50, #45a049);
                    border-radius: 3px;
                    animation: loginProgress 3s ease-in-out forwards;
                "></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loginOverlay);
    
    // Add login particles
    createLoginParticles();
    
    // Add animations
    const loginStyles = document.createElement('style');
    loginStyles.textContent = `
        @keyframes portalSpin {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes orbitSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes corePulse {
            0%, 100% { 
                transform: scale(1);
                box-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
            }
            50% { 
                transform: scale(1.2);
                box-shadow: 0 0 40px rgba(76, 175, 80, 0.8);
            }
        }
        
        @keyframes loginProgress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        @keyframes textGlow {
            0% { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
            100% { text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(76,175,80,0.6); }
        }
        
        @keyframes floatParticle {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0.3;
            }
            25% { 
                transform: translateY(-15px) translateX(10px) rotate(90deg);
                opacity: 0.6;
            }
            50% { 
                transform: translateY(-5px) translateX(-10px) rotate(180deg);
                opacity: 0.8;
            }
            75% { 
                transform: translateY(10px) translateX(5px) rotate(270deg);
                opacity: 0.6;
            }
        }
        
        .portal-spinner {
            position: relative;
            width: 120px;
            height: 120px;
            margin: 0 auto;
        }
        
        .portal-ring {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 4px solid transparent;
            border-top: 4px solid #4CAF50;
            border-radius: 50%;
            animation: portalSpin 2s linear infinite;
        }
        
        .portal-ring::before {
            content: '';
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            border: 2px solid transparent;
            border-bottom: 2px solid #2196F3;
            border-radius: 50%;
            animation: portalSpin 3s linear infinite reverse;
        }
        
        .portal-core {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            background: #4CAF50;
            border-radius: 50%;
            animation: corePulse 1.5s ease-in-out infinite;
        }
        
        .orbit {
            position: absolute;
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            animation: orbitSpin linear infinite;
        }
        
        .orbit-1 {
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            animation-duration: 4s;
        }
        
        .orbit-2 {
            top: 5px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            animation-duration: 6s;
            animation-direction: reverse;
        }
        
        .orbit-3 {
            top: 25px;
            left: 25px;
            right: 25px;
            bottom: 25px;
            animation-duration: 8s;
        }
        
        .login-particle {
            position: absolute;
            background: rgba(255,255,255,0.7);
            border-radius: 50%;
            animation: floatParticle 8s infinite ease-in-out;
        }
    `;
    document.head.appendChild(loginStyles);
}

function createLoginParticles() {
    const container = document.querySelector('.login-particles');
    const particlesCount = 12;
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'login-particle';
        
        const size = Math.random() * 8 + 4;
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        let style = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
            width: ${size}px;
            height: ${size}px;
            opacity: ${Math.random() * 0.6 + 0.2};
        `;
        
        if (shape === 'square') {
            style += 'border-radius: 2px;';
        } else if (shape === 'triangle') {
            style += `
                width: 0;
                height: 0;
                background: transparent !important;
                border-left: ${size/2}px solid transparent;
                border-right: ${size/2}px solid transparent;
                border-bottom: ${size}px solid rgba(255,255,255,0.7);
            `;
        }
        
        particle.style.cssText = style;
        container.appendChild(particle);
    }
}

function hideLoginAnimation() {
    const loginOverlay = document.getElementById('login-overlay');
    if (loginOverlay) {
        loginOverlay.style.opacity = '0';
        loginOverlay.style.transform = 'scale(1.1)';
        setTimeout(() => {
            loginOverlay.remove();
        }, 500);
    }
}

function completeLogin(user) {
    const loginOverlay = document.getElementById('login-overlay');
    
    // Transform to success state
    loginOverlay.innerHTML = `
        <div class="login-container" style="position: relative; z-index: 2; text-align: center;">
            <div class="login-success" style="
                font-size: 80px;
                margin-bottom: 20px;
                animation: successPop 0.6s ease-out;
            ">🎉</div>
            
            <div class="welcome-message" style="
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
                animation: slideInUp 0.8s ease-out;
            ">Welcome Back!</div>
            
            <div class="user-greeting" style="
                font-size: 20px;
                margin-bottom: 5px;
                color: #4CAF50;
                animation: slideInUp 0.8s ease-out 0.2s both;
            ">Hello, ${user.username || user.email.split('@')[0]}! 👋</div>
            
            <div class="success-subtext" style="
                font-size: 16px;
                margin-bottom: 30px;
                opacity: 0.8;
                animation: slideInUp 0.8s ease-out 0.4s both;
            ">Ready to explore ReMarket?</div>
            
            <div class="success-progress" style="
                width: 200px;
                height: 4px;
                background: rgba(255,255,255,0.3);
                border-radius: 2px;
                margin: 0 auto;
                overflow: hidden;
            ">
                <div class="success-fill" style="
                    width: 0%;
                    height: 100%;
                    background: #4CAF50;
                    border-radius: 2px;
                    animation: successProgress 2s ease-in-out forwards;
                "></div>
            </div>
        </div>
    `;
    
    // Add success animations
    const successStyles = document.createElement('style');
    successStyles.textContent = `
        @keyframes successPop {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes successProgress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    document.head.appendChild(successStyles);
    
    // Complete the login process after success animation
    setTimeout(() => {
        hideLoginAnimation();
        
        // Your existing login completion logic
        currentUser = user;

        authModal.classList.remove('active');
        updateRoleUI(user.userType);
        localStorage.setItem("currentUser", JSON.stringify(user));

        
        document.querySelector('.auth-buttons').innerHTML = `
            <div class="nav-action">
                <i class="far fa-user"></i>
                <span>${user.username || 'My Account'}</span>
            </div>
            <button class="btn btn-outline" onclick="logout()">Logout</button>
          <div class="nav-action" onclick="goToCart()">
               <i class="fas fa-shopping-cart"></i>
                <span>Cart</span>
               </div>

             <div class="nav-actions">
              <div class="nav-action" onclick="goToFavorites()">
            <i class="far fa-heart"></i>
            <span>Favorites</span>
             </div>
            </div>

        `;
        
        // Clear login form
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        
    }, 2000);
}

function showVibeAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `vibe-alert ${type}`;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10001;
        animation: slideInRight 0.5s ease-out;
        background: ${type === 'error' ? 'linear-gradient(135deg, #ff6b6b, #ee5a52)' : 'linear-gradient(135deg, #4CAF50, #45a049)'};
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => alert.remove(), 500);
    }, 3000);
    
    // Add alert animations
    const alertStyle = document.createElement('style');
    alertStyle.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(alertStyle);
}
function seePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
      input.type = "text";
      iconElement.classList.remove("fa-eye");
      iconElement.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      iconElement.classList.remove("fa-eye-slash");
      iconElement.classList.add("fa-eye");
    }
  }
function showAdminLogin() {
  document.querySelector('.Admin-btn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
  setTimeout(() => {
    window.location.href = 'Admin.html';
  }, 1000); // 1 second delay
}
function goToFavorites() {
  window.location.href = 'favorite.html';
}
function goToCart() {
  window.location.href = 'Cart.html';
}
function updateRoleUI(role) {
    const sellerBtn = document.getElementById("sellerBtn");

    // If button doesn't exist yet, stop
    if (!sellerBtn) return;

    // Not logged in → hide seller button
    if (!role) {
        sellerBtn.style.display = "none";
        
        return;
    }

    // Logged in but buyer → hide
    if (role === "buyer") {
        sellerBtn.style.display = "none";
    }

    // Logged in as seller → show
    if (role === "seller") {
        sellerBtn.style.display = "flex"; // or block
    }
}

function showAdminControls() {
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.innerHTML = `
        <button class="btn btn-outline" id="logoutBtn">Logout</button>
        <button class="Admin-btn" id="adminPanelBtn">🔧 Admin Panel</button>
    `;

    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('adminPanelBtn').addEventListener('click', showAdminLogin);
}
window.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('adminPanelBtn');
    if (adminBtn) adminBtn.style.display = 'none';
});
