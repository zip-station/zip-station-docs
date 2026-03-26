# Zip Station

A simple, modern, open-source helpdesk system. Receive support emails, manage tickets, and respond to customers — all from one dashboard.

## What's Inside

Zip Station runs as a set of Docker containers:

| Container | What It Does |
|---|---|
| **Service** | The API that powers everything |
| **Worker** | Background jobs — checks for new emails, sends reports, monitors alerts |
| **SPA** | The web dashboard you use in your browser |
| **MongoDB** | The database (included, or bring your own) |

## Quick Start

### 1. Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- A [Firebase](https://firebase.google.com/) project (free tier is fine) — used for user login
- An email account for receiving support emails (any provider works — MXRoute, Gmail, etc.)

### 2. Download the Files

```bash
git clone https://github.com/your-org/zip-station.git
cd zip-station
```

### 3. Set Up Your Config

```bash
cp .env.example .env
```

Open `.env` in any text editor and fill in your values. See the **[Configuration Guide](docs/configuration.md)** for details on each setting.

### 4. Start Everything

```bash
docker compose up -d
```

That's it! Open your browser to `http://localhost:3000` and create your account.

### 5. Create Your First Project

The dashboard will walk you through a setup wizard:
1. Create your company
2. Create a project (e.g., "Softgoods Support")
3. Connect your support email (the wizard will test the connection for you)
4. Start receiving tickets!

## Guides

- **[Configuration Guide](docs/configuration.md)** — All the settings explained
- **[Email Setup Guide](docs/email-setup.md)** — How to connect your email provider
- **[Domain & DNS Guide](docs/domain-setup.md)** — Point your domain to Zip Station
- **[Storage Setup Guide](docs/storage-setup.md)** — Connect Backblaze or S3 for file attachments
- **[Advanced Deployment](docs/advanced-deployment.md)** — Scaling, external databases, reverse proxies
- **[Updating](docs/updating.md)** — How to update to the latest version

## How It Works

```
Customer sends email
      ↓
Zip Station checks your inbox every 2 minutes
      ↓
New emails appear in the Intake staging area
      ↓
You approve them → they become tickets
      ↓
You reply from the dashboard → customer gets your response via email
```

You can also set up rules to auto-approve emails from known senders, auto-deny spam, and more.

## Requirements

- **RAM**: 1 GB minimum, 2 GB recommended
- **Disk**: 1 GB for the app, plus space for your database
- **CPU**: Any modern CPU. Runs fine on a Raspberry Pi 4.
- **OS**: Anything that runs Docker — Linux, macOS, Windows, Unraid, Synology, etc.

## Running on Unraid

1. Install the **Docker Compose Manager** plugin from Community Apps
2. Create a new stack
3. Paste the contents of `docker-compose.yml`
4. Create your `.env` file in the same folder
5. Start the stack

Or add each container individually through the Unraid Docker UI — see the **[Advanced Deployment](docs/advanced-deployment.md)** guide.

## Support

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and share tips

## License

MIT — use it however you want.
