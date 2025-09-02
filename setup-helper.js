// TronFlash Setup Helper Script
// This script helps you update the main files with configuration values

console.log("🚀 TronFlash Setup Helper");
console.log("📋 This script helps you identify what needs to be changed");

// Check if master config is loaded
if (window.TRONFLASH_CONFIG) {
    console.log("✅ Master configuration loaded");
    console.log("📊 Current configuration:");
    console.log("- Bot Token:", window.TRONFLASH_CONFIG.TELEGRAM.BOT_TOKEN);
    console.log("- Chat ID:", window.TRONFLASH_CONFIG.TELEGRAM.CHAT_ID);
    console.log("- Wallet Address:", window.TRONFLASH_CONFIG.WALLET.ADDRESS);
    console.log("- Contract Address:", window.TRONFLASH_CONFIG.CONTRACTS.YOUR_CONTRACT);
} else {
    console.log("❌ Master configuration not loaded");
    console.log("📝 Please make sure config.js is loaded first");
}

// Helper function to check configuration status
function checkConfigStatus() {
    const config = window.TRONFLASH_CONFIG;
    
    if (!config) {
        console.log("❌ Configuration not found");
        return false;
    }
    
    const issues = [];
    
    // Check Telegram
    if (config.TELEGRAM.BOT_TOKEN === "YOUR_BOT_TOKEN_HERE") {
        issues.push("❌ Telegram bot token not configured");
    } else {
        console.log("✅ Telegram bot token configured");
    }
    
    if (config.TELEGRAM.CHAT_ID === "YOUR_CHAT_ID_HERE") {
        issues.push("❌ Telegram chat ID not configured");
    } else {
        console.log("✅ Telegram chat ID configured");
    }
    
    // Check Wallet
    if (config.WALLET.ADDRESS === "YOUR_WALLET_ADDRESS_HERE") {
        issues.push("❌ Wallet address not configured");
    } else {
        console.log("✅ Wallet address configured");
    }
    
    if (config.WALLET.PRIVATE_KEY === "YOUR_PRIVATE_KEY_HERE") {
        issues.push("❌ Wallet private key not configured");
    } else {
        console.log("✅ Wallet private key configured");
    }
    
    // Check Contract
    if (config.CONTRACTS.YOUR_CONTRACT === "YOUR_CONTRACT_ADDRESS_HERE") {
        issues.push("❌ Contract address not configured");
    } else {
        console.log("✅ Contract address configured");
    }
    
    if (issues.length > 0) {
        console.log("⚠️ Configuration issues found:");
        issues.forEach(issue => console.log(issue));
        console.log("📝 Please update config.js with your actual values");
    } else {
        console.log("🎉 All configurations are set up correctly!");
    }
    
    return issues.length === 0;
}

// Auto-check configuration when script loads
setTimeout(checkConfigStatus, 1000);

// Export helper function
window.checkTronFlashConfig = checkConfigStatus;

console.log("💡 Use checkTronFlashConfig() to verify your configuration anytime");
