

        // In a real application, you would use:
     let cartData = JSON.parse(sessionStorage.getItem('cart')) || [];

        /// ------------------------------------


// ✅ Ensure login state stored as "true"/"false" strings
let isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';


// ------------------------------------
// ✅ DOM Loaded
// ------------------------------------
document.addEventListener('DOMContentLoaded', function () {

    renderCartItems();
    updateOrderSummary();
    updateCartCount();
    updateLoginUI();
    updateCheckoutButton();

    // ✅ Checkout button click
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleCheckout();
        });
    }

    // ✅ Login/Logout link click
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', function (e) {
            e.preventDefault();
            toggleLogin();
        });
    }
});


// ------------------------------------
// ✅ Toggle Login / Logout
// ------------------------------------
function toggleLogin() {
    isLoggedIn = !isLoggedIn;

    // ✅ Always store as a string, never boolean
    sessionStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');

    updateLoginUI();
    updateCheckoutButton();
}


// ------------------------------------
// ✅ Update Login Text on Navbar
// ------------------------------------
function updateLoginUI() {
    const loginText = document.getElementById('loginText');
    if (!loginText) return;

    loginText.textContent = isLoggedIn ? "Welcome back!" : "Login required";
}


// ------------------------------------
// ✅ Intelligent Checkout Button
// ------------------------------------
function updateCheckoutButton() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (!checkoutBtn) return;

    // Re-check login and cart
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

    if (!loggedIn) {
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = `<i class="fas fa-lock"></i> Login Required`;
        checkoutBtn.style.opacity = "0.6";
        checkoutBtn.style.cursor = "not-allowed";
        return;
    }

    if (cartItems.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.innerHTML = `<i class="fas fa-lock"></i> Cart Empty`;
        checkoutBtn.style.opacity = "0.6";
        checkoutBtn.style.cursor = "not-allowed";
        return;
    }

    // ✅ All good — enable button
    checkoutBtn.disabled = false;
    checkoutBtn.innerHTML = `<i class="fas fa-lock"></i> Proceed to Checkout`;
    checkoutBtn.style.opacity = "1";
    checkoutBtn.style.cursor = "pointer";
}


// ------------------------------------
// ✅ Handle Checkout Click
// ------------------------------------
function handleCheckout() {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (!loggedIn) {
        showLoginNotification("Please login first to complete your checkout.");
        return;
    }

    if (cartData.length === 0) {
        showLoginNotification("Your cart is empty. Add items before proceeding.");
        return;
    }

    // ✅ PROCEED TO PAYMENT MODAL
    showPaymentModal();
}


// ------------------------------------
// ✅ Graceful Login Notification
// ------------------------------------
function showLoginNotification(message) {
    let notification = document.getElementById('login-notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'login-notification';
        notification.className = 'login-notification';
        document.body.appendChild(notification);
    }

    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;

    // Restart animation
    notification.offsetWidth;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}


        // Render cart items
       function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];

    if (cartData.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some gadgets to your cart to proceed with checkout</p>
                <a href="index.html" class="checkout-btn" style="width: auto; display: inline-block; padding: 10px 20px;">Continue Shopping</a>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = '';
    cartData.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image || 'placeholder.jpg'}" alt="${item.title}" class="item-image">
            <div class="item-details">
                <h3 class="item-name">${item.title}</h3>
                <div class="item-price">KSh ${Number(item.price).toLocaleString()}</div>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                </div>
            </div>
            <button class="item-remove" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
            <button class="item-wishlist" onclick="moveToWishlist(${index}, this)">
                   <i class="fas fa-heart"></i> 
            </button>
            

        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateOrderSummary();
    updateCartCount();
}


       function updateOrderSummary() {
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    const subtotal = cartData.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    const shipping = 200;
    const tax = subtotal * 0.14;
    const total = subtotal + shipping + tax;

    const orderSummaryContainer = document.getElementById('orderSummary');
    orderSummaryContainer.innerHTML = `
        <div class="summary-row">
            <span>Subtotal (${cartData.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span>KSh ${subtotal.toLocaleString()}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span>KSh ${shipping.toLocaleString()}</span>
        </div>
        <div class="summary-row">
            <span>Tax</span>
            <span>KSh ${tax.toLocaleString()}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total</span>
            <span>KSh ${total.toLocaleString()}</span>
        </div>
    `;

    const paymentOrderSummary = document.getElementById('paymentOrderSummary');
    if (paymentOrderSummary) {
        paymentOrderSummary.innerHTML = orderSummaryContainer.innerHTML;
    }
}


        // Update cart count
        function updateCartCount() {
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartCount = cartData.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = !(cartCount > 0 && isLoggedIn);
    }
}


   function increaseQuantity(index) {
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartData[index].quantity++;
    sessionStorage.setItem('cart', JSON.stringify(cartData));
    renderCartItems();
}

function decreaseQuantity(index) {
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cartData[index].quantity > 1) {
        cartData[index].quantity--;
        sessionStorage.setItem('cart', JSON.stringify(cartData));
        renderCartItems();
    }
}

