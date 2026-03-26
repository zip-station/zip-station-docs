---
sidebar_position: 6
title: "Environment Variables"
---

# Environment Variables

Full reference for all environment variables in your `.env` file.

## Required

| Variable | Default | Description |
|----------|---------|-------------|
| `FIREBASE_PROJECT_ID` | — | Your Firebase project ID |
| `FIREBASE_API_KEY` | — | Firebase web API key |
| `API_URL` | `http://localhost:5100` | URL the browser uses to reach the API |
| `ENCRYPTION_KEY` | auto-generated | AES-256 key for encrypting stored email passwords |

## Optional

| Variable | Default | Description |
|----------|---------|-------------|
| `FIREBASE_AUTH_DOMAIN` | `{projectId}.firebaseapp.com` | Firebase auth domain |
| `API_PORT` | `5100` | Port the API container listens on |
| `SPA_PORT` | `3000` | Port the SPA container listens on |
| `MONGO_PORT` | `27017` | Port MongoDB listens on |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | CORS allowed origins (comma-separated) |
| `FIREBASE_ADMIN_CLIENT_EMAIL` | — | Service account email for Firebase Admin SDK |
| `FIREBASE_ADMIN_PRIVATE_KEY` | — | Service account private key for Firebase Admin SDK |

## Notes

- `ENCRYPTION_KEY` is auto-generated on first run if not set. If you move to a new server, copy this key or stored email passwords won't decrypt.
- `API_URL` must be reachable from the user's browser, not just from the server. In production, this is typically `https://api.yourdomain.com`.
- `ALLOWED_ORIGINS` should match the URL where your SPA is hosted. For production, set it to your domain (e.g., `https://yourdomain.com`).
- For Firebase Admin SDK variables, see [Firebase Admin SDK](/docs/setup-guide/firebase-admin-sdk).
