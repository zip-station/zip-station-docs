---
sidebar_position: 13
title: "Personal Access Tokens & Claude Code"
---

# Personal Access Tokens & Claude Code

Personal Access Tokens (PATs) authenticate API clients on your behalf. The most common use is connecting **Claude Code** (or any other [MCP](https://modelcontextprotocol.io/)-aware AI client) to your Zip Station instance, so you can list stories, read tickets, and post comments without leaving your editor.

## How it works

- A PAT acts like a long-lived password scoped to **your user** in **one company**. It inherits all your roles and permissions — owners stay owners, agents stay restricted to their projects.
- Zip Station ships with an **MCP server** that runs alongside the API as part of the Docker stack. Your AI client connects to it; it forwards calls to the Zip Station API using your PAT.
- If your account is **disabled or deleted**, every one of your tokens stops working immediately. There is no separate revocation step.
- The token is shown **only once** when created. If you lose it, you must revoke it and mint a new one.

## Creating a token

1. Sign in to Zip Station.
2. Go to **Settings → Personal Access Tokens**.
3. Click **New token**.
4. Give it a descriptive name (e.g. *Laptop MCP*, *CI pipeline*).
5. Pick an expiry — `30 days`, `90 days`, `1 year`, or `Never`. Shorter is safer.
6. Click **Create**. The full token (starting with `zs_pat_`) is displayed once. **Copy it now.**
7. Click **I've saved it** when you're done — the full token cannot be retrieved later.

You can revoke any token at any time from the same page. Revoked tokens stop working immediately.

## Connecting Claude Code

After you've copied a token:

```bash
claude mcp add --transport http --scope user zip-station http://localhost:5101/mcp --header "Authorization: Bearer zs_pat_yourtoken"
```

What the flags mean:

- `--transport http` — Zip Station's MCP server speaks the Streamable HTTP transport.
- `--scope user` — adds the server to your global Claude Code config so it's available in every project. Use `--scope project` if you only want it for the current repo.
- `zip-station` — the local name. Pick anything.
- The URL points at the MCP container. For a local dev stack on the same machine, use `http://localhost:5101/mcp`. For a remote Zip Station, swap in your domain (e.g. `https://zipstation.example.com/mcp` if you've set up a reverse proxy, or `https://zipstation.example.com:5101/mcp` if you've exposed the port directly).
- `--header` — passes your PAT on every request. Quote it; the value contains spaces.

Once added, run `/mcp` inside any Claude Code session — `zip-station` should appear with tools like `list_projects`, `list_stories`, `get_ticket`, etc.

:::tip Verify your connection
After running the command above, open Claude Code and ask: *"What's my Zip Station identity?"* — Claude will call the `whoami` tool and report your email and the companies you belong to. If it returns 401, your token is wrong or revoked.
:::

## Available tools (v1)

| Tool | What it does |
|---|---|
| `whoami` | Returns the Zip Station user the token belongs to. |
| `list_projects` | Lists projects in your company. |
| `list_stories` | Searches kanban stories. Excludes resolved stories by default. |
| `get_story` | Fetches full detail of one kanban story (by card number, e.g. `23` for STR-23). |
| `add_story_comment` | Posts a comment on a kanban story. |
| `get_ticket` | Reads a ticket and its messages. |
| `add_ticket_message` | Posts a reply or internal note on a ticket. If it's not an internal note and the project has SMTP configured, it's emailed to the customer. |

More tools will arrive in subsequent versions.

## Other MCP clients

The same URL + bearer-token pattern works for any MCP client that supports the HTTP transport, including:

- **Claude Desktop** — add the entry under `mcpServers` in `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or the equivalent on your OS.
- **Cursor**, **Continue**, **Cline**, and other clients with MCP support — see each client's documentation; the URL and `Authorization: Bearer …` header are the only inputs.

## Security notes

- **Treat PATs like passwords.** Anyone with the token can act as you in Zip Station, scoped to your company.
- Use a separate token per device or integration so you can revoke selectively (e.g. *revoke the CI token without breaking your laptop*).
- Set an expiry whenever you can. *Never*-expiring tokens are convenient but a liability if a machine is lost.
- Tokens are stored in the database as SHA-256 hashes — even a database breach doesn't reveal the originals.

## Troubleshooting

**Claude Code can't connect / `connection refused`**
The MCP container isn't running. Verify with `docker compose ps` — you should see `zipstation-mcp` on port 5101. If you're on a remote host, make sure port 5101 is reachable (or that your reverse proxy routes `/mcp` to it). See the [DNS and Reverse Proxy guide](../setup-guide/dns-and-reverse-proxy.md#exposing-the-mcp-server) for the nginx/Caddy config.

**Responses come all at once instead of streaming**
Your reverse proxy is buffering. The DNS/proxy guide shows the right flags (`proxy_buffering off` for nginx, `flush_interval -1` for Caddy) to fix this.

**`401 Unauthorized` from a tool**
The token is wrong, revoked, expired, or your account has been disabled. Mint a new one and re-run `claude mcp add` (Claude Code will overwrite the existing entry if you reuse the name).

**`Not a member of this company`**
You haven't been added to the company any tool call is referencing. An admin needs to assign you at least one role.

**Tool calls succeed for some companies but not others**
PATs are scoped to one company. To work with another company, mint a separate token while you have that company selected.
