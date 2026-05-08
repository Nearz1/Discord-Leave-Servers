/**
 * Discord Guild Mass Leave Script
 *
 * Leaves all Discord servers (guilds) except those in the whitelist.
 * Handles rate limiting with exponential backoff and automatic retries.
 *
 * Usage:
 *   1. Open Discord in your browser (https://discord.com/app)
 *   2. Open DevTools (F12) > Console
 *   3. Set your token and whitelist below
 *   4. Paste and execute
 */

// ============ CONFIGURATION ============

const TOKEN = "YOUR_USER_TOKEN_HERE";

const WHITELIST = [
    // Guild IDs to preserve (do NOT leave these)
    123456789012345678,
    876543210987654321
];

const MAX_RETRIES = 10;
const BASE_DELAY_MS = 1000;
const REQUEST_INTERVAL_MS = 500;

// ============ HELPERS ============

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRetryDelay(attempt, retryAfterHeader) {
    if (retryAfterHeader > 0) {
        return retryAfterHeader * 1000;
    }
    return BASE_DELAY_MS * Math.pow(2, attempt - 1);
}

// ============ API FUNCTIONS ============

async function fetchGuilds() {
    const response = await fetch("https://discord.com/api/v9/users/@me/guilds", {
        headers: { Authorization: TOKEN }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch guilds: HTTP ${response.status}`);
    }

    const guilds = await response.json();
    console.log(`[INFO] Found ${guilds.length} guild(s).`);
    return guilds;
}

/**
 * Attempts to leave a single guild with automatic retry on rate limits.
 * @param {string} guildId
 * @param {string} guildName
 * @param {number} attempt - Current attempt number (starts at 1)
 * @returns {Promise<boolean>} Whether the leave was successful
 */
async function leaveGuild(guildId, guildName, attempt = 1) {
    try {
        const response = await fetch(
            `https://discord.com/api/v9/users/@me/guilds/${guildId}`,
            {
                method: "DELETE",
                headers: { Authorization: TOKEN }
            }
        );

        // Success
        if (response.ok) {
            console.log(`[LEAVE] Left guild: ${guildName} (${guildId})`);
            return true;
        }

        // Rate limited
        if (response.status === 429) {
            let retryAfter = 0;
            try {
                const body = await response.json();
                retryAfter = body.retry_after || 0;
            } catch {
            }

            const delay = getRetryDelay(attempt, retryAfter);

            if (attempt < MAX_RETRIES) {
                console.log(
                    `[RATE_LIMIT] Guild "${guildName}" (${guildId}) | ` +
                    `Attempt ${attempt}/${MAX_RETRIES} | ` +
                    `Waiting ${(delay / 1000).toFixed(1)}s...`
                );
                await sleep(delay);
                return leaveGuild(guildId, guildName, attempt + 1);
            }

            console.log(
                `[FAIL] Guild "${guildName}" (${guildId}) | ` +
                `Exhausted ${MAX_RETRIES} retries (rate limited).`
            );
            return false;
        }

        // Guild not found — likely already left
        if (response.status === 404) {
            console.log(
                `[SKIP] Guild "${guildName}" (${guildId}) not found — already left.`
            );
            return true;
        }

        console.log(
            `[FAIL] Guild "${guildName}" (${guildId}) | ` +
            `HTTP ${response.status}`
        );
        return false;

    } catch (error) {
        // Network or connection error
        if (attempt < MAX_RETRIES) {
            const delay = getRetryDelay(attempt, 0);
            console.log(
                `[ERROR] Guild "${guildName}" (${guildId}) | ` +
                `Connection error | Attempt ${attempt}/${MAX_RETRIES} | ` +
                `Retrying in ${(delay / 1000).toFixed(1)}s...`
            );
            await sleep(delay);
            return leaveGuild(guildId, guildName, attempt + 1);
        }

        console.log(
            `[FAIL] Guild "${guildName}" (${guildId}) | ` +
            `Exhausted ${MAX_RETRIES} retries (connection error).`,
            error
        );
        return false;
    }
}

// ============ MAIN ============

(async function main() {
    console.log("[START] Discord Guild Mass Leave Script");
    console.log(`[START] Whitelist: ${WHITELIST.length} guild(s) protected.`);

    try {
        const guilds = await fetchGuilds();
        let leftCount = 0;
        let failCount = 0;
        let skippedCount = 0;

        for (const guild of guilds) {
            const guildId = guild.id;
            const guildName = guild.name;

            if (WHITELIST.includes(Number(guildId))) {
                console.log(`[SKIP] Guild "${guildName}" (${guildId}) — whitelisted.`);
                skippedCount++;
                continue;
            }

            const success = await leaveGuild(guildId, guildName);
            if (success) {
                leftCount++;
            } else {
                failCount++;
            }

            // Throttle between requests to avoid rate limits
            await sleep(REQUEST_INTERVAL_MS);
        }

        console.log("\n========== SUMMARY ==========");
        console.log(`Total guilds processed: ${guilds.length}`);
        console.log(`Left:                 ${leftCount}`);
        console.log(`Skipped (whitelist):  ${skippedCount}`);
        console.log(`Failed:               ${failCount}`);
        console.log("=============================");

    } catch (error) {
        console.error("[FATAL] Script failed:", error);
    }
})();
