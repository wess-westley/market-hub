  // Mock data
        const mockUserData = {
            name: "John Doe",
            email: "john.doe@example.com",
            joinDate: "2024-01-15",
            avatar: "👤",
            stats: {
                totalOrders: 8,
                totalSpent: 2450.75,
                feedbackCount: 3
            }
        };

        const mockOrders = [
            {
                id: "ORD-001",
                date: "2024-03-15",
                status: "delivered",
                total: 1299.99,
                items: [
                    { name: "MacBook Pro 14\" M1", price: 1299.99, icon: "💻", seller: "TechDeals" }
                ]
            },
            {
                id: "ORD-002",
                date: "2024-03-10",
                status: "shipped",
                total: 425.00,
                items: [
                    { name: "PlayStation 5 Console", price: 425.00, icon: "🎮", seller: "GamerHub" }
                ]
            },
            {
                id: "ORD-003",
                date: "2024-03-05",
                status: "pending",
                total: 325.50,
                items: [
                    { name: "Vintage Camera", price: 145.00, icon: "📷", seller: "VintageCollector" },
                    { name: "Smart Watch", price: 180.50, icon: "⌚", seller: "TechDeals" }
                ]
            }
        ];

        const mockAnalytics = {
            monthlySpending: [450, 620, 890, 720, 1100, 980, 1300, 1150, 950, 780, 620, 890],
            categories: [
                { name: "Electronics", value: 65, color: "#2563eb" },
                { name: "Gaming", value: 20, color: "#7c3aed" },
                { name: "Fashion", value: 10, color: "#06d6a0" },
                { name: "Home", value: 5, color: "#f59e0b" }
            ]
        };

        const mockWallOfFame = {
            topSeller: { name: "TechDeals", sales: 147, rating: 4.9 },
            topBuyer: { name: "Sarah Johnson", orders: 23, spent: 5670.50 },
            mostActive: { name: "Mike Chen", activeDays: 28, totalActions: 156 }
        };

        let currentRating = 0;
        let selectedFeedbackType = 'suggestion';

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            loadUserData();
            loadOrders();
            loadAnalytics();
            loadWallOfFame();
            startNameAnimations();
        });

        function loadUserData() {
            const user = JSON.parse(localStorage.getItem('currentUser')) || mockUserData;
            
            document.getElementById('userName').textContent = `Welcome, ${user.name || user.username}!`;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('userAvatar').textContent = user.avatar || '👤';
            
            // Calculate days as member
            const joinDate = new Date(user.joinDate || user.registrationDate || '2024-01-01');
            const today = new Date();
            const daysAsMember = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24));
            
            document.getElementById('totalOrders').textContent = user.stats?.totalOrders || mockUserData.stats.totalOrders;
            document.getElementById('totalSpent').textContent = `$${(user.stats?.totalSpent || mockUserData.stats.totalSpent).toLocaleString()}`;
            document.getElementById('memberSince').textContent = daysAsMember;
            document.getElementById('feedbackCount').textContent = user.stats?.feedbackCount || mockUserData.stats.feedbackCount;
        }

        function loadOrders() {
            const ordersGrid = document.getElementById('ordersGrid');
            const orders = JSON.parse(localStorage.getItem('userOrders')) || mockOrders;
            
            ordersGrid.innerHTML = orders.map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <strong>Order #${order.id}</strong>
                            <div style="font-size: 0.9rem; color: var(--gray); margin-top: 0.25rem;">
                                ${new Date(order.date).toLocaleDateString()} • $${order.total.toFixed(2)}
                            </div>
                        </div>
                        <span class="order-status status-${order.status}">
                            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </div>
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <div class="item-icon">${item.icon}</div>
                                <div style="flex: 1;">
                                    <div style="font-weight: bold;">${item.name}</div>
                                    <div style="font-size: 0.9rem; color: var(--gray);">
                                        Seller: ${item.seller} • $${item.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        function loadAnalytics() {
            // Monthly spending chart
            const spendingChart = document.getElementById('spendingChart');
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            spendingChart.innerHTML = mockAnalytics.monthlySpending.map((amount, index) => {
                const height = (amount / 1500) * 100;
                return `
                    <div class="chart-bar" style="height: ${height}%;">
                        <span class="chart-value">$${amount}</span>
                        <span class="chart-label">${months[index]}</span>
                    </div>
                `;
            }).join('');

            // Category chart
            const categoryChart = document.getElementById('categoryChart');
            categoryChart.innerHTML = mockAnalytics.categories.map(category => {
                return `
                    <div class="chart-bar" style="height: ${category.value}%; background: ${category.color};">
                        <span class="chart-value">${category.value}%</span>
                        <span class="chart-label">${category.name}</span>
                    </div>
                `;
            }).join('');
        }

        function loadWallOfFame() {
            const fameData = mockWallOfFame;
            
            document.getElementById('topSellerName').textContent = fameData.topSeller.name;
            document.getElementById('topSellerSales').textContent = fameData.topSeller.sales;
            document.getElementById('topSellerRating').textContent = fameData.topSeller.rating;
            
            document.getElementById('topBuyerName').textContent = fameData.topBuyer.name;
            document.getElementById('topBuyerOrders').textContent = fameData.topBuyer.orders;
            document.getElementById('topBuyerSpent').textContent = `$${fameData.topBuyer.spent.toLocaleString()}`;
            
            document.getElementById('mostActiveName').textContent = fameData.mostActive.name;
            document.getElementById('activeDays').textContent = fameData.mostActive.activeDays;
            document.getElementById('totalActions').textContent = fameData.mostActive.totalActions;
        }

        function startNameAnimations() {
            // Convert names to bounce letters
            const bounceName = document.getElementById('mostActiveName');
            const name = bounceName.textContent;
            bounceName.innerHTML = '';
            name.split('').forEach(letter => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '&nbsp;' : letter;
                bounceName.appendChild(span);
            });

            // Restart typewriter animation
            const typewriter = document.getElementById('topBuyerName');
            typewriter.classList.remove('typewriter');
            void typewriter.offsetWidth; // Trigger reflow
            typewriter.classList.add('typewriter');
        }

        function switchTab(tabName) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        }

        function selectFeedbackType(type, element) {
            selectedFeedbackType = type;
            document.querySelectorAll('.type-option').forEach(option => {
                option.classList.remove('selected');
            });
            element.classList.add('selected');
        }

        function setRating(rating) {
            currentRating = rating;
            const stars = document.querySelectorAll('.star');
            const ratingText = document.getElementById('ratingText');
            
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });

            // Update rating text
            const ratingTexts = {
                1: "Poor 😞",
                2: "Fair 😐", 
                3: "Good 🙂",
                4: "Very Good 😊",
                5: "Excellent 🤩"
            };
            ratingText.textContent = ratingTexts[rating] || "Tap to rate";
            
            // Add bounce animation to stars
            stars[rating - 1].style.animation = 'none';
            setTimeout(() => {
                stars[rating - 1].style.animation = '';
            }, 10);
        }

        function updateCharacterCount() {
            const message = document.getElementById('feedbackMessage');
            const counter = document.getElementById('charCounter');
            const progress = document.getElementById('progressFill');
            const length = message.value.length;
            const maxLength = 500;
            
            counter.textContent = `${length}/${maxLength} characters`;
            
            // Update progress bar
            const percentage = (length / maxLength) * 100;
            progress.style.width = `${percentage}%`;
            
            // Update colors based on length
            if (length > maxLength * 0.8) {
                counter.classList.add('warning');
                progress.classList.add('warning');
            } else if (length > maxLength) {
                counter.classList.add('error');
                progress.classList.add('error');
            } else {
                counter.classList.remove('warning', 'error');
                progress.classList.remove('warning', 'error');
            }
        }

        function submitFeedback() {
            const subject = document.getElementById('feedbackSubject').value;
            const message = document.getElementById('feedbackMessage').value;

            if (!subject || !message) {
                showErrorAnimation('Please fill in all required fields');
                return;
            }

            if (currentRating === 0) {
                showErrorAnimation('Please rate your experience');
                return;
            }

            if (message.length > 500) {
                showErrorAnimation('Message is too long (max 500 characters)');
                return;
            }

            // Show sending animation
            showSendingAnimation();

            // Simulate API call
            setTimeout(() => {
                // Save feedback
                const feedback = {
                    subject,
                    type: selectedFeedbackType,
                    rating: currentRating,
                    message,
                    timestamp: new Date().toISOString(),
                    user: JSON.parse(localStorage.getItem('currentUser'))?.name || 'Anonymous'
                };

                const feedbacks = JSON.parse(localStorage.getItem('userFeedbacks')) || [];
                feedbacks.push(feedback);
                localStorage.setItem('userFeedbacks', JSON.stringify(feedbacks));

                // Update user stats
                const user = JSON.parse(localStorage.getItem('currentUser')) || mockUserData;
                if (!user.stats) user.stats = {};
                user.stats.feedbackCount = (user.stats.feedbackCount || 0) + 1;
                localStorage.setItem('currentUser', JSON.stringify(user));

                document.getElementById('feedbackCount').textContent = user.stats.feedbackCount;
                
                // Show success animation
                showSuccessAnimation();
                
                // Reset form
                resetFeedbackForm();
            }, 2000);
        }

        function showSendingAnimation() {
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <div class="sending-spinner"></div>
                    Sending...
                </div>
            `;
            btn.disabled = true;
        }

        function showSuccessAnimation() {
            const overlay = document.getElementById('feedbackOverlay');
            overlay.classList.add('active');
            
            // Create confetti
            createConfetti();
        }

        function createConfetti() {
            const overlay = document.getElementById('feedbackOverlay');
            const colors = ['#2563eb', '#7c3aed', '#06d6a0', '#f59e0b', '#ef4444'];
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                overlay.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        }

        function showErrorAnimation(message) {
            const btn = document.querySelector('.submit-btn');
            
            // Store original state
            const originalBg = btn.style.background;
            const originalText = btn.innerHTML;
            
            // Show error state
            btn.style.background = '#ef4444';
            btn.innerHTML = `
                <span class="btn-icon">❌</span>
                ${message}
            `;
            
            // Shake animation
            btn.style.animation = 'shake 0.5s ease-in-out';
            
            // Reset after animation
            setTimeout(() => {
                btn.style.animation = '';
                btn.style.background = originalBg;
                btn.innerHTML = originalText;
            }, 2000);
        }

        function closeSuccessAnimation() {
            const overlay = document.getElementById('feedbackOverlay');
            overlay.classList.remove('active');
            
            // Clear confetti
            document.querySelectorAll('.confetti').forEach(confetti => confetti.remove());
        }

        function resetFeedbackForm() {
            document.getElementById('feedbackSubject').value = '';
            document.getElementById('feedbackMessage').value = '';
            document.getElementById('charCounter').textContent = '0/500 characters';
            document.getElementById('progressFill').style.width = '0%';
            document.getElementById('progressFill').classList.remove('warning', 'error');
            document.getElementById('charCounter').classList.remove('warning', 'error');
            
            // Reset rating
            currentRating = 0;
            document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
            document.getElementById('ratingText').textContent = 'Tap to rate';
            
            // Reset type selection
            document.querySelectorAll('.type-option').forEach(option => option.classList.remove('selected'));
            document.querySelector('.type-option').classList.add('selected');
            selectedFeedbackType = 'suggestion';
            
            // Reset button
            const btn = document.querySelector('.submit-btn');
            btn.disabled = false;
            btn.innerHTML = `
                <span class="btn-icon">📤</span>
                Send Your Feedback
            `;
        }

        function logout() {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
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
                color: white;
                font-size: 2rem;
                font-weight: bold;
            `;
            overlay.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">👋</div>
                    <div>Logging out...</div>
                    <div style="font-size: 1rem; margin-top: 1rem; opacity: 0.8;">Thank you for visiting!</div>
                </div>
            `;
            document.body.appendChild(overlay);
            
            setTimeout(() => {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            }, 2000);
        }

        // Rotate animations every 5 seconds
        setInterval(() => {
            startNameAnimations();
        }, 5000);