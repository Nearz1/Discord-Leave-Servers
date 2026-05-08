<!-- HEADER -->
<h1 align="center">🚀 Discord Guild Mass Leaver</h1>


  > A lightweight client-side script to mass leave Discord servers (guilds)
  > directly from your browser console with smart rate-limit handling
  > and exponential backoff.

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" />
  <img src="https://img.shields.io/badge/version-1.0-blue" />
  <img src="https://img.shields.io/badge/license-MIT-black" />
</p>

---

## ⚠️ Disclaimer

**This script operates as a self-bot (automated user account action), which violates Discord's Terms of Service.**

* Use at your own risk
* Intended for educational purposes only
* Recommended for test/alt accounts only
* The author is not responsible for any account actions taken by Discord

---

## ✨ Features

* Mass leave all servers automatically, except whitelisted ones
* Protect specific guild IDs from being left
* Respects Discord's `retry_after` header from 429 rate-limit responses
* Exponential backoff (doubles delay on repeated failures)
* Configurable retry limit per guild
* Retries on network errors, not just HTTP 429
* Detects already-left guilds without counting them as errors
* Configurable interval between guild leave requests
* Tag-based console output for clean debugging
* Final summary with left, skipped, and failed counts

---

## ⚙️ How It Works

1. Fetches all guilds you are a member of via Discord's REST API (`/users/@me/guilds`)
2. Compares each guild ID against your whitelist
3. Sends a DELETE request to `/users/@me/guilds/{guild_id}` for non-whitelisted servers
4. If rate-limited (HTTP 429), reads the `retry_after` field from the response body and waits
5. If the `retry_after` field is missing or on subsequent retries, applies exponential backoff
6. Retries up to a configurable limit per guild before marking it as failed
7. Sleeps a configurable interval between guilds to avoid triggering rate limits

---

## 🧪 Usage

### Step 1: Get your Discord User Token

1. Open Discord in your browser
2. Press `F12` to open DevTools
3. Navigate to:
   `Application → Storage → Local Storage → https://discord.com`
4. Look for a key named `token` and copy its value

**Alternative method:**

* Go to the `Network` tab
* Refresh the page
* Click any request to `discord.com/api/v9/`
* Find the `authorization` header

⚠️ Your token is sensitive — never share it

---

### Step 2: Get Guild IDs

1. Enable Developer Mode in Discord:
   `Settings → Advanced → Developer Mode`
2. Right-click any server icon
3. Click `Copy ID`

---

### Step 3: Configure and Run

1. Open the script file (available in this repository)
2. Replace `YOUR_USER_TOKEN_HERE` with your actual token
3. Replace the example IDs in the `WHITELIST` array
4. Copy the entire script
5. Paste it into the **Console tab** of Discord's DevTools
6. Press `Enter`

➡️ The script will immediately begin processing all guilds

---

## 📊 Sample Output

```
[INFO] Found 47 guild(s).
[LEAVE] Left guild: Some Random Server (123456789012345678)
[RATE_LIMIT] Guild "Another Server" (876543210987654322) | Attempt 1/10 | Waiting 1.0s...
[SKIP] Guild "My Private Server" (112233445566778899) -- whitelisted.
[FAIL] Guild "Dead Server" (998877665544332211) | HTTP 403

==========================================
SUMMARY
==========================================
Total guilds processed: 47
Left: 44
Skipped (whitelist): 2
Failed: 1
==========================================
```

---

## 🧩 Configuration Reference

| Variable            | Default | Description                                |
| ------------------- | ------- | ------------------------------------------ |
| TOKEN               | --      | Your Discord user token                    |
| WHITELIST           | []      | Array of guild IDs to preserve             |
| MAX_RETRIES         | 10      | Max attempts per guild before giving up    |
| BASE_DELAY_MS       | 1000    | Initial delay (ms) for exponential backoff |
| REQUEST_INTERVAL_MS | 500     | Delay (ms) between leave requests          |

---

## 🛠️ Troubleshooting

| Error     | Cause            | Solution                                            |
| --------- | ---------------- | --------------------------------------------------- |
| HTTP 400  | Invalid token    | Check that your token is correct and not rotated    |
| HTTP 403  | No permission    | Transfer ownership or delete the guild manually     |
| HTTP 429  | Rate limited     | Handled automatically (increase interval if needed) |
| HTTP 404  | Guild not found  | Already left or deleted (safely skipped)            |
| No output | Token expired    | Generate a new token                                |
| Blocked   | CSP restrictions | Use Console tab (not URL bar)                       |

---

## ⚠️ Limitations

* You cannot leave a server where you are the owner
* Discord may rate-limit aggressively on large accounts
* Tokens expire periodically and must be refreshed

---

## 📄 License

**MIT License**

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

---

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.
