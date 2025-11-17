// Load favorites from sessionStorage
let favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];

// Normalize favorites data
favorites = favorites.map(item => ({
    ...item,
    price: Number(String(item.price).replace(/[^0-9.-]+/g, "")) || 0,
    quantity: Number(item.quantity) || 1,
    stock: Number(item.stock) || 0
}));

// DOM elements
const favoritesContainer = document.getElementById('favorites-container');
const emptyFavorites = document.getElementById('empty-favorites');
const bulkActions = document.getElementById('bulk-actions');
const selectedCount = document.getElementById('selected-count');
const addAllBtn = document.getElementById('add-all-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Initialize the page
function initPage() {
    console.log("Favorites loaded from sessionStorage:", favorites);
    renderFavorites();
    updateBulkActions();
}

// Render favorites to the page
function renderFavorites() {
    if (favorites.length === 0) {
        favoritesContainer.style.display = 'none';
        emptyFavorites.style.display = 'block';
        bulkActions.style.display = 'none';
        return;
    }

    emptyFavorites.style.display = 'none';
    favoritesContainer.style.display = 'grid';
    bulkActions.style.display = 'flex';

    favoritesContainer.innerHTML = '';

    favorites.forEach(item => {
        const stockPercentage = Math.min((item.stock / 20) * 100, 100);
        const isLowStock = item.stock <= 3;

        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'favorite-card';
        favoriteCard.innerHTML = `
            <div class="card-header">
                <img src="${item.image}" alt="${item.name}" class="card-image">
                <div class="card-badge">BEST SELLER</div>
                <button class="remove-favorite" data-id="${Number(item.id)}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-description">${item.description}</p>
                <div class="card-price">$${item.price.toFixed(2)}</div>
                
                <div class="stock-info">
                    <span class="stock-label">In Stock:</span>
                    <div class="stock-bar">
                        <div class="stock-level" style="width: ${stockPercentage}%"></div>
                    </div>
                    <span class="stock-count ${isLowStock ? 'low-stock' : ''}">${item.stock} left</span>
                </div>
                
                <div class="card-actions">
                    <button class="add-to-cart" data-id="${item.id}" ${item.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}" ${item.quantity >= item.stock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        favoritesContainer.appendChild(favoriteCard);
    });
}

// ✅ Event Delegation for all card actions
favoritesContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-favorite');
    const addBtn = e.target.closest('.add-to-cart');
    const minusBtn = e.target.closest('.quantity-btn.minus');
    const plusBtn = e.target.closest('.quantity-btn.plus');

    if (removeBtn) {
        const id = Number(removeBtn.dataset.id);

        // Remove from favorites array
        favorites = favorites.filter(item => Number(item.id) !== id);

        // ✅ Update sessionStorage immediately
        sessionStorage.setItem('favorites', JSON.stringify(favorites));

        // Fade out animation before removing
        const card = removeBtn.closest('.favorite-card');
        if (card) {
            card.classList.add('fade-out');
            setTimeout(() => {
                card.remove();
                updateBulkActions();

                if (favorites.length === 0) {
                    favoritesContainer.style.display = 'none';
                    emptyFavorites.style.display = 'block';
                    bulkActions.style.display = 'none';
                }
            }, 400); // match CSS transition duration
        }

        showToast('Item removed from favorites');
    }

    if (addBtn) {
        const id = Number(addBtn.dataset.id);
        const item = favorites.find(item => item.id === id);
        if (item) {
            addBtn.classList.add('added-to-cart');
            setTimeout(() => addBtn.classList.remove('added-to-cart'), 500);
            showToast(`${item.quantity} ${item.name} added to cart!`);
        }
    }

    if (minusBtn) {
        const id = Number(minusBtn.dataset.id);
        const item = favorites.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
            sessionStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
            updateBulkActions();
        }
    }

    if (plusBtn) {
        const id = Number(plusBtn.dataset.id);
        const item = favorites.find(item => item.id === id);
        if (item && item.quantity < item.stock) {
            item.quantity++;
            sessionStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
            updateBulkActions();
        }
    }
});

// Update bulk actions section
function updateBulkActions() {
    const selectedItems = favorites.filter(item => item.stock > 0);
    selectedCount.textContent = selectedItems.length;
    addAllBtn.disabled = selectedItems.length === 0;
}

// Add all selected items to cart
addAllBtn.addEventListener('click', () => {
    const selectedItems = favorites.filter(item => item.stock > 0);
    if (selectedItems.length > 0) {
        addAllBtn.classList.add('added-to-cart');
        setTimeout(() => addAllBtn.classList.remove('added-to-cart'), 500);
        showToast(`${selectedItems.length} items added to cart!`);
    }
});

// Show toast notification
function showToast(message, isError = false) {
    toastMessage.textContent = message;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);

// Browse button
document.querySelector('.browse-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
