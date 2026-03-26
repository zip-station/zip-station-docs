---
sidebar_position: 8
title: "Production Deployment"
---

# Production Deployment

This guide covers deploying Zip Station to a production server using a DigitalOcean droplet as an example. The same approach works on any Linux VPS.

## Server Setup

1. Provision a server (DigitalOcean droplet, AWS EC2, etc.) with any Linux distribution that has Docker installed (Ubuntu, CentOS, Debian, etc.)
2. Install Docker and Docker Compose
3. Configure your firewall to allow the necessary ports:
   - **80** — HTTP web traffic
   - **443** — HTTPS web traffic

## Database Options

- **Built-in MongoDB** — The default Docker Compose file includes MongoDB. This works for most deployments.
- **External MongoDB** — External MongoDB support is coming soon. For now, the included MongoDB container works well for most deployments.

## Deploy

```bash
git clone https://github.com/signal-one-digital/zip-station.git
cd zip-station
cp .env.example .env
# Edit .env with your production values
docker compose up -d
```

## DNS and SSL

Set up your domain and reverse proxy. See [DNS and Reverse Proxy](/docs/setup-guide/dns-and-reverse-proxy).

## Backups

If using the built-in MongoDB, schedule regular backups:

```bash
docker compose exec mongo mongodump --out /backup/$(date +%Y%m%d)
```
