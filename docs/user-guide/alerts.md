---
sidebar_position: 8
title: "Alerts"
---

# Alerts

Alerts notify your team when important events happen, like a new ticket being created. Zip Station sends alerts via webhooks, so you can integrate with Slack, Discord, or any service that accepts HTTP requests.

## Setting Up a Webhook

1. Go to **Project Settings** > **Alerts**
2. Click **Add Webhook**
3. Enter the **webhook URL** from your target service
4. Choose which events trigger the alert (e.g., new ticket created)
5. Save

## Slack Integration

1. In Slack, go to your workspace settings and create an **Incoming Webhook**
2. Copy the webhook URL
3. Paste it into Zip Station's alert configuration

## Discord Integration

1. In Discord, go to your channel's settings > **Integrations** > **Webhooks**
2. Create a new webhook and copy the URL
3. Paste it into Zip Station's alert configuration

## Generic Webhooks

Any service that accepts POST requests with a JSON body works. The payload includes the ticket subject, sender, and a link to the ticket.
