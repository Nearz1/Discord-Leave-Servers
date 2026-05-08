<div align="center">

# 🚀 Discord Guild Mass Leaver

> A lightweight client-side script to mass leave Discord servers (guilds)  
> directly from your browser console with smart rate-limit handling.

<br>

![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)
![Platform](https://img.shields.io/badge/platform-browser-lightgrey)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen)

</div>

---

## 📌 Table of Contents

- [⚠️ Disclaimer](#️-disclaimer)
- [✨ Features](#-features)
- [⚙️ How It Works](#️-how-it-works)
- [🚀 Usage](#-usage)
- [📊 Sample Output](#-sample-output)
- [⚙️ Configuration](#️-configuration)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [⚠️ Limitations](#️-limitations)
- [📄 License](#-license)

---

## ⚠️ Disclaimer

> This script operates as a **self-bot (automated user account action)**,  
> which violates Discord's Terms of Service.

- Use at your own risk  
- Educational purposes only  
- Recommended for **test/alt accounts only**  
- The author is **not responsible** for account actions taken by Discord  

---

## ✨ Features

- ⚡ Mass leave all servers automatically (with whitelist support)
- 🛡️ Protect specific guild IDs
- ⏱️ Smart handling of Discord rate limits (`retry_after`)
- 🔁 Exponential backoff on failures
- 🔧 Configurable retry limits
- 🌐 Handles network errors (not just HTTP 429)
- 🧠 Detects already-left guilds without counting errors
- ⌛ Configurable delay between requests
- 🧾 Clean console logs with tags
- 📊 Final execution summary

---

## ⚙️ How It Works

1. Fetches all guilds via:
