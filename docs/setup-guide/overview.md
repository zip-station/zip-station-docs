---
sidebar_position: 1
title: "Overview"
---

# Setup Overview

Zip Station is deployed as a set of Docker containers. This guide walks you through the architecture and what you'll need to get it running.

## Architecture

Zip Station has three services plus a database:

- **API** — A .NET web API that handles all HTTP requests from the dashboard. Manages tickets, customers, settings, and authentication.
- **Worker** — A .NET background service that polls IMAP inboxes for new emails and processes them into the intake queue.
- **SPA** — A React single-page application served by Nginx. This is the dashboard your team uses.
- **MongoDB** — The database. Stores all tickets, customers, settings, and configuration.

All three services are packaged as Docker images and orchestrated with Docker Compose.

## Requirements

- **Docker** and **Docker Compose** installed on your server
- A **Firebase project** for authentication (free tier is fine)
- An **email account** with IMAP and SMTP access (e.g., Gmail, Outlook, or your own mail server)
- A **domain name** (optional but recommended for production)

## Next Steps

Follow the [Quick Start](/docs/setup-guide/quick-start) to get Zip Station running in under 10 minutes.
