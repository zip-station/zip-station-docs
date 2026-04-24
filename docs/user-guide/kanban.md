---
sidebar_position: 3.5
title: "Kanban Board"
---

# Kanban Board

Each project has a kanban board for planning the work behind your support tickets. Use it to track features, bugs, stories, and tech debt, and link cards back to the customer tickets that prompted them.

## Opening the Board

Click **Kanban** in the sidebar. The board you see belongs to the project currently selected in the project switcher at the top of the sidebar — switch projects to switch boards.

If your project has no board yet, one is created automatically the first time you visit, with five default columns: **Backlog**, **Ready**, **Committed**, **Active**, and **Done**.

## Cards

A card represents one piece of work.

### Creating a Card

Click the **+** button in any column header. A card needs:

- **Title** — what needs doing
- **Type** — Feature, Bug, Story, or Tech Debt
- **Priority** — Low, Normal, High, or Urgent
- **Assignee** *(optional)*
- **Tags** *(optional)* — press Enter or comma to add each tag

Every card gets a permanent ID like `CARD-42`, numbered per project.

### Editing a Card

Click a card to open its detail page. From there you can:

- Edit the **title** and **rich-text description** (with images, formatting, links)
- Change the **column**, **type**, **priority**, **assignee**, or **tags**
- Post **comments** with rich text — changes are visible in the activity log
- **Link or unlink tickets** (see below)
- **Delete** the card

### Drag and Drop

Drag cards within a column to reorder them, or between columns to change status. On mobile, press and hold a card to start dragging.

## Columns

Click **Columns** above the board to manage them. You can:

- Add columns (up to 8 per board)
- Rename a column and change its color
- Reorder with the up/down arrows
- Remove a column (as long as no cards live there)
- Mark which column means **resolved** — this defaults to the last column

Column changes apply only to the current project's board. Other projects keep their own columns.

## Linking Tickets

A card can link to any number of helpdesk tickets, and a ticket can be linked from multiple cards. Use this to keep a paper trail of which customers asked for a feature or reported a bug.

In the card detail page, under **Linked tickets**, type a ticket number (e.g. `142`) or paste the ticket ID and click **Link**.

### What Happens When a Card Is Resolved

When a card moves into the **resolved** column, each of its linked tickets receives a system message in its thread:

> Ada marked linked card CARD-42 "Fix login redirect" as resolved.

This is an internal note — the customer is **not** emailed. It's purely a trail so your team can see which feature or fix cleared a ticket off their plate. No other card change (title edits, comments, type changes) produces a ticket note.

Changes on tickets never flow back to cards.

## Filtering and Searching

Use the filter bar above the board to narrow what you see:

- **Search** — matches against card title, description, and card number
- **Assignee** — all, assigned to me, unassigned, or a specific member
- **Type** — Feature, Bug, Story, or Tech Debt
- **Linked tickets** — any, has linked tickets, no linked tickets
- **Tags** — pick one or more tags
- **Show archived** — include resolved cards that have aged out (see below)

On small screens, tap **Filters** to open them in a sheet.

## Archive

Cards that sit in the resolved column for longer than the project's archive threshold are hidden from the board by default. Tick **Show archived** to bring them back, or search by card number to find a specific one.

The threshold defaults to **3 days** and can be changed per project under **Project Settings → Kanban Archive Threshold**.

## Permissions

Three permissions control access — assign them through the Roles page:

- **Kanban.View** — see the board and its cards
- **Kanban.Edit** — create, move, and edit cards; manage columns; comment
- **Kanban.Delete** — delete cards

Owners have all permissions automatically.
