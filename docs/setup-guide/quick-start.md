---
sidebar_position: 2
title: "Quick Start"
---

# Quick Start

Get Zip Station running locally in under 10 minutes.

## Prerequisites

- Docker and Docker Compose installed
- A Firebase project with Authentication enabled (see [Firebase Setup](/docs/setup-guide/firebase-setup))

## Steps

### 1. Clone the Repository

```bash
git clone https://github.com/signal-one-digital/zip-station.git
cd zip-station
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Open `.env` and fill in your Firebase credentials:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_API_KEY=your-api-key
```

### 3. Start the Services

```bash
docker compose up -d
```

This starts the API, Worker, SPA, and MongoDB containers.

### 4. Open the Dashboard

Visit `http://localhost:3000` in your browser.

### 5. Complete the Setup Wizard

On first launch, you'll be guided through creating your account and configuring your first project. You'll set up your email connection (IMAP/SMTP) during this step.

## What's Next

- [Email Configuration](/docs/setup-guide/email-configuration) — Detailed email setup
- [Environment Variables](/docs/setup-guide/environment-variables) — Full reference of all config options
- [Production Deployment](/docs/setup-guide/production-deployment) — Deploy to a real server
