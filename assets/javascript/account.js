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
            }
        ];

        const mockAnalytics = {
            monthlySpending: [450, 620, 890, 720, 1100, 980, 1300, 1150, 950, 780, 620, 890],
            categories: [
                { name: "Electronics", value: 65, color: "#2563eb" },
                { name: "Gaming", value: 20, color: "#7c3aed" }
            ]
        };

        const mockWallOfFame = {
            topSeller: { name: "TechDeals", sales: 147, rating: 4.9 },
            topBuyer: { name: "Sarah Johnson", orders: 23, spent: 5670.50 },
            mostActive: { name: "Mike Chen", activeDays: 28, totalActions: 156 }
        };

        let currentRating = 0;

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

        function setRating(rating) {
            currentRating = rating;
            const stars = document.querySelectorAll('.star');
            stars.forEach((star, index) => {
                star.classList.toggle('active', index < rating);
            });
        }

        function submitFeedback() {
            const subject = document.getElementById('feedbackSubject').value;
            const type = document.getElementById('feedbackType').value;
            const message = document.getElementById('feedbackMessage').value;

            if (!subject || !message || currentRating === 0) {
                alert('Please fill in all required fields and rate your experience');
                return;
            }

            const feedback = {
                subject,
                type,
                rating: currentRating,
                message,
                timestamp: new Date().toISOString(),
                user: JSON.parse(localStorage.getItem('currentUser'))?.name || 'Anonymous'
            };

            const feedbacks = JSON.parse(localStorage.getItem('userFeedbacks')) || [];
            feedbacks.push(feedback);
            localStorage.setItem('userFeedbacks', JSON.stringify(feedbacks));

            const user = JSON.parse(localStorage.getItem('currentUser')) || mockUserData;
            if (!user.stats) user.stats = {};
            user.stats.feedbackCount = (user.stats.feedbackCount || 0) + 1;
            localStorage.setItem('currentUser', JSON.stringify(user));

            document.getElementById('feedbackCount').textContent = user.stats.feedbackCount;
            alert('Thank you for your feedback! We appreciate your input. 🎉');

            document.getElementById('feedbackSubject').value = '';
            document.getElementById('feedbackMessage').value = '';
            setRating(0);
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
                window.location.href = 'Home.html';
            }, 2000);
        }

        // Rotate animations every 5 seconds
        setInterval(() => {
            startNameAnimations();
        }, 5000);