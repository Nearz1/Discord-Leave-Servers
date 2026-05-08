# Discord Guild Mass Leaver

> A lightweight client-side script to mass leave Discord servers (guilds) directly from your browser console, with automatic rate-limit handling and exponential backoff.

---

## Disclaimer

**This script operates as a self-bot (automated user account action), which violates Discord's Terms of Service.**

- Use at your own risk.
- Intended for educational purposes only.
- Recommended for test/alt accounts only.
- The author is not responsible for any account actions taken by Discord.

---

## Features

- Mass leave all servers automatically, except whitelisted ones  
- Protect specific guild IDs from being left  
- Respects Discord's `retry_after` header from 429 rate-limit responses  
- Exponential backoff — doubles delay on repeated failures  
- Configurable retry limit per guild  
- Retries on network errors, not just HTTP 429  
- Detects already-left guilds without counting them as errors  
- Configurable interval between guild leave requests  
- Tag-based console output for clean debugging  
- Final summary with left, skipped, and failed counts  

---

## How It Works

1. Fetches all guilds you are a member of via Discord's REST API (`/users/@me/guilds`)  
2. Compares each guild ID against your whitelist  
3. Sends a `DELETE` request to `/users/@me/guilds/{guild_id}` for non-whitelisted servers  
4. If rate-limited (HTTP 429), reads the `retry_after` field from the response body and waits  
5. If the `retry_after` field is missing or on subsequent retries, applies exponential backoff  
6. Retries up to a configurable limit per guild before marking it as failed  
7. Sleeps a configurable interval between guilds to avoid triggering rate limits  

---

## Usage

### Step 1: Get your Discord User Token

Open Discord in your browser and press `F12` to open DevTools.

Navigate to:  
`Application → Storage → Local Storage → https://discord.com`

Look for a key named `"token"` and copy its value.

**Alternative method:**  
Go to the `Network` tab, refresh the page, click on any request to `discord.com/api/v9/`, and find the `"authorization"` header.

> ⚠️ Your token is sensitive — never share it. Tokens may rotate every 24–48 hours.

---

### Step 2: Get Guild IDs

Enable Developer Mode in Discord:  
`Settings → Advanced → Developer Mode`

Right-click any server icon and select **Copy ID**.

---

### Step 3: Configure and Run

1. Open the script file (available in this repository)  
2. Replace `"YOUR_USER_TOKEN_HERE"` with your actual token  
3. Replace the example IDs in the `WHITELIST` array with the guild IDs you want to preserve  
4. Copy the entire script  
5. Paste it into the **Console** tab of Discord's DevTools  
6. Press **Enter**  

The script will immediately begin processing all guilds.

---

## Sample Output

```txt
[INFO] Found 47 guild(s).
[LEAVE] Left guild: Some Random Server (123456789012345678)
[RATE_LIMIT] Guild "Another Server" (876543210987654322) | Attempt 1/10 | Waiting 1.0s...
[SKIP] Guild "My Private Server" (112233445566778899) -- whitelisted.
[FAIL] Guild "Dead Server" (998877665544332211) | HTTP 403

==========================================
              SUMMARY
==========================================
Total guilds processed: 47
Left:                  44
Skipped (whitelist):    2
Failed:                 1
==========================================
