================================================================================
                               README.md
                       Discord Guild Mass Leaver
================================================================================


# Discord Guild Mass Leaver

> A lightweight client-side script to mass leave Discord servers (guilds)
> directly from your browser console, with automatic rate-limit handling
> and exponential backoff.


## Disclaimer

**This script operates as a self-bot (automated user account action), which
violates Discord's Terms of Service.**

- Use at your own risk.
- Intended for educational purposes only.
- Recommended for test/alt accounts only.
- The author is not responsible for any account actions taken by Discord.


## Features

- Mass leave all servers automatically, except whitelisted ones
- Protect specific guild IDs from being left
- Respects Discord's retry_after header from 429 rate-limit responses
- Exponential backoff -- doubles delay on repeated failures
- Configurable retry limit per guild
- Retries on network errors, not just HTTP 429
- Detects already-left guilds without counting them as errors
- Configurable interval between guild leave requests
- Tag-based console output for clean debugging
- Final summary with left, skipped, and failed counts


## How It Works

1. Fetches all guilds you are a member of via Discord's REST API
   (/users/@me/guilds).

2. Compares each guild ID against your whitelist.

3. Sends a DELETE request to /users/@me/guilds/{guild_id} for
   non-whitelisted servers.

4. If rate-limited (HTTP 429), reads the retry_after field from the
   response body and waits.

5. If the retry_after field is missing or on subsequent retries,
   applies exponential backoff.

6. Retries up to a configurable limit per guild before marking it as
   failed.

7. Sleeps a configurable interval between guilds to avoid triggering
   rate limits.


## Usage

### Step 1: Get your Discord User Token

Open Discord in your browser, press F12 to open DevTools.

Navigate to Application tab > Storage > Local Storage >
https://discord.com. Look for a key named "token" and copy its value.

Alternatively, go to the Network tab, refresh the page, click on any
request to discord.com/api/v9/, and find the "authorization" header in
the request headers.

Your token is sensitive -- never share it. Tokens may rotate every
24-48 hours.


### Step 2: Get Guild IDs

Enable Developer Mode in Discord: Settings > Advanced > Developer Mode.

Right-click any server icon and select "Copy ID".


### Step 3: Configure and Run

1. Open the script file (available in this repository).

2. Replace "YOUR_USER_TOKEN_HERE" with your actual token.

3. Replace the example IDs in the WHITELIST array with the guild IDs
   you want to preserve.

4. Copy the entire script.

5. Paste it into the Console tab of Discord's DevTools.

6. Press Enter.

The script will immediately begin processing all guilds.


## Sample Output

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


## Configuration Reference

  Variable              Default     Description
  --------------------  ----------  ----------------------------------------
  TOKEN                 --          Your Discord user token
  WHITELIST             []          Array of guild IDs to preserve
  MAX_RETRIES           10          Max attempts per guild before giving up
  BASE_DELAY_MS         1000        Initial delay (ms) for exponential backoff
  REQUEST_INTERVAL_MS   500         Delay (ms) between leave requests


## Troubleshooting

  Error           Cause                      Solution
  --------------  -------------------------  --------------------------------
  HTTP 400        Invalid token              Check that your token is correct
                                            and has not been rotated

  HTTP 403        No permission              You may be the owner of the
                                            guild. Transfer ownership first
                                            or delete it manually

  HTTP 429        Rate limited               The script handles this
                                            automatically. Increase
                                            REQUEST_INTERVAL_MS if it persists

  HTTP 404        Guild not found            The guild may have been deleted
                                            or you already left -- safely
                                            skipped

  No output       Token expired              Generate a new token via Local
                                            Storage or Network tab

  Script blocked  CSP restrictions           Make sure you are pasting into
                                            the Console tab, not the URL bar


## Limitations

- You cannot leave a server where you are the owner. Transfer ownership
  first or delete the server manually.

- Discord may rate-limit aggressively if you have hundreds of servers.
  Increase REQUEST_INTERVAL_MS if needed.

- Tokens expire periodically. You may need to extract a fresh token if
  the script stops working.


## License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


> Note: This script was created for research purposes. Respect Discord's
> platform and community guidelines.
