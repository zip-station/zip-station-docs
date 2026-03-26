---
sidebar_position: 3
title: "Project Structure"
---

# Project Structure

A guide to the folder layout of each service.

## API (`zip-station-service`)

```
ZipStation.Api/
├── Controllers/v1/     # API endpoints, grouped by feature
├── Business/
│   ├── Gateways/       # Auth + tenant scoping layer
│   ├── Repositories/   # MongoDB data access
│   └── Services/       # Business logic
├── Models/
│   ├── Entities/       # MongoDB document models
│   ├── Responses/      # API response DTOs
│   ├── CommandModels/  # Request input models
│   └── Enums/          # Status, Priority, etc.
└── Mapping/            # AutoMapper profiles
```

## Worker (`zip-station-service-worker`)

```
ZipStation.Worker/
├── Services/           # EmailPollingService and processing logic
├── Entities/           # Shared MongoDB models
├── Repositories/       # Data access
└── Helpers/            # Email parsing, utilities
```

## SPA (`zip-station-spa`)

```
src/
├── pages/              # Route-level page components
├── components/ui/      # Reusable UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── lib/                # Utilities, API client, helpers
├── routes/             # Route definitions
├── store/              # Zustand state stores
├── i18n/               # Internationalization files
└── types/              # TypeScript type definitions
```

## Key Conventions

- **API**: Controllers delegate to Gateways, which handle auth and call Repositories/Services
- **Worker**: The `EmailPollingService` runs on a timer and processes emails in batches
- **SPA**: Pages use TanStack Query hooks for data fetching; global state lives in Zustand stores
