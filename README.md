# 🚀 Discord Guild Mass Leaver

> A lightweight client-side script to mass leave Discord servers (guilds) directly from your browser console with smart rate-limit handling and exponential backoff.

-------------------------------------------------------------------------------

## ⚠️ Disclaimer

This script operates as a self-bot (automated user account action), which violates Discord's Terms of Service.

- Use at your own risk
- Educational purposes only
- Recommended for test/alt accounts only
- The author is not responsible for any account actions taken by Discord

-------------------------------------------------------------------------------

## ✨ Features

- Mass leave all servers automatically (with whitelist)
- Protect specific guild IDs
- Handles Discord rate limits (retry_after)
- Exponential backoff system
- Configurable retry limits
- Handles network errors
- Detects already-left guilds
- Configurable delay between requests
- Clean console logs
- Final summary report

-------------------------------------------------------------------------------

## ⚙️ How It Works

1. Fetches all guilds via /users/@me/guilds
2. Compares guild IDs with whitelist
3. Sends DELETE requests to leave servers
4. Handles rate limits automatically
5. Uses exponential backoff when needed
6. Retries until limit is reached
7. Waits between requests to avoid detection

-------------------------------------------------------------------------------

## 🚀 Usage

### 1. Get your Discord Token

- Open Discord in browser
- Press F12
- Go to Application → Local Storage → https://discord.com
- Copy the "token"

Alternative:
- Network tab → request → authorization header

⚠️ Never share your token

-------------------------------------------------------------------------------

### 2. Get Guild IDs

Enable Developer Mode:
Settings → Advanced → Developer Mode

Right-click server → Copy ID

-------------------------------------------------------------------------------

### 3. Run Script

1. Open script
2. Replace YOUR_USER_TOKEN_HERE
3. Configure WHITELIST
4. Paste into DevTools Console
5. Press Enter

-------------------------------------------------------------------------------

## 📊 Sample Output

[INFO] Found 47 guild(s).
[LEAVE] Left guild: Example Server
[RATE_LIMIT] Waiting...
[SKIP] Whitelisted server
[FAIL] HTTP 403

-------------------------------------------------------------------------------

## ⚙️ Configuration

TOKEN
WHITELIST
MAX_RETRIES = 10
BASE_DELAY_MS = 1000
REQUEST_INTERVAL_MS = 500

-------------------------------------------------------------------------------

## 🛠️ Troubleshooting

HTTP 400 → Invalid token  
HTTP 403 → No permission  
HTTP 429 → Rate limited  
HTTP 404 → Guild not found  
No output → Token expired  

-------------------------------------------------------------------------------

## ⚠️ Limitations

- Cannot leave servers you own
- Heavy usage may trigger rate limits
- Tokens expire

-------------------------------------------------------------------------------

## 📄 License

MIT License

-------------------------------------------------------------------------------

⚠️ Educational Use Only
