# 🚀 TronFlash - Master Configuration System

## 🎯 **ONE FILE TO RULE THEM ALL!**

Your TronFlash website now has a **master configuration file** that controls everything! 

### 📁 **Master Configuration File: `config.js`**

This single file is the **HEART** of your website. Edit only this file to control:

- 🤖 **Telegram Bot Settings** (notifications, bot token, chat ID)
- 💰 **Wallet Configuration** (address, private key, auto-topup settings)
- 📊 **Balance Monitoring** (check intervals, alert thresholds)
- 🎛️ **Admin Panel Settings** (auto-refresh, data retention)
- 🌐 **Website Settings** (title, theme colors, features)
- 🔧 **Technical Settings** (debug mode, logging, performance)
- 🚀 **Deployment Settings** (environment, API endpoints, security)

## 🎮 **How to Use**

### **Quick Changes:**
```javascript
// In config.js file:

// Disable Telegram notifications
TELEGRAM: {
    ENABLED: false
}

// Change TRX topup amount
WALLET: {
    AUTO_TOPUP: {
        TOPUP_AMOUNT: 10  // Send 10 TRX instead of 5
    }
}

// Change balance check interval
BALANCE: {
    CHECK_INTERVAL: 60000  // Check every 60 seconds instead of 30
}

// Enable debug mode
TECHNICAL: {
    DEBUG: true
}
```

### **After Making Changes:**
1. Save the `config.js` file
2. Refresh your website
3. Changes are applied automatically!

## 📂 **Project Structure**

```
trc health live/
├── config.js                    # 🎯 MASTER CONFIGURATION FILE
├── index.html                   # Main website
├── admin-panel.html            # Admin monitoring panel
├── admin-panel.js              # Admin panel functionality
├── balance-monitor.js          # Balance monitoring system
├── balance-reader.js           # Balance reading system
└── dashboard/                  # Dashboard directory
    ├── index.html              # Dashboard version
    ├── js/                     # JavaScript files
    ├── css/                    # Stylesheets
    ├── images/                 # Images
    └── manifest.json           # Web app manifest
```

## 🔧 **Configuration Sections**

### **1. 🤖 Telegram Settings**
- Bot token and chat ID
- Notification preferences
- Enable/disable specific notifications

### **2. 💰 Wallet Configuration**
- Your wallet address and private key
- Auto-topup settings
- Minimum balance thresholds

### **3. 🔗 Contract Addresses**
- USDT TRC20 contract for approvals
- Custom contract addresses
- Focused on USDT approval functionality

### **4. 💳 USDT Approval Settings**
- Configure approval amounts and limits
- Set auto-approve conditions
- Configure approval notifications

### **5. 📊 Balance Monitoring**
- Check intervals
- Alert thresholds
- API settings

### **6. 🎛️ Admin Panel**
- Auto-refresh settings
- Data retention limits
- Display preferences

### **7. 🌐 Website Settings**
- Title and description
- Theme colors
- Feature toggles

### **8. 🌐 Network Configuration**
- Mainnet, Shasta testnet, Nile testnet
- Full node, solidity node, event server settings
- Network timeout configurations

### **9. 💸 Transaction Settings**
- Default fee limits and energy limits
- Transaction retry settings
- Transaction monitoring configuration

### **10. 🔐 Security Settings**
- Private key encryption options
- Address validation settings
- Rate limiting configuration

### **11. 🔧 Technical Settings**
- Debug mode
- Logging levels
- Performance parameters

### **12. 🚀 Deployment Settings**
- Environment configuration
- API endpoints
- Security and performance options

## 🎉 **Benefits**

- ✅ **Single point of control** - Edit one file to change everything
- ✅ **No more scattered configurations** - All settings in one place
- ✅ **Easy to maintain** - Clear structure and documentation
- ✅ **Auto-initialization** - Settings applied automatically
- ✅ **Hot-reload support** - Changes apply on refresh
- ✅ **Comprehensive control** - Every aspect of your website

## 🚀 **Getting Started**

1. **Open `config.js`** in your text editor
2. **Update your settings** (Telegram bot, wallet details, etc.)
3. **Save the file**
4. **Open your website** - Everything is configured!

## 🔒 **Security Notes**

- Keep your private keys secure
- Don't share your bot tokens
- Use environment variables for production
- Regularly backup your configuration

---

**🎯 Remember: Edit only `config.js` to control your entire TronFlash website!**
