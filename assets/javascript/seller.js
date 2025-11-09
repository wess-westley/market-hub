 // Sample data for charts
        const monthlySalesData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sales ($)',
                data: [1200, 1900, 1500, 2200, 1800, 2500, 2100, 2458, 2300, 2800, 2600, 3000],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };

        const quarterlySalesData = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Sales ($)',
                data: [4600, 6500, 6858, 8400],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };

        const predictionData = {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [{
                label: 'Actual Sales',
                data: [2100, 2458, 2300, 2800, 2600, 3000, null, null],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Predicted Sales',
                data: [null, null, null, null, null, 3000, 3200, 3400],
                borderColor: '#7c3aed',
                borderDash: [5, 5],
                backgroundColor: 'transparent',
                tension: 0.4,
                fill: false
            }]
        };

        const salesVsListingsData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Listings',
                data: [12, 15, 18, 14, 16, 20],
                borderColor: '#06d6a0',
                backgroundColor: 'rgba(6, 214, 160, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Sales',
                data: [8, 10, 12, 9, 11, 15],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };

        // Initialize charts
        const salesCtx = document.getElementById('salesChart').getContext('2d');
        const salesChart = new Chart(salesCtx, {
            type: 'line',
            data: monthlySalesData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
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

        const predictionCtx = document.getElementById('predictionChart').getContext('2d');
        const predictionChart = new Chart(predictionCtx, {
            type: 'line',
            data: predictionData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
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

        const salesVsListingsCtx = document.getElementById('salesVsListingsChart').getContext('2d');
        const salesVsListingsChart = new Chart(salesVsListingsCtx, {
            type: 'line',
            data: salesVsListingsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
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

        // Chart view toggle
        document.getElementById('viewMonthly').addEventListener('click', function() {
            salesChart.data = monthlySalesData;
            salesChart.update();
            this.classList.add('btn-primary');
            this.classList.remove('btn-outline');
            document.getElementById('viewQuarterly').classList.remove('btn-primary');
            document.getElementById('viewQuarterly').classList.add('btn-outline');
        });

        document.getElementById('viewQuarterly').addEventListener('click', function() {
            salesChart.data = quarterlySalesData;
            salesChart.update();
            this.classList.add('btn-primary');
            this.classList.remove('btn-outline');
            document.getElementById('viewMonthly').classList.remove('btn-primary');
            document.getElementById('viewMonthly').classList.add('btn-outline');
        });

        // Modal functionality
        const addProductModal = document.getElementById('addProductModal');
        const addProductBtn = document.getElementById('addProductBtn');
        const closeModalBtn = document.querySelector('.close-modal');

        addProductBtn.addEventListener('click', function() {
            addProductModal.classList.add('active');
        });

        closeModalBtn.addEventListener('click', function() {
            addProductModal.classList.remove('active');
        });

        window.addEventListener('click', function(event) {
            if (event.target === addProductModal) {
                addProductModal.classList.remove('active');
            }
        });

        // Add product function
        function addProduct() {
            const productName = document.getElementById('productName').value;
            const productCategory = document.getElementById('productCategory').value;
            const productBrand = document.getElementById('productBrand').value;
            const productColor = document.getElementById('productColor').value;
            const productCondition = document.getElementById('productCondition').value;
            const productPrice = document.getElementById('productPrice').value;
            
            if (!productName || !productCategory || !productCondition || !productPrice) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real application, you would send this data to a backend
            alert(`Product "${productName}" added successfully!`);
            addProductModal.classList.remove('active');
            
            // Reset form
            document.getElementById('addProductForm').reset();
        }

        // Menu item activation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Action buttons functionality
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i').className;
                
                if (icon.includes('fa-edit')) {
                    alert('Edit product functionality would open here');
                } else if (icon.includes('fa-chart-line')) {
                    alert('View analytics for this product');
                } else if (icon.includes('fa-trash')) {
                    if (confirm('Are you sure you want to delete this product?')) {
                        alert('Product deleted successfully');
                    }
                } else if (icon.includes('fa-eye')) {
                    alert('View sale details for this product');
                }
            });
        });
    function logout(){
        window.location.href="index.html"
    }