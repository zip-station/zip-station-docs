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

## Update Your .env

After setting up DNS, update your environment variables:

```env
API_URL=https://api.yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
```
