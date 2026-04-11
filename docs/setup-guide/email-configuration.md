---
sidebar_position: 4
title: "Email Configuration"
---

# Email Configuration

Zip Station uses SMTP to send emails and IMAP to receive them. Email is configured at two levels: **per-project** and **company-wide**.

## SMTP (Outgoing Email)

### Per-Project SMTP

Each project has its own SMTP settings for sending ticket replies. Configure this in **Project Settings** > **Email**:

| Setting | Example |
|---------|---------|
| Host | smtp.gmail.com |
| Port | 465 (SSL) or 587 (TLS) |
| Username | support@yourdomain.com |
| Password | your-app-password |

### Company SMTP

In **Settings** > **Company**, configure SMTP for system emails like team invitations. This is separate from project email.

## IMAP (Incoming Email)

Each project has its own IMAP settings. The Worker service polls the inbox every 2 minutes for new emails. Configure in **Project Settings** > **Email**:

| Setting | Example |
|---------|---------|
| Host | imap.gmail.com |
| Port | 993 (SSL) |
| Username | support@yourdomain.com |
| Password | your-app-password |

## File Attachments

To send and receive file attachments, configure a Backblaze B2 storage bucket in **Project Settings** > **File Storage**. See [Projects — File Storage](/docs/user-guide/projects#file-storage) for details.

Without file storage configured, emails still work normally — attachments on incoming emails are simply not saved, and outgoing emails cannot include attachments.

## Recommendations

- Use a **dedicated email address** like `support@yourdomain.com` for each project
- If using Gmail, create an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
- Port 465 uses implicit SSL; port 587 uses STARTTLS — both are secure
- Keep IMAP and SMTP credentials for the same mailbox so replies come from the same address that receives emails
