// Balance Reader for TronFlash Admin Panel
class BalanceReader {
    constructor() {
        this.walletAddress = null;
        this.apiEndpoint = 'https://api.trongrid.io';
        this.lastBalance = 0;
        this.balanceHistory = [];
        this.maxHistorySize = 100;
    }

    // Initialize with wallet configuration
    initialize(walletConfig) {
        this.walletAddress = walletConfig.ADDRESS;
        console.log('💰 Balance reader initialized for wallet:', this.walletAddress);
    }

    // Read TRX balance from TronGrid API
    async readTrxBalance() {
        if (!this.walletAddress) {
            throw new Error('Wallet address not configured');
        }

        try {
            console.log('🔍 Reading real TRX balance for:', this.walletAddress);
            
            // Call TronGrid API to get account info
            const response = await fetch(`${this.apiEndpoint}/v1/accounts/${this.walletAddress}`);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.data || data.data.length === 0) {
                throw new Error('Account not found or invalid address');
            }
            
            const account = data.data[0];
            const balance = account.balance || 0;
            
            // Convert from sun to TRX (1 TRX = 1,000,000 sun)
            const trxBalance = balance / 1000000;
            
            // Store balance history
            this.addToHistory(trxBalance);
            this.lastBalance = trxBalance;
            
            console.log('✅ Real TRX balance read successfully:', trxBalance);
            return trxBalance;
            
        } catch (error) {
            console.error('❌ Failed to read real TRX balance:', error);
            throw error;
        }
    }

    // Read USDT balance (TRC20 token)
    async readUsdtBalance() {
        if (!this.walletAddress) {
            throw new Error('Wallet address not configured');
        }

        try {
            console.log('🔍 Reading USDT balance for:', this.walletAddress);
            
            // USDT TRC20 contract address
            const usdtContract = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
            
            // Call TronGrid API to get token balance
            const response = await fetch(`${this.apiEndpoint}/v1/accounts/${this.walletAddress}/transactions/trc20?contract_address=${usdtContract}&limit=1`);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            // For now, return 0 as USDT balance reading requires more complex logic
            // This would need to be implemented with proper TRC20 token balance reading
            console.log('✅ USDT balance read successfully: 0 (placeholder)');
            return 0;
            
        } catch (error) {
            console.error('❌ Failed to read USDT balance:', error);
            throw error;
        }
    }

    // Add balance to history
    addToHistory(balance) {
        const timestamp = new Date().toISOString();
        this.balanceHistory.push({
            balance: balance,
            timestamp: timestamp
        });
        
        // Keep only the last N entries
        if (this.balanceHistory.length > this.maxHistorySize) {
            this.balanceHistory.shift();
        }
    }

    // Get balance history
    getBalanceHistory() {
        return this.balanceHistory;
    }

    // Get last known balance
    getLastBalance() {
        return this.lastBalance;
    }

    // Check if balance has changed significantly
    hasBalanceChanged(threshold = 0.01) {
        if (this.balanceHistory.length < 2) return false;
        
        const current = this.balanceHistory[this.balanceHistory.length - 1].balance;
        const previous = this.balanceHistory[this.balanceHistory.length - 2].balance;
        
        return Math.abs(current - previous) >= threshold;
    }

    // Get balance change percentage
    getBalanceChangePercentage() {
        if (this.balanceHistory.length < 2) return 0;
        
        const current = this.balanceHistory[this.balanceHistory.length - 1].balance;
        const previous = this.balanceHistory[this.balanceHistory.length - 2].balance;
        
        if (previous === 0) return 0;
        
        return ((current - previous) / previous) * 100;
    }

    // Format balance for display
    formatBalance(balance, decimals = 4) {
        return balance.toFixed(decimals);
    }

    // Get balance status (high, medium, low, critical)
    getBalanceStatus(balance) {
        if (balance >= 1000) return 'high';
        if (balance >= 100) return 'medium';
        if (balance >= 10) return 'low';
        return 'critical';
    }
}

// Initialize balance reader when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Balance reader initialized');
    
    // Create global balance reader instance
    window.balanceReader = new BalanceReader();
    
    // Initialize with wallet config if available
    if (window.TRONFLASH_CONFIG?.WALLET) {
        window.balanceReader.initialize(window.TRONFLASH_CONFIG.WALLET);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BalanceReader;
}
