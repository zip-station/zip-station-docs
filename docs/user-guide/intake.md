---
sidebar_position: 4
title: "Intake"
---

# Intake

Intake is where incoming emails land before they become tickets. Think of it as a review queue — you decide which emails to accept and which to reject.

## Reviewing Emails

Each item in the intake queue shows the sender, subject, and a preview. You have three options:

- **Approve** — Creates a new ticket from the email
- **Deny** — Removes the email from the queue
- **Deny Permanently** — Removes the email and automatically creates an intake rule to block future emails matching the same criteria

## Bulk Actions

Select multiple intake items to approve or deny them all at once. This is useful when clearing out spam or approving a batch of legitimate emails.

## Intake Rules

Switch to the **Rules** tab to manage your automation. Rules can automatically approve or deny incoming emails based on conditions like sender address, subject keywords, or domain.

Each rule has:

- **Conditions** — What to match (e.g., sender contains "noreply@")
- **Action** — Approve or Deny automatically

### Running Rules

After creating or updating rules, you can **run rules against pending items** to apply them retroactively to emails already in the queue.

## Checking for New Emails

The worker service polls your email account every 2 minutes. You can also click **Check Now** to trigger an immediate check for new emails.
