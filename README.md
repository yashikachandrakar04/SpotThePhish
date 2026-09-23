# 🎣 Spot the Phish

A cybersecurity awareness game built with **React Native CLI** that teaches users how to identify phishing emails through interactive gameplay.

![React Native](https://img.shields.io/badge/React%20Native-CLI-61DAFB?logo=react)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📖 Overview

**Spot the Phish** is an educational mobile game that helps users learn to recognize phishing attempts. Players are shown realistic email samples and must decide whether each one is **PHISHING** or **LEGITIMATE** within a time limit. The game teaches real-world cybersecurity awareness by highlighting specific red flags and explaining why each suspicious element matters.

Perfect for:

- 🎓 Cybersecurity awareness training
- 🏢 Corporate security education programs
- 👨‍💻 Developers learning about common attack vectors
- 🧠 Anyone wanting to protect themselves online

## ✨ Features

### Core Gameplay

- 📧 **30+ realistic email samples** across 8 categories
- ⏱️ **Timed challenges** — beat the clock for bonus points
- 🎯 **Instant feedback** — see if you got it right and why
- 📊 **Detailed explanations** — every email comes with a breakdown

### Difficulty Levels

| Level | Time per Email | Description |
|-------|---------------|-------------|
| 🟢 Easy | 20 seconds | Obvious red flags |
| 🟡 Medium | 15 seconds | Balanced challenge |
| 🔴 Hard | 8 seconds | Subtle, tricky emails |
| 🎲 Mixed | 12 seconds | Random emails |

### Email Categories

- 🏦 **Banking** — PayPal, Chase, HDFC, Wells Fargo, Citibank
- 💬 **Social Media** — Instagram, LinkedIn, WhatsApp, X/Twitter, Tinder
- 💼 **Work & Corporate** — IT support, CEO fraud, HR, Microsoft 365
- 🛒 **Shopping** — Amazon, eBay, Flipkart, Shopify
- 💻 **Tech** — Microsoft, Google, Apple, GitHub
- 📦 **Delivery** — FedEx, DHL, UPS
- 🏛️ **Government** — IRS, Social Security
- ₿ **Crypto** — Coinbase, Binance, Ledger

### Learning Features

- 🚩 **Tap-to-learn red flags** — Tap any highlighted suspicious text in an email to see why it's dangerous
- 📝 **Detailed review screen** — Go through every email after playing
- 💡 **Educational explanations** — Learn about typosquatting, subdomain spoofing, CEO fraud, OTP scams, and more

### Progression & Persistence

- 💾 **AsyncStorage** — Saves high scores, stats, and settings locally
- 🏆 **Leaderboard** — Top 10 personal high scores
- 📊 **Player stats** — Games played, accuracy, total correct
- 📅 **Daily Challenge** — 5 fresh emails every day, same for everyone
- ⏳ **Countdown timer** — See when the next daily challenge unlocks

### Scoring System

- ✅ **100 points** per correct answer
- ⚡ **+10 bonus points** per second remaining on the timer
- 💯 **Perfect play** can earn 250+ points per email

## 🚀 Getting Started

### Prerequisites

Make sure you have completed the [React Native CLI environment setup](https://reactnative.dev/docs/environment-setup):

- **Node.js** ≥ 18
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **CocoaPods** (for iOS)

### Installation

**1. Create the project**

    npx @react-native-community/cli init SpotThePhish
    cd SpotThePhish

**2. Install dependencies**

    npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage

**3. Install iOS pods** (macOS only)

    cd ios && pod install && cd ..

**4. Add the source files**

Place the source files in the `src/` folder and use `App.jsx` as the root component.

**5. Run the app**

    # Android
    npx react-native run-android

    # iOS
    npx react-native run-ios

## 📁 Project Structure

    SpotThePhish/
    ├── App.jsx                          # Root navigation container
    ├── src/
    │   ├── screens/
    │   │   ├── HomeScreen.jsx           # Main menu
    │   │   ├── DifficultyScreen.jsx     # Difficulty selection
    │   │   ├── CategoryScreen.jsx       # Category selection
    │   │   ├── GameScreen.jsx           # Core gameplay
    │   │   ├── ResultScreen.jsx         # Score & review
    │   │   ├── LeaderboardScreen.jsx    # High scores
    │   │   └── DailyChallengeScreen.jsx # Daily mode
    │   ├── components/
    │   │   ├── EmailCard.jsx            # Email display
    │   │   ├── Timer.jsx                # Countdown bar
    │   │   ├── HighlightedText.jsx      # Inline red flag highlights
    │   │   └── RedFlagTag.jsx           # Tappable flag tag
    │   ├── data/
    │   │   ├── emails.js                # 30+ email samples
    │   │   └── categories.js            # Categories & difficulties
    │   └── utils/
    │       ├── storage.js               # AsyncStorage helpers
    │       └── dailyChallenge.js        # Daily challenge logic

## 🎮 How to Play

1. **Tap "Quick Play"** on the home screen
2. **Choose a difficulty** (Easy / Medium / Hard / Mixed)
3. **Choose a category** (or "All Categories")
4. **Read each email carefully** — look at the sender, subject, body, and links
5. **Decide:** Is it 🚩 PHISHING or ✅ LEGITIMATE?
6. **Tap your answer** before the timer runs out
7. **Review your results** — tap any card to see detailed red flags
8. **Tap highlighted text** in the email body to learn *why* it's suspicious

### Scoring Tips

- ⚡ Answer fast — bonus points scale with time remaining
- 🎯 Read carefully — the hardest emails have subtle clues
- 📚 Review your mistakes — the explanations are the real learning

## 🧠 What You'll Learn

The game teaches recognition of real-world phishing techniques:

- **Typosquatting** — `micros0ft.com` vs `microsoft.com`
- **Subdomain spoofing** — `chase.com.secure-notify.net`
- **Urgency tactics** — "Your account will be closed in 24 hours!"
- **Fear tactics** — "Unusual sign-in from Russia"
- **Authority pressure** — Fake IT/HR/CEO emails
- **Generic greetings** — "Dear Customer" instead of your name
- **Suspicious links** — Non-official domains in email bodies
- **Credential harvesting** — Requests for passwords or OTPs
- **Seed phrase scams** — Crypto wallet phishing
- **Gift card scams** — CEO fraud / BEC attacks
- **KYC fraud** — Fake bank compliance requests
- **Prize scams** — Celebrity crypto giveaways

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React Native CLI | Cross-platform mobile framework |
| React Navigation | Screen navigation (stack) |
| AsyncStorage | Local persistence |
| React Hooks | State management |

## 🗺️ Roadmap

- [x] Difficulty levels
- [x] Category filtering
- [x] AsyncStorage persistence
- [x] Daily challenge mode
- [x] Interactive red flag highlighting
- [x] Leaderboard
- [ ] Sound effects
- [ ] Haptic feedback
- [ ] Global leaderboard (backend)
- [ ] Email attachments simulation
- [ ] Multiplayer / VS mode
- [ ] Achievement system
- [ ] Localization (multi-language)
- [ ] Accessibility improvements

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add more emails** — Open `src/data/emails.js` and add new samples with proper `redFlags` and `explanation`
2. **Improve UI** — Polish animations, themes, or layouts
3. **Fix bugs** — Open an issue first, then submit a PR
4. **Translate** — Help make the game accessible in more languages

### Adding a New Email

Each email entry should include:

- **id** — unique string identifier
- **category** — one of: banking, social, work, shopping, tech, delivery, government, crypto
- **difficulty** — one of: easy, medium, hard
- **sender** — display name of the sender
- **senderEmail** — the "from" email address
- **subject** — email subject line
- **body** — full email body text
- **isPhishing** — boolean (true = phishing, false = legitimate)
- **redFlags** — array of `{ text, reason }` objects for highlighted clues
- **explanation** — overall explanation of why this email is phishing or legitimate

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

All emails, sender addresses, and domains in this game are **fictional and created for educational purposes only**. Any resemblance to real emails, businesses, or individuals is coincidental. Never click links in real suspicious emails — always navigate directly to official websites.

The brands mentioned (PayPal, Amazon, Microsoft, etc.) are trademarks of their respective owners and are used here for educational simulation only.

## 🙏 Acknowledgments

- Inspired by real-world phishing attacks and cybersecurity awareness training
- Built with ❤️ for the security community
- Thanks to OWASP, CISA, and other organizations publishing phishing awareness material

## 📬 Contact

Have questions, feedback, or want to contribute?

- Open an issue on GitHub
- Submit a pull request
- Star ⭐ the repo if you find it useful!

---

**Stay safe online. Think before you click.** 🛡️