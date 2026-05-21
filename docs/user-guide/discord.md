---
sidebar_position: 4.5
title: "Discord Intake"
---

# Discord Intake

Discord intake watches forum channels in your Discord server and turns each new post into a kanban story. It's a one-way feed designed for tracking bug reports and feature requests that come in via Discord — there's no automated reply or sync back to Discord, but every story keeps a permanent **From Discord** link to the original post.

Tickets are still the right tool for support conversations (where you need to reply). Discord intake is for things that should land in your engineering backlog instead.

When [Max](#max-aware-triage) is enabled on the project, every imported post gets classified, summarized, and checked against existing stories before the card is even created.

## What You Need

- A Discord server where you can create applications and invite bots (Server Manager or Owner)
- A **forum** channel in that server, dedicated to whatever you want to import (e.g. `#bug-reports`)
- The `Discord.View` and `Discord.Edit` permissions assigned to your role in Zip Station (owners have these automatically)

## Step 1 — Create a Discord Bot

Each Zip Station install needs its own Discord bot. The bot's token is a credential, so never share it.

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and click **New Application**.
2. Give it a name your server members will recognize (e.g. "Acme Helper") and create it.
3. Open the **Bot** tab in the left sidebar. Set the bot's avatar and display name if you'd like.

### Enable the Message Content Intent

Scroll to **Privileged Gateway Intents** and turn on:

- **Message Content Intent** ✅

Leave **Server Members Intent** off — Zip Station doesn't need it.

Without Message Content Intent, the bot can still see *that* a post exists, but the body comes back empty and your stories will say "(no body)" instead of the actual content.

### Copy the Bot Token

Still on the **Bot** tab, find the **Token** section and click **Reset Token** (or **View Token** if it's brand new). Confirm with 2FA if prompted. The token is shown **once** — copy it now and paste it into Zip Station before navigating away. If you miss it, just hit Reset Token again to generate a new one.

The Client ID and Client Secret on the **OAuth2** tab are *not* the bot token — don't paste those by mistake.

## Step 2 — Invite the Bot to Your Server

1. Open the **OAuth2 → URL Generator** tab.
2. Under **Scopes**, check `bot`. A **Bot Permissions** section will appear below.
3. Under **Bot Permissions**, check just these two:
   - **View Channels** (General)
   - **Read Message History** (Text)

   That's the full set the bot needs. Don't grant any more — the bot never sends, reacts, or modifies anything.

4. At the bottom, set **Integration Type = Guild Install**.
5. Copy the generated URL (it will end in `&permissions=66560&scope=bot`).
6. Open the URL in a browser, pick your server, and click **Authorize**.

If your forum channel is private or in a category with channel-level permission overrides, you may also need to add the bot's role directly to the channel — server-wide permissions are overridden by channel-specific ones.

## Step 3 — Configure Zip Station

1. In Zip Station, open **Project Settings → Discord**.
2. Paste the bot token into the **Bot token** field and click **Save token**. The token is encrypted at rest; nobody (including you) can read it back.
3. Click **Verify bot access**. You should see `✓ Bot is in N servers` — if that fails, the token is wrong or the bot hasn't been invited yet.
4. Click **Add source**. The editor opens with two dropdowns:

   - **Server** — every server the bot is in, by name.
   - **Forum channel** — every forum channel in the picked server, by name.

   Pick both. Zip Station will auto-suggest a label like `Acme Server / #bug-reports`; edit it if you'd like.

5. Choose a **Default card type**:
   - **Auto — let Max decide** *(recommended when Max is enabled)*: every imported post is classified individually based on its content.
   - A specific type (Bug, Feature, Improvement, Tech Debt): every card from this source starts with that type. Best for single-purpose channels like a dedicated `#bug-reports`.

6. Save the source, then flip **Enable Discord intake** on at the top of the page.

### Advanced: paste IDs manually

If your bot can't enumerate a server or channel (channel-level permission overrides, or you're testing against a pre-configured server you can't invite to yet), click **Advanced: paste IDs manually** in the editor. You can paste the Guild ID and Channel ID directly.

To find an ID manually: enable Developer Mode (Discord Settings → Advanced → Developer Mode), then right-click the server / channel and **Copy ID**.

## How It Works

- Zip Station's worker polls Discord every **60 seconds**. New forum posts since the last check become kanban stories in the project's board.
- Each story lands in the first column of the board (typically **Backlog**) and gets a permanent **From Discord** badge on its detail page. Click the badge to open the original post.
- The post's **title** becomes the story title; the **first message body** becomes the story description.
- A story is created at most once per Discord post (deduplicated by the Discord message ID).
- Click **Sync now** on the Discord settings page if you want to nudge a poll immediately instead of waiting for the next 60-second cycle.
- Forum tags applied to the original post (the colored labels you set on the channel) are carried onto the story's External Source so Max sees them when classifying.

## Max-aware triage

When Max is enabled on the same project, each imported Discord post runs through Max **before** the card is created. Max can:

- **Classify the post**: pick Bug / Feature / Improvement / Tech Debt based on the content, including the Discord forum tags. Used when the source's default card type is set to **Auto**.
- **Set priority and tags**: Low / Normal / High / Urgent, plus 0-3 free-form tags.
- **Detect duplicates**: scan recent non-resolved stories and flag this post as a duplicate of an existing one. The new card is still created, but a pending **"Suggests merging as duplicate"** task is attached for you to approve or reject from the story detail page.
- **Split one post into multiple cards**: when a single post clearly contains several independent issues, Max can create one card per issue.
- **Flag a question**: when the post references something not in your project context, Max surfaces a question on the story for you to answer (which can later be promoted into permanent project context).

Approving a merge task moves the duplicate's linked tickets and Discord link onto the surviving card, drops a system comment on the survivor, and voids the duplicate. Rejecting just dismisses the suggestion.

Max-related actions across the whole project are also visible from **Sidebar → Max** (the unified tasks dashboard mixes ticket-side and story-side pending tasks).

If Max is disabled or the Anthropic API call fails, Discord intake falls back to one card per post using the source's default card type (with Bug as the fallback when the source is set to Auto).

## Multiple Servers and Channels

A single project can pull from multiple Discord channels — even across multiple servers — using one bot token. Add one source row per `(server, channel)`. The bot has to be invited to each server, but the token stays the same.

## What's NOT Synced

Discord intake is one-way. Nothing flows back to Discord when:

- A story is created, edited, or moved
- A story is marked resolved
- Someone comments on a story
- The original Discord post is deleted or edited after import

If you want two-way conversation with a Discord user, use a ticket (via email) instead.

## Permissions

Two permissions gate the Discord intake feature — assign them through the Roles page:

- **Discord.View** — see the Discord settings page; see the "From Discord" badge on stories
- **Discord.Edit** — change the bot token, add/remove sources, trigger a manual sync

Owners have both automatically.

## Troubleshooting

**Stories say "(no body)" instead of the post content.** The Message Content Intent isn't enabled on the bot. Go back to the Developer Portal → Bot tab and turn it on.

**Verify bot access says "Bot doesn't have access" or "Bot is in 0 servers".** The bot hasn't been invited yet, or it was invited to a different server than the one you're trying to use. Re-run the OAuth2 invite URL.

**The Server dropdown is empty after a successful Verify.** The bot is in servers, but the picker query is failing for a different reason — check the API logs. As a workaround, use **Advanced: paste IDs manually**.

**The Forum channel dropdown is empty.** The picked server has no forum channels (or the bot can't see them due to channel-level permissions). Either create a forum channel, give the bot's role View Channel + Read Message History on the existing forum, or use manual ID entry.

**No stories appear after a new post.** Check that:

- The bot is invited to the server *and* can see the channel
- The Discord intake toggle is on at the top of the settings page
- The source row is **Enabled** (each source has its own toggle)
- The project has a kanban board with at least one column

**Old posts before I set this up — will they get imported?** No. The first time intake runs against a new source, it starts from the most recent post and only picks up things after that point. There's no backfill flow in v1.

**I keep getting "Set a bot token before enabling Discord intake."** The token field is write-only — once saved, you can't see it. If you're not sure whether one is set, look for the green **Configured** badge next to the bot token field. If it's missing, paste a token and save before flipping the enable toggle.
