---
sidebar_position: 7
title: "Firebase Admin SDK"
---

# Firebase Admin SDK

The Firebase Admin SDK is **optional but recommended**. It's required for deleting Firebase user accounts when you remove team members from your workspace.

Without it, removed members' accounts remain in Firebase (though they lose access to Zip Station).

## Setup Steps

### 1. Generate a Service Account Key

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Open your project
3. Go to **Project Settings** > **Service Accounts**
4. Click **Generate New Private Key**
5. A JSON file will download

### 2. Extract the Values

Open the downloaded JSON file and find these two fields:

- `client_email` — Looks like `firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com`
- `private_key` — A long string starting with `-----BEGIN PRIVATE KEY-----`

### 3. Add to Your .env

```env
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...your-key-here...\n-----END PRIVATE KEY-----\n"
```

### Important Notes

- The `private_key` contains `\n` characters representing line breaks. Keep them as-is in your `.env` file — do not replace them with actual newlines.
- Keep this file secure. Do not commit it to version control.
