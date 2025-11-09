// Mock admin credentials
        const ADMIN_CREDENTIALS = {
            username: "wess",
            password: "wess123"
        };

        // Sample analytics data
        const analyticsData = {
            daily: {
                labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
                users: [45, 125, 180, 220, 190, 140],
                sales: [1200, 3500, 6200, 4800, 7100, 3900]
            },
            weekly: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                users: [180, 220, 190, 210, 250, 320, 280],
                sales: [5200, 6100, 5800, 6300, 7200, 8900, 7600]
            },
            monthly: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                users: [850, 920, 880, 950],
                sales: [24500, 26800, 25200, 28100]
            }
        };

        // Mock user data
        const mockUsers = [
            {
                id: 1,
                name: "John Smith",
                email: "john.smith@example.com",
                type: "seller",
                status: "active",
                registrationDate: "2023-05-15",
                lastActivity: "2023-10-20",
                avatar: "JS"
            },
            {
                id: 2,
                name: "Emma Johnson",
                email: "emma.johnson@example.com",
                type: "buyer",
                status: "active",
                registrationDate: "2023-06-22",
                lastActivity: "2023-10-19",
                avatar: "EJ"
            },
            {
                id: 3,
                name: "Michael Brown",
                email: "michael.brown@example.com",
                type: "seller",
                status: "frozen",
                registrationDate: "2023-04-10",
                lastActivity: "2023-09-15",
                avatar: "MB"
            },
            {
                id: 4,
                name: "Sarah Davis",
                email: "sarah.davis@example.com",
                type: "buyer",
                status: "banned",
                registrationDate: "2023-03-05",
                lastActivity: "2023-08-30",
                avatar: "SD"
            },
            {
                id: 5,
                name: "Robert Wilson",
                email: "robert.wilson@example.com",
                type: "seller",
                status: "warning",
                registrationDate: "2023-07-18",
                lastActivity: "2023-10-18",
                avatar: "RW"
            },
            {
                id: 6,
                name: "Lisa Anderson",
                email: "lisa.anderson@example.com",
                type: "buyer",
                status: "active",
                registrationDate: "2023-08-03",
                lastActivity: "2023-10-20",
                avatar: "LA"
            },
            {
                id: 7,
                name: "David Miller",
                email: "david.miller@example.com",
                type: "seller",
                status: "active",
                registrationDate: "2023-02-14",
                lastActivity: "2023-10-19",
                avatar: "DM"
            },
            {
                id: 8,
                name: "Jennifer Taylor",
                email: "jennifer.taylor@example.com",
                type: "buyer",
                status: "frozen",
                registrationDate: "2023-01-28",
                lastActivity: "2023-09-25",
                avatar: "JT"
            }
        ];

        // Mock order data
        const mockOrders = [
            {
                id: 1001,
                customer: "Emma Johnson",
                seller: "John Smith",
                product: "Vintage Camera",
                amount: 125.50,
                date: "2023-10-20",
                status: "completed",
                complaint: false
            },
            {
                id: 1002,
                customer: "Michael Brown",
                seller: "Sarah Davis",
                product: "Designer Handbag",
                amount: 89.99,
                date: "2023-10-19",
                status: "completed",
                complaint: false
            },
            {
                id: 1003,
                seller: "Robert Wilson",
                customer: "Lisa Anderson",
                product: "Smartphone",
                amount: 299.99,
                date: "2023-10-18",
                status: "pending",
                complaint: false
            },
            {
                id: 1004,
                seller: "David Miller",
                customer: "Jennifer Taylor",
                product: "Gaming Console",
                amount: 349.99,
                date: "2023-10-17",
                status: "refunded",
                complaint: true,
                complaintDetails: "Product not as described"
            },
            {
                id: 1005,
                seller: "John Smith",
                customer: "Emma Johnson",
                product: "Books Collection",
                amount: 45.25,
                date: "2023-10-16",
                status: "completed",
                complaint: false
            },
            {
                id: 1006,
                seller: "Sarah Davis",
                customer: "Michael Brown",
                product: "Fitness Equipment",
                amount: 120.00,
                date: "2023-10-15",
                status: "cancelled",
                complaint: false
            },
            {
                id: 1007,
                seller: "Robert Wilson",
                customer: "Lisa Anderson",
                product: "Home Decor",
                amount: 75.50,
                date: "2023-10-14",
                status: "completed",
                complaint: false
            },
            {
                id: 1008,
                seller: "David Miller",
                customer: "Jennifer Taylor",
                product: "Kitchen Appliance",
                amount: 199.99,
                date: "2023-10-13",
                status: "refunded",
                complaint: true,
                complaintDetails: "Defective product"
            }
        ];

        // Mock seller earnings data - FIXED VERSION
        let mockSellerEarnings = [
            {
                seller: "John Smith",
                totalEarnings: 425.75,
                pendingAmount: 276.74,
                ordersCount: 5,
                lastPayment: "2023-09-30",
                status: "pending"
            },
            {
                seller: "Sarah Davis",
                totalEarnings: 289.99,
                pendingAmount: 188.49,
                ordersCount: 3,
                lastPayment: "2023-10-15",
                status: "pending"
            },
            {
                seller: "Robert Wilson",
                totalEarnings: 525.48,
                pendingAmount: 341.56,
                ordersCount: 6,
                lastPayment: "2023-10-10",
                status: "pending"
            },
            {
                seller: "David Miller",
                totalEarnings: 399.98,
                pendingAmount: 259.99,
                ordersCount: 4,
                lastPayment: "2023-10-05",
                status: "pending"
            }
        ];

        // Mock complaints data
        const mockComplaints = [
            {
                id: 1,
                customer: "Jennifer Taylor",
                orderId: 1008,
                product: "Kitchen Appliance",
                date: "2023-10-14",
                details: "Defective product received. Does not function as described.",
                status: "pending"
            },
            {
                id: 2,
                customer: "Michael Brown",
                orderId: 1004,
                product: "Gaming Console",
                date: "2023-10-16",
                details: "Product not as described. Missing accessories.",
                status: "resolved"
            },
            {
                id: 3,
                customer: "Emma Johnson",
                orderId: 1005,
                product: "Books Collection",
                date: "2023-10-18",
                details: "Received wrong edition of books. Not as pictured.",
                status: "pending"
            }
        ];

        // Mock earnings data for charts
        const earningsData = {
            daily: {
                labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
                revenue: [120, 350, 620, 480, 710, 390],
                profit: [78, 227.5, 403, 312, 461.5, 253.5]
            },
            weekly: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                revenue: [1200, 1500, 1800, 2100, 2400, 2800, 2200],
                profit: [780, 975, 1170, 1365, 1560, 1820, 1430]
            },
            monthly: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                revenue: [5200, 6100, 5800, 6300],
                profit: [3380, 3965, 3770, 4095]
            }
        };

        // Notifications storage
        let notifications = JSON.parse(localStorage.getItem('reMarketNotifications')) || [];
        let currentTimeRange = 'daily';
        let analyticsChart = null;
        let currentUserTab = 'all';
        let currentUserFilter = 'all';
        let selectedUserId = null;
        let currentOrderPeriod = 'daily';
        let currentOrderTab = 'all-orders';
        let ordersChart = null;
        let earningsChart = null;
        let selectedSeller = null;
        let selectedComplaint = null;

        // DOM Elements
        const loginPage = document.getElementById('loginPage');
        const adminDashboard = document.getElementById('adminDashboard');
        const adminLoginForm = document.getElementById('adminLoginForm');
        const errorMessage = document.getElementById('errorMessage');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const notificationForm = document.getElementById('notificationForm');
        const notificationsList = document.getElementById('notificationsList');
        const usersTableBody = document.getElementById('usersTableBody');
        const ordersTableBody = document.getElementById('ordersTableBody');
        const paymentProcessing = document.getElementById('paymentProcessing');
        const paymentSuccess = document.getElementById('paymentSuccess');

        // Load seller data from localStorage if available
        function loadSellerData() {
            const savedSellerEarnings = localStorage.getItem('reMarketSellerEarnings');
            if (savedSellerEarnings) {
                mockSellerEarnings = JSON.parse(savedSellerEarnings);
            }
        }

        // Save seller data to localStorage
        function saveSellerData() {
            localStorage.setItem('reMarketSellerEarnings', JSON.stringify(mockSellerEarnings));
        }

        // Toggle password visibility
        document.getElementById('togglePassword').addEventListener('click', function() {
            const adminPassword = document.getElementById('adminPassword');
            const type = adminPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            adminPassword.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });

        // Handle admin login
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('adminUsername').value.trim();
            const password = document.getElementById('adminPassword').value;
            
            errorMessage.classList.remove('active');
            loadingSpinner.classList.add('active');
            
            setTimeout(() => {
                if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                    loadingSpinner.classList.remove('active');
                    loginPage.style.display = 'none';
                    adminDashboard.classList.add('active');
                    initializeDashboard();
                } else {
                    loadingSpinner.classList.remove('active');
                    document.getElementById('errorText').textContent = 'Invalid username or password. Please try again.';
                    errorMessage.classList.add('active');
                    document.getElementById('adminPassword').value = '';
                    document.getElementById('adminPassword').focus();
                    
                    adminLoginForm.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        adminLoginForm.style.animation = '';
                    }, 500);
                }
            }, 1500);
        });

        // Logout function
        function logoutAdmin() {
            if (confirm('Are you sure you want to logout?')) {
                adminDashboard.classList.remove('active');
                loginPage.style.display = 'block';
                adminLoginForm.reset();
                errorMessage.classList.remove('active');
                document.getElementById('adminUsername').focus();
            }
        }

        // Show notification form
        function showNotificationForm() {
            notificationForm.style.display = 'block';
            document.getElementById('notificationTitle').focus();
        }

        // Hide notification form
        function hideNotificationForm() {
            notificationForm.style.display = 'none';
            document.getElementById('notificationTitle').value = '';
            document.getElementById('notificationMessage').value = '';
        }

        // Create notification
        function createNotification() {
            const title = document.getElementById('notificationTitle').value.trim();
            const message = document.getElementById('notificationMessage').value.trim();

            if (!title || !message) {
                alert('Please enter both title and message');
                return;
            }

            const notification = {
                id: Date.now(),
                title: title,
                message: message,
                date: new Date().toLocaleString(),
                status: 'active'
            };

            notifications.unshift(notification);
            localStorage.setItem('reMarketNotifications', JSON.stringify(notifications));
            
            hideNotificationForm();
            loadNotifications();
            alert('Notification published successfully!');
        }

        // Delete notification
        function deleteNotification(id) {
            if (confirm('Are you sure you want to delete this notification?')) {
                notifications = notifications.filter(notif => notif.id !== id);
                localStorage.setItem('reMarketNotifications', JSON.stringify(notifications));
                loadNotifications();
            }
        }

        // Load notifications
        function loadNotifications() {
            notificationsList.innerHTML = '';

            if (notifications.length === 0) {
                notificationsList.innerHTML = '<div class="notification-item"><p>No notifications yet</p></div>';
                return;
            }

            notifications.forEach(notif => {
                const notificationItem = document.createElement('div');
                notificationItem.className = 'notification-item';
                notificationItem.innerHTML = `
                    <div class="notification-header">
                        <div class="notification-title">${notif.title}</div>
                        <div class="notification-date">${notif.date}</div>
                    </div>
                    <div class="notification-message">${notif.message}</div>
                    <div class="notification-actions">
                        <button class="action-btn action-btn-danger" onclick="deleteNotification(${notif.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                notificationsList.appendChild(notificationItem);
            });
        }

        // Change time range for analytics
        function changeTimeRange(range) {
            currentTimeRange = range;
            
            // Update active button
            document.querySelectorAll('.time-filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Update chart
            updateChart();
        }

        // Initialize analytics chart
        function initializeChart() {
            const ctx = document.getElementById('analyticsChart').getContext('2d');
            const data = analyticsData.daily;
            
            analyticsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'User Activity',
                            data: data.users,
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Sales ($)',
                            data: data.sales,
                            borderColor: '#7c3aed',
                            backgroundColor: 'rgba(124, 58, 237, 0.1)',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Update chart with current time range data
        function updateChart() {
            const data = analyticsData[currentTimeRange];
            
            analyticsChart.data.labels = data.labels;
            analyticsChart.data.datasets[0].data = data.users;
            analyticsChart.data.datasets[1].data = data.sales;
            analyticsChart.update();
        }

        // Load users into the table
        function loadUsers() {
            usersTableBody.innerHTML = '';
            
            let filteredUsers = mockUsers;
            
            // Filter by tab
            if (currentUserTab !== 'all') {
                filteredUsers = filteredUsers.filter(user => user.type === currentUserTab);
            }
            
            // Filter by status
            if (currentUserFilter !== 'all') {
                filteredUsers = filteredUsers.filter(user => user.status === currentUserFilter);
            }
            
            // Search filter
            const searchTerm = document.getElementById('userSearch').value.toLowerCase();
            if (searchTerm) {
                filteredUsers = filteredUsers.filter(user => 
                    user.name.toLowerCase().includes(searchTerm) || 
                    user.email.toLowerCase().includes(searchTerm) ||
                    user.id.toString().includes(searchTerm)
                );
            }
            
            if (filteredUsers.length === 0) {
                usersTableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 2rem;">
                            <i class="fas fa-users" style="font-size: 2rem; color: var(--gray); margin-bottom: 1rem;"></i>
                            <p>No users found</p>
                        </td>
                    </tr>
                `;
                return;
            }
            
            filteredUsers.forEach(user => {
                const userRow = document.createElement('tr');
                userRow.className = 'user-row';
                
                let statusClass = '';
                let statusText = '';
                
                switch(user.status) {
                    case 'active':
                        statusClass = 'status-active';
                        statusText = 'Active';
                        break;
                    case 'frozen':
                        statusClass = 'status-frozen';
                        statusText = 'Frozen';
                        break;
                    case 'banned':
                        statusClass = 'status-banned';
                        statusText = 'Banned';
                        break;
                    case 'warning':
                        statusClass = 'status-warning';
                        statusText = 'Warning';
                        break;
                }
                
                userRow.innerHTML = `
                    <td>
                        <div class="user-info">
                            <div class="user-avatar">${user.avatar}</div>
                            <div class="user-details">
                                <h4>${user.name}</h4>
                                <p>${user.email}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="user-status ${user.type === 'seller' ? 'status-active' : 'status-frozen'}">
                            ${user.type === 'seller' ? 'Seller' : 'Buyer'}
                        </span>
                    </td>
                    <td>
                        <span class="user-status ${statusClass}">
                            <i class="fas fa-circle" style="font-size: 0.5rem;"></i>
                            ${statusText}
                        </span>
                    </td>
                    <td>${user.registrationDate}</td>
                    <td>${user.lastActivity}</td>
                    <td>
                        <div class="user-actions">
                            <button class="action-btn action-btn-warning" onclick="openWarningModal(${user.id})" title="Send Warning">
                                <i class="fas fa-exclamation-triangle"></i>
                            </button>
                            <button class="action-btn" onclick="openFreezeModal(${user.id})" title="Freeze Account">
                                <i class="fas fa-snowflake"></i>
                            </button>
                            <button class="action-btn action-btn-danger" onclick="openBanModal(${user.id})" title="Ban Account">
                                <i class="fas fa-ban"></i>
                            </button>
                            <button class="action-btn action-btn-danger" onclick="openDeleteModal(${user.id})" title="Delete Account">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                usersTableBody.appendChild(userRow);
            });
        }

        // Open user modals
        function openWarningModal(userId) {
            selectedUserId = userId;
            document.getElementById('warningModal').style.display = 'flex';
        }

        function openFreezeModal(userId) {
            selectedUserId = userId;
            document.getElementById('freezeModal').style.display = 'flex';
        }

        function openBanModal(userId) {
            selectedUserId = userId;
            document.getElementById('banModal').style.display = 'flex';
        }

        function openDeleteModal(userId) {
            selectedUserId = userId;
            document.getElementById('deleteModal').style.display = 'flex';
        }

        // Close modals
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            selectedUserId = null;
            selectedSeller = null;
            selectedComplaint = null;
        }

        // User actions
        function sendWarning() {
            const warningMessage = document.getElementById('warningMessage').value;
            if (!warningMessage) {
                alert('Please enter a warning message');
                return;
            }
            
            // In a real app, this would update the database
            const userIndex = mockUsers.findIndex(user => user.id === selectedUserId);
            if (userIndex !== -1) {
                mockUsers[userIndex].status = 'warning';
                alert(`Warning sent to user: ${mockUsers[userIndex].name}`);
            }
            
            document.getElementById('warningMessage').value = '';
            closeModal('warningModal');
            loadUsers();
        }

        function freezeAccount() {
            // In a real app, this would update the database
            const userIndex = mockUsers.findIndex(user => user.id === selectedUserId);
            if (userIndex !== -1) {
                mockUsers[userIndex].status = 'frozen';
                alert(`Account frozen: ${mockUsers[userIndex].name}`);
            }
            
            closeModal('freezeModal');
            loadUsers();
        }

        function banAccount() {
            // In a real app, this would update the database
            const userIndex = mockUsers.findIndex(user => user.id === selectedUserId);
            if (userIndex !== -1) {
                mockUsers[userIndex].status = 'banned';
                alert(`Account banned: ${mockUsers[userIndex].name}`);
            }
            
            closeModal('banModal');
            loadUsers();
        }

        function deleteAccount() {
            // In a real app, this would update the database
            const userIndex = mockUsers.findIndex(user => user.id === selectedUserId);
            if (userIndex !== -1) {
                const userName = mockUsers[userIndex].name;
                mockUsers.splice(userIndex, 1);
                alert(`Account deleted: ${userName}`);
            }
            
            closeModal('deleteModal');
            loadUsers();
        }

        // Load orders into the table
        function loadOrders() {
            const ordersTableBody = document.getElementById('ordersTableBody');
            ordersTableBody.innerHTML = '';
            
            let filteredOrders = mockOrders;
            
            // In a real app, we would filter by time period
            // For now, we'll just show all orders
            
            if (filteredOrders.length === 0) {
                ordersTableBody.innerHTML = `
                    <tr>
                        <td colspan="8" style="text-align: center; padding: 2rem;">
                            <i class="fas fa-shopping-cart" style="font-size: 2rem; color: var(--gray); margin-bottom: 1rem;"></i>
                            <p>No orders found</p>
                        </td>
                    </tr>
                `;
                return;
            }
            
            filteredOrders.forEach(order => {
                const orderRow = document.createElement('tr');
                orderRow.className = 'order-row';
                
                let statusClass = '';
                let statusText = '';
                
                switch(order.status) {
                    case 'completed':
                        statusClass = 'status-completed';
                        statusText = 'Completed';
                        break;
                    case 'pending':
                        statusClass = 'status-pending';
                        statusText = 'Pending';
                        break;
                    case 'refunded':
                        statusClass = 'status-refunded';
                        statusText = 'Refunded';
                        break;
                    case 'cancelled':
                        statusClass = 'status-cancelled';
                        statusText = 'Cancelled';
                        break;
                }
                
                orderRow.innerHTML = `
                    <td>#${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.seller}</td>
                    <td>${order.product}</td>
                    <td>$${order.amount.toFixed(2)}</td>
                    <td>${order.date}</td>
                    <td>
                        <span class="order-status ${statusClass}">
                            <i class="fas fa-circle" style="font-size: 0.5rem;"></i>
                            ${statusText}
                        </span>
                    </td>
                    <td>
                        <div class="order-actions">
                            ${order.status === 'completed' ? `
                                <button class="action-btn" title="View Details">
                                    <i class="fas fa-eye"></i>
                                </button>
                            ` : ''}
                            ${order.complaint ? `
                                <button class="action-btn action-btn-warning" title="View Complaint">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </button>
                            ` : ''}
                        </div>
                    </td>
                `;
                
                ordersTableBody.appendChild(orderRow);
            });
        }

        // Load sellers with pending payments - FIXED FUNCTION
        function loadSellers() {
            const sellersTableBody = document.getElementById('sellersTableBody');
            sellersTableBody.innerHTML = '';
            
            let totalPending = 0;
            
            mockSellerEarnings.forEach(seller => {
                if (seller.status === 'pending') {
                    totalPending += seller.pendingAmount;
                }
                
                const sellerRow = document.createElement('tr');
                sellerRow.className = 'order-row';
                
                let statusClass = seller.status === 'paid' ? 'status-paid' : 'status-pending';
                let statusText = seller.status === 'paid' ? 'Paid' : 'Pending';
                
                sellerRow.innerHTML = `
                    <td>${seller.seller}</td>
                    <td>$${seller.totalEarnings.toFixed(2)}</td>
                    <td>$${seller.pendingAmount.toFixed(2)}</td>
                    <td>${seller.ordersCount}</td>
                    <td>${seller.lastPayment}</td>
                    <td>
                        <span class="order-status ${statusClass}">
                            <i class="fas fa-circle" style="font-size: 0.5rem;"></i>
                            ${statusText}
                        </span>
                    </td>
                    <td>
                        ${seller.status === 'pending' ? `
                            <button class="payment-btn" onclick="openPaymentModal('${seller.seller}')">
                                <i class="fas fa-money-bill-wave"></i>
                                Pay Seller
                            </button>
                        ` : `
                            <button class="payment-btn" disabled style="background: var(--gray); cursor: not-allowed;">
                                <i class="fas fa-check"></i>
                                Payment Sent
                            </button>
                        `}
                    </td>
                `;
                
                sellersTableBody.appendChild(sellerRow);
            });
            
            document.getElementById('totalPendingAmount').textContent = `$${totalPending.toFixed(2)}`;
        }

        // Load complaints
        function loadComplaints() {
            const complaintsList = document.getElementById('complaintsList');
            complaintsList.innerHTML = '';
            
            if (mockComplaints.length === 0) {
                complaintsList.innerHTML = `
                    <div class="complaint-item">
                        <p>No complaints found</p>
                    </div>
                `;
                return;
            }
            
            mockComplaints.forEach(complaint => {
                const complaintItem = document.createElement('div');
                complaintItem.className = 'complaint-item';
                
                let statusBadge = complaint.status === 'pending' ? 
                    '<span class="order-status status-pending">Pending</span>' : 
                    '<span class="order-status status-completed">Resolved</span>';
                
                complaintItem.innerHTML = `
                    <div class="complaint-header">
                        <div class="complaint-title">Complaint #${complaint.id} - Order #${complaint.orderId}</div>
                        ${statusBadge}
                    </div>
                    <div class="complaint-details">
                        <p><strong>Customer:</strong> ${complaint.customer}</p>
                        <p><strong>Product:</strong> ${complaint.product}</p>
                        <p><strong>Issue:</strong> ${complaint.details}</p>
                        <p><strong>Date:</strong> ${complaint.date}</p>
                    </div>
                    <div class="complaint-actions">
                        ${complaint.status === 'pending' ? `
                            <button class="refund-btn" onclick="openRefundModal(${complaint.id})">
                                <i class="fas fa-undo"></i>
                                Process Refund
                            </button>
                        ` : ''}
                        <button class="action-btn" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                `;
                
                complaintsList.appendChild(complaintItem);
            });
        }

        // Calculate and display earnings overview
        function loadEarningsOverview() {
            // Calculate totals from mock data
            let totalRevenue = 0;
            let paidToSellers = 0;
            let refundsIssued = 0;
            
            mockOrders.forEach(order => {
                if (order.status === 'completed') {
                    totalRevenue += order.amount;
                } else if (order.status === 'refunded') {
                    refundsIssued += order.amount * 0.90;
                }
            });
            
            // Calculate paid to sellers from seller earnings data
            mockSellerEarnings.forEach(seller => {
                if (seller.status === 'paid') {
                    // For paid sellers, use the difference between total and pending
                    paidToSellers += (seller.totalEarnings - seller.pendingAmount) * 0.65;
                }
            });
            
            const platformProfit = totalRevenue - paidToSellers - refundsIssued;
            
            // Update UI
            document.getElementById('platformEarnings').textContent = `$${platformProfit.toFixed(2)}`;
            document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
            document.getElementById('paidToSellers').textContent = `$${paidToSellers.toFixed(2)}`;
            document.getElementById('refundsIssued').textContent = `$${refundsIssued.toFixed(2)}`;
            document.getElementById('platformProfit').textContent = `$${platformProfit.toFixed(2)}`;
        }

        // Initialize orders chart
        function initializeOrdersChart() {
            const ctx = document.getElementById('ordersChart').getContext('2d');
            const data = earningsData.daily;
            
            ordersChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Orders',
                            data: [12, 25, 38, 22, 35, 18],
                            backgroundColor: 'rgba(37, 99, 235, 0.7)',
                            borderColor: 'rgba(37, 99, 235, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Orders Over Time'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Initialize earnings chart
        function initializeEarningsChart() {
            const ctx = document.getElementById('earningsChart').getContext('2d');
            const data = earningsData.daily;
            
            earningsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Revenue',
                            data: data.revenue,
                            borderColor: '#2563eb',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Profit',
                            data: data.profit,
                            borderColor: '#7c3aed',
                            backgroundColor: 'rgba(124, 58, 237, 0.1)',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Revenue vs Profit'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Update charts with current time period data
        function updateCharts() {
            const data = earningsData[currentOrderPeriod];
            
            if (ordersChart) {
                // In a real app, we would update with actual order count data
                ordersChart.update();
            }
            
            if (earningsChart) {
                earningsChart.data.labels = data.labels;
                earningsChart.data.datasets[0].data = data.revenue;
                earningsChart.data.datasets[1].data = data.profit;
                earningsChart.update();
            }
        }

        // Open payment modal
        function openPaymentModal(sellerName) {
            selectedSeller = mockSellerEarnings.find(seller => seller.seller === sellerName);
            
            if (selectedSeller) {
                document.getElementById('paymentSellerName').textContent = selectedSeller.seller;
                document.getElementById('paymentTotalEarnings').textContent = `$${selectedSeller.totalEarnings.toFixed(2)}`;
                
                const platformFee = selectedSeller.pendingAmount / 0.65 * 0.35;
                document.getElementById('paymentPlatformFee').textContent = `$${platformFee.toFixed(2)}`;
                document.getElementById('paymentAmount').textContent = `$${selectedSeller.pendingAmount.toFixed(2)}`;
                
                document.getElementById('paymentModal').style.display = 'flex';
            }
        }

        // Open refund modal
        function openRefundModal(complaintId) {
            selectedComplaint = mockComplaints.find(complaint => complaint.id === complaintId);
            
            if (selectedComplaint) {
                const order = mockOrders.find(order => order.id === selectedComplaint.orderId);
                
                if (order) {
                    document.getElementById('refundCustomerName').textContent = selectedComplaint.customer;
                    document.getElementById('refundOrderAmount').textContent = `$${order.amount.toFixed(2)}`;
                    
                    const refundAmount = order.amount * 0.90;
                    document.getElementById('refundAmount').textContent = `$${refundAmount.toFixed(2)}`;
                    document.getElementById('refundTotal').textContent = `$${refundAmount.toFixed(2)}`;
                    
                    document.getElementById('refundModal').style.display = 'flex';
                }
            }
        }

        // Confirm payment and show animation - FIXED FUNCTION
        function confirmPayment() {
            if (selectedSeller && selectedSeller.status === 'pending') {
                closeModal('paymentModal');
                
                // Show payment processing animation
                paymentProcessing.classList.add('active');
                
                // Simulate payment processing
                setTimeout(() => {
                    paymentProcessing.classList.remove('active');
                    
                    // Show success message
                    document.getElementById('successSellerName').textContent = `Payment has been processed for ${selectedSeller.seller}`;
                    document.getElementById('successAmount').textContent = `$${selectedSeller.pendingAmount.toFixed(2)}`;
                    document.getElementById('successTransactionId').textContent = `RM-${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
                    document.getElementById('successDate').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                    
                    paymentSuccess.classList.add('active');
                    
                    // CRITICAL FIX: Update seller status and reset pending amount
                    const sellerIndex = mockSellerEarnings.findIndex(seller => seller.seller === selectedSeller.seller);
                    if (sellerIndex !== -1) {
                        // Update seller data
                        mockSellerEarnings[sellerIndex].status = 'paid';
                        mockSellerEarnings[sellerIndex].pendingAmount = 0; // Reset pending amount to 0
                        mockSellerEarnings[sellerIndex].lastPayment = new Date().toISOString().split('T')[0];
                        
                        // Save to localStorage
                        saveSellerData();
                    }
                }, 2000);
            } else {
                alert('This seller has already been paid or no seller is selected.');
            }
        }

        // Close payment success modal
        function closePaymentSuccess() {
            paymentSuccess.classList.remove('active');
            // Reload sellers to show updated data
            loadSellers();
            loadEarningsOverview();
        }

        // Process refund to customer
        function processRefund() {
            if (selectedComplaint) {
                const order = mockOrders.find(order => order.id === selectedComplaint.orderId);
                
                if (order) {
                    const refundAmount = order.amount * 0.90;
                    
                    // In a real app, this would process the actual refund
                    alert(`Refund of $${refundAmount.toFixed(2)} processed successfully for ${selectedComplaint.customer}`);
                    
                    // Update complaint status (in a real app, this would update the database)
                    selectedComplaint.status = 'resolved';
                    
                    closeModal('refundModal');
                    loadComplaints();
                    loadEarningsOverview();
                }
            }
        }

        // Reset all payments function
        function resetAllPayments() {
            if (confirm('Are you sure you want to reset all payments? This will set all sellers back to pending status.')) {
                mockSellerEarnings = [
                    {
                        seller: "John Smith",
                        totalEarnings: 425.75,
                        pendingAmount: 276.74,
                        ordersCount: 5,
                        lastPayment: "2023-09-30",
                        status: "pending"
                    },
                    {
                        seller: "Sarah Davis",
                        totalEarnings: 289.99,
                        pendingAmount: 188.49,
                        ordersCount: 3,
                        lastPayment: "2023-10-15",
                        status: "pending"
                    },
                    {
                        seller: "Robert Wilson",
                        totalEarnings: 525.48,
                        pendingAmount: 341.56,
                        ordersCount: 6,
                        lastPayment: "2023-10-10",
                        status: "pending"
                    },
                    {
                        seller: "David Miller",
                        totalEarnings: 399.98,
                        pendingAmount: 259.99,
                        ordersCount: 4,
                        lastPayment: "2023-10-05",
                        status: "pending"
                    }
                ];
                saveSellerData();
                loadSellers();
                alert('All payments have been reset!');
            }
        }

        // Switch between sections
        function switchSection(sectionName) {
            // Hide all sections
            document.querySelectorAll('.dashboard-content > div').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected section
            document.getElementById(`${sectionName}-section`).style.display = 'block';
            
            // Update active menu item
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(`.menu-item[data-section="${sectionName}"]`).classList.add('active');
            
            // If switching to user management, load users
            if (sectionName === 'user-management') {
                loadUsers();
            }
            
            // If switching to order management, load orders
            if (sectionName === 'order-management') {
                initializeOrderManagement();
            }
        }

        // Switch between order tabs
        function switchOrderTab(tabName) {
            currentOrderTab = tabName;
            
            // Hide all tab contents
            document.querySelectorAll('.order-tab-content').forEach(tab => {
                tab.style.display = 'none';
            });
            
            // Show selected tab content
            document.getElementById(`${tabName}-tab`).style.display = 'block';
            
            // Update active tab
            document.querySelectorAll('.order-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector(`.order-tab[data-tab="${tabName}"]`).classList.add('active');
            
            // Load specific data for the tab
            if (tabName === 'all-orders') {
                loadOrders();
            } else if (tabName === 'seller-payments') {
                loadSellers();
            } else if (tabName === 'complaints') {
                loadComplaints();
            } else if (tabName === 'earnings') {
                loadEarningsOverview();
            }
        }

        // Change order time period
        function changeOrderPeriod(period) {
            currentOrderPeriod = period;
            
            // Update active button
            document.querySelectorAll('.order-time-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Update charts
            updateCharts();
        }

        // Initialize order management
        function initializeOrderManagement() {
            // Load seller data from localStorage
            loadSellerData();
            
            // Load initial data
            loadOrders();
            loadSellers();
            loadComplaints();
            loadEarningsOverview();
            
            // Initialize charts
            initializeOrdersChart();
            initializeEarningsChart();
            
            // Order tab switching
            document.querySelectorAll('.order-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    switchOrderTab(tabName);
                });
            });
            
            // Order time period switching
            document.querySelectorAll('.order-time-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const period = this.getAttribute('data-period');
                    changeOrderPeriod(period);
                });
            });
        }

        // Initialize dashboard
        function initializeDashboard() {
            // Initialize chart
            initializeChart();
            
            // Load notifications
            loadNotifications();
            
            // Update stats with random variations
            updateStats();
            
            // Menu item activation
            document.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', function() {
                    const section = this.getAttribute('data-section');
                    switchSection(section);
                });
            });
            
            // User tab switching
            document.querySelectorAll('.user-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    currentUserTab = this.getAttribute('data-tab');
                    
                    document.querySelectorAll('.user-tab').forEach(t => {
                        t.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    loadUsers();
                });
            });
            
            // User filter switching
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    currentUserFilter = this.getAttribute('data-filter');
                    
                    document.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    loadUsers();
                });
            });
            
            // User search
            document.getElementById('userSearch').addEventListener('input', function() {
                loadUsers();
            });
        }

        // Update stats with random variations
        function updateStats() {
            const baseStats = {
                users: 2458,
                sellers: 342,
                orders: 1847,
                issues: 12
            };

            // Add some random variation to make it feel live
            document.getElementById('totalUsers').textContent = (baseStats.users + Math.floor(Math.random() * 50)).toLocaleString();
            document.getElementById('activeSellers').textContent = (baseStats.sellers + Math.floor(Math.random() * 10)).toLocaleString();
            document.getElementById('todayOrders').textContent = (baseStats.orders + Math.floor(Math.random() * 100)).toLocaleString();
            document.getElementById('pendingIssues').textContent = (baseStats.issues + Math.floor(Math.random() * 5)).toLocaleString();
        }

        // Auto-focus username field on page load
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('adminUsername').focus();
            // Load seller data immediately
            loadSellerData();
        });