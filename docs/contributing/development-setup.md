---
sidebar_position: 1
title: "Development Setup"
---

# Development Setup

Get the Zip Station development environment running on your machine.

## Prerequisites

- **.NET 10 SDK**
- **Node.js 20** (LTS)
- **pnpm** (package manager)
- **Docker** (for MongoDB)
- **Git**

## Clone the Repositories

All five repos should live in the same parent directory:

```bash
mkdir helpdesk && cd helpdesk
git clone https://github.com/signal-one-digital/zip-station.git
git clone https://github.com/signal-one-digital/zip-station-service.git
git clone https://github.com/signal-one-digital/zip-station-service-worker.git
git clone https://github.com/signal-one-digital/zip-station-spa.git
git clone https://github.com/signal-one-digital/zip-station-docs.git
```

## Option 1: Docker Compose (Recommended)

Run everything in Docker:

```bash
cd zip-station
docker compose -f docker-compose.dev.yml up --build
```

## Option 2: Run Services Individually

### Start MongoDB

```bash
cd zip-station
docker compose -f docker-compose.dev.yml up mongo
```

### Start the API

```bash
cd zip-station-service/ZipStation.Api
dotnet run
```

### Start the Worker

```bash
cd zip-station-service-worker/ZipStation.Worker
dotnet run
```

### Start the SPA

```bash
cd zip-station-spa
pnpm install
pnpm dev
```

## Verify

- SPA: `http://localhost:3000`
- API: `http://localhost:5100`
- MongoDB: `localhost:27017`
