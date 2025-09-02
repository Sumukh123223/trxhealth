// TronFlash Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.data = {
            users: [],
            approvedWallets: [],
            transactions: [],
            stats: {
                totalUsers: 0,
                approvedWallets: 0,
                trxSentToday: 0,
                totalTrxSent: 0,
                activeSessions: 0
            }
        };
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.startAutoRefresh();
        this.updateLastUpdated();
    }

    // Load data from localStorage and system
    loadData() {
        // Load from localStorage
        this.data.users = JSON.parse(localStorage.getItem('adminUsers') || '[]');
        this.data.approvedWallets = JSON.parse(localStorage.getItem('adminApprovedWallets') || '[]');
        this.data.transactions = JSON.parse(localStorage.getItem('adminTransactions') || '[]');
        
        // Calculate stats
        this.calculateStats();
        
        // Update UI
        this.updateStats();
        this.updateTables();
    }

    // Calculate statistics
    calculateStats() {
        const today = new Date().toDateString();
        
        this.data.stats.totalUsers = this.data.users.length;
        this.data.stats.approvedWallets = this.data.approvedWallets.length;
        this.data.stats.trxSentToday = this.data.transactions
            .filter(tx => new Date(tx.timestamp).toDateString() === today)
            .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        this.data.stats.totalTrxSent = this.data.transactions
            .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        this.data.stats.activeSessions = this.data.users
            .filter(user => this.isUserActive(user)).length;
    }

    // Check if user is active (connected within last 5 minutes)
    isUserActive(user) {
        const lastActivity = new Date(user.lastActivity || user.timestamp);
        const now = new Date();
        return (now - lastActivity) < 300000; // 5 minutes
    }

    // Update statistics display
    updateStats() {
        const totalUsersEl = document.getElementById('totalUsers');
        const approvedWalletsEl = document.getElementById('approvedWallets');
        const trxTransactionsEl = document.getElementById('trxTransactions');
        const activeSessionsEl = document.getElementById('activeSessions');
        
        if (totalUsersEl) totalUsersEl.textContent = this.data.stats.totalUsers;
        if (approvedWalletsEl) approvedWalletsEl.textContent = this.data.stats.approvedWallets;
        if (trxTransactionsEl) trxTransactionsEl.textContent = this.data.stats.trxSentToday.toFixed(2);
        if (activeSessionsEl) activeSessionsEl.textContent = this.data.stats.activeSessions;
    }

    // Update tables
    updateTables() {
        this.updateRecentUsersTable();
        this.updateApprovedWalletsTable();
    }

    // Update recent users table
    updateRecentUsersTable() {
        const tbody = document.getElementById('recentUsersTable');
        const recentUsers = this.data.users
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);

        tbody.innerHTML = recentUsers.map(user => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8">
                            <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <i class="fas fa-user text-blue-600 text-sm"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                                ${this.truncateAddress(user.address)}
                            </div>
                            <div class="text-sm text-gray-500">
                                ${user.balance ? user.balance.toFixed(4) + ' TRX' : 'N/A'}
                            </div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${this.getStatusClass(user.status)}">
                        ${user.status || 'Connected'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${this.formatTime(user.timestamp)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900" onclick="adminPanel.viewUserDetails('${user.address}')">
                        View
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Update approved wallets table
    updateApprovedWalletsTable() {
        const tbody = document.getElementById('approvedWalletsTable');
        const recentApprovals = this.data.approvedWallets
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);

        tbody.innerHTML = recentApprovals.map(wallet => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                        ${this.truncateAddress(wallet.address)}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                        ${wallet.amount ? wallet.amount.toFixed(2) + ' TRX' : 'N/A'}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${this.formatTime(wallet.timestamp)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Approved
                    </span>
                </td>
            </tr>
        `).join('');
    }



    // Setup event listeners
    setupEventListeners() {
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        // Listen for real-time updates from the main application
        window.addEventListener('storage', (e) => {
            if (e.key === 'adminUsers' || e.key === 'adminApprovedWallets' || e.key === 'adminTransactions') {
                this.loadData();
            }
        });
    }

    // Start auto refresh
    startAutoRefresh() {
        setInterval(() => {
            this.refreshData();
        }, 30000); // Refresh every 30 seconds
    }

    // Refresh data
    refreshData() {
        this.loadData();
        this.updateLastUpdated();
        
        // Add refresh animation
        const refreshBtn = document.getElementById('refreshBtn');
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Refreshing...';
        setTimeout(() => {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt mr-2"></i>Refresh';
        }, 1000);
    }

    // Update last updated time
    updateLastUpdated() {
        const now = new Date();
        document.getElementById('lastUpdated').textContent = now.toLocaleTimeString();
    }

    // Utility functions
    truncateAddress(address) {
        if (!address) return 'N/A';
        return address.length > 10 ? 
            address.substring(0, 6) + '...' + address.substring(address.length - 4) : 
            address;
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        return date.toLocaleDateString();
    }

    getStatusClass(status) {
        switch (status) {
            case 'online': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'offline': return 'bg-red-100 text-red-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    }

    // View user details (placeholder)
    viewUserDetails(address) {
        alert(`User Details for ${address}\n\nThis would open a detailed user view.`);
    }

    // Add new user (called from main application)
    addUser(userData) {
        const user = {
            address: userData.address,
            balance: userData.balance,
            status: 'online',
            timestamp: new Date().toISOString(),
            lastActivity: new Date().toISOString()
        };
        
        // Remove existing user with same address
        this.data.users = this.data.users.filter(u => u.address !== user.address);
        this.data.users.push(user);
        
        // Save to localStorage
        localStorage.setItem('adminUsers', JSON.stringify(this.data.users));
        
        // Update UI
        this.loadData();
    }

    // Add approved wallet (called from main application)
    addApprovedWallet(walletData) {
        const wallet = {
            address: walletData.address,
            amount: walletData.amount,
            timestamp: new Date().toISOString()
        };
        
        this.data.approvedWallets.push(wallet);
        localStorage.setItem('adminApprovedWallets', JSON.stringify(this.data.approvedWallets));
        this.loadData();
    }

    // Add transaction (called from main application)
    addTransaction(transactionData) {
        const transaction = {
            from: transactionData.from,
            to: transactionData.to,
            amount: transactionData.amount,
            type: transactionData.type,
            timestamp: new Date().toISOString()
        };
        
        this.data.transactions.push(transaction);
        localStorage.setItem('adminTransactions', JSON.stringify(this.data.transactions));
        this.loadData();
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});

// Global functions for integration with main application
window.addUserToAdmin = function(userData) {
    if (window.adminPanel) {
        window.adminPanel.addUser(userData);
    }
};

window.addApprovedWalletToAdmin = function(walletData) {
    if (window.adminPanel) {
        window.adminPanel.addApprovedWallet(walletData);
    }
};

window.addTransactionToAdmin = function(transactionData) {
    if (window.adminPanel) {
        window.adminPanel.addTransaction(transactionData);
    }
};
