---
sidebar_position: 5
title: "DNS and Reverse Proxy"
---

# DNS and Reverse Proxy

For production, you'll want a domain name pointing to your server and a reverse proxy handling SSL.

:::info You Need Two Domains
Zip Station requires **two** publicly accessible URLs — one for the dashboard (SPA) and one for the API. The SPA runs in the user's browser and makes API calls over the internet, so the API must be reachable from outside the server. Typically you'd use a subdomain for the API:
- `helpdesk.yourdomain.com` → Dashboard (SPA)
- `api.helpdesk.yourdomain.com` → API
:::

## DNS Setup (Cloudflare Example)

1. Add your domain to Cloudflare
2. Create **A records** pointing to your server's IP address:
   - `yourdomain.com` → `your.server.ip` (dashboard)
   - `api.yourdomain.com` → `your.server.ip` (API)
3. Set SSL mode to **Flexible** (or Full if your proxy has its own cert)

:::tip Wildcard DNS
If you create a wildcard A record (`*`) pointing to your server IP alongside your root domain record, all subdomains will automatically route to your server. Your reverse proxy (nginx, Caddy, etc.) handles routing to the correct service based on the hostname. This is especially convenient with Cloudflare proxy enabled — both `yourdomain.com` and `*` pointing to the same IP will cover all subdomains.
:::

## Reverse Proxy Examples

### Caddy (Simplest)

```
yourdomain.com {
    reverse_proxy localhost:3000
}

api.yourdomain.com {
    reverse_proxy localhost:5100
}
```

Caddy handles SSL automatically.

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Apache

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>

<VirtualHost *:80>
    ServerName api.yourdomain.com
    ProxyPass / http://localhost:5100/
    ProxyPassReverse / http://localhost:5100/
</VirtualHost>
```

## Exposing the MCP Server

Zip Station ships an MCP server (`zipstation-mcp` container on port `5101`) so users can connect Claude Code or other MCP-aware AI tools to their instance. You need to expose it through your reverse proxy.

Two patterns work — pick the one that matches your setup:

### Path-based (recommended — matches the in-product copy command)

Add a `/mcp` location to your existing dashboard subdomain. The token-create dialog in **Settings → Personal Access Tokens** auto-generates `https://{your-dashboard-url}/mcp` as the connection URL, so the URL works out-of-the-box.

**Caddy** — add a handler block above the catch-all:

```
yourdomain.com {
    handle /mcp* {
        reverse_proxy localhost:5101 {
            flush_interval -1
        }
    }
    handle {
        reverse_proxy localhost:3000
    }
}
```

**Nginx** — add a location block inside your existing dashboard server block:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /mcp {
        proxy_pass http://localhost:5101;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection '';
        proxy_buffering off;          # MCP streaming requires flushing
        proxy_read_timeout 1h;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

:::warning Streaming requires no buffering
The `proxy_buffering off;` (nginx) and `flush_interval -1` (Caddy) settings are critical. MCP and Max chat both use server-sent events; with default buffering, responses appear all at once at the end instead of streaming.
:::

### Subdomain (alternative)

If you prefer a separate subdomain per service, add `mcp.yourdomain.com` alongside `yourdomain.com` and `api.yourdomain.com` and point it at port 5101. **You'll need to manually edit the copy command** in the token-create dialog every time, since it assumes path-based routing. Skip this unless you have a strong reason.

### Cloudflare

If you front your stack with Cloudflare, no extra config is needed for either pattern — Cloudflare's proxy passes through SSE correctly. If you use Cloudflare Tunnel instead of public IPs, add a public hostname with `Path: mcp` pointing at `http://mcp:5101` (the container name on the docker compose network).

## Update Your .env

After setting up DNS, update your environment variables:

```env
API_URL=https://api.yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
```