function removeFromCart(index) {
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartData.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cartData));
    renderCartItems();
}
function moveToWishlist(index, button) {
    let cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];

    const item = cartData[index];

    // Prevent duplicates
    const exists = wishlist.find(w => w.title === item.title);
    if (!exists) {
        wishlist.push(item);
        sessionStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Show success notification
        showWishlistNotification(`${item.title} added to Wishlist!`);
    } else {
        showWishlistNotification(`${item.title} is already in Wishlist`);
    }

    // Remove from cart (since it's a move)
    cartData.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cartData));

    renderCartItems();
    updateCartBadge();

    // ---------- Flying heart animation ----------
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart flying-heart';
    document.body.appendChild(heart);

    const btnRect = button.getBoundingClientRect();
    heart.style.left = `${btnRect.left + btnRect.width / 2}px`;
    heart.style.top = `${btnRect.top + btnRect.height / 2}px`;

    const wishlistIcon = document.querySelector('.nav-action i.fa-heart');
    const targetRect = wishlistIcon.getBoundingClientRect();

    heart.offsetWidth;
    heart.style.transform = `translate(${targetRect.left - btnRect.left}px, ${targetRect.top - btnRect.top}px) scale(0.2)`;
    heart.style.opacity = 0;

    setTimeout(() => heart.remove(), 800);
}
function showWishlistNotification(message) {
    let notification = document.getElementById('wishlist-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'wishlist-notification';
        notification.className = 'wishlist-notification';
        document.body.appendChild(notification);
    }

    notification.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;

    // Restart animation
    notification.offsetWidth;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2000);
    updateWishlistBadge();
}



        // Payment Modal Functions
        function showPaymentModal() {
            if (cartData.length === 0) {
                alert('Your cart is empty. Please add items to proceed with checkout.');
                return;
            }
            
            if (!isLoggedIn) {
                alert('Please log in to proceed with checkout.');
                return;
            }
            
            document.getElementById('paymentModal').style.display = 'flex';
            updatePaymentOrderSummary();
        }

        function closePaymentModal() {
            document.getElementById('paymentModal').style.display = 'none';
            resetPaymentModal();
        }

        function resetPaymentModal() {
            // Reset to step 1
            goToStep(1);
            
            // Deselect all payment options
            document.querySelectorAll('.payment-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Hide all payment forms
            document.querySelectorAll('.payment-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Reset step 1 next button
            document.getElementById('step1-next').disabled = true;
            
            // Hide STK animation if visible
            document.getElementById('stk-animation').style.display = 'none';
        }

        function selectPaymentMethod(element) {
            // Deselect all payment options
            document.querySelectorAll('.payment-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Select clicked option
            element.classList.add('selected');
            
            // Enable next button
            document.getElementById('step1-next').disabled = false;
        }

        function goToStep(step) {
            // Hide all steps
            document.querySelectorAll('.payment-step').forEach(step => {
                step.classList.remove('active');
            });
            
            // Show selected step
            document.getElementById(`step${step}-content`).classList.add('active');
            
            // Update progress bar
            document.querySelectorAll('.progress-step').forEach((stepElement, index) => {
                if (index < step) {
                    stepElement.classList.add('completed');
                    stepElement.classList.add('active');
                } else if (index === step - 1) {
                    stepElement.classList.add('active');
                    stepElement.classList.remove('completed');
                } else {
                    stepElement.classList.remove('active');
                    stepElement.classList.remove('completed');
                }
            });
            
            // If going to step 2, show the appropriate payment form
            if (step === 2) {
                const selectedPayment = document.querySelector('.payment-option.selected');
                if (selectedPayment) {
                    const paymentType = selectedPayment.getAttribute('data-payment');
                    document.querySelectorAll('.payment-form').forEach(form => {
                        form.classList.remove('active');
                    });
                    document.getElementById(`${paymentType}-form`).classList.add('active');
                    
                    // Update step 2 title
                    document.getElementById('step2-title').textContent = `${selectedPayment.querySelector('.payment-name').textContent} Payment Details`;
                }
            }
        }

        function updatePaymentOrderSummary() {
            const paymentOrderSummary = document.getElementById('paymentOrderSummary');
            const orderSummary = document.getElementById('orderSummary').innerHTML;
            paymentOrderSummary.innerHTML = orderSummary;
        }

        function processPayment() {
            const selectedPayment = document.querySelector('.payment-option.selected');
            if (!selectedPayment) return;
            
            const paymentType = selectedPayment.getAttribute('data-payment');
            
            if (paymentType === 'mpesa') {
                const phoneInput = document.getElementById('mpesa-phone');
                const phoneValue = phoneInput.value.trim();
                
                // Validate phone number format
                const phoneRegex = /^\+254[0-9]{9}$/;
                if (!phoneRegex.test(phoneValue)) {
                    alert('Please enter a valid phone number in the format +254XXXXXXXXX');
                    phoneInput.focus();
                    return;
                }
                
                // Show STK push animation
                document.getElementById('stk-animation').style.display = 'flex';
                
                // Simulate payment processing
                setTimeout(() => {
                    // Hide STK animation
                    document.getElementById('stk-animation').style.display = 'none';
                    
                    // Go to confirmation step
                    goToStep(3);
                    
                    // Clear cart after successful payment
                    cartData = [];
                    renderCartItems();
                    updateOrderSummary();
                    updateCartCount();
                }, 3000);
            } else {
                // For other payment methods, go directly to confirmation
                goToStep(3);
                
                // Clear cart after successful payment
                cartData = [];
                renderCartItems();
                updateOrderSummary();
                updateCartCount();
            }
        }
    function updateWishlistBadge() {
    const wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
    const badge = document.getElementById('wishlistBadge');

    if (badge) {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'inline-block' : 'none';
    }
}
        