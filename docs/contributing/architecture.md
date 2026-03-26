---
sidebar_position: 2
title: "Architecture"
---

# Architecture

Zip Station is split across five repositories, each with a specific responsibility.

## Repositories

| Repo | Purpose |
|------|---------|
| `zip-station` | Docker Compose files, deployment config, environment templates |
| `zip-station-service` | .NET API — handles all HTTP requests from the SPA |
| `zip-station-service-worker` | .NET Worker — polls IMAP inboxes, processes incoming emails |
| `zip-station-spa` | React SPA — the dashboard UI |
| `zip-station-docs` | This documentation site (Docusaurus) |

## How They Connect

```
SPA (React) → API (.NET) → MongoDB ← Worker (.NET) → IMAP/SMTP
```

- The **SPA** makes HTTP requests to the **API** for all operations
- The **API** reads and writes to **MongoDB**
- The **Worker** independently polls email inboxes via IMAP and writes incoming emails to MongoDB
- The **Worker** also sends emails via SMTP when the API queues an outgoing message

## Key Patterns

- **Gateway Auth** — API controllers use gateway classes that handle Firebase JWT token verification and tenant scoping
- **BaseEntity** — All MongoDB entities inherit from `BaseEntity`, which includes `Id`, `CreatedAt`, `UpdatedAt`, and `IsVoid` (soft-delete)
- **Firebase JWT Auth** — The SPA authenticates with Firebase and sends the JWT to the API, which verifies it server-side
- **Runtime Config** — Environment variables are injected at container startup, making Docker images reusable across environments
