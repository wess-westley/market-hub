   // Cart data structure
        let cartItems = [
            {
                id: 1,
                name: "MacBook Pro 14\" M1 - Excellent Condition",
                seller: "TechDeals",
                price: 1299.99,
                quantity: 1,
                icon: "fas fa-laptop"
            },
            {
                id: 2,
                name: "Vintage Canon AE-1 Film Camera",
                seller: "VintageCollector",
                price: 145.00,
                quantity: 1,
                icon: "fas fa-camera"
            },
            {
                id: 3,
                name: "Sony WH-1000XM4 Wireless Headphones",
                seller: "AudioHub",
                price: 249.99,
                quantity: 1,
                icon: "fas fa-headphones"
            }
        ];

        // Constants
        const SHIPPING_COST = 15.00;
        const TAX_RATE = 0.08; // 8%

        // Initialize the cart
        document.addEventListener('DOMContentLoaded', function() {
            renderCartItems();
            updateOrderSummary();
        });

        // Render cart items
        function renderCartItems() {
            const cartItemsContainer = document.getElementById('cartItems');
            
            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <h3 class="empty-cart-title">Your cart is empty</h3>
                        <p class="empty-cart-text">
                            Looks like you haven't added anything to your cart yet. 
                            Start shopping to find amazing secondhand deals!
                        </p>
                        <a href="home.html" class="empty-cart-btn">
                            <i class="fas fa-shopping-bag"></i>
                            Start Shopping
                        </a>
                    </div>
                `;
                return;
            }
            
            let cartItemsHTML = '';
            
            cartItems.forEach(item => {
                cartItemsHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="item-image">
                            <i class="${item.icon}"></i>
                        </div>
                        <div class="item-details">
                            <h3 class="item-title">${item.name}</h3>
                            <p class="item-seller">
                                <i class="fas fa-store"></i>
                                by ${item.seller}
                            </p>
                            <p class="item-price">$${item.price.toFixed(2)}</p>
                            <div class="item-actions">
                                <div class="quantity-control">
                                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <button class="remove-btn" onclick="removeItem(${item.id})">
                                    <i class="fas fa-trash"></i>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            cartItemsContainer.innerHTML = cartItemsHTML;
        }

        // Update item quantity
        function updateQuantity(itemId, change) {
            const itemIndex = cartItems.findIndex(item => item.id === itemId);
            
            if (itemIndex !== -1) {
                cartItems[itemIndex].quantity += change;
                
                // Ensure quantity doesn't go below 1
                if (cartItems[itemIndex].quantity < 1) {
                    cartItems[itemIndex].quantity = 1;
                }
                
                // Update the UI
                renderCartItems();
                updateOrderSummary();
            }
        }

        // Remove item from cart
        function removeItem(itemId) {
            const itemIndex = cartItems.findIndex(item => item.id === itemId);
            
            if (itemIndex !== -1) {
                // Add animation effect
                const cartItem = document.querySelector(`.cart-item[data-id="${itemId}"]`);
                if (cartItem) {
                    cartItem.style.animation = 'fadeOut 0.3s ease';
                    
                    setTimeout(() => {
                        cartItems.splice(itemIndex, 1);
                        renderCartItems();
                        updateOrderSummary();
                    }, 300);
                }
            }
        }

        // Calculate cart totals
        function calculateCartTotals() {
            let subtotal = 0;
            let itemCount = 0;
            
            cartItems.forEach(item => {
                subtotal += item.price * item.quantity;
                itemCount += item.quantity;
            });
            
            const tax = subtotal * TAX_RATE;
            const total = subtotal + SHIPPING_COST + tax;
            
            return {
                subtotal: subtotal.toFixed(2),
                itemCount: itemCount,
                shipping: SHIPPING_COST.toFixed(2),
                tax: tax.toFixed(2),
                total: total.toFixed(2)
            };
        }

        // Update order summary
        function updateOrderSummary() {
            const totals = calculateCartTotals();
            const orderSummary = document.getElementById('orderSummary');
            const paymentOrderSummary = document.getElementById('paymentOrderSummary');
            
            const orderSummaryHTML = `
                <div class="summary-row">
                    <span class="summary-label">Subtotal (${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'})</span>
                    <span class="summary-value">$${totals.subtotal}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Shipping</span>
                    <span class="summary-value">$${totals.shipping}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Tax</span>
                    <span class="summary-value">$${totals.tax}</span>
                </div>
                <div class="summary-row summary-total">
                    <span>Total</span>
                    <span>$${totals.total}</span>
                </div>
            `;
            
            if (orderSummary) {
                orderSummary.innerHTML = orderSummaryHTML;
            }
            
            if (paymentOrderSummary) {
                paymentOrderSummary.innerHTML = orderSummaryHTML;
            }
            
            // Update checkout button state
            const checkoutBtn = document.querySelector('.checkout-btn');
            if (cartItems.length === 0) {
                checkoutBtn.disabled = true;
                checkoutBtn.innerHTML = '<i class="fas fa-lock"></i> Cart is Empty';
                checkoutBtn.style.opacity = '0.6';
                checkoutBtn.style.cursor = 'not-allowed';
            } else {
                checkoutBtn.disabled = false;
                checkoutBtn.innerHTML = '<i class="fas fa-lock"></i> Proceed to Checkout';
                checkoutBtn.style.opacity = '1';
                checkoutBtn.style.cursor = 'pointer';
            }
        }

        // Payment functionality
        let currentStep = 1;
        let selectedPaymentMethod = null;
        
        function showPaymentModal() {
            if (cartItems.length === 0) {
                alert('Your cart is empty. Please add items before proceeding to checkout.');
                return;
            }
            
            document.getElementById('paymentModal').style.display = 'flex';
            resetPaymentFlow();
            updateOrderSummary(); // Ensure payment modal has latest totals
        }
        
        function closePaymentModal() {
            document.getElementById('paymentModal').style.display = 'none';
            resetPaymentFlow();
        }
        
        function resetPaymentFlow() {
            currentStep = 1;
            selectedPaymentMethod = null;
            updateProgressBar();
            showStep(1);
            
            // Reset payment method selection
            document.querySelectorAll('.payment-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Disable next button
            document.getElementById('step1-next').disabled = true;
            
            // Hide all payment forms
            document.querySelectorAll('.payment-form').forEach(form => {
                form.style.display = 'none';
            });
        }
        
        function selectPaymentMethod(element) {
            // Remove selected class from all options
            document.querySelectorAll('.payment-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            element.classList.add('selected');
            
            // Store selected payment method
            selectedPaymentMethod = element.getAttribute('data-payment');
            
            // Enable next button
            document.getElementById('step1-next').disabled = false;
            
            // Update step 2 title based on selected method
            const step2Title = document.getElementById('step2-title');
            if (selectedPaymentMethod === 'mpesa') {
                step2Title.textContent = 'M-Pesa Payment Details';
            } else if (selectedPaymentMethod === 'bank') {
                step2Title.textContent = 'Bank Account Payment Details';
            } else if (selectedPaymentMethod === 'visa') {
                step2Title.textContent = 'Credit Card Payment Details';
            }
        }
        
        function goToStep(step) {
            if (step === 2 && !selectedPaymentMethod) {
                alert('Please select a payment method');
                return;
            }
            
            currentStep = step;
            updateProgressBar();
            showStep(step);
        }
        
        function updateProgressBar() {
            // Update progress bar width
            const progressPercentage = ((currentStep - 1) / 2) * 100;
            document.documentElement.style.setProperty('--progress-width', `${progressPercentage}%`);
            
            // Update step indicators
            document.querySelectorAll('.progress-step').forEach((step, index) => {
                step.classList.remove('active', 'completed');
                
                if (index + 1 < currentStep) {
                    step.classList.add('completed');
                } else if (index + 1 === currentStep) {
                    step.classList.add('active');
                }
            });
        }
        
        function showStep(step) {
            // Hide all steps
            document.querySelectorAll('.payment-step').forEach(stepEl => {
                stepEl.classList.remove('active');
            });
            
            // Show current step
            document.getElementById(`step${step}-content`).classList.add('active');
            
            // Show appropriate payment form in step 2
            if (step === 2 && selectedPaymentMethod) {
                document.querySelectorAll('.payment-form').forEach(form => {
                    form.style.display = 'none';
                });
                document.getElementById(`${selectedPaymentMethod}-form`).style.display = 'block';
            }
        }
        
        function processPayment() {
            // Show loading state
            const payButton = document.getElementById('step2-pay');
            const originalText = payButton.innerHTML;
            payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            payButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Move to confirmation step
                goToStep(3);
                
                // Reset button state (for when user goes back)
                payButton.innerHTML = originalText;
                payButton.disabled = false;
                
                // Clear cart after successful payment
                cartItems = [];
                renderCartItems();
                updateOrderSummary();
            }, 2000);
        }
        
        // Close modals when clicking outside
        window.onclick = function(event) {
            const paymentModal = document.getElementById('paymentModal');
            
            if (event.target === paymentModal) {
                closePaymentModal();
            }
        }
        
        // Initialize progress bar CSS variable
        document.documentElement.style.setProperty('--progress-width', '0%');