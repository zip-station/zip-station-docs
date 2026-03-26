---
sidebar_position: 9
title: "Upgrading"
---

# Upgrading

Zip Station uses Docker images, so upgrading is straightforward.

## Steps

### 1. Back Up Your Database

Always back up MongoDB before upgrading:

```bash
docker compose exec mongo mongodump --out /backup/$(date +%Y%m%d)
```

### 2. Pull the Latest Images

```bash
docker compose pull
```

### 3. Restart the Services

```bash
docker compose up -d
```

Docker will automatically replace containers with the updated images.

### 4. Check the Logs

```bash
docker compose logs -f --tail=50
```

Verify that all services started without errors.

## Pinning Versions

By default, Docker Compose pulls the `latest` tag. To pin to a specific version, set the image tags in your `.env` or `docker-compose.yml`:

```yaml
services:
  api:
    image: signalonedigital/zip-station-api:1.2.0
```

This prevents unexpected changes when pulling new images.

## Rollback

If something goes wrong, restore your MongoDB backup and revert to the previous image version:

```bash
docker compose down
# Update image tags to the previous version
docker compose up -d
```
