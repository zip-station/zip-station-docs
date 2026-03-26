---
sidebar_position: 3
title: "Firebase Setup"
---

# Firebase Setup

Zip Station uses Firebase Authentication to manage user sign-in. You'll need a Firebase project (the free Spark plan works fine).

## Step-by-Step

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project**
3. Enter a project name (e.g., "Zip Station")
4. Disable Google Analytics (optional, not needed)
5. Click **Create Project**

### 2. Enable Authentication

1. In the Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Optionally enable **Google** sign-in if you want your team to sign in with Google accounts

### 3. Get Your Credentials

1. Go to **Project Settings** > **General**
2. Scroll down to **Your apps** and click the web icon (`</>`) to register a web app
3. Copy the following values:
   - **API Key** (`apiKey`)
   - **Project ID** (`projectId`)

### 4. Add to Your .env

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_API_KEY=your-api-key
```

The `FIREBASE_AUTH_DOMAIN` defaults to `{projectId}.firebaseapp.com` and usually doesn't need to be set manually.

## Optional: Firebase Admin SDK

For the ability to delete user accounts from Firebase when removing team members, see [Firebase Admin SDK](/docs/setup-guide/firebase-admin-sdk).
