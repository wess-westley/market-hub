// ----------------------------
// Global cartItems
// ----------------------------
let cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

// Generate unique ID and default quantity for existing items
cartItems.forEach((item, index) => {
    if (!item.id) item.id = index + 1;
    if (!item.quantity) item.quantity = 1;
});

// ----------------------------
// Constants
// ----------------------------
const SHIPPING_COST = 15.00;
const TAX_RATE = 0.08; // 8%

// ----------------------------
// Header Cart Badge
// ----------------------------
function updateCartBadge() {
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    let badge = document.getElementById('cart-count');

    if (!badge) {
        // Create badge if missing
        const cartIcon = document.querySelector('.nav-action i.fa-shopping-cart');
        badge = document.createElement('span');
        badge.id = 'cart-count';
        badge.className = 'nav-badge';
        cartIcon.parentElement.appendChild(badge);
    }

    badge.innerText = cartCount;

    // Pulse animation
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 300);
}

// ----------------------------
// Add to Cart with notification
// ----------------------------
function AddtoCart(button) {
    const card = button.closest('.listing-card');
    const title = card.querySelector('.listing-title').innerText;
    const seller = card.querySelector('.listing-seller').innerText;
    const price = parseFloat(card.querySelector('.listing-price').innerText.replace(/[^0-9.]/g, ''));
    const iconClass = card.querySelector('.listing-image i').className;

    // Check if item already exists in cart
    let existingItem = cartItems.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: cartItems.length ? Math.max(...cartItems.map(i => i.id)) + 1 : 1,
            title,
            seller,
            price,
            iconClass,
            quantity: 1
        });
    }

    // Save to sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cartItems));

    // Render cart
    renderCartItems();
    updateOrderSummary();
    updateCartBadge();

    // Show graceful notification
    let notification = document.getElementById('cart-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cart-notification';
        notification.className = 'cart-notification';
        notification.innerHTML = `<i class="fas fa-check-circle"></i> <span class="notification-text">Added to Cart!</span>`;
        document.body.appendChild(notification);
    } else {
        notification.querySelector('.notification-text').innerText = 'Added to Cart!';
    }

    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2000);

    // Animate button icon
    const icon = button.querySelector('i');
    icon.classList.add('rotate-cart');
    setTimeout(() => icon.classList.remove('rotate-cart'), 600);
}

// ----------------------------
// Render Cart Items
// ----------------------------
function renderCartItems() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon"><i class="fas fa-shopping-cart"></i></div>
                <h3 class="empty-cart-title">Your cart is empty</h3>
                <p class="empty-cart-text">Start shopping to find amazing secondhand deals!</p>
                <a href="home.html" class="empty-cart-btn"><i class="fas fa-shopping-bag"></i> Start Shopping</a>
            </div>
        `;
        return;
    }

    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'cart-item';
        card.dataset.id = item.id;

        card.innerHTML = `
            <div class="item-image"><i class="${item.iconClass}"></i></div>
            <div class="item-details">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-seller"><i class="fas fa-store"></i> by ${item.seller}</p>
                <p class="item-price">$${item.price.toFixed(2)}</p>
                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)"><i class="fas fa-plus"></i></button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${item.id})"><i class="fas fa-trash"></i> Remove</button>
                </div>
            </div>
        `;
        cartContainer.appendChild(card);
    });
}

// ----------------------------
// Update Quantity
// ----------------------------
function updateQuantity(itemId, change) {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index === -1) return;

    cartItems[index].quantity += change;
    if (cartItems[index].quantity < 1) cartItems[index].quantity = 1;

    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    renderCartItems();
    updateOrderSummary();
    updateCartBadge();
}

// ----------------------------
// Remove Item
// ----------------------------
function removeItem(itemId) {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index === -1) return;

    cartItems.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    renderCartItems();
    updateOrderSummary();
    updateCartBadge();
}

// ----------------------------
// Calculate Totals
// ----------------------------
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
        itemCount,
        shipping: SHIPPING_COST.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
}

// ----------------------------
// Update Order Summary
// ----------------------------
function updateOrderSummary() {
    const totals = calculateCartTotals();
    const orderSummary = document.getElementById('orderSummary');
    const paymentOrderSummary = document.getElementById('paymentOrderSummary');

    const html = `
        <div class="summary-row"><span class="summary-label">Subtotal (${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'})</span><span class="summary-value">$${totals.subtotal}</span></div>
        <div class="summary-row"><span class="summary-label">Shipping</span><span class="summary-value">$${totals.shipping}</span></div>
        <div class="summary-row"><span class="summary-label">Tax</span><span class="summary-value">$${totals.tax}</span></div>
        <div class="summary-row summary-total"><span>Total</span><span>$${totals.total}</span></div>
    `;

    if (orderSummary) orderSummary.innerHTML = html;
    if (paymentOrderSummary) paymentOrderSummary.innerHTML = html;

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (!checkoutBtn) return;

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

// Initialize badge on load
document.addEventListener('DOMContentLoaded', updateCartBadge);
