---
sidebar_position: 8
title: "Production Deployment"
---

# Production Deployment

This guide covers deploying Zip Station to a production server using a DigitalOcean droplet as an example. The same approach works on any Linux VPS.

## Server Setup

1. Provision a server (DigitalOcean droplet, AWS EC2, etc.) with Ubuntu 22.04+
2. Install Docker and Docker Compose
3. Configure your firewall to allow ports 80 and 443

```bash
ufw allow 80
ufw allow 443
ufw allow 22
ufw enable
```

## Database Options

- **Built-in MongoDB** — The default Docker Compose file includes MongoDB. Good for getting started.
- **Managed MongoDB** — Use MongoDB Atlas (free tier available) or DigitalOcean Managed Databases for automatic backups and scaling. Set the connection string in your `.env`.

## Deploy

```bash
git clone https://github.com/signal-one-digital/zip-station.git
cd zip-station
cp .env.example .env
# Edit .env with your production values
docker compose up -d
```

## Auto-Restart with systemd

Create `/etc/systemd/system/zipstation.service`:

```ini
[Unit]
Description=Zip Station
After=docker.service
Requires=docker.service

[Service]
WorkingDirectory=/root/zip-station
ExecStart=/usr/bin/docker compose up
ExecStop=/usr/bin/docker compose down
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
systemctl enable zipstation
systemctl start zipstation
```

## DNS and SSL

Set up your domain and reverse proxy. See [DNS and Reverse Proxy](/docs/setup-guide/dns-and-reverse-proxy).

## Backups

If using the built-in MongoDB, schedule regular backups:

```bash
docker compose exec mongo mongodump --out /backup/$(date +%Y%m%d)
```
