// Balance Monitor for TronFlash Admin Panel
class BalanceMonitor {
    constructor() {
        this.balanceElement = document.getElementById('yourBalance');
        this.statusElement = document.getElementById('balanceStatus');
        this.alertElement = document.getElementById('balanceAlert');
        this.lastBalance = 0;
        this.updateInterval = null;
        this.isMonitoring = false;
    }

    // Start monitoring balance
    startMonitoring() {
        if (this.isMonitoring) return;
        
        console.log('🔄 Starting balance monitoring...');
        this.isMonitoring = true;
        
        // Initial balance check
        this.checkBalance();
        
        // Set up periodic checks every 30 seconds
        this.updateInterval = setInterval(() => {
            this.checkBalance();
        }, 30000);
    }

    // Stop monitoring balance
    stopMonitoring() {
        if (!this.isMonitoring) return;
        
        console.log('⏹️ Stopping balance monitoring...');
        this.isMonitoring = false;
        
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    // Check current balance
    async checkBalance() {
        try {
            // Get wallet configuration from master config
            const walletConfig = window.TRONFLASH_CONFIG?.WALLET || {};
            const walletAddress = walletConfig.ADDRESS;
            
            if (!walletAddress) {
                this.updateBalanceDisplay(0, 'No wallet configured', 'warning');
                return;
            }

            // Simulate balance check (replace with actual TRX balance API call)
            const balance = await this.fetchTrxBalance(walletAddress);
            
            this.updateBalanceDisplay(balance, 'Balance updated', 'success');
            this.checkBalanceAlerts(balance);
            
        } catch (error) {
            console.error('❌ Balance check failed:', error);
            this.updateBalanceDisplay(this.lastBalance, 'Balance check failed', 'error');
        }
    }

    // Fetch TRX balance from TronGrid API
    async fetchTrxBalance(address) {
        try {
            console.log('🔍 Fetching real TRX balance for:', address);
            
            // Call TronGrid API to get account info
            const response = await fetch(`https://api.trongrid.io/v1/accounts/${address}`);
            
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
            
            console.log('✅ Real TRX balance fetched:', trxBalance);
            return trxBalance;
            
        } catch (error) {
            console.error('❌ Failed to fetch real TRX balance:', error);
            // Return 0 if API fails
            return 0;
        }
    }

    // Update balance display
    updateBalanceDisplay(balance, status, type) {
        if (this.balanceElement) {
            this.balanceElement.textContent = balance.toFixed(4);
        }
        
        if (this.statusElement) {
            this.statusElement.textContent = status;
            this.statusElement.className = `text-${type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'red'}-600 text-sm`;
        }
        
        this.lastBalance = balance;
    }

    // Check for balance alerts
    checkBalanceAlerts(balance) {
        if (!this.alertElement) return;
        
        // Clear previous alerts
        this.alertElement.innerHTML = '';
        
        // Get balance thresholds
        const lowBalanceThreshold = window.TRONFLASH_CONFIG?.BALANCE?.ALERTS?.LOW_BALANCE || 100;
        const criticalBalanceThreshold = window.TRONFLASH_CONFIG?.BALANCE?.ALERTS?.CRITICAL_BALANCE || 10;
        
        // Get customizable messages from config
        const messages = window.TRONFLASH_CONFIG?.BALANCE?.ALERTS?.MESSAGES || {};
        const lowBalanceMessage = messages.LOW_BALANCE || "Your TRX balance is below {threshold} TRX. Consider adding more funds.";
        const criticalBalanceMessage = messages.CRITICAL_BALANCE || "Your TRX balance is critically low ({balance} TRX). Immediate action required!";
        
        // Low balance alert (configurable threshold)
        if (balance < lowBalanceThreshold) {
            const alert = document.createElement('div');
            alert.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded';
            alert.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    <span class="font-semibold">Low Balance Alert!</span>
                </div>
                <p class="text-sm mt-1">${lowBalanceMessage.replace('{threshold}', lowBalanceThreshold)}</p>
            `;
            this.alertElement.appendChild(alert);
        }
        // Critical balance alert (configurable threshold)
        else if (balance < criticalBalanceThreshold) {
            const alert = document.createElement('div');
            alert.className = 'bg-red-200 border border-red-500 text-red-800 px-4 py-3 rounded';
            alert.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    <span class="font-bold">Critical Low Balance!</span>
                </div>
                <p class="text-sm mt-1">${criticalBalanceMessage.replace('{balance}', balance.toFixed(4))}</p>
            `;
            this.alertElement.appendChild(alert);
        }
    }

    // Get current balance
    getCurrentBalance() {
        return this.lastBalance;
    }

    // Check if monitoring is active
    isActive() {
        return this.isMonitoring;
    }
}

// Initialize balance monitor when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Balance monitor initialized');
    
    // Create global balance monitor instance
    window.balanceMonitor = new BalanceMonitor();
    
    // Start monitoring after a short delay
    setTimeout(() => {
        window.balanceMonitor.startMonitoring();
    }, 1000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BalanceMonitor;
}
