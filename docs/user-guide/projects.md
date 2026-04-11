---
sidebar_position: 7
title: "Projects"
---

# Projects

Projects let you manage separate support channels within a single Zip Station instance. For example, you might have one project for your **book app** and another for your **workout app** — each with its own support email inbox and ticket queue. You could also use projects for departments, like **Sales** and **Technical Support**.

## Creating a Project

1. Go to **Projects** from the sidebar
2. Click **New Project**
3. Enter a name and configure the settings

## Project Settings

Each project has its own configuration:

- **Ticket ID Prefix** — Customize the prefix for ticket IDs (e.g., "SUP-" for support tickets)
- **Email Configuration** — Set up IMAP (incoming) and SMTP (outgoing) credentials specific to this project
- **Auto-Reply** — Configure an automatic reply sent to customers when a new ticket is created
- **File Storage** — Connect a Backblaze B2 bucket for email attachments (see below)
- **Contact Form** *(coming soon)* — An embeddable contact form that creates tickets in this project
- **Spam Filtering** *(coming soon)* — Configure spam detection for incoming emails

## File Storage

To enable file attachments on emails, connect a [Backblaze B2](https://www.backblaze.com/cloud-storage) bucket to your project.

1. In Backblaze B2, create a **private** bucket
2. Go to **App Keys** and create a new application key with read/write access to the bucket
3. In Zip Station, go to **Project Settings** > **File Storage**
4. Fill in:

| Setting | Example |
|---------|---------|
| S3 Endpoint | `https://s3.us-east-005.backblazeb2.com` |
| Region | `us-east-005` |
| Bucket Name | `my-support-files` |
| Key ID | Your Backblaze key ID |
| Application Key | Your Backblaze application key |

5. Click **Save**

Credentials are encrypted at rest. The endpoint and region are shown on your bucket's details page in the Backblaze dashboard — make sure the endpoint includes `https://`.

Files are organized in the bucket by `companyId/projectId/ticketId/messageId/` so you can browse or clean up files per ticket.

## Switching Projects

Use the **project selector** at the top of the sidebar to switch between projects. The ticket list, intake queue, and dashboard stats update to reflect the selected project.
